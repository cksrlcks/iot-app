import React from 'react';
import { useMap } from '../../../context/MapContext';
import { getState, getStateKOR } from '../../../lib/mapHelper';

export default function TrackingListItem({ item }) {
    const { mapState, mapDispatch } = useMap();
    const handleClick = (item) => {
        mapDispatch({ type: 'SET_SELECT_ITEM', payload: item });
    };

    return (
        <li key={item.unitid} onClick={() => handleClick(item)}>
            <button className="list-item" data-marker-id={item.unitid}>
                <span className={`status ${getState(item.iconnum)}`}>
                    {getStateKOR(item.iconnum)}
                </span>
                <span className="name">{item.unit_nm}</span>
                <span className="time">{item.makedate}</span>
            </button>
        </li>
    );
}
