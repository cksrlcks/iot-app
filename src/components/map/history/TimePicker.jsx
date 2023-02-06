import React from 'react';
export default function TimePicker({ value, setTime, setIsTimePickerOpen }) {
    return (
        <>
            <div className="input-wrapper time-wrapper" onClick={() => setIsTimePickerOpen(true)}>
                <span className="time">{value.from}시</span>
                <span className="devider">~</span>
                <span className="time">{value.to}시</span>
            </div>
        </>
    );
}
