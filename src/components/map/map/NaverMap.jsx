import React, { useRef, useEffect } from 'react';
import { useMap } from '../../../context/MapContext';
import { MarkerClustering, clusterIcons } from '../../../lib/mapHelper';

export default function NaverMap({ children }) {
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const { map, cluster, streetMode, initialMapOptions, pathMode } = mapState;
    const mapEl = useRef(null);

    useEffect(() => {
        //map 생성
        if (mapEl.current && !map) {
            mapDispatch({
                type: 'SET_MAP',
                payload: new naver.maps.Map(mapEl.current, {
                    center: new naver.maps.LatLng(initialMapOptions.lat, initialMapOptions.lng),
                    zoom: initialMapOptions.zoom,
                    disableDoubleClickZoom: true,
                }),
            });
        }
    }, [map, naver, initialMapOptions, mapDispatch]);

    useEffect(() => {
        if (map && !cluster) {
            mapDispatch({
                type: 'SET_CLUSTER',
                payload: new MarkerClustering({
                    minClusterSize: 1,
                    maxZoom: 13,
                    map: map,
                    markers: [],
                    disableClickZoom: false,
                    gridSize: 120,
                    icons: clusterIcons,
                    indexGenerator: [10, 100, 200, 500, 1000],
                    stylingFunction: function (clusterMarker, count) {
                        clusterMarker.getElement().querySelector('.cluster').innerHTML = count;
                    },
                }),
            });
        }
        if (pathMode) {
            cluster?.setMap(null);

            mapDispatch({
                type: 'SET_CLUSTER',
                payload: null,
            });
        }
    }, [map, cluster, naver, pathMode, mapDispatch]);

    useEffect(() => {
        if (map && streetMode) {
            const listenter = new naver.maps.Event.addListener(map, 'click', function (e) {
                mapDispatch({ type: 'SET_PANO_ITEM', payload: e.coord });
                naver.maps.Event.removeListener(listenter);
            });
        }
    }, [map, streetMode, naver, mapDispatch]);

    useEffect(() => {
        if (map) {
            new naver.maps.Event.addListener(map, 'click', function (e) {
                mapDispatch({ type: 'BLUR' });
            });
        }
    }, [map, naver, mapDispatch]);

    return (
        <div id="map" ref={mapEl} style={{ width: '100%', height: '100vh' }}>
            {children}
        </div>
    );
}
