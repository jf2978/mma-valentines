const electron = require('electron');
const path = require('path');
const app = electron.app; // controls application events
const BrowserWindow = electron.BrowserWindow; // creates and controls the window

let mainWindow;

app.on('ready', createWindow);

// function that generates application window
function createWindow(){
    // Creates new window + loads associated index.html
    mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden', 
        width: 1281,
        height: 800,
        minwidth: 1281,
        minHeight: 800, 
        show: false, 
        icon: path.join(__dirname, 'assets/icons/png/heart.png')});
        webPreferences: {
            nodeIntegration:false
        }
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    
    // Dev Tools: Open's chrome V8 dev tools on open
    // mainWindow.webContents.openDevTools();

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        })

    mainWindow.on('closed', () => {
        // Dereference mainWindow variable and allow for garbage collection to occur
        mainWindow = null;
        })
    require('./menu/mainmenu.js');
}

app.on('ready', createWindow);

// app event controls; for typical functionality on opening/closing 
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit();
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
      createWindow()
    }
})

