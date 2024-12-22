// store/counterStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CounterState {
  count: number;
  increment: () => void;
  hydrate: (initialCount:number) => void;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      hydrate: (initialCount) => set({count:initialCount})
    }),
    {
      name: 'counter-storage', // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);
