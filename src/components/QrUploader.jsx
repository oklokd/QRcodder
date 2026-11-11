import { useState, useRef } from 'react';
import jsQR from 'jsqr';
import { useApp } from '../context/AppContext';
import Header from './Header';
import './QrUploader.css';

const QrUploader = ({ onBack }) => {
    const { t, addScanHistory } = useApp();
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    setResult(code.data);
                    addScanHistory(code.data);
                    setError('');
                } else {
                    setError('QR code not found');
                    setResult('');
                }
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <Header title={t('upload_title')} onBack={onBack} />
            <div className="upload-container">
                <div 
                    className="upload-box" 
                    onClick={() => fileInputRef.current?.click()}
                >
                    {error ? (
                        <p className="scan-error-text">{error}</p>
                    ) : result ? (
                        <p className="scan-value">{result}</p>
                    ) : (
                        <p className="upload-placeholder">{t('placeholder_upload')}</p>
                    )}
                    <input 
                        type="file" 
                        accept="image/*" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                    />
                </div>
            </div>
        </>
    );
};

export default QrUploader;