import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';

export default function UserInfo({ logout }) {
    const { user, handleLogout } = useAuth();
    const { lang } = useLang();
    return (
        <div className="user-info-wrapper">
            <div className={`user-avatar ${user.type}`}>
                <div className="user-type">
                    {user.type === 'normal'
                        ? lang === 'ko'
                            ? '일반'
                            : 'User'
                        : lang === 'ko'
                        ? '기사'
                        : 'Driver'}
                </div>
                <div className="user-name">{user.userName}</div>
            </div>
            {user.type === 'normal' ? (
                <div className="user-info">
                    {user.type === 'normal' && (
                        <div className="user-company">{user.companyCode}</div>
                    )}
                    <div className="user-id">{`(${user.userId})`}</div>
                </div>
            ) : (
                <div className="user-info">
                    <div className="user-id">{user.userId}</div>
                </div>
            )}
            {logout && (
                <button className="logout" onClick={handleLogout}>
                    <i className="ri-logout-box-r-fill icon"></i>
                    <span className="title">{lang === 'ko' ? '로그아웃' : 'Sign Out'}</span>
                </button>
            )}
        </div>
    );
}
