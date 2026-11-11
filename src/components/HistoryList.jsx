import { useApp } from '../context/AppContext';
import { copyToClipboard } from '../utils/qrUtils';

const HistoryList = ({ items, onClear }) => {
    const { t } = useApp();

    return (
        <div className="history-container">
            {items.length > 0 && (
                <button className="button clear-btn" onClick={onClear}>
                    {t('btn_clear')}
                </button>
            )}
            <div className="history-list">
                {items.length === 0 ? (
                    <p className="history-empty">{t('placeholder_history')}</p>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="history-item">
                            <p className="history-text">{item.text}</p>
                            <span className="history-date">{item.date}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HistoryList;