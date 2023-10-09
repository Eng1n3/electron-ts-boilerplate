import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => "pong",
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("contact", {
  synchronizeContact: () => ipcRenderer.invoke("synchronize-contact"),
  deleteContact: (value: any) => ipcRenderer.invoke("delete-contact", value),
  updateContact: (value: any) => ipcRenderer.invoke("update-contact", value),
  getContact: () => ipcRenderer.invoke("get-contact"),
  getOneContact: (value: any) => ipcRenderer.invoke("get-one-contact", value),
  createContact: (value: any) => ipcRenderer.invoke("create-contact", value),
});
