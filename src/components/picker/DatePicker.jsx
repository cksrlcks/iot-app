import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Datepicker } from 'vanillajs-datepicker';
import ko from 'vanillajs-datepicker/locales/ko';
import { formatDate } from '../../lib/date';
import Button from '../button/Button';

export default function DatePicker({ value, onChange }) {
    const [datepicker, setDatepicker] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const modalRef = useRef(null);
    const modalRoot = document.getElementById('modal');

    useEffect(() => {
        if (modalRef.current && !datepicker) {
            Object.assign(Datepicker.locales, ko);
            setDatepicker(
                new Datepicker(modalRef.current, {
                    language: 'ko',
                    todayBtn: true,
                    todayBtnMode: 1,
                    beforeShowDay: function (date) {
                        //데이터 비교해서 있는 날짜에 표시해주기
                    },
                })
            );
        }

        return () => {
            if (isOpen && datepicker) {
                setDatepicker(null);
                datepicker?.destroy();
            }
        };
    }, [isOpen, datepicker]);

    useEffect(() => {
        if (datepicker && modalRef.current) {
            datepicker.setDate(new Date(inputRef.current.value));
            modalRef.current.addEventListener('changeDate', () => {
                setIsOpen(false);
                onChange(formatDate(datepicker.getDate()));
            });
        }
    }, [datepicker, onChange]);

    const handlePicker = (e) => {
        setIsOpen(true);
    };

    const handleDate = (amount) => {
        const newDate = new Date(value);
        newDate.setDate(newDate.getDate() + amount);
        onChange(formatDate(newDate));
    };

    return (
        <>
            <div className="input-wrapper full">
                <button type="button" className="arrow" onClick={() => handleDate(-1)}>
                    <i className="ri-arrow-drop-left-line icon"></i>
                </button>
                <div className="input-date" onClick={handlePicker}>
                    <input type="text" ref={inputRef} value={value} onChange={onChange} readOnly />
                </div>
                <button type="button" className="arrow" onClick={() => handleDate(1)}>
                    <i className="ri-arrow-drop-right-line icon"></i>
                </button>
            </div>
            {isOpen &&
                createPortal(
                    <div className="modal-datepicker" onClick={() => setIsOpen(false)}>
                        <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
                            <div className="datepicker-wrapper" ref={modalRef}></div>
                            <Button label="닫기" color="white" onClick={() => setIsOpen(false)} />
                        </div>
                    </div>,
                    modalRoot
                )}
        </>
    );
}
