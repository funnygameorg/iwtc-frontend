interface WCManegePageWCCListDataType {
    contentsId: string;
    contentsName: string;
    rank: string;
    score: string;
    createdAt: string;
    updatedAt: number;
    gameTitle: string;
    fileResponse: WCManegePageWCCListMediaFileType;
};

interface WCManegePageWCCListMediaFileType {
    mediaFileId: number;
    filePath: string;
    createdAt: Date;
    updatedAt: Date;
};

export const mapContentsListData = (data: any): WCManegePageWCCListDataType => {
    return {
        contentsId: data.contentsId,
        contentsName: data.contentsName,
        rank: data.rank,
        score: data.score,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        mediaFileId: data.fileResponse.mediaFileId,
        mediaFilePath: data.fileResponse.filePath,
        mediaFileCreatedAt: data.fileResponse.createdAt,
        mediaFileUpdatedAt: data.fileResponse.updatedAt
    }
};