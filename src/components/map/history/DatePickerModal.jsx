import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Datepicker } from 'vanillajs-datepicker';
import ko from 'vanillajs-datepicker/locales/ko';
import { formatDate } from '../../../lib/date';
import Button from '../../button/Button';

export default function DatePickerModal({ date, setDate, isDatePickerOpen, setIsDatePickerOpen }) {
    const modalRef = useRef(null);
    const modalRoot = document.getElementById('modal');
    const [datepicker, setDatepicker] = useState(null);

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
            if (isDatePickerOpen && datepicker) {
                setDatepicker(null);
                datepicker?.destroy();
            }
        };
    }, [isDatePickerOpen, datepicker]);

    useEffect(() => {
        if (datepicker && modalRef.current) {
            datepicker.setDate(new Date(date));
            modalRef.current.addEventListener('changeDate', () => {
                setIsDatePickerOpen(false);
                setDate(formatDate(datepicker.getDate()));
            });
        }
    }, [datepicker, setDate, date, setIsDatePickerOpen]);

    return createPortal(
        <div className="modal-datepicker" onClick={() => setIsDatePickerOpen(false)}>
            <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
                <div className="datepicker-wrapper" ref={modalRef}></div>
                <Button label="닫기" color="white" onClick={() => setIsDatePickerOpen(false)} />
            </div>
        </div>,
        modalRoot
    );
}
