import axios from 'axios';
import { ajaxDelete, ajaxGet, ajaxPost, ajaxPut } from './BaseService';

const createHeader = (token: any) => {
    return {
        'Content-Type': 'application/json',
        'access-token': `${token}`,
    };
};

// 이상형 생성
export const createWorldCup = async ({ title, description, visibleType, token }: any) => {
    const authHeaders = createHeader(token);

    const param = { title, description, visibleType };
    console.log('월드컵 생성 시 요청값 ', authHeaders, param);
    const response = await ajaxPost(`/world-cups/me`, param, { headers: authHeaders });
    console.log('response ===>', response);
    return response.data;
};

// 이상형 컨텐츠 생성
export type createWorldCupContentsType = {
    contentsName: string;
    visibleType: string;
    createMediaFileRequest: {
        fileType: string;
        mediaPath: string;
        originalName: string;
        absoluteName: string;
        videoStartTime: string;
        videoPlayDuration: number;
    };
}[];

export const createWorldCupContents = async ({
    worldCupId,
    params,
    token,
}: {
    worldCupId: number;
    params: createWorldCupContentsType;
    token: string;
}) => {
    const authHeaders = createHeader(token);

    const response = await ajaxPost(
        `/world-cups/me/${worldCupId}/contents`,
        { data: params },
        { headers: authHeaders }
    );

    console.log('response ===>', response);

    return response.data;
};

// 이상형 리스트 조회
export const getMyWorldCupList = async (token: string) => {
    const authHeaders = createHeader(token);

    const response = await ajaxGet('/world-cups/me', {
        headers: authHeaders,
        timeout: 5000,
    });

    console.log('response ===>', response);

    if (response) {
        return response;
    }
};

// 이상형 리스트 조회
export const getMyWorldCup = async (worldCupId: number, token: string) => {
    const authHeaders = createHeader(token);

    const response = await ajaxGet(`/world-cups/me/${worldCupId}`, {
        headers: authHeaders,
        timeout: 5000,
    });

    console.log('response ===>', response);

    if (response) {
        return response;
    }
};

// 이상형 컨텐츠 리스트 조회
export const getMyWorldCupContentsList = async (worldCupId: number, token: string) => {
    const authHeaders = createHeader(token);

    const response = await ajaxGet(`/world-cups/me/${worldCupId}/manage-contents`, {
        headers: authHeaders,
        timeout: 5000,
    });

    console.log('response ===>', response);

    if (response) {
        return response;
    }
};

// 이상형 컨텐츠 1건 수정
export const updateMyWorldCupContents = async (worldCupId: number, contentsId: number, params: any, token: string) => {
    console.log(params);
    const authHeaders = createHeader(token);

    const response = await ajaxPut(`/world-cups/me/${worldCupId}/contents/${contentsId}`, params, {
        headers: authHeaders,
        timeout: 5000,
    });

    console.log('response ===>', response);

    if (response) {
        return response;
    }
};

// 이상형 컨텐츠 1건 삭제
export const removeMyWorldCupContents = async (worldCupId: number, contentsId: number, token: string) => {
    const authHeaders = createHeader(token);

    const response = await ajaxDelete(`/world-cups/me/${worldCupId}/contents/${contentsId}`, null, authHeaders);

    console.log('response ===>', response);

    if (response) {
        return response;
    }
};
