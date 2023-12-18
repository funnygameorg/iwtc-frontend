import { BASE_URL } from '@/consts';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { newAccessToken, userSignOut } from './MemberService';
import { localStorageClear } from '@/stores/LocalStore';
import { setToken } from '@/utils/TokenManager';

const instance = axios.create({
    baseURL: `${BASE_URL}api/`,
    timeout: 5000,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config: any) => {
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200 || response.status === 201) {
            return response;
        } else if (response.status === 204) {
            return response;
        } else {
            if (response.status === 401) {
                // common error
            }
            return Promise.reject(response.data);
        }
    },
    async (error: any) => {
        console.log('response error', error);
        if (error.response.status === 401) {
            const newToken = await newAccessToken();
            if (newToken.code === 1010101) {
                const response = await userSignOut();
                if (response) {
                    localStorageClear();
                    // logout();
                    window.alert('로그인이 만료되었습니다. 다시 로그인을 해주세요.');
                }
            } else {
                const { newAccessToken, refreshToken } = newToken.data;
                // // ACCESS_TOKEN 저장
                setToken('ACCESS_TOKEN', newAccessToken);
                setToken('REFRESH_TOKEN', refreshToken);
                error.config.headers['access-token'] = `${newAccessToken}`;
                return axios.request(error.config);
                // const userInfo = await userMeSummary(token);
                // setUserInfo(userInfo.data);
            }
            return;
        }
        // if (typeof window !== 'undefined') {
        //     window.alert('다시 시도해주세요!');
        // }
        return Promise.reject(error);
    }
);

// // header에 token 셋팅
// export const setAuthToken = (token: string) => {
//   instance.defaults.headers.common['X-Auth-Token'] = token;
//   // LocalStorage.setAuthToken(token);
//   // SessionStorage.setAuthToken(token);
// };

export const ajaxGet = async <T = any>(subUrl: string, params?: any): Promise<AxiosResponse<T>> => {
    return instance.get(subUrl, params);
};

export const ajaxPost = async <T = any>(subUrl: string, params?: any, headers?: any): Promise<AxiosResponse<T>> => {
    if (headers) {
        return instance.post(subUrl, params, headers);
    }
    return instance.post(subUrl, params);
};

export const ajaxPut = async <T = any>(subUrl: string, params: any, headers?: any): Promise<AxiosResponse<T>> => {
    return instance.put(subUrl, params, headers);
};

export const ajaxDelete = async <T = any>(
    subUrl: string,
    params: any = {}, // 기본값으로 빈 객체 설정
    headers?: any
): Promise<AxiosResponse<T>> => {
    return instance.delete(subUrl, { data: params, headers: headers });
};
