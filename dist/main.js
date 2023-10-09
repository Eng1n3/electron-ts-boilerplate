"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const contact_ipc_1 = require("./contact/contact.ipc");
const contactIpc = contact_ipc_1.ContactIpc.getInstance();
const isDev = process.env.NODE_ENV === "dev";
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload.js"),
            nodeIntegration: true,
            webSecurity: false,
        },
    });
    const startUrl = url_1.default.format({
        pathname: path_1.default.join(__dirname, "..", "app", "out", "index.html"),
        protocol: "file",
    });
    if (isDev) {
        win.webContents.openDevTools();
        win.loadURL(`http://localhost:${3000}`);
    }
    else {
        win.loadURL(startUrl);
    }
    return win;
}
(async () => {
    await electron_1.app.whenReady();
    const mainWindow = await createWindow();
    await contactIpc.getIpc();
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})();
electron_1.app.on("window-all-closed", async () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
