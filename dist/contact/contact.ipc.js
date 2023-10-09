"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactIpc = void 0;
const electron_1 = require("electron");
const contact_service_1 = require("./contact.service");
class ContactIpc {
    constructor() {
        this.ipcMain = electron_1.ipcMain;
        this.contactService = contact_service_1.ContactService.getInstance();
    }
    static getInstance() {
        if (!ContactIpc._instance) {
            ContactIpc._instance = new ContactIpc();
        }
        return ContactIpc._instance;
    }
    async getIpc() {
        try {
            this.ipcMain.handle("synchronize-contact", async () => {
                try {
                    await this.contactService.synchronizeContact({});
                    return {
                        statusCode: 200,
                        message: "Success synchronize contacts",
                    };
                }
                catch (error) {
                    console.log(error);
                    return {
                        statusCode: 500,
                        message: "internal server error",
                    };
                }
            });
            this.ipcMain.handle("get-contact", async () => {
                try {
                    const { data, count } = await this.contactService.getContact();
                    return {
                        statusCode: 200,
                        message: "Success get contacts",
                        data: { data, count },
                    };
                }
                catch (error) {
                    return {
                        statusCode: 500,
                        message: "internal server error",
                    };
                }
            });
            this.ipcMain.handle("create-contact", async (event, values) => {
                try {
                    await this.contactService.createContact(values);
                    return { statusCode: 200, message: "Success create contact" };
                }
                catch (error) {
                    return {
                        statusCode: 500,
                        message: "internal server error",
                    };
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ContactIpc = ContactIpc;
