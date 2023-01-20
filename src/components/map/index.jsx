import React, { useEffect, useState } from 'react';
import { useMap } from '../../context/MapContext';
import { useLocation } from 'react-router-dom';
import axios from '../../lib/axios';

// map
import NaverMap from './map/NaverMap';
import Marker from './map/Marker';
import PathMarker from './map/PathMarker';
import NaverPanoMap from './map/NaverPanoMap';
import Controls from './map/Controls';
import PanoControls from './map/PanoControls';

import TrackingListSheet from './tracking/TrackingListSheet';
import ItemDetail from './detail/ItemDetail';

import ItemHistorySheet from './history/ItemHistorySheet';
import TotalEvent from './event/TotalEvent';

import Loading from '../common/Loading';
import PathDetail from './history/PathDetail';

export default function Map({ data, isLoading, eventData }) {
    const location = useLocation();
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const {
        trackingList: trackingItems,
        selectItem,
        pathData,
        panoItem,
        totalEventMode,
        selectPathItem,
        historyMode,
        pathMode,
    } = mapState;

    useEffect(() => {
        mapDispatch({ type: 'SET_STREET_LAYER', payload: new naver.maps.StreetLayer() });
    }, [naver, mapDispatch]);

    useEffect(() => {
        if (data) {
            mapDispatch({ type: 'SET_TRACKING_LIST', payload: data.lists });
            mapDispatch({ type: 'SET_TOTAL_EVENT_COUNT', payload: data.totalEventCount });
        }
    }, [data, mapDispatch]);

    useEffect(() => {
        if (location.state?.totalEventMode) {
            mapDispatch({ type: 'SET_TOTAL_EVENT_MODE', payload: true });
        }
    }, [location, mapDispatch]);

    useEffect(() => {
        if (location.state?.logItemId) {
            //운행일지에서 넘어올때 가짜 데이터 넣어주기
            const renderLogItem = async () => {
                const targetId = location.state.logItemId;
                const selectItem = {
                    unitid: '@@01222772561',
                    latitude: 35.03965,
                    longitude: 126.78889,
                    event_code: 4,
                    iconnum: 12,
                    unit_nm: '91라1016',
                    makedate: '2022-11-28 14:08:12',
                };

                const { data: pathData } = await axios.get(
                    `/api/pathCoords?id=${targetId}&test="small"`
                );

                mapDispatch({
                    type: 'SET_LOG_ITEM',
                    payload: {
                        logMode: true,
                        selectItem: selectItem,
                        historyMode: true,
                        pathMode: true,
                        pathData: pathData,
                        selectPathItem: pathData[0],
                    },
                });
            };

            renderLogItem();
        }
    }, [location, mapDispatch]);

    return (
        <>
            {isLoading && <Loading />}
            <div className="map-wrapper">
                <NaverMap>
                    {!pathMode &&
                        trackingItems?.map((item) => {
                            return <Marker key={item.unitid} item={item} />;
                        })}
                    {pathData && <PathMarker />}
                    <Controls />
                </NaverMap>

                {/* selectItem : 마커클릭시 | historyMode : 경로보기 눌렀을때(아직 패스는 안그려진상태) | pathMode : 경로그려졌을때*/}
                {!pathData && !selectItem && <TrackingListSheet />}

                {!panoItem && !historyMode && <ItemDetail />}

                {historyMode && <ItemHistorySheet />}

                {panoItem && (
                    <NaverPanoMap>
                        <PanoControls />
                    </NaverPanoMap>
                )}

                {totalEventMode && <TotalEvent />}
            </div>
        </>
    );
}
