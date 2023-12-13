import { SignUpInfo, SignInInfo } from '@/interfaces/models/login/MemberData';
import { ajaxGet, ajaxPost } from './BaseService';
import axios from 'axios';
import { getAccessToken, getRefreshToken } from '@/utils/TokenManager';
import { BASE_URL } from '@/consts';

//TODO: type 설정
export const userSignUp = async (param: SignUpInfo) => {
    const response = await ajaxPost('/members/sign-up', param);
    return response;
};

export const userSignIn = async (param: SignInInfo) => {
    const response = await ajaxPost('/members/sign-in', param);
    return response;
};

export const userSignOut = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'access-token': `${getAccessToken()}`,
    };

    const response = await ajaxGet(`/members/sign-out`, {
        headers: headers,
        timeout: 5000,
    });
    if (response) {
        return response;
    }
};

export const userMeSummary = async (token: string) => {
    const headers = {
        'Content-Type': 'application/json',
        'access-token': `${token}`,
    };
    // try {
    const response = await ajaxGet(`/members/me/summary`, {
        headers: headers,
        timeout: 5000,
    });
    if (response) {
        return response.data;
    }
    // } catch (e) {
    //     console.log('eeee', e);
    // }
};

export const newAccessToken = async () => {
    const refreshToken = getRefreshToken();
    const accessToken = getAccessToken();
    const params = {
        accessToken,
        refreshToken,
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    const response = await ajaxPost(`/new-access-token`, params, {
        headers: headers,
        timeout: 5000,
    });
    if (response) {
        return response.data;
    }
};
