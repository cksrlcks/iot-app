import React, { useState, createContext, useContext, useEffect } from 'react';
const LangContext = createContext();

export function LangProvider({ children }) {
    const [lang, setLang] = useState(getInitLang);

    useEffect(() => {
        localStorage.setItem('lang', JSON.stringify(lang));
    }, [lang]);

    function handleLang(lang) {
        setLang(lang);
    }

    return <LangContext.Provider value={{ lang, handleLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

function getInitLang() {
    const lang = localStorage.getItem('lang');
    return lang ? JSON.parse(lang) : 'ko';
}
