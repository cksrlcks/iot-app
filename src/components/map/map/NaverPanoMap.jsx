import React, { useState, useRef, useEffect } from 'react';
import { useMap } from '../../../context/MapContext';

export default function NaverPanoMap({ children }) {
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const { panoMap, panoItem } = mapState;
    const mapEl = useRef(null);

    useEffect(() => {
        if (mapEl.current && !panoMap) {
            mapDispatch({
                type: 'SET_PANO_MAP',
                payload: new naver.maps.Panorama(mapEl.current, {
                    posistion: panoItem,
                    pov: {
                        pan: -135,
                        tilt: 29,
                        fov: 100,
                    },
                    flightSpot: false,
                }),
            });
        }
    }, [panoMap, naver, panoItem, mapDispatch]);

    useEffect(() => {
        if (panoMap) {
            panoMap.setPosition(panoItem);
        }
    }, [panoMap, panoItem]);

    return (
        <>
            <div id="pano" ref={mapEl} style={{ width: '100%', height: '100vh' }}>
                {children}
            </div>
        </>
    );
}
