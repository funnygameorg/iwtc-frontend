import { useQuery } from '@tanstack/react-query';
import { ajaxGet, ajaxPost } from './BaseService';
import { WCListParent, loadWCListData } from '@/interfaces/models/world-cup/WcListData';
import Error from 'next/error';
import { getAccessToken } from '@/utils/TokenManager';
import axios from 'axios';

// export const useQueryGetWorldCupAllList = (page: number, size: number, sort: number) => {
//     return useQuery<any, Error>(['WorldCupList', page, size, sort], () => worldCupAllList(page, size, sort), {
//         retry: 0,
//         refetchOnWindowFocus: false,
//         staleTime: 1000,
//     });
// };

export const worldCupAllList = async (
    page: number,
    size: number,
    sort: string,
    keyword?: string,
    // memberId?: number,
    dateRange = 'ALL'
): Promise<WCListParent> => {
    const param = {
        page,
        size,
        sort: `${sort},DESC`,
        keyword,
        dateRange,
        // memberId,
    };
    const response = await ajaxGet('/world-cups', { params: param });
    return loadWCListData(response.data.data);
};

export const useQueryGetWorldCupGameRound = (worldcupId: number) => {
    return useQuery<any, Error>(['wcRounds', worldcupId], () => worldCupGameRound(worldcupId), {
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 1000,
    });
};

export const worldCupGameRound = async (worldcupId: number) => {
    const response = await ajaxGet(`/world-cups/${worldcupId}/available-rounds`);
    return response.data;
};

export const worldCupGamePlay = async ({
    worldcupId,
    currentRound,
    sliceContents,
    excludeContentsIds,
}: any): Promise<any> => {
    const param = {
        currentRound,
        sliceContents,
        excludeContentsIds,
    };
    const response = await ajaxGet(`/world-cups/${worldcupId}/contents`, { params: param });
    return response.data;
};

export const worldCupGameClear = async (param: any) => {
    const [worldcupId, firstWinnerContentsId, secondWinnerContentsId, thirdWinnerContentsId, fourthWinnerContentsId] =
        param.map((value: any) => (value === '0' ? undefined : value));

    const params = {
        firstWinnerContentsId,
        secondWinnerContentsId,
        thirdWinnerContentsId,
        fourthWinnerContentsId,
    };
    const numberworldcupId = Number(worldcupId);
    const response = await ajaxPost(`/world-cups/${worldcupId}/clear`, params);
    return response.data;
};

//게임의 모든 컨텐츠 조회 (랭크 정렬)
export const useQueryGetWorldCupGameResultRankList = (worldcupId: number) => {
    return useQuery<any, Error>(['AllRankList'], () => worldCuplGameResultRankList(worldcupId), {
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 1000,
    });
};

export const worldCuplGameResultRankList = async (worldcupId: number) => {
    const response = await ajaxGet(`/world-cups/${worldcupId}/game-result-contents`);
    return response.data;
};
