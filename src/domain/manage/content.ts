import { ManagedContent } from './persistedContent';

export const normalizeClientManagedContent = (contents: ManagedContent, index: number): ManagedContent => ({
    id: index,
    contentsId: contents.contentsId || undefined,
    contentsName: contents.contentsName,
    videoStartTime: contents.videoStartTime,
    videoPlayDuration: contents.videoPlayDuration,
    visibleType: contents.visibleType,
    fileType: contents.fileType,
    mediaData: contents.mediaPath,
    mediaFileId: contents.mediaFileId,
    mp4Type: contents.mp4Type,
    imgType: contents.imgType,
    detailFileType: contents.detailFileType,
    originalName: contents.originalName,
});
