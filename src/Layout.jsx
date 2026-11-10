import { useState } from 'react';
import QrCodeGenerator from './QrCodeGenerator.jsx';
import QrCodeScanner from './QrCodeScanner.jsx';
import './qrCodeGenerator.css';

const Layout = () => {
    const [sharedText, setSharedText] = useState('');

    return (
        <div className="app-layout">
            <QrCodeGenerator externalValue={sharedText} />
            <QrCodeScanner onScanned={(text) => setSharedText(text)} />
        </div>
    );
};

export default Layout;