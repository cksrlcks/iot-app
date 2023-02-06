import React, { useState, useEffect, useRef } from 'react';
import { formatDate } from '../../../lib/date';
export default function DatePicker({ value, setDate, setIsDatePickerOpen }) {
    const inputRef = useRef(null);

    const handleDate = (amount) => {
        const newDate = new Date(value);
        newDate.setDate(newDate.getDate() + amount);
        setDate(formatDate(newDate));
    };

    return (
        <>
            <div className="input-wrapper full">
                <button type="button" className="arrow" onClick={() => handleDate(-1)}>
                    <i className="ri-arrow-drop-left-line icon"></i>
                </button>
                <div className="input-date" onClick={() => setIsDatePickerOpen(true)}>
                    <input type="text" ref={inputRef} value={value} readOnly />
                </div>
                <button type="button" className="arrow" onClick={() => handleDate(1)}>
                    <i className="ri-arrow-drop-right-line icon"></i>
                </button>
            </div>
        </>
    );
}
