import React from 'react';
import logoImg1 from '../../assets/img/login/login-1.png';
import logoImg2 from '../../assets/img/login/login-2.png';
import logoImg3 from '../../assets/img/login/login-3.png';

export default function Header() {
    return (
        <div className="login-header">
            <div className="login-img">
                <img src={logoImg1} alt="login-img" />
            </div>
            <div className="login-img">
                <img src={logoImg2} alt="login-img" />
            </div>
            <div className="login-img">
                <img src={logoImg3} alt="login-img" />
            </div>
        </div>
    );
}
