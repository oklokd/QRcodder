import { useApp } from '../context/AppContext';

const Header = ({ title, onBack }) => {
    const { t } = useApp();

    return (
        <div className="header-bar">
            <h2 className="header-title">{title}</h2>
            <button className="text-link back-link" onClick={onBack}>
                {t('back')}
            </button>
        </div>
    );
};

export default Header;