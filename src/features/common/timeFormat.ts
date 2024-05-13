
export const timeFormat = (t: number): string => {
    const newMinutes = getMinutes(t)
    const newSeconds = getSeconds(t)
    const newMilliseconds = getMilliseconds(t)


    return `${ newMinutes < 10 ? "0" : ""}${newMinutes}:${newSeconds < 10 ? "0" : ""}${newSeconds}:${newMilliseconds < 10 ? "0" : ""}${newMilliseconds}`
}


export const getMinutes=(_t:number)=>Math.floor((_t % (1000 * 60 * 60)) / (1000 * 60));
export const getSeconds=(_t:number)=>Math.floor((_t % (1000 * 60)) / 1000);
export const getMilliseconds=(_t:number)=>Math.floor((_t % (1000)) / 100);