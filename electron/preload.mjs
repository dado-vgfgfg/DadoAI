import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('studioApi', {
  listProjects: () => ipcRenderer.invoke('projects:list'),
  saveProject: (project) => ipcRenderer.invoke('projects:save', project),
  exportFile: (payload) => ipcRenderer.invoke('projects:export', payload)
});
