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

    useEffect(() => {
        console.log(`${date} 해당 날짜의 데이터를 가져옵니다.`);
    }, [date]);

    useEffect(() => {
        console.log(`${time.from}시 ~ ${time.to}시 해당 시간의 데이터를 가져옵니다.`);
    }, [time]);

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
