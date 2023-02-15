import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { isAndroid, isIOS, isSafari, osVersion, osName } from 'react-device-detect';
import { Helmet } from 'react-helmet';
import Dock from '../../components/dock';
import { useLang } from '../../context/LangContext';

export default function Root() {
    const noDockRoutes = ['/', '/login'];
    const location = useLocation();
    const { lang } = useLang();

    //os & device detect
    useEffect(() => {
        const html = document.querySelector('html');
        if (osVersion) {
            const string = `${osName.toLocaleLowerCase()}-${osVersion.split('.')[0]}`;
            html.classList.add(string.replace(/ /g, ''));
        }
    }, []);

    //vh 보정
    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    useEffect(() => {
        setScreenSize();
        window.addEventListener('resize', setScreenSize);

        return () => window.removeEventListener('resize', setScreenSize);
    });

    console.log(lang);
    return (
        <>
            <Helmet>
                <html lang={lang} />
            </Helmet>
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
