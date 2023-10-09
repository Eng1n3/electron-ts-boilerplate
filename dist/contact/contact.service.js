"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const data_source_1 = require("../database/data-source");
const contact_entity_1 = require("./entities/contact.entity");
const contact_image_entity_1 = require("../contact-image/entities/contact-image.entity");
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
