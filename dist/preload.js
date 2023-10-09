"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => "pong",
    // we can also expose variables, not just functions
});
electron_1.contextBridge.exposeInMainWorld("contact", {
    deleteContact: (value) => electron_1.ipcRenderer.invoke("delete-contact", value),
    updateContact: (value) => electron_1.ipcRenderer.invoke("update-contact", value),
    getContact: () => electron_1.ipcRenderer.invoke("get-contact"),
    getOneContact: (value) => electron_1.ipcRenderer.invoke("get-one-contact", value),
    createContact: (value) => electron_1.ipcRenderer.invoke("create-contact", value),
});
