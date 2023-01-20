import React from 'react';
import Safearea from '../../components/layout/Safearea';
import Language from './../../components/button/Language';
import UrgentNotice from '../../components/common/UrgentNotice';
import UserInfo from '../../components/common/UserInfo';
import Quick from '../../components/home/Quick';
import Event from '../../components/home/Event';
import Notice from './../../components/home/Notice';

export default function Home() {
    return (
        <Safearea>
            <div className="home-page safe-bottom-padding">
                <div className="home-inner">
                    <div className="app-inner">
                        <Language />
                        <UrgentNotice />
                        <Quick />
                        <UserInfo />
                        <Event />
                        <Notice />
                    </div>
                </div>
            </div>
        </Safearea>
    );
}
