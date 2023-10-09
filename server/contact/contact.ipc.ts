import { IpcMain, ipcMain as mainIpc } from "electron";
import { ContactService } from "./contact.service";

export class ContactIpc {
  private readonly ipcMain: IpcMain;
  private readonly contactService: ContactService;
  public static _instance: ContactIpc;

  constructor() {
    this.ipcMain = mainIpc;
    this.contactService = ContactService.getInstance();
  }

  static getInstance() {
    if (!ContactIpc._instance) {
      ContactIpc._instance = new ContactIpc();
    }
    return ContactIpc._instance;
  }

  async getIpc() {
    try {
      this.ipcMain.handle("get-contact", async () => {
        const { data, count } = await this.contactService.getContact();
        return {
          statusCode: 200,
          message: "Success get contacts",
          data: { data, count },
        };
      });

      this.ipcMain.handle("get-one-contact", async (event, value) => {
        const { data } = await this.contactService.getOneContact(value.id);
        return {
          statusCode: 200,
          message: "Success get contacts",
          data,
        };
      });

      this.ipcMain.handle("create-contact", async (event, values) => {
        await this.contactService.createContact(values);
        return { statusCode: 200, message: "Success create contact" };
      });
    } catch (error) {
      console.log(37, error);
      throw error;
    }

    this.ipcMain.handle("delete-contact", async (event, values) => {
      const { data } = await this.contactService.deleteContact(values.id);
      return {
        statusCode: 200,
        message: "Success delete contacts",
        data,
      };
    });
  }
}
