import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/login/input';
import Header from '../../components/login/Header';
import Logo from '../../components/login/Logo';
import Button from '../../components/button/Button';

export default function Login({ splash }) {
    const navigate = useNavigate();
    const { user, handleLogin } = useAuth();
    const [userType, setUserType] = useState('normal');

    useEffect(() => {
        if (user) {
            navigate(user.type === 'driver' ? '/menu/drive' : '/control');
        }
    }, [user, navigate]);

    const [normalUserInfo, setNormalUserInfo] = useState({
        companyCode: '',
        userId: '',
        password: '',
        type: 'normal',
    });

    const { companyCode, userId: normalUserId, password: normalUserPassword } = normalUserInfo;

    const handleChangeNormal = ({ target: { name, value } }) => {
        setNormalUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const [driverInfo, setDriverInfo] = useState({
        userId: '',
        password: '',
        type: 'driver',
    });

    const { userId: driverId, password: driverPassword } = driverInfo;

    const handleChangeDriver = ({ target: { name, value } }) => {
        setDriverInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleNormalLogin = () => {
        if (!companyCode) {
            alert('회사코드를 입력해주세요');
            return false;
        }
        if (!normalUserId) {
            alert('아이디를 입력해주세요');
            return false;
        }
        if (!normalUserPassword) {
            alert('비밀번호를 입력해주세요');
            return false;
        }
        handleLogin(normalUserInfo);
    };

    const handleDriverLogin = () => {
        if (!driverId) {
            alert('아이디를 입력해주세요');
            return false;
        }
        if (!driverPassword) {
            alert('비밀번호를 입력해주세요');
            return false;
        }
        handleLogin(driverInfo);
    };
    return (
        <div className={`app-login ${splash ? '' : 'ready'}`}>
            {/* 헤더이미지 미리 불러오려고 */}
            <Header />
            {!splash && (
                <div className="login-body">
                    <div className="inner">
                        <Logo />
                        <div className="login-module common-tab">
                            <ul className="tab-nav">
                                <li>
                                    <button
                                        type="button"
                                        className={`nav-btn ${userType === 'normal' && 'on'}`}
                                        onClick={() => setUserType('normal')}
                                    >
                                        일반 로그인
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className={`nav-btn ${userType === 'driver' && 'on'}`}
                                        onClick={() => setUserType('driver')}
                                    >
                                        기사 로그인
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-panel-wrapper">
                                {userType === 'normal' ? (
                                    <div className="tab-panel" data-tab="normal">
                                        <Input
                                            label="회사코드"
                                            name="companyCode"
                                            placeholder="회사코드를 입력해주세요"
                                            value={companyCode}
                                            onChange={handleChangeNormal}
                                        />
                                        <Input
                                            label="아이디"
                                            name="userId"
                                            placeholder="아이디를 입력해주세요"
                                            value={normalUserId}
                                            onChange={handleChangeNormal}
                                        />
                                        <Input
                                            label="비밀번호"
                                            name="password"
                                            placeholder="비밀번호를 입력해주세요"
                                            type="password"
                                            value={normalUserPassword}
                                            onChange={handleChangeNormal}
                                        />

                                        <div className="login-option">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="a11y" />
                                                <span className="checkbox"></span>
                                                <span className="label">자동로그인</span>
                                            </label>
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="a11y" />
                                                <span className="checkbox"></span>
                                                <span className="label">아이디저장</span>
                                            </label>
                                        </div>
                                        <Button label="로그인" onClick={handleNormalLogin} />
                                    </div>
                                ) : (
                                    <div className="tab-panel" data-tab="driver">
                                        <Input
                                            label="아이디"
                                            name="userId"
                                            placeholder="아이디를 입력해주세요"
                                            value={driverId}
                                            onChange={handleChangeDriver}
                                        />
                                        <Input
                                            label="비밀번호"
                                            name="password"
                                            placeholder="비밀번호를 입력해주세요"
                                            type="password"
                                            value={driverPassword}
                                            onChange={handleChangeDriver}
                                        />

                                        <div className="login-option">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="a11y" />
                                                <span className="checkbox"></span>
                                                <span className="label">자동로그인</span>
                                            </label>
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="a11y" />
                                                <span className="checkbox"></span>
                                                <span className="label">아이디저장</span>
                                            </label>
                                        </div>
                                        <Button label="로그인" onClick={handleDriverLogin} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
