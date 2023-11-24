import { useQuery } from '@tanstack/react-query';
import { ajaxGet, ajaxPost, ajaxPostWithToken } from './BaseService';
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
    memberId?: number,
    dateRange = 'ALL',
): Promise<WCListParent> => {
    const param = {
        page,
        size,
        sort,
        keyword,
        dateRange,
        memberId
    };
    const response = await ajaxGet('/world-cups', { params: param });
    return loadWCListData(response.data.data);
};

export const useQueryGetWorldCupGameRound = (worldcupId: number) => {
    console.log('worldcupId', worldcupId);
    return useQuery<any, Error>(['wcRounds'], () => worldCupGameRound(worldcupId), {
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 1000,
    });
};

export const worldCupGameRound = async (worldcupId: number) => {
    const response = await ajaxGet(`/world-cups/${worldcupId}/available-rounds`);
    console.log('round ===>', response);
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
    console.log('param', param);
    const response = await ajaxGet(`/world-cups/${worldcupId}/contents`, { params: param });
    console.log('response ====>', response);
    return response.data;
};

export const worldCupGameClear = async (param: any) => {
    const [worldcupId, firstWinnerContentsId, secondWinnerContentsId, thirdWinnerContentsId, fourthWinnerContentsId] =
        param;
    const params = {
        firstWinnerContentsId,
        secondWinnerContentsId,
        thirdWinnerContentsId,
        fourthWinnerContentsId,
    };
    const numberworldcupId = Number(worldcupId);
    const response = await ajaxPost(`/world-cups/${worldcupId}/clear`, params);
    console.log('response ===>', response);
    return response.data;
};