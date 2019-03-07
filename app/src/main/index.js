'use strict'

import { app, BrowserWindow, Menu } from 'electron'
import electron from 'electron'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

const path = require('path')
const nativeImage = electron.nativeImage
const iconPath = path.join(__dirname, 'icons', 'icon.ico')
const icon = nativeImage.createFromPath(iconPath)

console.log(iconPath)
console.log(icon)

app.commandLine.appendSwitch('disable-web-security');

const template = [{
  label: "Edit",
  submenu: [
    { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
    { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
    { type: "separator" },
    { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
    { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
    { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
    { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
  ]}
]


function createWindow () {
  /**
   * Initial window options
   */
  console.log('dirname: ' + __dirname)
  mainWindow = new BrowserWindow({
    backgroundColor: '#fff',
    height: 600,
    width: 800,
    resizable: true,
    icon: icon,
    "node-integration": "iframe",
    "web-preferences": {
      "web-security": false
    }
  })

  // mainWindow.webContents.openDevTools();
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
