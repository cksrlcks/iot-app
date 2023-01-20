import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Dock from '../../components/dock';

export default function Root() {
    const noDockRoutes = ['/', '/login'];
    const location = useLocation();
    return (
        <>
            <div className="app-container">
                <Outlet />
            </div>
            {!noDockRoutes.includes(location.pathname) && <Dock />}
        </>
    );
}
