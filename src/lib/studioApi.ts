import { StudioProject } from '../types';

declare global {
  interface Window {
    studioApi: {
      listProjects: () => Promise<StudioProject[]>;
      saveProject: (project: StudioProject) => Promise<boolean>;
      exportFile: (payload: { filename: string; content: string | Uint8Array }) => Promise<string | null>;
    };
  }
}

export const studioApi = window.studioApi;
