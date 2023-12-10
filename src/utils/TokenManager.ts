import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setToken = (key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN', token: string) => {
    const expires = new Date();
    // expires.setDate(expires.getDate() + 14);
    cookies.set(key, token, { path: '/' });
    // cookies.set(key, token, {
    //   path: '/',
    //   expires: key === 'REFRESH_TOKEN' ? expires : undefined,
    // });
};

export const removeToken = (key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN') => {
    cookies.remove(key, { path: '/' });
};

// export const removeTokenAll = () => {
//   removeToken("ACCESS_TOKEN");
//   // removeToken(REFRESH_TOKEN);
// };

export const getAccessToken = () => {
    return cookies.get('ACCESS_TOKEN');
};

export const getRefreshToken = () => {
    return cookies.get('REFRESH_TOKEN');
};
