import React from 'react';
import { Outlet } from 'react-router-dom';
import Safearea from '../../components/layout/Safearea';

export default function Log() {
    return (
        <Safearea>
            <Outlet />
        </Safearea>
    );
}
