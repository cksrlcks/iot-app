import React from 'react';

export default function BatteryIcon({ status, iconNum }) {
    const getBatteryStatus = (codeNumber) => {
        const statusType = {
            0: 'grey',
            1: 'red',
            2: 'orange',
            3: 'green',
            car: 'car',
        };
        return statusType[codeNumber] || 'green';
    };

    return <div className={`icon-battery ${getBatteryStatus(iconNum)}`}>{status * 0.1} V</div>;
}
