import React, { useState, useEffect } from 'react';
import { useMap } from '../../../context/MapContext';
import { searchCoordToAddress } from '../../../lib/mapHelper';
import GPSIcon from '../icon/GPSIcon';

export default function HistoryItem({ item, handleShowPath }) {
    const { naver } = window;
    const { mapDispatch } = useMap();
    const [addr, setAddr] = useState('');
    const getStatus = (str) => {
        const status = {
            정차: 'pause',
            주행: 'start',
            종료: 'end',
        };
        return status[str] || '';
    };

    const handlePath = () => {
        handleShowPath();
        mapDispatch({ type: 'SET_SELECT_PATH_ITEM', payload: item });
    };

    useEffect(() => {
        const getAddress = async () => {
            const position = new naver.maps.LatLng(item.latitude, item.longitude);
            if (position) {
                const findAddr = await searchCoordToAddress(position);
                setAddr(findAddr.roadAddress);
            }
        };
        getAddress();
    }, [naver, item]);
    return (
        <li>
            <div className="history-card" onClick={handlePath}>
                <div className="card-header">
                    <div className="card-num">{item.length}</div>
                    <div className="card-info">
                        <span className={`info-item status ${getStatus(item.status_str)}`}>
                            {item.status_str}
                        </span>
                        <span className="info-item speed">{item.speed} km/h</span>
                        <GPSIcon className="info-item ee" status={item.gps_sv} />
                    </div>
                    <div className="card-date">{item.makedate}</div>
                </div>
                <div className="card-body">{addr ? addr : '-'}</div>
            </div>
        </li>
    );
}
