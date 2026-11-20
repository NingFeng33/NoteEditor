const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1500,
        height: 950,
        minWidth: 1100,
        minHeight: 700,

        title: 'JOB NOTE EDITOR',

        icon: path.join(__dirname, 'job-note-editor.ico'),

        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // Load your existing HTML application
    win.loadFile(
        path.join(__dirname, 'job-note-editor_v1.1.html')
    );
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});