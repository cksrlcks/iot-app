import React, { useState } from 'react';
import Splash from '../../components/login/Splash';
import Login from './../../components/login/index';
import NoticePopup from '../../components/popup/Notice';

export default function LoginPage() {
    const [splash, setSplash] = useState(true);

    return (
        <>
            <Splash splash={splash} setSplash={setSplash} time={3000} />
            <Login splash={splash} />
            {!splash && <NoticePopup />}
        </>
    );
}
