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

    // Ctrl+Shift+N in the app calls window.open(): give the new window the same look
    win.webContents.setWindowOpenHandler(() => ({
        action: 'allow',
        overrideBrowserWindowOptions: {
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
        }
    }));

    // Load your existing HTML application
    win.loadFile(
        path.join(__dirname, 'job-note-editor_v1.1.html')
    );
}

// Closing a window: reuse the page's own Save / Don't save / Cancel prompt (guard() in the HTML).
// Electron silently cancels a close blocked by beforeunload, so we intercept the close here instead.
app.on('browser-window-created', (_e, win) => {
    let closing = false;
    win.on('close', (e) => {
        if (closing) return;
        e.preventDefault();
        win.webContents
            .executeJavaScript('guard().then(ok => { if (ok) dirty = false; return ok; })')
            .catch(() => true) // page not ready or script error: allow the close
            .then((ok) => {
                if (ok && !win.isDestroyed()) {
                    closing = true;
                    win.close();
                }
            });
    });
});

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