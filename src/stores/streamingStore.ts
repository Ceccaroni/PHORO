import { create } from "zustand";

interface StreamingState {
  isStreaming: boolean;
  setStreaming: (streaming: boolean) => void;
}

export const useStreamingStore = create<StreamingState>((set) => ({
  isStreaming: false,
  setStreaming: (streaming) => set({ isStreaming: streaming }),
}));
