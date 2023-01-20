import { useState, useEffect } from 'react';
import { useMap } from '../../../context/MapContext';
import { getMarkerType } from '../../../lib/mapHelper';

export default function Marker({ item }) {
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const { map, cluster, selectItem, pathData } = mapState;
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
                    <div class="marker ${getMarkerType(item.iconnum)}">
                        <div class="marker-icon">
                            <span class="icon">
                                <i></i>
                            </span>
                        </div>
                        <div class="marker-name">${item.unit_nm}</div>
                    </div>
                `,
                },
                markerId: item.unitid,
            });

            marker.eventTarget.parentNode.classList.add('size');

            //클러스터에 등록후 갱신(클러스터 내부 매서드이용해서 업데이트
            cluster?.setMarker(marker);
            cluster?._updateClusters();

            //마커의 클릭에는 selected state변경만 유도
            const listener = naver.maps.Event.addListener(marker, 'click', (e) => {
                mapDispatch({
                    type: 'SET_SELECT_ITEM',
                    payload: item,
                });
                naver.maps.Event.removeListener(listener);
            });
        }
    }, [map, marker, naver, item, cluster, selectItem, mapDispatch]);

    useEffect(() => {
        //selected state변경이되면 마커위치로 이동하고 클래스 토글
        if (marker) {
            if (selectItem && selectItem.unitid === item.unitid) {
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
    }, [map, item, marker, selectItem, cluster, pathData]);

    return null;
}
