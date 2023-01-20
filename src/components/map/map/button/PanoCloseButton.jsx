import React from 'react';
import { useMap } from '../../../../context/MapContext';

export default function PanoCloseButton() {
    const { mapState, mapDispatch } = useMap();
    const handleClose = () => {
        mapDispatch({ type: 'SET_PANO_CLOSE' });
    };

    return (
        <button type="button" className="close" onClick={handleClose}>
            <i className="ri-close-fill icon"></i>
        </button>
    );
}
