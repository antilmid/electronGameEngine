// 加载electron依赖
const electron = require('electron')
const {
  app,
  BrowserWindow
} = require('electron')
// 加载配置
const baseconfig = require("./config/base.config")
let mainWindow
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: baseconfig.windowWidth,
    height: baseconfig.windowHeight,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()
  electron.Menu.setApplicationMenu(baseconfig.menuSetConfig)

})