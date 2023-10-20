import { SignUpInfo, SignInInfo } from '@/interfaces/models/login/MemberData';
import { ajaxGet, ajaxPost } from './BaseService';

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
    const response = await ajaxGet('/members/sign-out',);
    return response;
};
