import React, { useEffect } from 'react';
import { useMap } from '../../../../context/MapContext';

export default function StreetButton() {
    const { mapState, mapDispatch } = useMap();
    const { map, streetMode, streetLayer } = mapState;
    const handleStreet = () => {
        mapDispatch({ type: 'SET_STREET_MODE', payload: !streetMode });
    };

    useEffect(() => {
        if (streetLayer) {
            streetMode ? streetLayer.setMap(map) : streetLayer.setMap(null);
        }
    }, [map, streetMode, streetLayer]);

    return (
        <button
            type="button"
            className={`control-btn street ${streetMode ? 'on' : ''}`}
            onClick={handleStreet}
        >
            <i className="ri-webcam-line icon"></i>
        </button>
    );
}
