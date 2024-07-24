import {create} from "zustand";
import {ITimerStore} from "../../types/timer-types.ts";

export const useTimer = create<ITimerStore>((set, get) => ({
    startTime: 0,
    elapsedTime: 0,
    getStartTime: (): number => get().startTime,
    setStartTime: () => set({
        elapsedTime: new Date().getTime() - get().startTime,
        startTime:new Date().getTime(),
    }),
}))