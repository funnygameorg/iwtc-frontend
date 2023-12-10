import { useQuery } from '@tanstack/react-query';
import { ajaxGet } from './BaseService';

// export const useQueryGetMediaFiles = (worldcupId: number) => {
//     return useQuery<any, Error>(['MediaFiles'], () => worldCupGameRound(worldcupId), {
//         retry: 0,
//         refetchOnWindowFocus: false,
//         staleTime: 1000,
//     });
// };

export const getMediaFileAPI = async (mediaFileId: number) => {
    if (!mediaFileId) return;
    try {
        const response = await ajaxGet(`/media-files/${mediaFileId}`);
        return response.data;
    } catch (e) {
        console.log('E');
    }
};
