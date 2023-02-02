import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { isAndroid, isIOS, isSafari } from 'react-device-detect';
import Dock from '../../components/dock';

export default function Root() {
    const noDockRoutes = ['/', '/login'];
    const location = useLocation();
    return (
        <>
            <div
                className={`app-container ${isAndroid ? 'android' : ''} ${
                    isSafari ? 'safari' : ''
                } ${isIOS ? 'ios' : ''}`}
            >
                <Outlet />
            </div>
            {!noDockRoutes.includes(location.pathname) && <Dock />}
        </>
    );
}
