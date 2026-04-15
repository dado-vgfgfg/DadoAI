import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;
const dataDir = app.getPath('userData');
const dbPath = path.join(dataDir, 'fweb-studio.db');
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(dbPath);
db.exec(`
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  payload TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
`);

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 720,
    backgroundColor: '#0b1020',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  ipcMain.handle('projects:list', () => {
    const rows = db.prepare('SELECT * FROM projects ORDER BY updatedAt DESC').all();
    return rows.map((row) => ({ ...row, payload: JSON.parse(row.payload) }));
  });

  ipcMain.handle('projects:save', (_, project) => {
    db.prepare(`
      INSERT INTO projects (id, type, name, payload, updatedAt)
      VALUES (@id, @type, @name, @payload, @updatedAt)
      ON CONFLICT(id) DO UPDATE SET
        type = excluded.type,
        name = excluded.name,
        payload = excluded.payload,
        updatedAt = excluded.updatedAt
    `).run({
      ...project,
      payload: JSON.stringify(project.payload)
    });
    return true;
  });

  ipcMain.handle('projects:export', async (_, { filename, content }) => {
    const result = await dialog.showSaveDialog({
      title: 'Export File',
      defaultPath: filename
    });

    if (result.canceled || !result.filePath) return null;
    fs.writeFileSync(result.filePath, content);
    return result.filePath;
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
