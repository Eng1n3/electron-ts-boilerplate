import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Contact } from "./entities/contact.entity";
import { ContactDto } from "./dto/contact.dto";
import { ContactImage } from "../contact-image/entities/contact-image.entity";
import axios from "axios";

export class ContactService {
  public static _instance: ContactService;
  private readonly contactRepo: Repository<Contact>;
  private readonly contactImageRepo: Repository<ContactImage>;

  constructor() {
    this.contactRepo = AppDataSource.getRepository(Contact);
    this.contactImageRepo = AppDataSource.getRepository(ContactImage);
  }

  static getInstance() {
    if (!ContactService._instance) {
      ContactService._instance = new ContactService();
    }
    return ContactService._instance;
  }

  async synchronizeContact({ id }: { id?: string }) {
    const contacts = await this.contactRepo.find({
      where: { statusUpload: "store", id: id ? id : undefined },
      relations: { image: true },
    });
    console.log(contacts, 29);
    const { status: uploadsStatus, data: updloadData } = await axios.post(
      "http://localhost:8001/synchronize/uploads",
      contacts
    );
    if (uploadsStatus !== 201) throw new Error(updloadData.message);
    const { status: fecthStatus, data: fetchData } = await axios.get(
      "http://localhost:8001/synchronize/fetch?lastDate=169"
    );
    if (fecthStatus !== 200) throw new Error(fetchData.message);
    const newImages = this.contactImageRepo.create(
      fetchData.data?.map((contact: Contact) => ({ ...contact.image }))
    );
    await this.contactImageRepo.upsert(newImages, ["id"]);
    const newContacts = this.contactRepo.create(
      fetchData?.data?.map((contact: Contact) => ({
        ...contact,
        statusUpload: "uploads",
      }))
    );
    await this.contactRepo.upsert(newContacts, ["id"]);
  }

  async createContact(contactDto: ContactDto) {
    const newContactImage = this.contactImageRepo.create({
      filename: "testFilename",
      mimeType: "image/jpeg",
      originalName: "test original name",
    });
    const contactImageRepoSave = await this.contactImageRepo.save(
      newContactImage
    );
    const contacts = this.contactRepo.create({
      ...contactDto,
      image: contactImageRepoSave,
    });
    await this.contactRepo.save(contacts);
  }

  async getContact() {
    const [data, count] = await this.contactRepo.findAndCount({
      relations: { image: true },
    });
    return { data, count };
  }
}
