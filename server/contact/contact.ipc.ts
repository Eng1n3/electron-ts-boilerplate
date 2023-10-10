import { IpcMain, ipcMain as mainIpc, dialog } from "electron";
import { ContactService } from "./contact.service";
import handleError from "../util/handle-error.util";
import { readFileSync } from "fs";

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
    this.ipcMain.handle("import-contact", async () => {
      try {
        // Open a dialog to ask for the file path
        const { canceled, filePaths } = await dialog.showOpenDialog({
          properties: ["openFile"],
        });

        if (!canceled) {
          const { contacts, lastDateDatabase } = JSON.parse(
            readFileSync(filePaths[0], "utf8")
          );
          await this.contactService.importContact(contacts, lastDateDatabase);
          return {
            statusCode: 200,
            message: "Success synchronize contacts",
          };
        }
        return {
          statusCode: 200,
          message: "import canceled",
        };
      } catch (error) {
        console.log(error, 32);
        return handleError(error);
      }
    });

    this.ipcMain.handle("synchronize-contact", async () => {
      try {
        await this.contactService.synchronizeContact({});
        return {
          statusCode: 200,
          message: "Success synchronize contacts",
        };
      } catch (error) {
        return handleError(error);
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
        return handleError(error);
      }
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
      try {
        await this.contactService.createContact(values);
        return { statusCode: 200, message: "Success create contact" };
      } catch (error) {
        return handleError(error);
      }
    });

    this.ipcMain.handle("delete-contact", async (event, values) => {
      try {
        const { data } = await this.contactService.deleteContact(values.id);
        return {
          statusCode: 200,
          message: "Success delete contacts",
          data,
        };
      } catch (error) {
        return handleError(error);
      }
    });
  }
}
