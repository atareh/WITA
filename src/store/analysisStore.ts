import { create } from 'zustand';

export interface Screenshot {
  id: string;
  file: File;
  preview: string;
  annotated?: string;
}

interface AnalysisState {
  screenshots: Screenshot[];
  leftSideName: string;
  rightSideName: string;
  context: string;
  currentStep: number;
  setScreenshots: (screenshots: Screenshot[]) => void;
  addScreenshots: (newScreenshots: Screenshot[]) => void;
  removeScreenshot: (id: string) => void;
  reorderScreenshots: (startIndex: number, endIndex: number) => void;
  setLeftSideName: (name: string) => void;
  setRightSideName: (name: string) => void;
  setContext: (context: string) => void;
  setCurrentStep: (step: number) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  screenshots: [],
  leftSideName: '',
  rightSideName: '',
  context: '',
  currentStep: 1,
  setScreenshots: (screenshots) => set({ screenshots }),
  addScreenshots: (newScreenshots) =>
    set((state) => ({
      screenshots: [...state.screenshots, ...newScreenshots],
    })),
  removeScreenshot: (id) =>
    set((state) => ({
      screenshots: state.screenshots.filter((s) => s.id !== id),
    })),
  reorderScreenshots: (startIndex, endIndex) =>
    set((state) => {
      const newScreenshots = Array.from(state.screenshots);
      const [removed] = newScreenshots.splice(startIndex, 1);
      newScreenshots.splice(endIndex, 0, removed);
      return { screenshots: newScreenshots };
    }),
  setLeftSideName: (name) => set({ leftSideName: name }),
  setRightSideName: (name) => set({ rightSideName: name }),
  setContext: (context) => set({ context }),
  setCurrentStep: (step) => set({ currentStep: step }),
  reset: () =>
    set({
      screenshots: [],
      leftSideName: '',
      rightSideName: '',
      context: '',
      currentStep: 1,
    }),
}));