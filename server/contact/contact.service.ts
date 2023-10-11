import { Repository, IsNull } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Contact } from "./entities/contact.entity";
import { CreateContactDto } from "./dto/contact.dto";
import { ContactImage } from "../contact-image/entities/contact-image.entity";
import axios from "axios";
import { Synchronize } from "../synchronize/entities/synchronize.entity";
import config from "../config/env.config";
import createError from "http-errors";

export class ContactService {
  public static _instance: ContactService;
  private readonly contactRepo: Repository<Contact>;
  private readonly contactImageRepo: Repository<ContactImage>;
  private readonly synchronizeRepo: Repository<Synchronize>;

  constructor() {
    this.synchronizeRepo = AppDataSource.getRepository(Synchronize);
    this.contactRepo = AppDataSource.getRepository(Contact);
    this.contactImageRepo = AppDataSource.getRepository(ContactImage);
  }

  static getInstance() {
    if (!ContactService._instance) {
      ContactService._instance = new ContactService();
    }
    return ContactService._instance;
  }

  async importContact(contacts: Contact[], lastDateDatabase: Date) {
    const dataInitialSync = this.synchronizeRepo.create({
      lastDateSynchronize: new Date(),
      lastDateDatabase: lastDateDatabase,
    });
    const dataInitialContactImage = contacts?.map((contact: Contact) =>
      this.contactImageRepo.create({ ...contact.image })
    );
    const dataInitialContact = contacts?.map((contact: Contact) =>
      this.contactRepo.create({
        ...contact,
        statusUpload: "upload",
      })
    );

    await this.contactImageRepo.save(dataInitialContactImage);
    await this.contactRepo.save(dataInitialContact);
    await this.synchronizeRepo.save(dataInitialSync);
  }

  async synchronizeContact({ id }: { id?: string }) {
    const [lastDate] = await this.synchronizeRepo.find({
      take: 1,
      order: { lastDateDatabase: "desc" },
    });
    if (!lastDate)
      throw new createError.BadRequest("include data by file first");
    const contacts = await this.contactRepo.find({
      where: {
        statusUpload: "store",
        id: id ? id : undefined,
      },
      relations: { image: true },
    });
    const { status: uploadsStatus, data: updloadData } = await axios.post(
      `${config<string>("DAPOBUD_URL")}:${config<number>(
        "DAPOBUD_PORT"
      )}/synchronize/uploads`,
      contacts
    );
    if (uploadsStatus !== 201)
      throw new createError.BadRequest(updloadData.message);

    const { status: fecthStatus, data: fetchData } = await axios.get(
      `${config("DAPOBUD_URL")}:${config<number>(
        "DAPOBUD_PORT"
      )}/synchronize/fetch`,
      {
        params: {
          lastDate: lastDate?.lastDateDatabase
            ? new Date(lastDate.lastDateDatabase).getTime()
            : "",
        },
      }
    );
    if (fecthStatus !== 200)
      throw new createError.BadRequest(fetchData.message);
    if (
      new Date(lastDate?.lastDateDatabase).getTime() !==
      new Date(fetchData?.data?.lastDateDatabase).getTime()
    ) {
      const newImages = this.contactImageRepo.create(
        fetchData?.data?.contacts?.map((contact: Contact) => ({
          ...contact.image,
        }))
      );
      await this.contactImageRepo.upsert(newImages, ["id"]);
      const newContacts = this.contactRepo.create(
        fetchData?.data?.contacts?.map((contact: Contact) => ({
          ...contact,
          statusUpload: "uploads",
        }))
      );
      await this.contactRepo.upsert(newContacts, ["id"]);
      if (fetchData?.data?.lastDateDatabase !== lastDate) {
        const dataSyncContact = this.synchronizeRepo.create({
          lastDateSynchronize: new Date(),
          lastDateDatabase: fetchData?.data?.lastDateDatabase,
        });
        await this.synchronizeRepo.save(dataSyncContact);
      }
    }
  }

  async createContact(contactDto: CreateContactDto) {
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
      statusUpload: "store",
    });
    await this.contactRepo.save(contacts);
  }

  async getContact() {
    const [data, count] = await this.contactRepo.findAndCount({
      relations: { image: true },
    });
    return { data, count };
  }

  async getOneContact(id: string) {
    const data = await this.contactRepo.findOne({
      where: { id },
      relations: { image: true },
    });
    return { data };
  }

  async deleteContact(id: string) {
    const data = await this.contactRepo.softDelete({
      id,
    });
    return { data };
  }
}
