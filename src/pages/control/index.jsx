import React from 'react';
import useFetch from './../../hook/useFetch';
import Map from '../../components/map';
import { MapProvider } from '../../context/MapContext';
import UrgentPopup from '../../components/popup/Urgent';

export default function Control() {
    const { data, isLoading } = useFetch('/api/tracking', {
        revalidateOnMount: true, //위치관제 페이지 마운트때마다 갱신
        refreshInterval: 10000, //10초마다 갱신
        revalidateOnFocus: false, //다른화면 보다가 다시 보면서 포커스될때 갱신하기 끄기
    });

    const { data: geoData } = useFetch('/api/geofence', {
        revalidateOnMount: true, //위치관제 페이지 마운트때마다 갱신
        revalidateOnFocus: false, //다른화면 보다가 다시 보면서 포커스될때 갱신하기 끄기
    });

    return (
        <>
            <MapProvider>
                <Map data={data} geoData={geoData} isLoading={isLoading} />
            </MapProvider>
            <UrgentPopup />
        </>
    );
}
