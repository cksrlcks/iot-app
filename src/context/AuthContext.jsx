import axios from '../lib/axios';
import React, { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(getInitialUser);

    async function handleLogin(user) {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/login', user);
            setIsLoading(false);
            setUser(response.data);
        } catch (err) {
            setIsLoading(false);
            alert('로그인에 실패하였습니다. 다시 시도해주세요');
            console.log(err);
        }
    }

    function handleLogout() {
        const confirm = window.confirm('로그아웃하시겠습니까?');
        if (confirm) {
            alert('로그아웃되었습니다.');
            setUser(null);
        }
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

function getInitialUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}
