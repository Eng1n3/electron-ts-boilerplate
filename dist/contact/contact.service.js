"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const data_source_1 = require("../database/data-source");
const contact_entity_1 = require("./entities/contact.entity");
const contact_image_entity_1 = require("../contact-image/entities/contact-image.entity");
const axios_1 = __importDefault(require("axios"));
class ContactService {
    constructor() {
        this.contactRepo = data_source_1.AppDataSource.getRepository(contact_entity_1.Contact);
        this.contactImageRepo = data_source_1.AppDataSource.getRepository(contact_image_entity_1.ContactImage);
    }
    static getInstance() {
        if (!ContactService._instance) {
            ContactService._instance = new ContactService();
        }
        return ContactService._instance;
    }
    async synchronizeContact({ id }) {
        const contacts = await this.contactRepo.find({
            where: { statusUpload: "store", id: id ? id : undefined },
            relations: { image: true },
        });
        console.log(contacts, 29);
        const { status: uploadsStatus, data: updloadData } = await axios_1.default.post("http://localhost:8001/synchronize/uploads", contacts);
        if (uploadsStatus !== 201)
            throw new Error(updloadData.message);
        const { status: fecthStatus, data: fetchData } = await axios_1.default.get("http://localhost:8001/synchronize/fetch?lastDate=169");
        if (fecthStatus !== 200)
            throw new Error(fetchData.message);
        const newImages = this.contactImageRepo.create(fetchData.data?.map((contact) => ({ ...contact.image })));
        await this.contactImageRepo.upsert(newImages, ["id"]);
        const newContacts = this.contactRepo.create(fetchData?.data?.map((contact) => ({
            ...contact,
            statusUpload: "uploads",
        })));
        await this.contactRepo.upsert(newContacts, ["id"]);
    }
    async createContact(contactDto) {
        const newContactImage = this.contactImageRepo.create({
            filename: "testFilename",
            mimeType: "image/jpeg",
            originalName: "test original name",
        });
        const contactImageRepoSave = await this.contactImageRepo.save(newContactImage);
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
exports.ContactService = ContactService;
