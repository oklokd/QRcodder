import { useApp } from '../context/AppContext';

const Home = ({ onNavigate }) => {
    const { t } = useApp();

    return (
        <div className="home-container">
            <h1 className="app-title">QRcodder</h1>
            <div className="menu-grid">
                <button className="button menu-btn" onClick={() => onNavigate('generate')}>
                    {t('btn_generate')}
                </button>
                <button className="button menu-btn" onClick={() => onNavigate('scan')}>
                    {t('btn_scan')}
                </button>
                <button className="button menu-btn" onClick={() => onNavigate('upload')}>
                    {t('btn_upload')}
                </button>
                <button className="button menu-btn" onClick={() => onNavigate('history-gen')}>
                    {t('btn_history_gen')}
                </button>
                <button className="button menu-btn" onClick={() => onNavigate('history-scan')}>
                    {t('btn_history_scan')}
                </button>
            </div>
        </div>
    );
};

export default Home;