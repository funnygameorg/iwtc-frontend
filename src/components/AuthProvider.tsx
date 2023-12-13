'use client';
import { userMeSummary } from '@/services/MemberService';
import { getUserInfo } from '@/stores/LocalStore';
import { getAccessToken } from '@/utils/TokenManager';
import React, { createContext, useState, useContext, useEffect } from 'react';

// AuthContext 생성
export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
});

// AuthProvider 컴포넌트 작성
export const AuthProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태값

    useEffect(() => {
        if (getUserInfo()) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if (getAccessToken() && getUserInfo()) {
            loginCheck();
        }
    }, []);

    const loginCheck = async () => {
        const accessToken = getAccessToken();
        const userInfo = await userMeSummary(accessToken);
        console.log('userInfo ===>', userInfo);
    };

    const login = () => {
        // 로그인 로직이 성공했을 때 호출되는 함수
        setIsLoggedIn(true);
    };

    const logout = () => {
        // 로그아웃 로직이 성공했을 때 호출되는 함수
        setIsLoggedIn(false);
    };

    return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

// 커스텀 훅 작성하여 다른 컴포넌트에서 이용할 수 있도록 만듦
export const useAuth = () => {
    return useContext(AuthContext);
};
