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
      this.ipcMain.handle("synchronize-contact", async () => {
        try {
          await this.contactService.synchronizeContact({});
          return {
            statusCode: 200,
            message: "Success synchronize contacts",
          };
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
          return {
            statusCode: 500,
            message: "internal server error",
          };
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
