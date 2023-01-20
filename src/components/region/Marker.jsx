import { useState, useEffect } from 'react';
import { useMap } from '../../context/RegionContext';

export default function Marker() {
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const { map, coords, circle } = mapState;
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        if (!marker) {
            setMarker(new naver.maps.Marker());
        }

        // map이 언마운트될때 삭제
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker, naver]);

    useEffect(() => {
        if (map && marker) {
            marker.setOptions({
                position: new naver.maps.LatLng(coords.y, coords.x),
                map: map,
                icon: {
                    content: `
                    <div class="marker geo">
                    <div class="marker-icon">
                        <span class="icon">
                            <i class="ri-community-fill"></i>
                        </span>
                    </div>
                </div>
                `,
                },
            });

            marker.eventTarget.parentNode.classList.add('size');
        }
    }, [map, marker, naver, coords, mapDispatch]);

    return null;
}
