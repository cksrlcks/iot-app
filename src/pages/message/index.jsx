import React from 'react';
import { Outlet } from 'react-router-dom';
import ListPage from '../../components/layout/ListPage';
import Safearea from '../../components/layout/Safearea';

export default function Terminal() {
    const tab = [
        {
            label: '설정',
            path: '/menu/message/list',
        },
        {
            label: 'PUSH 내역',
            path: '/menu/message/push',
        },
        {
            label: 'SMS 내역',
            path: '/menu/message/sms',
        },
    ];
    return (
        <Safearea>
            <ListPage title="PUSH/SMS" tab={tab}>
                <Outlet />
            </ListPage>
        </Safearea>
    );
}
