import { useState, useEffect } from 'react';
import { useMap } from '../../../context/MapContext';
import { getMarkerType } from '../../../lib/mapHelper';

export default function Marker({ item }) {
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const { map, cluster, selectGeoItem, pathData } = mapState;
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
                    <div class="marker geo">
                        <div class="marker-icon">
                            <span class="icon">
                            <i class="ri-community-fill"></i>
                            </span>
                        </div>
                        <div class="marker-name">${item.name}</div>
                    </div>
                `,
                },
            });

            marker.eventTarget.parentNode.classList.add('size');

            //마커의 클릭에는 selected state변경만 유도
            naver.maps.Event.addListener(marker, 'click', (e) => {
                mapDispatch({
                    type: 'SET_SELECT_GEO_ITEM',
                    payload: item,
                });
            });
        }
    }, [map, marker, naver, item, cluster, selectGeoItem, mapDispatch]);

    useEffect(() => {
        //selected state변경이되면 마커위치로 이동하고 클래스 토글
        if (marker) {
            if (selectGeoItem && selectGeoItem.unitid === item.unitid) {
                map.setZoom(20, false);
                map.panTo(
                    {
                        ...marker.position,
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
    }, [map, item, marker, selectGeoItem, cluster, pathData]);

    return null;
}
