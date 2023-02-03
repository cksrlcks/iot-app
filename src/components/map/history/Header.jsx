import React, { useState, useEffect } from 'react';
import { formatDate } from '../../../lib/date';
import { useMap } from '../../../context/MapContext';
import DatePicker from '../../picker/DatePicker';
import TimePicker from '../../picker/TimePicker';
import CloseBtn from '../../button/CloseBtn';

export default function Header() {
    const { mapState, mapDispatch } = useMap();

    const [date, setDate] = useState(formatDate(new Date()));
    const [time, setTime] = useState({
        from: 5,
        to: 7,
    });

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
                <DatePicker value={date} onChange={setDate} />
                <TimePicker value={time} setTime={setTime} />
            </div>
        </>
    );
}
