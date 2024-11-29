import { Tray, Menu, app, BrowserWindow, ipcMain } from 'electron'

// Menu.setApplicationMenu(null)

if (process.platform === 'win32') {
    app.commandLine.appendSwitch('high-dpi-support', 'true');
    app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

let tray

app.whenReady().then(() => {

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        },
        alwaysOnTop: true,
        transparent: true,
        frame: false,
        skipTaskbar: true,
    })
    win.setIgnoreMouseEvents(true, { forward: true });
    win.maximize();

    // win.webContents.openDevTools()

    ipcMain.on('enable-mouse', (e, flag) => {
        win.setIgnoreMouseEvents(!flag, { forward: true });
    })

    tray = new Tray('./favicon.ico');
    let menu:any = [
        {
            label: '退出',
            role: 'quit'
        }
    ];
    menu = Menu.buildFromTemplate(menu);
    tray.setContextMenu(menu);
    tray.setToolTip('桌面live2d');


    if (process.argv[2]) {
        win.loadURL(process.argv[2])
    } else {
        win.loadFile('index.html')
    }
})
