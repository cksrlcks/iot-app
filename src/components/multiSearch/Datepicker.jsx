import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Datepicker } from 'vanillajs-datepicker';
import ko from 'vanillajs-datepicker/locales/ko';
import { formatDate } from '../../lib/date';
import Button from '../button/Button';

Object.assign(Datepicker.locales, ko);

export default function DatePicker({ label, value, onChange }) {
    const [datepicker, setDatepicker] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const modalRef = useRef(null);
    const modalRoot = document.getElementById('modal');

    useEffect(() => {
        if (modalRef.current && !datepicker) {
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

    return (
        <>
            <div className="search-unit" onClick={handlePicker}>
                <span className="unit-label">{label}</span>
                <div className="unit-control">
                    <input
                        type="text"
                        className="input-datepicker"
                        ref={inputRef}
                        value={value}
                        onChange={onChange}
                        readOnly
                    />
                </div>
                <i className="ri-arrow-right-s-line icon"></i>
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
