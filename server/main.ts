import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import url from "url";
import { ContactIpc } from "./contact/contact.ipc";

const isDev: boolean = (process.env.NODE_ENV as string) === "dev";
const contactIpc = ContactIpc.getInstance();

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, "..", "app", "out", "index.html"),
    protocol: "file",
  });

  if (isDev) {
    win.webContents.openDevTools();
    win.loadURL(`http://localhost:${3000}`);
  } else {
    win.loadURL(startUrl);
  }

  return win;
}

(async () => {
  await app.whenReady();
  const mainWindow = await createWindow();
  await contactIpc.getIpc();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})();

app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
