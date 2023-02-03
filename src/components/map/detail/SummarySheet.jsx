import React from 'react';
import { useMap } from '../../../context/MapContext';
import { getState, getStateKOR, getMarkerType, getPhoneNumber } from '../../../lib/mapHelper';
import Button from '../../button/Button';
import CloseBtn from '../../button/CloseBtn';
import GPSIcon from '../icon/GPSIcon';
import BatteryIcon from '../icon/BatteryIcon';
import LoadingIcon from '../../../assets/img/common/icon-loading.svg';

export default function SummarySheet({
    item,
    isLoading,
    error,
    isDetail,
    setIsDetail,
    isEventModal,
    isShareModal,
}) {
    const { mapState, mapDispatch } = useMap();
    const { selectItem } = mapState;
    const handleShowPath = (id) => {
        mapDispatch({ type: 'SET_HISTORY_MODE', payload: true });
    };

    if (isLoading) {
        return (
            <div className="loading-ment">
                <img src={LoadingIcon} alt="loading" />
                <div>{selectItem.unit_nm}의 정보를 가져오는 중입니다...</div>
            </div>
        );
    }

    if (error) {
        return <div className="error-ment">정보를 가져오지 못했습니다.</div>;
    }

    return (
        <div className={`${isDetail ? 'on' : ''}`}>
            <SummaryHeader
                item={item}
                isDetail={isDetail}
                setIsDetail={setIsDetail}
                isEventModal={isEventModal}
                isShareModal={isShareModal}
            />
            {!isDetail && item && (
                <>
                    <div className="summary-body">
                        <div className="info-group">
                            <div className="row">
                                <div className="row-label">현위치</div>
                                <div className="row-content">{item.addr}</div>
                            </div>
                            <div className="row">
                                <div className="row-label">최종수신</div>
                                <div className="row-content">{item.makedate}</div>
                            </div>
                            <div className="row">
                                <div className="row-label">일주행거리</div>
                                <div className="row-content">{item.day_dist} km</div>
                            </div>
                        </div>
                    </div>
                    <div className="summary-footer btn-flex">
                        <Button label="상세보기" color="white" onClick={() => setIsDetail(true)} />
                        <Button
                            label="경로보기"
                            color="black"
                            onClick={() => handleShowPath(item.unitid)}
                        />
                    </div>
                </>
            )}
            {isDetail && (
                <div className="summary-body">
                    <div className="info-group">
                        <div className="row">
                            <div className="row-label">단말기 번호</div>
                            <div className="row-content">{getPhoneNumber(item.unitid)}</div>
                        </div>
                        <div className="row">
                            <div className="row-label">주소</div>
                            <div className="row-content">{item.addr}</div>
                        </div>
                    </div>
                    <div className="info-group">
                        <div className="row">
                            <div className="row-label">속도</div>
                            <div className="row-content">{item.speed} km/h</div>
                        </div>
                        <div className="row">
                            <div className="row-label">GPS</div>
                            <div className="row-content">
                                <GPSIcon status={item.gps_sv} iconNum={item.gps_sv_str} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="row-label">단말전압</div>
                            <div className="row-content">
                                <BatteryIcon
                                    status={item.inner_battery}
                                    iconNum={item.inner_battery_img}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="row-label">차량전압</div>
                            <div className="row-content">
                                <BatteryIcon status={item.vehicle_battery} iconNum="car" />
                            </div>
                        </div>
                    </div>
                    <div className="info-group">
                        <div className="row">
                            <div className="row-label">최근시동 ON</div>
                            <div className="row-content">{item.e_on}</div>
                        </div>
                        <div className="row">
                            <div className="row-label">최근시동 OFF</div>
                            <div className="row-content">{item.e_off}</div>
                        </div>
                        <div className="row">
                            <div className="row-label">최종수신일시</div>
                            <div className="row-content">{item.makedate}</div>
                        </div>
                        <div className="row">
                            <div className="row-label">일주행거리</div>
                            <div className="row-content">{item.day_dist} km</div>
                        </div>
                        <div className="row">
                            <div className="row-label">총주행거리</div>
                            <div className="row-content">{item.total_dist} km</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function SummaryHeader({ item, isDetail, setIsDetail, isEventModal, isShareModal }) {
    const { mapState, mapDispatch } = useMap();
    const handleClose = () => {
        isDetail ? setIsDetail(false) : mapDispatch({ type: 'BLUR' });
    };
    return (
        <>
            {item && (
                <div className="summary-header">
                    <div className="item-info-wrapper">
                        <div className="item-info">
                            <div className={`marker ${getMarkerType(item.iconnum)}`}>
                                <span className="icon">
                                    <i></i>
                                </span>
                            </div>
                            <span className="name">{item.unitnm}</span>
                        </div>
                        <div className={`item-status ${getState(item.event_code)}`}>
                            {getStateKOR(item.event_code)}
                        </div>
                        <CloseBtn onClick={handleClose} />
                    </div>
                    {isDetail && (
                        <div className="btn-flex">
                            <Button
                                label="현위치 공유"
                                color="white"
                                onClick={() => isShareModal(true)}
                            />
                            <Button
                                label="이벤트"
                                color="black"
                                onClick={() => isEventModal(true)}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
