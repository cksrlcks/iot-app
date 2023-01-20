import React, { useEffect } from 'react';
import { useMap } from '../../../../context/MapContext';

export default function TypeButton() {
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const { map, satelliteMode } = mapState;

    const handleMapType = () => {
        mapDispatch({ type: 'SET_SATELLITE_MODE', payload: !satelliteMode });
    };

    useEffect(() => {
        map?.setMapTypeId(naver.maps.MapTypeId[satelliteMode ? 'SATELLITE' : 'NORMAL']);
    }, [satelliteMode, map, naver]);

    return (
        <button
            type="button"
            className={`control-btn map-type ${satelliteMode ? 'on' : ''}`}
            onClick={() => handleMapType()}
        >
            <i
                className={`icon ${
                    satelliteMode ? 'ri-radar-line satellite' : 'ri-map-2-line normal'
                }`}
            ></i>
        </button>
    );
}
