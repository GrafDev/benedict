import {create} from "zustand";
import {IUIStore} from "../../types.ts";
import {getBG} from "../../../features/common";

export const useUI = create<IUIStore>((set, get) => ({
    isBG: false,
    linkBG:"none",
    setLinkBG: (BG: string[]) => set({linkBG:getBG(BG)}),
    toggleBG: () => set({isBG: !get().isBG}),
    mainColor: {dark: "gray.900", light: "gray.100"},
    backgroundColor: {dark: "gray.800", light: "gray.50"},
}))