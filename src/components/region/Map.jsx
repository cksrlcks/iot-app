import React, { useState, useEffect, useRef } from 'react';
import { useMap } from '../../context/RegionContext';
import { regionSearchByCoords } from '../../lib/mapHelper';

export default function Map({ children, radius }) {
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const { map, coords, initialMapOptions } = mapState;
    const mapEl = useRef(null);

    useEffect(() => {
        //map 생성
        if (mapEl.current && !map) {
            mapDispatch({
                type: 'SET_MAP',
                payload: new naver.maps.Map(mapEl.current, {
                    center: new naver.maps.LatLng(initialMapOptions.lat, initialMapOptions.lng),
                    //zoom: initialMapOptions.zoom,
                    disableDoubleClickZoom: true,
                }),
            });
        }
    }, [map, naver, mapDispatch, initialMapOptions]);

    useEffect(() => {
        if (map && radius && coords) {
            map.setZoom(radius > 500 ? 14 : 16, false);
            map.panTo(new naver.maps.LatLng(coords.y, coords.x), {
                duration: 300,
                easing: 'easeOutCubic',
            });
        }
    }, [map, radius, coords, naver]);

    useEffect(() => {
        if (map) {
            new naver.maps.Event.addListener(map, 'click', function (e) {
                getAddress(e.coord);
                mapDispatch({ type: 'SET_COORDS', payload: e.coord });
            });
        }

        async function getAddress(coords) {
            const data = await regionSearchByCoords(coords);
            mapDispatch({ type: 'SET_ADDR', payload: { ...data, ...coords } });
        }
    }, [map, naver, mapDispatch]);

    useEffect(() => {
        if (map && coords) {
            map.panTo(
                {
                    x: coords.x,
                    y: coords.y - 0.0014, //약간 위로 보이게 보정
                },
                {
                    duration: 300,
                    easing: 'easeOutCubic',
                }
            );
        }
    }, [map, naver, coords]);

    return (
        <div id="map" className="region" ref={mapEl} style={{ width: '100%', height: '100vh' }}>
            {children}
        </div>
    );
}
