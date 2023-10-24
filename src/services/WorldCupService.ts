import { useQuery } from '@tanstack/react-query';
import { ajaxGet } from './BaseService';
import { loadWCListData } from '@/interfaces/models/world-cup/WcListData';

// export const useQueryGetWorldCupAllList = (page: number, size: number, sort: number) => {
//     return useQuery<any, Error>(['WorldCupList', page, size, sort], () => worldCupAllList(page, size, sort), {
//         retry: 0,
//         refetchOnWindowFocus: false,
//         staleTime: 1000,
//     });
// };

export const worldCupAllList = async (page: number, size: number, sort: string) => {
    const param = {
        page,
        size,
        sort,
    };
    const response = await ajaxGet('/world-cups', { params: param });
    console.log('response ===>', response);
    return loadWCListData(response.data.data);
};
