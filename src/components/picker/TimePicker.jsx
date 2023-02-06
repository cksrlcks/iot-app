import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '../button/Button';
import Picker from 'react-mobile-picker-scroll';

export default function TimePicker({ value, setTime }) {
    const modalRoot = document.getElementById('modal');
    const modalRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [valueGroups, setValueGroups] = useState({
        from: 5,
        to: 7,
    });
    const [optionGroups] = useState({
        from: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
        ],
        to: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    });

    const handlePickerChange = (name, value) => {
        setValueGroups((prev) => ({ ...prev, [name]: value }));
    };

    const handleTime = () => {
        const { from, to } = valueGroups;
        if (from > to) {
            alert('종료시간은 시작시간보다 빠를수 없습니다. 다시 설정해주세요');
            return;
        }
        setTime((prev) => ({ ...prev, ...valueGroups }));
        setIsOpen(false);
    };

    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div className="input-wrapper time-wrapper" onClick={() => setIsOpen(true)}>
                <span className="time">{value.from}시</span>
                <span className="devider">~</span>
                <span className="time">{value.to}시</span>
            </div>
            {isOpen &&
                createPortal(
                    <div
                        className="modal-datepicker"
                        ref={modalRef}
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
                            <div className="time-picker">
                                <Picker
                                    optionGroups={optionGroups}
                                    valueGroups={valueGroups}
                                    onChange={handlePickerChange}
                                    itemHeight={56}
                                    height={200}
                                />
                            </div>
                            <div className="btn-flex">
                                <Button label="닫기" color="white" onClick={handleClose} />
                                <Button label="적용" color="black" onClick={handleTime} />
                            </div>
                        </div>
                    </div>,
                    modalRoot
                )}
        </>
    );
}
