import { BASE_URL } from '@/consts';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { newAccessToken } from './MemberService';

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
            // const newToken = await newAccessToken();
            // console.log('newToken', newToken);
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

export const ajaxPut = async <T = any>(subUrl: string, params: any): Promise<AxiosResponse<T>> => {
    return instance.put(subUrl, params);
};

export const ajaxDelete = async <T = any>(subUrl: string, params: any): Promise<AxiosResponse<T>> => {
    return instance.delete(subUrl, params);
};
