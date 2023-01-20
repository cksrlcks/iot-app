import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Logo from '../../assets/img/common/logo-black.svg';
export default function Language() {
    const [isOpen, setIsOpen] = useState(false);
    const handleLanguage = () => {
        setIsOpen(false);
    };
    return (
        <div className="lang-header">
            <div className="lang-logo">
                <img src={Logo} alt="4GUARD" />
            </div>
            <button type="button" className="lang-select" onClick={() => setIsOpen(true)}>
                <i className="ri-global-line icon"></i>
                <span>KOR</span>
            </button>
            <CSSTransition in={isOpen} classNames="modal" timeout={200} unmountOnExit>
                <LanguageModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    handleLanguage={handleLanguage}
                />
            </CSSTransition>
        </div>
    );
}

function LanguageModal({ handleLanguage, setIsOpen }) {
    const modalRoot = document.getElementById('modal');
    return createPortal(
        <div className="common-modal fit" onClick={() => setIsOpen(false)}>
            <div className="modal-inner">
                <div className="modal-page" onClick={(e) => e.stopPropagation()}>
                    <ul className="option-list">
                        <li>
                            <button type="button" onClick={handleLanguage}>
                                4GUARD-국문(KOR)
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick={handleLanguage}>
                                4GUARD-영문(ENG)
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>,
        modalRoot
    );
}
