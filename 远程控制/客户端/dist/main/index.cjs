"use strict";
var electron = require("electron");
var os = require("os");
var path = require("path");
const robot = require("robotjs");
if (os.release().startsWith("6.1"))
  electron.app.disableHardwareAcceleration();
console.warn(process.versions.node, "node");
if (process.platform === "win32")
  electron.app.setAppUserModelId(electron.app.getName());
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
let win = null;
async function createWindow() {
  const { screen } = require("electron");
  const primaryDisplay = screen.getPrimaryDisplay();
  primaryDisplay.workAreaSize;
  win = new electron.BrowserWindow({
    title: "Main window",
    width: 400,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.cjs"),
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (electron.app.isPackaged) {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  } else {
    const url = `http://localhost:${process.env["VITE_DEV_SERVER_PORT"]}`;
    win.loadURL(url);
  }
  win == null ? void 0 : win.webContents.on("did-start-loading", async () => {
  });
  win == null ? void 0 : win.webContents.on("dom-ready", async () => {
    console.log("dom-ready");
  });
  win == null ? void 0 : win.webContents.on("did-finish-load", async () => {
    const sources = await electron.desktopCapturer.getSources({ types: ["screen"] });
    console.warn(win == null ? void 0 : win.webContents.send);
    win == null ? void 0 : win.webContents.send("SET_SOURCE", sources[0].id);
    win == null ? void 0 : win.webContents.send("main-process-message", process.versions);
  });
}
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin")
    electron.app.quit();
});
electron.app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized())
      win.restore();
    win.focus();
  }
});
electron.app.on("activate", () => {
  const allWindows = electron.BrowserWindow.getAllWindows();
  console.warn(1);
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
electron.ipcMain.on("robot", (event, arg) => {
  console.warn(arg);
  let { x, y, type } = arg;
  robot.moveMouse(x, y);
  if (type === "click") {
    robot.mouseClick();
  }
});
electron.ipcMain.on("open_new_win", (event, arg) => {
  const win2 = new electron.BrowserWindow({
    title: "Main window",
    width: 800,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.cjs"),
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false
    }
  });
  if (electron.app.isPackaged) {
    win2.loadFile(path.join(__dirname, "../renderer/index.html"));
  } else {
    const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;
    win2.loadURL(url);
  }
  win2 == null ? void 0 : win2.webContents.on("did-finish-load", async () => {
    const sources = await electron.desktopCapturer.getSources({ types: ["screen"], thumbnailSize: { width: 0, height: 0 } });
    win2 == null ? void 0 : win2.webContents.send("SET_SOURCE", sources[0].id);
    win2 == null ? void 0 : win2.webContents.send("main-process-message", new Date().toLocaleString());
  });
});
//# sourceMappingURL=index.cjs.map
