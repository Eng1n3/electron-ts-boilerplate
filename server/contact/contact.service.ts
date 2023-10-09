import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Contact } from "./entities/contact.entity";
import { ContactDto } from "./dto/contact.dto";
import { ContactImage } from "../contact-image/entities/contact-image.entity";

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
