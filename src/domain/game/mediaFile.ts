import { ManagedMediaFile } from '../manage/persistedContent';

export interface MediaMappableContent {
    mediaFileId: number;
    imgUrl?: string;
    fileType?: string;
    videoStartTime?: string;
    videoPlayDuration?: number;
}

export const mergeMediaFile = <T extends MediaMappableContent>(
    content: T,
    mediaFile: ManagedMediaFile | undefined
): T => {
    if (!mediaFile) {
        content.imgUrl = '/images/default.png';
        return content;
    }

    content.imgUrl = mediaFile.mediaData;
    content.fileType = mediaFile.fileType;
    content.videoStartTime = mediaFile.videoStartTime;
    content.videoPlayDuration = mediaFile.videoPlayDuration;
    return content;
};
