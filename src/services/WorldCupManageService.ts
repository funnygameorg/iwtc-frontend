import { useQuery } from '@tanstack/react-query';
import { ajaxGet } from './BaseService';
import { mapContentsListData } from '@/interfaces/models/WccListData';
import { getAccessToken } from '@/utils/TokenManager';
import Error from 'next/error';

export const WorldCupContentsAllList = async (worldcupId: number): Promise<any> => {

    const headers = {
        'Content-Type': 'application/json',
        'access-token': `${getAccessToken()}`,
    };

    const response = await ajaxGet(`world-cups/me/${worldcupId}/contents`, {
        headers: headers,
        timeout: 5000,
    });

    console.log("임시 response ====>", response);
    return response.data;
}

export const useQueryWorldCupContentsAllList = (worldcupId: number) => {
    console.log('worldcupId', worldcupId);
    return useQuery<any, Error>(['tempValue'], () => WorldCupContentsAllList(worldcupId), {
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 1000,
    });
};
