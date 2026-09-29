import { create } from 'zustand';

interface AppState {
    step: number; setStep: (s: number) => void;
    event: string; setEvent: (e: string) => void;
    garment: string; setGarment: (g: string) => void;
    styleTag: string; setStyleTag: (s: string) => void;
    remixLevel: number; setRemixLevel: (l: number) => void;
    aiResults: any; setAiResults: (r: any) => void;
    loading: boolean; setLoading: (l: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    step: 1, setStep: (s) => set({ step: s }),
    event: "", setEvent: (e) => set({ event: e }),
    garment: "", setGarment: (g) => set({ garment: g }),
    styleTag: "Tối giản", setStyleTag: (s) => set({ styleTag: s }),
    remixLevel: 50, setRemixLevel: (l) => set({ remixLevel: l }),
    aiResults: null, setAiResults: (r) => set({ aiResults: r }),
    loading: false, setLoading: (l) => set({ loading: l })
}));
