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
        width: 750, 
        height: 750, 
        show: false, 
        icon: path.join(__dirname, 'assets/icons/png/heart.png')
    /* backgroundColor: '07928d'*/});
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    
    // Dev Tools: Open's chrome V8 dev tools on open
    // mainWindow.webContents.openDevTools();
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    
    mainWindow.on('closed', () => {
        // Dereference mainWindow variable and allow for garbage collection to occur
        mainWindow = null;
    })

}

// app event controls; for typical functionality on opening/closing 
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
      createWindow()
    }
})



