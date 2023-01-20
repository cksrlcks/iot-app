import { useState, useEffect } from 'react';
import { useMap } from '../../context/RegionContext';

export default function Circle({ radius }) {
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const { map, coords } = mapState;
    const [circle, setCircle] = useState(null);

    useEffect(() => {
        if (!circle) {
            setCircle(new naver.maps.Circle());
        }

        // map이 언마운트될때 삭제
        return () => {
            if (circle) {
                circle.setMap(null);
            }
        };
    }, [circle, naver]);

    useEffect(() => {
        if (map && circle) {
            circle.setOptions({
                map: map,
                center: coords,
                radius: radius,
                fillColor: '#2C2685',
                fillOpacity: 0.14,
                strokeWeight: 4,
                strokeColor: '#2C2685',
            });
        }
    }, [circle, naver, coords, radius, map]);

    return null;
}
