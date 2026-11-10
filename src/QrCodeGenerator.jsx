import QRCode from "react-qr-code";
import { useState, useCallback, memo } from "react";
import { useIsMobile } from "./useIsMobile";
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

const QrCodeGenerator = ({ externalValue }) => {
    const [localValue, setLocalValue] = useState(null);
    const [result, setResult] = useState('');
    const isMobile = useIsMobile();

    const value = localValue !== null ? localValue : (externalValue || '');

    const onClickHandler = useCallback(() => {
        if (!value.trim()) return;
        setResult(value);
        setLocalValue('');
    }, [value]);

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

    return (
        <div className="qr-code-generator">
            <div className="qr-code-wrapper">
                {result !== '' ? (
                    <QrDisplay value={result} />
                ) : (
                    <div className="qr-placeholder">
                        QR появится здесь
                    </div>
                )}
            </div>

            <input
                type="text"
                className="input"
                placeholder={isMobile ? "Текст для QR" : "Input text to generate QR code"}
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
                <span className="label-full" aria-hidden="true">Generate QR</span>
                <span className="label-short" aria-hidden="true">QR</span>
            </button>
        </div>
    );
};

export default QrCodeGenerator;