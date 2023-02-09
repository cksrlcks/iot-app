import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

export default function Dock() {
    const navigate = useNavigate();
    const { lang } = useLang();
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
                            <span className="label">{lang === 'ko' ? '이전' : 'Prev'}</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="nav-btn navigate"
                            onClick={() => navigate(1)}
                        >
                            <span className="icon next"></span>
                            <span className="label">{lang === 'ko' ? '다음' : 'Next'}</span>
                        </button>
                    </li>
                    <li>
                        <NavLink to="/home" className="nav-btn">
                            <span className="icon home"></span>
                            <span className="label">{lang === 'ko' ? '홈' : 'Home'}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/control" className="nav-btn">
                            <span className="icon map"></span>
                            <span className="label">{lang === 'ko' ? '위치관제' : 'Location'}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu" className="nav-btn">
                            <span className="icon menu"></span>
                            <span className="label">{lang === 'ko' ? '메뉴' : 'Menu'}</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
