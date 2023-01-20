import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function UserInfo({ logout }) {
    const { user, handleLogout } = useAuth();
    return (
        <div className="user-info-wrapper">
            <div className={`user-avatar ${user.type}`}>
                <div className="user-type">{user.type === 'normal' ? '일반' : '기사'}</div>
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
                </button>
            )}
        </div>
    );
}
