export const useDict = (set: any) => ({
    dict: [],
    isStart:false,
    isBG:true,
    setBG: (isBG: boolean) => set({isBG}),
})