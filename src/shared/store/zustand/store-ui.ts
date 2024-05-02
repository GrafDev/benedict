import {create} from "zustand";
import {IUIStore} from "../../types.ts";
import {getBG} from "../../../features/common";

export const useUI = create<IUIStore>((set) => ({
    isBG: true,
    linkBG:"none",
    setLinkBG: (BG: string[]) => set({linkBG:getBG(BG)}),
    toggleBG: (_isBG: boolean) => set({isBG: _isBG}),
    mainColor: {dark: "gray.900", light: "gray.100"},
    backgroundColor: {dark: "gray.800", light: "gray.50"},
}))