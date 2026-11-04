import { create } from 'zustand';
import { defaultLevels } from './data/levels';
import { loadProgress, loadCustomLevels } from './utils/progress';
import type { Level, Progress } from './types';

interface State {
  view: 'home' | 'game' | 'teacher';
  selectedLevelId: string | null;
  levels: Level[];
  progress: Record<string, Progress>;
  setView: (v: State['view']) => void;
  selectLevel: (id: string) => void;
  setLevels: (l: Level[]) => void;
  setProgress: (p: Record<string, Progress>) => void;
  updateProgress: (id: string, p: Progress) => void;
}

export const useStore = create<State>((set, get) => ({
  view: 'home',
  selectedLevelId: null,
  levels: [...defaultLevels, ...loadCustomLevels()],
  progress: loadProgress(),
  setView: (v) => set({ view: v }),
  selectLevel: (id) => set({ selectedLevelId: id, view: 'game' }),
  setLevels: (l) => set({ levels: l }),
  setProgress: (p) => set({ progress: p }),
  updateProgress: (id, p) => {
    const next = { ...get().progress, [id]: p };
    set({ progress: next });
  },
}));
