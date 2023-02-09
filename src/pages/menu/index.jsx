import React from 'react';
import { Link } from 'react-router-dom';

import Safearea from '../../components/layout/Safearea';
import Language from '../../components/button/Language';
import UrgentNotice from '../../components/common/UrgentNotice';
import UserInfo from '../../components/common/UserInfo';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';

export default function Menu() {
    const { user } = useAuth();
    const { lang } = useLang();
    const handleTurnOff = () => {
        alert('앱을 종료합니다.');
    };

    return (
        <Safearea>
            <div className="menu-page safe-bottom-padding">
                <div className="app-inner">
                    <Language />
                    <UrgentNotice />
                    <UserInfo logout />
                    <ul className="menu-list">
                        <li>
                            <Link to="/control" className="nav-btn">
                                <span>{lang === 'ko' ? '위치관제' : 'Map location'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="log" className="nav-btn">
                                <span>{lang === 'ko' ? '운행일지' : 'Location log'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="terminal" className="nav-btn">
                                <span>{lang === 'ko' ? '단말목록' : 'Devices list'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="region" className="nav-btn">
                                <span>{lang === 'ko' ? '지역 진입/이탈 설정' : 'Fencing'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="message/list" className="nav-btn">
                                <span>{lang === 'ko' ? 'PUSH / SMS' : 'Push / Sms'}</span>
                            </Link>
                        </li>
                        {user.type === 'driver' && (
                            <li>
                                <Link to="drive" className="nav-btn">
                                    <span>
                                        {lang === 'ko' ? '운행체크' : 'Driving start / stop'}
                                    </span>
                                </Link>
                            </li>
                        )}

                        <li>
                            <Link to="setting" className="nav-btn">
                                <span>{lang === 'ko' ? '개인설정' : 'Settings'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="notice" className="nav-btn new">
                                <span>{lang === 'ko' ? '공지사항' : 'Notice'}</span>
                            </Link>
                        </li>
                        <li>
                            <button type="button" className="nav-btn" onClick={handleTurnOff}>
                                <span>{lang === 'ko' ? '종료' : 'Quit'}</span>
                            </button>
                        </li>
                    </ul>
                    <div className="copyright">Copyright iotplex 2022, All Rights Reserved.</div>
                </div>
            </div>
        </Safearea>
    );
}
