export interface ClientManagedContent {
    contentsId?: number;
    contentsName: string;
    videoStartTime?: string;
    videoPlayDuration?: number;
    visibleType?: string;
    fileType?: string;
    mediaPath?: string;
    mediaFileId?: number;
    mp4Type?: boolean;
    imgType?: boolean;
    detailFileType?: string;
    originalName?: string;
}

export const normalizeClientManagedContent = (contents: ClientManagedContent, index?: number) => ({
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
