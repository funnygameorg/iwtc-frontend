import { useQuery } from '@tanstack/react-query';
import { ajaxGet } from './BaseService';
import { WCListParent, loadWCListData } from '@/interfaces/models/world-cup/WcListData';
import Error from 'next/error';

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
    dateRange = 'ALL'
): Promise<WCListParent> => {
    const param = {
        page,
        size,
        sort,
        keyword,
        dateRange,
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

export const worldCupGamePlay =  async ({worldcupId, currentRound, divideContentsSizePerRequest, alreadyPlayedContentsIds}: any  ):Promise<any> => {
  const param = {
    currentRound,
    divideContentsSizePerRequest,
    alreadyPlayedContentsIds,
  }
  console.log("param", param);
  const response = await ajaxGet(`/world-cups/${worldcupId}/contents`, {params: param});
  console.log("response ====>", response);
  return response.data;
  
}