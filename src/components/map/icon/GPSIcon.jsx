import React from 'react';

export default function GPSIcon({ status, iconNum, className }) {
    const getGPSStatus = (str) => {
        const status = {
            음영: 'grey',
            낮음: 'red',
            '??': 'orange',
            보통: 'yellow',
            원할: 'green',

            'gps0.png': 'grey',
            'gps1.png': 'red',
            'gps2.png': 'orange',
            'gps3.png': 'yellow',
            'gps4.png': 'green',
        };
        return status[str] || 'orange';
    };

    return (
        <span
            className={`icon-gps ${getGPSStatus(iconNum ? iconNum : status)} ${
                className ? className : ''
            }`}
        >
            {status}
        </span>
    );
}
