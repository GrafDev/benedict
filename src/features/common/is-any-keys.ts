
export function isPrintableKey(key: string): boolean {
    const printableRegex = /^[ -~]+$/;
    return printableRegex.test(key);
}