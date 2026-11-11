import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Home from './pages/Home';
import QrCodeGenerator from './QrCodeGenerator';
import QrCodeScanner from './QrCodeScanner';
import QrUploader from './components/QrUploader';
import Header from './components/Header';
import HistoryList from './components/HistoryList';
import './App.css';

const MainApp = () => {
    const [page, setPage] = useState('home');
    const { lang, theme, t, toggleLang, toggleTheme, historyGen, historyScan, clearHistory } = useApp();

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <Home onNavigate={setPage} />;
            case 'generate':
                return (
                    <>
                        <Header title={t('generate_title')} onBack={() => setPage('home')} />
                        <QrCodeGenerator externalValue="" onViewHistory={() => setPage('history-gen')} />
                    </>
                );
            case 'scan':
                return (
                    <>
                        <Header title={t('scan_title')} onBack={() => setPage('home')} />
                        <QrCodeScanner onViewHistory={() => setPage('history-scan')} />
                    </>
                );
            case 'upload':
                return <QrUploader onBack={() => setPage('home')} />;
            case 'history-gen':
                return (
                    <>
                        <Header title={t('history_gen_title')} onBack={() => setPage('home')} />
                        <HistoryList items={historyGen} onClear={() => clearHistory('gen')} type="gen" />
                    </>
                );
            case 'history-scan':
                return (
                    <>
                        <Header title={t('history_scan_title')} onBack={() => setPage('home')} />
                        <HistoryList items={historyScan} onClear={() => clearHistory('scan')} type="scan" />
                    </>
                );
            default:
                return <Home onNavigate={setPage} />;
        }
    };

    return (
        <div className="app-wrapper">
            <div className="global-controls">
                <button className="button control-btn" onClick={toggleLang}>
                    {lang.toUpperCase()}
                </button>
                <button className="button control-btn" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
            {renderPage()}
        </div>
    );
};

const App = () => {
    return (
        <AppProvider>
            <MainApp />
        </AppProvider>
    );
};

export default App;