import { SignUpInfo, SignInInfo } from '@/interfaces/models/login/MemberData';
import { ajaxGet, ajaxPost } from './BaseService';
import axios from 'axios';
import { getAccessToken } from '@/utils/TokenManager';

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

    const response = await axios.get('http://localhost:8080/api/members/sign-out', {
        headers: headers,
        timeout: 5000,
    });
    if (response) {
        console.log('response', response);
    }
};

export const userMeSummary = async (token: string) => {
    const headers = {
        'Content-Type': 'application/json',
        'access-token': `${token}`,
    };
    const response = await axios.get('http://localhost:8080/api/members/me/summary', {
        headers: headers,
        timeout: 5000,
    });
    if (response) {
        console.log('response', response);
    }
};
