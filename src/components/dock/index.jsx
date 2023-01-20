import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Dock() {
    const navigate = useNavigate();
    return (
        <div className="app-dockbar">
            <div className="app-inner">
                <ul className="app-nav">
                    <li>
                        <button
                            type="button"
                            className="nav-btn navigate"
                            onClick={() => navigate(-1)}
                        >
                            <span className="icon prev"></span>
                            <span className="label">이전</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="nav-btn navigate"
                            onClick={() => navigate(1)}
                        >
                            <span className="icon next"></span>
                            <span className="label">다음</span>
                        </button>
                    </li>
                    <li>
                        <NavLink to="/home" className="nav-btn">
                            <span className="icon home"></span>
                            <span className="label">홈</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/control" className="nav-btn">
                            <span className="icon map"></span>
                            <span className="label">위치관제</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu" className="nav-btn">
                            <span className="icon menu"></span>
                            <span className="label">메뉴</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
