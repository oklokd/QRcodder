import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'ru');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [historyGen, setHistoryGen] = useState(() => JSON.parse(localStorage.getItem('historyGen')) || []);
    const [historyScan, setHistoryScan] = useState(() => JSON.parse(localStorage.getItem('historyScan')) || []);

    useEffect(() => {
        localStorage.setItem('lang', lang);
        localStorage.setItem('theme', theme);
        localStorage.setItem('historyGen', JSON.stringify(historyGen));
        localStorage.setItem('historyScan', JSON.stringify(historyScan));
        document.documentElement.setAttribute('data-theme', theme);
    }, [lang, theme, historyGen, historyScan]);

    const t = (key) => translations[lang][key] || key;

    const toggleLang = () => setLang(prev => prev === 'ru' ? 'en' : 'ru');
    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    const addGenHistory = (text) => {
        setHistoryGen(prev => [{ id: Date.now(), text, date: new Date().toLocaleString() }, ...prev].slice(0, 50));
    };

    const addScanHistory = (text) => {
        setHistoryScan(prev => [{ id: Date.now(), text, date: new Date().toLocaleString() }, ...prev].slice(0, 50));
    };

    const clearHistory = (type) => {
        if (type === 'gen') setHistoryGen([]);
        if (type === 'scan') setHistoryScan([]);
    };

    return (
        <AppContext.Provider value={{
            lang, theme, t, toggleLang, toggleTheme,
            historyGen, historyScan, addGenHistory, addScanHistory, clearHistory
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
