import { useQuery } from '@tanstack/react-query';
import { ajaxGet } from './BaseService';
import { WCListParent, loadWCListData } from '@/interfaces/models/world-cup/WcListData';

// export const useQueryGetWorldCupAllList = (page: number, size: number, sort: number) => {
//     return useQuery<any, Error>(['WorldCupList', page, size, sort], () => worldCupAllList(page, size, sort), {
//         retry: 0,
//         refetchOnWindowFocus: false,
//         staleTime: 1000,
//     });
// };

export const worldCupAllList = async (page: number, size: number, sort: string):Promise<WCListParent> => {
    const param = {
        page,
        size,
        sort,
    };
    const response = await ajaxGet('/world-cups', { params: param });
    return loadWCListData(response.data.data);
};
