'use client';

import { userMeSummary } from '@/services/MemberService';
import { getUserInfo } from '@/stores/LocalStore';
import { getAccessToken } from '@/utils/TokenManager';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface AuthContextValue {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (getAccessToken() && getUserInfo()) {
            setIsLoggedIn(true);
            loginCheck();
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const loginCheck = async () => {
        const accessToken = getAccessToken();
        await userMeSummary(accessToken);
    };

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
