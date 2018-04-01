const electron = require('electron');
const path = require('path');
const url = require('url');

// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({});
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'Themes',
    submenu: [
      {
        label: 'Default',
        accelerator:process.platform == 'darwin' ? 'Command+0' : 'Ctrl+0',
        click(){
          //app.(); CHANGE THEME 0 HERE 
        }
      },
      {
        label: 'Vapourwave',
        accelerator:process.platform == 'darwin' ? 'Command+1' : 'Ctrl+1',
        click(){
          //app.(); CHANGE THEME 1 HERE
        }
      },
      {
        label: 'Cozy Breeze',
        accelerator:process.platform == 'darwin' ? 'Command+2' : 'Ctrl+2',
        click(){
          //app.(); CHANGE THEME 2 HERE 
        }
      },
      {
        label: 'Office',
        accelerator:process.platform == 'darwin' ? 'Command+3' : 'Ctrl+3',
        click(){
          //app.(); CHANGE THEME 3 HERE 
        }
      },
    {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}