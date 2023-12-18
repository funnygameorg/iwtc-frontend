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

export const getMediaFile = async (mediaFileId: number) => {
    const response = await ajaxGet(`/media-files/${mediaFileId}`, { timeout: 20000 });

    // console.log("조회 데이터", response?.data.data.mediaData);
    if (response) {
        return response;
    }
};
