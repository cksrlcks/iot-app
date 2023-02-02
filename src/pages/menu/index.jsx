import React from 'react';
import { Link } from 'react-router-dom';

import Safearea from '../../components/layout/Safearea';
import Language from '../../components/button/Language';
import UrgentNotice from '../../components/common/UrgentNotice';
import UserInfo from '../../components/common/UserInfo';
import { useAuth } from '../../context/AuthContext';

export default function Menu() {
    const { user } = useAuth();
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
                                <span>위치관제</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="log" className="nav-btn">
                                <span>운행일지</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="terminal" className="nav-btn">
                                <span>단말목록</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="region" className="nav-btn">
                                <span>지역 진입/이탈 설정</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="message/list" className="nav-btn">
                                <span>PUSH / SMS</span>
                            </Link>
                        </li>
                        {user.type === 'driver' && (
                            <li>
                                <Link to="drive" className="nav-btn">
                                    <span>운행체크</span>
                                </Link>
                            </li>
                        )}

                        <li>
                            <Link to="setting" className="nav-btn">
                                <span>개인설정</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="notice" className="nav-btn new">
                                <span>공지사항</span>
                            </Link>
                        </li>
                        <li>
                            <button type="button" className="nav-btn" onClick={handleTurnOff}>
                                <span>종료</span>
                            </button>
                        </li>
                    </ul>
                    <div className="copyright">Copyright iotplex 2022, All Rights Reserved.</div>
                </div>
            </div>
        </Safearea>
    );
}
