import React from 'react';
import { useMap } from '../../../../context/MapContext';
import IconImg from '../../../../assets/img/common/icon-path.svg';

export default function PathButton() {
    const { mapState, mapDispatch } = useMap();
    const { pathMarkerShow, pathMode } = mapState;
    const handleEvent = () => {
        mapDispatch({ type: 'SET_HIDE_PATH_MARKER', payload: !pathMarkerShow });
    };

    return (
        <>
            {pathMode && (
                <button
                    type="button"
                    className={`control-btn path ${!pathMarkerShow ? 'on' : ''}`}
                    onClick={handleEvent}
                >
                    <img src={IconImg} alt="패스보기" />
                </button>
            )}
        </>
    );
}
