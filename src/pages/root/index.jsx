import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { isAndroid, isIOS, isSafari, osVersion, osName } from 'react-device-detect';
import Dock from '../../components/dock';

export default function Root() {
    const noDockRoutes = ['/', '/login'];
    const location = useLocation();
    useEffect(() => {
        const html = document.querySelector('html');
        if (osVersion) {
            html.classList.add(`${osName.toLocaleLowerCase()}-${osVersion.split('.')[0]}`);
        }
    }, []);

    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    useEffect(() => {
        setScreenSize();
    });

    return (
        <>
            <div
                className={`app-container  ${isSafari ? 'safari' : ''} ${isIOS ? 'ios' : ''} ${
                    isAndroid ? 'android' : ''
                } `}
            >
                <Outlet />
            </div>
            {!noDockRoutes.includes(location.pathname) && <Dock />}
        </>
    );
}
