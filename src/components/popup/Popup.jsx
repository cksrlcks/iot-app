import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';

export default function Popup({ data, type }) {
    const modalRoot = document.getElementById('modal');
    const [open, setOpen] = useState(false);
    const HAS_VISITED_BEFORE = localStorage.getItem(`modal_${type}_visited`);

    useEffect(() => {
        const handleShowModal = () => {
            if (HAS_VISITED_BEFORE && HAS_VISITED_BEFORE > new Date()) {
                return;
            }

            if (!HAS_VISITED_BEFORE) {
                setOpen(true);
            }
        };

        window.setTimeout(handleShowModal, 500);
    }, [HAS_VISITED_BEFORE]);

    const handleOneDay = () => {
        let expires = new Date();
        expires = expires.setHours(expires.getHours() + 24);
        localStorage.setItem(`modal_${type}_visited`, expires);
        setOpen(false);
    };

    return (
        <CSSTransition in={open} classNames="modal" timeout={200} unmountOnExit>
            <Modal data={data} setOpen={setOpen} handleOneDay={handleOneDay} />
        </CSSTransition>
    );

    function Modal({ data, setOpen, handleOneDay }) {
        const createContent = () => {
            return { __html: data.content };
        };

        return createPortal(
            <div className="bottom-sheet popup" onClick={() => setOpen(false)}>
                {data && (
                    <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            <span className={`icon ${data.urgent ? 'urgent' : 'notice'}`}>
                                <i
                                    className={`${
                                        data.urgent ? 'ri-alarm-warning-fill' : 'ri-volume-up-fill'
                                    }`}
                                ></i>
                            </span>
                            <span className="title">{data.title}</span>
                            <span className="date">{data.date}</span>
                        </div>
                        <div className="popup-body">
                            <div
                                className="content pre-line"
                                data-body-scroll-lock-ignore
                                dangerouslySetInnerHTML={createContent()}
                            ></div>
                        </div>
                        <div className="popup-footer">
                            <button type="button" className="btn" onClick={handleOneDay}>
                                오늘 하루 닫기
                            </button>
                            <button type="button" className="btn" onClick={() => setOpen(false)}>
                                <i className="ri-close-fill icon"></i>
                                닫기
                            </button>
                        </div>
                    </div>
                )}
            </div>,
            modalRoot
        );
    }
}
