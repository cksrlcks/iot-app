import { useState, useEffect } from 'react';
import { useMap } from '../../../context/MapContext';
import { getCenter, getMarkerType } from '../../../lib/mapHelper';
export default function PathMarker() {
    const { mapState } = useMap();
    const { map, pathData } = mapState;

    const { centerY: y, centerX: x } = getCenter(pathData);
    useEffect(() => {
        if (map) {
            map.setZoom(20, false);
            map.panTo(
                {
                    x: x,
                    y: y - 0.00012,
                },
                {
                    duration: 300,
                    easing: 'easeOutCubic',
                }
            );
        }
    }, [x, y, map]);
    return (
        <>
            {pathData.map((item) => {
                return <Marker key={item.idx} item={item} />;
            })}
            <PolyLine item={pathData} />
        </>
    );
}

function Marker({ item }) {
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const { map, selectPathItem, pathData, selectItem } = mapState;
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        if (!marker) {
            setMarker(new naver.maps.Marker());
        }

        // map이 언마운트될때 삭제
        return () => {
            if (marker) {
                marker.eventTarget.parentNode.classList.remove('active');
                marker.setMap(null);
            }
        };
    }, [marker, naver]);

    useEffect(() => {
        if (map && marker) {
            marker.setOptions({
                position: new naver.maps.LatLng(item.latitude, item.longitude),
                map: map,
                icon: {
                    content: `
                    <div class="path-marker ${getMarkerType(
                        selectItem.iconnum
                    )}">                        
                    <div class="marker-name">${item.length}</div>
                </div>
                `,
                },
                markerId: item.idx,
            });
            marker.eventTarget.parentNode.classList.add('size');

            naver.maps.Event.addListener(marker, 'click', (e) => {
                mapDispatch({
                    type: 'SET_SELECT_PATH_ITEM',
                    payload: item,
                });
            });
        }
    }, [map, marker, naver, item, mapDispatch, selectItem]);

    useEffect(() => {
        if (marker && map) {
            if (selectPathItem && selectPathItem.idx === item.idx) {
                map.setZoom(20, false);
                map.panTo(
                    {
                        x: marker.position.x,
                        y: marker.position.y - 0.00012, //약간 위로 보이게 보정
                    },
                    {
                        duration: 300,
                        easing: 'easeOutCubic',
                    }
                );
                marker.eventTarget.parentNode.classList.add('active');
            } else {
                marker.eventTarget.parentNode.classList.remove('active');
            }
        }
    }, [map, item, marker, selectPathItem, pathData]);

    return null;
}

function PolyLine({ item }) {
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const { map } = mapState;
    const [poly, setPoly] = useState(null);

    useEffect(() => {
        if (!poly) {
            setPoly(new naver.maps.Polyline());
        }

        return () => {
            if (poly) {
                poly.setMap(null);
            }
        };
    }, [naver, poly, map]);

    useEffect(() => {
        if (map && poly) {
            poly.setOptions({
                map: map,
                path: item.map((item) => ({ y: item.latitude, x: item.longitude })),
                strokeColor: '#7168E4',
                strokeOpacity: 1,
                strokeWeight: 5,
                filter: 'drop-shadow( 3px 10px 2px rgba(0, 0, 0, .7))',
            });

            poly._shape._shapeElement.parentNode.classList.add('path-shadow');
        }
    }, [map, poly, naver, item]);

    return null;
}
