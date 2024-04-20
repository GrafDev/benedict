
export const timeFormat = (t: number): string => {
    const newSeconds = Math.floor((t % (1000 * 60)) / 1000);
    const newMilliseconds = Math.floor((t % (1000)) / 100);

    return `${newSeconds < 10 ? "0" : ""}${newSeconds}:${newMilliseconds < 10 ? "0" : ""}${newMilliseconds}`
}
