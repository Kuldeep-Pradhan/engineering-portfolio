import { create } from 'zustand';

interface AppState {
  isVideoReady: boolean;
  setVideoReady: (ready: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isVideoReady: false,
  setVideoReady: (ready) => set({ isVideoReady: ready }),
}));
