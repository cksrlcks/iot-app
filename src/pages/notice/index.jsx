import React from 'react';
import { Outlet } from 'react-router-dom';
import Safearea from '../../components/layout/Safearea';

export default function Notice() {
    return (
        <Safearea>
            <Outlet />
        </Safearea>
    );
}
