const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const fs = require("fs");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("./static/index.html");
  mainWindow.maximize(true);

  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on("sendFolderName", (event, data) => {
  if (data.includes(".")) {
    event.reply("sendFileInfo", data);
  } else {
    fs.readdir(data, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      let folders = [];

      data.forEach((el) => {
        if (el.slice(0, 1) !== ".") {
          el.includes(".") ? folders.push(el) : folders.push(el + "/");
        }
      });

      event.reply("sendFolderInfo", folders);
    });
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
