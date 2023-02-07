import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMap } from '../../../context/MapContext';
import useFetch from '../../../hook/useFetch';
import { getPhoneNumber } from '../../../lib/mapHelper';
import Button from '../../button/Button';
import CloseBtn from '../../button/CloseBtn';
import BatteryIcon from '../icon/BatteryIcon';
import GPSIcon from '../icon/GPSIcon';

export default function PathDetail() {
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const { selectPathItem, selectItem, logMode } = mapState;
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(true);
    }, []);
    const fetchUrl = selectItem
        ? `/api/pathOneItem?id=${selectItem.unitid}&idx=${selectPathItem.idx}${
              logMode ? '&test="small"' : ''
          }`
        : null;
    const { data, error, isLoading } = useFetch(fetchUrl);

    const handleClose = () => {
        mapDispatch({ type: 'BLUR' });
    };
    const handleStreetView = () => {
        mapDispatch({
            type: 'SET_PANO_ITEM',
            payload: new naver.maps.LatLng(selectPathItem.latitude, selectPathItem.longitude),
        });
    };
    return (
        <CSSTransition in={open} classNames="sheet" timeout={500} unmountOnExit>
            <div className="summary-panel path-panel sheet-enter-done">
                {data && (
                    <>
                        <div className="summary-header">
                            <span className="num">{data.length}</span>
                            <span className="label">상세정보</span>
                            <CloseBtn onClick={handleClose} />
                        </div>
                        <div className="summary-body">
                            <div className="path-detail">
                                <div className="detail-dashboard">
                                    <div className="info-item block">
                                        <div className="item-label">단말번호</div>
                                        <div className="item-content">
                                            {getPhoneNumber(data.unitid)}
                                        </div>
                                    </div>
                                    <div className="info-item block">
                                        <div className="item-label">GPS</div>
                                        <div className="item-content">
                                            <GPSIcon status={data.gps_sv} />
                                        </div>
                                    </div>
                                    <div className="info-item block">
                                        <div className="item-label">속도</div>
                                        <div className="item-content">{data.speed} km/h</div>
                                    </div>
                                </div>
                                <div className="info-group">
                                    <div className="row">
                                        <div className="row-label">단말전압</div>
                                        <div className="row-content">
                                            <BatteryIcon
                                                status={data.inner_battery}
                                                iconNum={data.inner_battery_img}
                                            />
                                        </div>
                                    </div>
                                    {data.vehicle_battery && (
                                        <div className="row">
                                            <div className="row-label">차량전압</div>
                                            <div className="row-content">
                                                <BatteryIcon
                                                    status={data.vehicle_battery}
                                                    iconNum="car"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="row">
                                        <div className="row-label">수신일시</div>
                                        <div className="row-content">2023-01-02 10:35:07</div>
                                    </div>
                                </div>
                            </div>
                            <Button label="거리뷰 보기" color="black" onClick={handleStreetView} />
                        </div>
                    </>
                )}
            </div>
        </CSSTransition>
    );
}
