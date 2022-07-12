/*
 * @Author: DragonL
 * @Date: 2022-06-10 16:15:39
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-28 16:51:43
 * @Description: 
 */
import { app, BrowserWindow, shell, ipcMain, desktopCapturer } from 'electron'
import { release } from 'os'
// import { getScreenStream } from "./util"
import { join } from 'path'
const robot = require("robotjs")
// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()
console.warn(process.versions.node, "node")
// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null




async function createWindow() {
  const { screen } = require('electron')
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  win = new BrowserWindow({
    title: 'Main window',
    width: 400,
    height: 400,
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      nodeIntegration: true,
      // webSecurity: false,
      // enableRemoteModule:true,
      // enableRemoteModule: true,
      contextIsolation: false,
    },
  })

  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../renderer/index.html'))

  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    // const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
    const url = `http://localhost:${process.env['VITE_DEV_SERVER_PORT']}`
    win.loadURL(url)

    // win.webContents.openDevTools()
  }

  win?.webContents.on('did-start-loading', async () => {

  })
  win?.webContents.on('dom-ready', async () => {
    console.log("dom-ready")

    //一个框架中的文本加载完成后触发该事件。
  })
  // Test active push message to Renderer-process
  win?.webContents.on('did-finish-load', async () => {
    const sources = await desktopCapturer.getSources({ types: ["screen"] });
    // for (let source of sources) {
    console.warn(win?.webContents.send)
    win?.webContents.send('SET_SOURCE', sources[0].id)
    // }
    win?.webContents.send('main-process-message', process.versions)
  })
  // Make all links open with the browser, not with the application
  // win.webContents.setWindowOpenHandler(({ url }) => {
  //   console.warn(url,"url")
  //   if (url.startsWith('https:')) shell.openExternal(url)
  //   return { action: 'deny' }
  // })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  console.warn(1)
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }

})

// new window example arg: new windows url
// ipcMain.handle("open-win", (event, arg) => {
//   console.warn('open-win')
//   const childWindow = new BrowserWindow({
//     webPreferences: {
//       preload: join(__dirname, "../preload/index.cjs"),
//     },
//   });

//   if (app.isPackaged) {
//     childWindow.loadFile(join(__dirname, `../renderer/index.html`), {
//       hash: `${arg}`,
//     })
//   } else {
//     // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
//     // const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}/#${arg}`
//     const url = `http://localhost:${process.env['VITE_DEV_SERVER_PORT']}`
//     childWindow.loadURL(url);
//     // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
//   }
// });

ipcMain.on("robot", (event, arg) => {
  console.warn(arg)
  let { x, y, type } = arg
  robot.moveMouse(x, y)
  if (type === "click") {
    robot.mouseClick()
  }
})

ipcMain.on("open_new_win", (event, arg) => {
  const win = new BrowserWindow({
    title: 'Main window',
    width: 800,
    height: 400,
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      nodeIntegration: true,
      webSecurity: false,
      // enableRemoteModule: true,
      contextIsolation: false,
    },
  })

  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../renderer/index.html'))

  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
    // const url = `http://localhost:${process.env['VITE_DEV_SERVER_PORT']}`

    win.loadURL(url)
  }
  win?.webContents.on('did-finish-load', async () => {
    const sources = await desktopCapturer.getSources({ types: ["screen"], thumbnailSize: { width: 0, height: 0 } });
    // for (let source of sources) {
    // console.warn(win?.webContents.send)
    win?.webContents.send('SET_SOURCE', sources[0].id)
    // }
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })
});



