import { ajaxGet } from './BaseService';
import { ManagedMediaFile } from '@/domain/manage/persistedContent';

interface ManagedMediaFileResponse {
    data: ManagedMediaFile;
}

// export const useQueryGetMediaFiles = (worldcupId: number) => {
//     return useQuery<any, Error>(['MediaFiles'], () => worldCupGameRound(worldcupId), {
//         retry: 0,
//         refetchOnWindowFocus: false,
//         staleTime: 1000,
//     });
// };

export const getMediaFileAPI = async (mediaFileId: number, type?: string) => {
    const params = {
        size: type ? type : undefined,
    };
    if (!mediaFileId) return;
    try {
        const response = await ajaxGet(`/media-files/${mediaFileId}`, { params });
        return response.data;
    } catch (e) {
        console.log('E');
    }
};

export const getMediaFile = async (mediaFileId: number) => {
    // const params = {
    //     size: 'divide2',
    // };
    const response = await ajaxGet<ManagedMediaFileResponse>(`/media-files/${mediaFileId}`);

    // console.log("조회 데이터", response?.data.data.mediaData);
    return response;
};
