import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPhoneNumber, searchCoordToAddress } from '../../lib/mapHelper';

export default function LogItem({ item }) {
    const { naver } = window;
    const navigate = useNavigate();
    const [addr, setAddr] = useState({
        from: '-',
        to: '-',
    });

    const getTime = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const time = (endDate.getTime() - startDate.getTime()) / 1000 / 60;
        return Math.floor(time);
    };

    useEffect(() => {
        if (item) {
            const getAddress = async () => {
                const { start_coords, end_coords } = item;
                const start_position = new naver.maps.LatLng(
                    start_coords.latitude,
                    start_coords.longitude
                );
                const end_position = new naver.maps.LatLng(
                    end_coords.latitude,
                    end_coords.longitude
                );
                if (start_position) {
                    const findAddr = await searchCoordToAddress(start_position);
                    setAddr((prev) => ({ ...prev, from: findAddr.jibunAddress }));
                }
                if (end_position) {
                    const findAddr = await searchCoordToAddress(end_position);
                    setAddr((prev) => ({ ...prev, to: findAddr.jibunAddress }));
                }
            };

            getAddress();
        }
    }, [naver, item]);

    const handleShow = () => {
        navigate('/control', {
            state: {
                replace: true,
                logItemId: item.unitid,
            },
        });
    };

    return (
        <li className="item log" onClick={handleShow}>
            <div className="item-body">
                <div className="log-title">
                    <span className="name">{item.unit_nm}</span>
                    <span className="phone">{getPhoneNumber(item.unitid)}</span>
                </div>
                <div className="log-detail">
                    <div className="detail start">
                        <div className="label">출발</div>
                        <div className="content">
                            <div className="addr">{addr.from}</div>
                            <div className="date">{item.start_date}</div>
                        </div>
                    </div>
                    <div className="detail end">
                        <div className="label">도착</div>
                        <div className="content">
                            <div className="addr">{addr.to}</div>
                            <div className="date">{item.end_date}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="item-footer">
                <div className="unit">
                    <span className="unit-label">운행시간</span>
                    <span className="unit-content">
                        {getTime(item.start_date, item.end_date)} 분
                    </span>
                </div>
                <div className="unit">
                    <span className="unit-label">운행거리</span>
                    <span className="unit-content">{item.distance} km</span>
                </div>
            </div>
        </li>
    );
}
