

export const getBG = (BG:string[]): string => {

    const randomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
    return  randomItem(BG);
}
