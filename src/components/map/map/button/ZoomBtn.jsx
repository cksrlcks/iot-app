import React from 'react';
import { useMap } from '../../../../context/MapContext';

export default function ZoomBtn() {
    const { mapState, mapDispatch } = useMap();
    const { map } = mapState;
    const handleZoomIn = () => {
        map.setZoom(map.getZoom() + 1, false);
    };

    const handleZoomOut = () => {
        map.setZoom(map.getZoom() - 1, false);
    };

    return (
        <div className="zoom">
            <button type="button" className="zoom-in" onClick={() => handleZoomIn()}>
                <i className="ri-add-fill icon"></i>
            </button>
            <button type="button" className="zoom-out" onClick={() => handleZoomOut()}>
                <i className="ri-subtract-fill icon"></i>
            </button>
        </div>
    );
}
