import { useState } from 'react';
import { useApp } from '../context/AppContext';
import QRCode from 'react-qr-code';
import { downloadQrAsPng } from '../utils/qrUtils';
import './HistoryList.css';

const HistoryList = ({ items, onClear, type }) => {
    const { t } = useApp();
    const [expandedId, setExpandedId] = useState(null);

    const handleDownload = (e, text) => {
        const wrapper = e.target.closest('.history-item');
        const svg = wrapper?.querySelector('svg');
        if (svg) {
            downloadQrAsPng(svg, `qrcode_${Date.now()}.png`);
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(prev => prev === id ? null : id);
    };

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
                    items.map(item => {
                        const isExpanded = expandedId === item.id;
                        return (
                            <div key={item.id} className="history-item">
                                {type === 'gen' && (
                                    <div 
                                        className={`history-qr-wrapper ${isExpanded ? 'expanded' : ''}`}
                                        onClick={() => toggleExpand(item.id)}
                                    >
                                        <QRCode
                                            size={isExpanded ? 200 : 80}
                                            viewBox={`0 0 ${isExpanded ? 200 : 80} ${isExpanded ? 200 : 80}`}
                                            value={item.text}
                                            fgColor="#305d55"
                                            bgColor="#ffffff"
                                        />
                                    </div>
                                )}
                                <p className="history-text">{item.text}</p>
                                <span className="history-date">{item.date}</span>
                                {type === 'gen' && (
                                    <button 
                                        className="button download-btn-small" 
                                        onClick={(e) => handleDownload(e, item.text)}
                                    >
                                        {t('btn_download')}
                                    </button>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default HistoryList;