import React, { useEffect } from 'react';
import EventButton from './button/EventButton';
import RefreshButton from './button/RefreshButton';
import StreetButton from './button/StreetButton';
import TypeButton from './button/TypeButton';
import ZoomBtn from './button/ZoomBtn';
import PathButton from './button/PathButton';

export default function Controls() {
    return (
        <div className="map-control">
            <div className="left">
                <EventButton />
                <TypeButton />
                <StreetButton />
                <RefreshButton />
            </div>
            <div className="right">
                <ZoomBtn />
                <PathButton />
            </div>
        </div>
    );
}
