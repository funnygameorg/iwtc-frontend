import { useQuery } from '@tanstack/react-query';
import { ajaxGet, ajaxPost } from './BaseService';

// 댓글 조회
export const useQueryGetReplyList = (worldcupId: number, offset: number) => {
    return useQuery<any, Error>(
        ['worldCupReplyList', worldcupId, offset],
        () => worldCupGameReplyList(worldcupId, offset),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            staleTime: 1000,
        }
    );
};

export const worldCupGameReplyList = async (worldcupId: number, offset: number) => {
    const params = {
        offset,
    };
    const response = await ajaxGet(`/world-cups/${worldcupId}/comments`, { params: params });
    console.log('round ===>', response);
    return response.data;
};

export const worldCupGameReplyRegister = async ({ worldcupId, contentsId, body, nickname }: any) => {
    const params = {
        body,
        nickname,
    };
    const response = await ajaxPost(`/world-cups/${worldcupId}/contents/${contentsId}/comments`, params);
    console.log('round ===>', response);
    return response.data;
};
