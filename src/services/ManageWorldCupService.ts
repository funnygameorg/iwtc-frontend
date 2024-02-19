import axios from 'axios';
import { ajaxDelete, ajaxGet, ajaxPost, ajaxPut } from './BaseService';
import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@/utils/TokenManager';

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

export const useQueryGetMyWorldCupList = (token: string) => {
    return useQuery<any, Error>(['MyWorldCupList'], () => getMyWorldCupList(token), {
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 3000,
        enabled: !!token,
    });
};

// 내가 만든 이상형 월드컵 조회
export const getMyWorldCup = async (worldCupId: number) => {
    const authHeaders = createHeader(getAccessToken());

    const response = await ajaxGet(`/world-cups/me/${worldCupId}`, {
        headers: authHeaders,
        timeout: 5000,
    });

    console.log('response ===>', response);

    if (response) {
        return response;
    }
};

export const useQueryGetMyWorldCup = (worldcupId: number) => {
    return useQuery<any, Error>(['MyWorldCup', worldcupId], () => getMyWorldCup(worldcupId), {
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 3000,
        enabled: !!worldcupId,
    });
};

// 이상형 컨텐츠 리스트 조회
export const getMyWorldCupContentsList = async (worldCupId: number) => {
    const authHeaders = createHeader(getAccessToken());

    const response = await ajaxGet(`/world-cups/me/${worldCupId}/manage-contents`, {
        headers: authHeaders,
        timeout: 5000,
    });

    console.log('response ===>', response);

    if (response) {
        return response;
    }
};

export const useQueryGetMyWorldCupContentsList = (worldcupId: number) => {
    return useQuery<any, Error>(['MyWorldCupContentsList', worldcupId], () => getMyWorldCupContentsList(worldcupId), {
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 0,
        enabled: !!worldcupId,
    });
};

// 이상형 컨텐츠 1건 수정
export const updateMyWorldCupContents = async (worldCupId: number, contentsId: number, params: any, token: string) => {
    console.log('test ===>', params);
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

// 나의 이상형 월드컵 리스트에서 삭제
export const deleteMyWorldCup = async ({ worldCupId, token }: any) => {
    const authHeaders = createHeader(token);
    const response = await ajaxDelete(`/world-cups/me/${String(worldCupId)}`, null, authHeaders);

    console.log('response ===>', response);

    if (response) {
        return response;
    }
};
