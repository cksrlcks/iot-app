import React, { useEffect, useState } from 'react';
import { useMap } from '../../context/MapContext';
import { useLocation } from 'react-router-dom';
import useFetch from './../../hook/useFetch';

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

export default function Map({ data, isLoading }) {
    const location = useLocation();
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const {
        trackingList: trackingItems,
        selectItem,
        pathData,
        panoItem,
        totalEventMode,
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

    const fetchUrl = location.state?.logItemId
        ? `/api/pathByLog?id=${location.state.logItemId}`
        : null;
    const { data: logData } = useFetch(fetchUrl);
    useEffect(() => {
        if (logData) {
            mapDispatch({
                type: 'SET_LOG_ITEM',
                payload: {
                    logMode: true,
                    selectItem: logData.selectItem,
                    historyMode: true,
                    pathMode: true,
                    pathData: logData.pathData,
                    selectPathItem: logData.pathData[0],
                },
            });
        }
    }, [logData, mapDispatch]);

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
