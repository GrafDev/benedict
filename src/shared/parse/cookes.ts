import cookie from 'react-cookies'

export function setCookie(name: string, token: string, expirationDate: Date): void {
    //сократи токен на два первых символа
    cookie.save(name, token, {
        path: '/',
        secure: true, // Enable secure cookies for HTTPS
        sameSite: 'strict', // Restrict cookie access to the same-origin site
        expires: expirationDate,
    });
}

export function getCookie(name: string): string | undefined {
    return cookie.load(name);
}


export function deleteCookie(name: string): void {
    cookie.remove(name, {path: '/'})
}