import { useState, useEffect } from "react";

const useCookie = (name: string): string | null => {
    const [cookieValue, setCookieValue] = useState<string | null>(null);

    useEffect(() => {
        const getCookie = (name: string): string | null => {
            const cookieString = document.cookie;
            const cookies = cookieString.split("; ");

            for (const cookie of cookies) {
                const [cookieName, cookieValue] = cookie.split("=");
                if (cookieName === name) {
                    return cookieValue;
                }
            }

            return null;
        };

        setCookieValue(getCookie(name));
    }, [name]);

    return cookieValue;
};

export default useCookie;