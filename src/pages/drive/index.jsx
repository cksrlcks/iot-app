import React from 'react';
import { Outlet } from 'react-router-dom';
import Safearea from '../../components/layout/Safearea';

export default function Drive() {
    return (
        <Safearea>
            <Outlet />
        </Safearea>
    );
}
