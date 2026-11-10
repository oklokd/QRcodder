import { useState, useCallback, useMemo } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const settings = {
    audio: false,
    finder: false,
    zoom: false,
};

const styleSettings = {
    container: {
        width: '100%',
        height: '100%',
    },
    video: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
    }
};

const QrCodeScanner = ({ onScanned }) => {
    const [scanResult, setScanResult] = useState('');
    const [isPaused, setIsPaused] = useState(false);
    const [error, setError] = useState('');

    const scanHandler = useCallback((result) => {
        if (!result || !result[0] || isPaused) return;

        const scannedValue = result[0].rawValue;
        setScanResult(scannedValue);
        setIsPaused(true);
        
        if (onScanned) {
            onScanned(scannedValue);
        }
    }, [isPaused, onScanned]);

    const handleResume = () => {
        setScanResult('');
        setError('');
        setIsPaused(false);
    };

    const handleError = useCallback((err) => {
        setError('Ошибка доступа к камере. Разрешите доступ в браузере.');
        console.log(err?.message);
    }, []);

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
                        <p className="scan-label">Результат:</p>
                        <p className="scan-value">{scanResult}</p>
                        <button className="button" onClick={handleResume}>
                            Сканировать еще
                        </button>
                    </>
                ) : (
                    <p className="scan-placeholder">
                        {error ? "Нет доступа к камере" : "Наведите камеру на QR-код"}
                    </p>
                )}
            </div>
        </div>
    );
};

export default QrCodeScanner;