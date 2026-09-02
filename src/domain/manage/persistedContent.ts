import { isMP4 } from '../../utils/media';

interface PersistedContent {
    worldCupId?: number;
    contentsName: string;
    videoStartTime?: string;
    videoPlayDuration?: number;
    visibleType?: string;
    fileType?: string;
    mediaPath?: string;
    mediaFileId?: number;
    mp4Type?: string | boolean;
    imgType?: string | boolean;
    detailFileType?: string;
    originalName?: string;
}

interface MediaFile {
    videoStartTime?: string;
    videoPlayDuration?: number;
    visibleType?: string;
    fileType?: string;
    mediaData: string;
    mediaFileId?: number;
    detailType?: string;
    originalName?: string;
}

export const normalizePersistedManagedContent = (
    content: PersistedContent,
    mediaFile: MediaFile | undefined,
    index: number
) => ({
    id: index,
    contentsId: content.worldCupId,
    contentsName: content.contentsName,
    videoStartTime: mediaFile?.videoStartTime || content.videoStartTime,
    videoPlayDuration: mediaFile?.videoPlayDuration || content.videoPlayDuration,
    visibleType: mediaFile?.visibleType || content.visibleType,
    fileType: mediaFile?.fileType === 'STATIC_MEDIA_FILE' ? 'file' : content.fileType,
    mediaData: mediaFile?.mediaData || content.mediaPath,
    mediaFileId: mediaFile?.mediaFileId || content.mediaFileId,
    mp4Type: mediaFile ? (isMP4(mediaFile.mediaData) ? mediaFile.mediaData : undefined) : content.mp4Type,
    imgType: mediaFile ? (!isMP4(mediaFile.mediaData) ? mediaFile.mediaData : undefined) : content.imgType,
    detailFileType: mediaFile ? mediaFile.detailType : content.detailFileType,
    originalName: mediaFile ? mediaFile.originalName : content.originalName,
});
