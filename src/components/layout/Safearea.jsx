import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function Safearea({ children }) {
    const { pathname } = useLocation();
    const containerRef = useRef(null);

    useEffect(() => {
        containerRef.current?.scroll({
            top: 0,
            behavior: 'smooth',
        });
    }, [pathname]);

    return (
        <div className="app-safearea" ref={containerRef}>
            {children}
        </div>
    );
}
