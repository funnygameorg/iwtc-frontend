import { BASE_URL, MEMBER_URL } from '@/consts';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { newAccessToken, userSignOut } from './MemberService';
import { localStorageClear } from '@/stores/LocalStore';
import { removeToken, setToken } from '@/utils/TokenManager';
import { hasRetryableUnauthorizedRequest } from './axiosError';

const instance = axios.create({
    baseURL: `${BASE_URL}api/`,
    timeout: 10000,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        if (config.url?.includes('member')) {
            // 'member'가 포함된 경우 MEMBER_BASE_URL 사용
            config.baseURL = `${MEMBER_URL}api/`;
        } else {
            // 그렇지 않은 경우 기본 BASE_URL 사용
            config.baseURL = `${BASE_URL}api/`;
        }
        return config;
    },
    (error: unknown) => {
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
    async (error: AxiosError) => {
        if (hasRetryableUnauthorizedRequest(error)) {
            const newToken = await newAccessToken();
            if (newToken.code === 1010101) {
                const response = await userSignOut();
                if (response) {
                    removeToken('ACCESS_TOKEN');
                    removeToken('REFRESH_TOKEN');
                    localStorageClear();
                    window.alert('로그인이 만료되었습니다. 다시 로그인을 해주세요.');
                    window.location.href = '/sign-in';
                }
            } else {
                const { newAccessToken, refreshToken } = newToken.data;
                setToken('ACCESS_TOKEN', newAccessToken);
                setToken('REFRESH_TOKEN', refreshToken);
                error.config.headers['access-token'] = `${newAccessToken}`;
                return axios.request(error.config);
            }
            return;
        }
        return Promise.reject(error);
    }
);

export const ajaxGet = async <T = unknown>(subUrl: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.get(subUrl, config);
};

export const ajaxPost = async <T = unknown, D = unknown>(
    subUrl: string,
    data?: D,
    config?: AxiosRequestConfig<D>
): Promise<AxiosResponse<T>> => {
    if (config) {
        return instance.post(subUrl, data, config);
    }
    return instance.post(subUrl, data);
};

export const ajaxPut = async <T = unknown, D = unknown>(
    subUrl: string,
    data: D,
    config?: AxiosRequestConfig<D>
): Promise<AxiosResponse<T>> => {
    return instance.put(subUrl, data, config);
};

export const ajaxDelete = async <T = unknown>(
    subUrl: string,
    data: unknown = {},
    headers?: RawAxiosRequestHeaders
): Promise<AxiosResponse<T>> => {
    return instance.delete(subUrl, { data, headers });
};
