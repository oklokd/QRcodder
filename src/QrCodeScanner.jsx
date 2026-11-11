import { useState, useCallback, useMemo } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useApp } from './context/AppContext';
import './qrCodeScanner.css';

const settings = {
    audio: false,
    finder: false,
    zoom: false,
};

const styleSettings = {
    container: { width: '100%', height: '100%' },
    video: { objectFit: 'cover', width: '100%', height: '100%' }
};

const QrCodeScanner = ({ onViewHistory }) => {
    const { t, addScanHistory } = useApp();
    const [scanResult, setScanResult] = useState('');
    const [isPaused, setIsPaused] = useState(false);
    const [error, setError] = useState('');

    const scanHandler = useCallback((result) => {
        if (!result || !result[0] || isPaused) return;

        const scannedValue = result[0].rawValue;
        setScanResult(scannedValue);
        setIsPaused(true);
        addScanHistory(scannedValue);
    }, [isPaused, addScanHistory]);

    const handleResume = () => {
        setScanResult('');
        setError('');
        setIsPaused(false);
    };

    const handleError = useCallback((err) => {
        setError(t('scan_error'));
    }, [t]);

    const scannerComponents = useMemo(() => (
        <Scanner
            allowMultiple={false}
            components={settings}
            styles={styleSettings}
            onScan={scanHandler}
            onError={handleError}
            paused={isPaused}
            constraints={{ facingMode: 'environment' }}
        />
    ), [scanHandler, handleError, isPaused]);

    return (
        <div className="scanner-wrapper">
            <div className="scanner-video-box">
                {error ? (
                    <div className="scan-error">{error}</div>
                ) : (
                    scannerComponents
                )}
            </div>
            
            <div className="scan-result-box">
                {scanResult ? (
                    <>
                        <p className="scan-label">{t('result')}</p>
                        <p className="scan-value">{scanResult}</p>
                        <button className="button" onClick={handleResume}>
                            {t('btn_resume_scan')}
                        </button>
                    </>
                ) : (
                    <p className="scan-placeholder">
                        {error ? t('scan_no_access') : t('placeholder_scan')}
                    </p>
                )}
            </div>
            
            <button className="text-link" onClick={onViewHistory}>
                {t('btn_go_history')}
            </button>
        </div>
    );
};

export default QrCodeScanner;