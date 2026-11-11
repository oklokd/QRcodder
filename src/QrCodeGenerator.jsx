import QRCode from "react-qr-code";
import { useState, useCallback, memo, useRef, useEffect } from "react";
import { useApp } from "./context/AppContext";
import { useIsMobile } from "./useIsMobile";
import { downloadQrAsPng } from "./utils/qrUtils";
import './qrCodeGenerator.css';

const MAX_LENGTH = 400;

const QrDisplay = memo(({ value }) => {
    return (
        <QRCode
            className="qr-code"
            size={256}
            viewBox="0 0 256 256"
            value={value}
            fgColor="#305d55"
            bgColor="#ffffff"
        />
    );
});

const QrCodeGenerator = ({ externalValue, onViewHistory }) => {
    const { t, addGenHistory } = useApp();
    const [localValue, setLocalValue] = useState(null);
    const [result, setResult] = useState('');
    const isMobile = useIsMobile();
    const wrapperRef = useRef(null);

    const value = localValue !== null ? localValue : (externalValue || '');

    useEffect(() => {
        if (externalValue) {
            setLocalValue(externalValue);
            setResult('');
        }
    }, [externalValue]);

    const onClickHandler = useCallback(() => {
        if (!value.trim()) return;
        setResult(value);
        addGenHistory(value);
        setLocalValue('');
    }, [value, addGenHistory]);

    const onChangeHandler = useCallback((event) => {
        const newValue = event.target.value;
        if (newValue.length <= MAX_LENGTH) {
            setLocalValue(newValue);
            setResult('');
        }
    }, []);

    const onKeyDownHandler = useCallback((event) => {
        if (event.key === 'Enter') {
            onClickHandler();
        }
    }, [onClickHandler]);

    const handleDownload = () => {
        const svg = wrapperRef.current?.querySelector('svg');
        if (svg) {
            downloadQrAsPng(svg, `qrcode_${Date.now()}.png`);
        }
    };

    return (
        <div className="qr-code-generator">
            <div className="qr-code-wrapper" ref={wrapperRef}>
                {result !== '' ? (
                    <QrDisplay value={result} />
                ) : (
                    <div className="qr-placeholder">
                        {t('placeholder_qr')}
                    </div>
                )}
            </div>

            <input
                type="text"
                className="input"
                placeholder={isMobile ? t('placeholder_input_mobile') : t('placeholder_input')}
                value={value}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />

            <button
                type="button"
                onClick={onClickHandler}
                className="button"
                aria-label="Generate QR code"
            >
                <span className="label-full">{t('btn_generate')}</span>
                <span className="label-short">QR</span>
            </button>

            {result !== '' && (
                <button className="button download-btn" onClick={handleDownload}>
                    {t('btn_download')}
                </button>
            )}

            <button className="text-link" onClick={onViewHistory}>
                {t('btn_go_history')}
            </button>
        </div>
    );
};

export default QrCodeGenerator;