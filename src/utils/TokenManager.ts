'use client';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setToken = (key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN', token: string) => {
    cookies.set(key, token, { path: '/' });
};

export const removeToken = (key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN') => {
    cookies.remove(key, { path: '/' });
};

export const getAccessToken = () => {
    return cookies.get('ACCESS_TOKEN');
};

export const getRefreshToken = () => {
    return cookies.get('REFRESH_TOKEN');
};
