import React from 'react';
import { useMap } from '../../../../context/MapContext';

export default function EventButton() {
    const { mapState, mapDispatch } = useMap();
    const { totalEventCount, totalEventMode } = mapState;
    const handleEvent = () => {
        mapDispatch({ type: 'SET_TOTAL_EVENT_MODE', payload: !totalEventMode });
    };

    return (
        <button
            type="button"
            className="control-btn event"
            data-num={totalEventCount ? totalEventCount : '-'}
            onClick={handleEvent}
        >
            <i className="ri-notification-2-fill icon"></i>
        </button>
    );
}
