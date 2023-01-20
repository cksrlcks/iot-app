import React from 'react';
import logo from '../../assets/img/login/login-logo.svg';

export default function Logo() {
    return (
        <div className="logo">
            <div className="logo-img">
                <img src={logo} alt="4GUARD" />
            </div>
            <div className="logo-ment">완벽한 위치관제를 위한 명품 솔루션</div>
        </div>
    );
}
