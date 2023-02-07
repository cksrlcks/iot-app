import React, { useState, useEffect } from 'react';

import { useMap } from '../../../context/MapContext';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import CloseBtn from '../../button/CloseBtn';

export default function Header({
    date,
    setDate,
    time,
    setTime,
    setIsDatePickerOpen,
    setIsTimePickerOpen,
}) {
    const { mapState, mapDispatch } = useMap();

    const handleClose = () => {
        mapDispatch({ type: 'HISTORY_BLUR' });
    };

    return (
        <>
            <div className="history-header">
                <CloseBtn onClick={handleClose} />
            </div>
            <div className="history-control">
                <DatePicker
                    value={date}
                    setDate={setDate}
                    setIsDatePickerOpen={setIsDatePickerOpen}
                />
                <TimePicker
                    value={time}
                    setTime={setTime}
                    setIsTimePickerOpen={setIsTimePickerOpen}
                />
            </div>
        </>
    );
}
