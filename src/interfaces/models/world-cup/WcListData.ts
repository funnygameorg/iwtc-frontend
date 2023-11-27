interface WCListDataType {
    reftContentName: string;
    rightContentName: string;
    description: string;
    // reftImgPath: string;
    // rightImgPath: string;
    contentNum: number;
    gameTitle: string;
    reftImgMediaFileNo: number;
    rightImgMediaFileNo: number;
}

export interface WCListParent {
    totalPage: number;
    totalCount: number;
    list: WCListDataType[];
    pageable: any;
}

export const loadWCListData = (data: any): WCListParent => {
    return {
        totalCount: data.totalElements,
        list: (data.content || []).map(mapWCListData),
        pageable: data.pageable,
        totalPage: data.totalPages,
    };
};

export const mapWCListData = (data: any): WCListDataType => {
    return {
        reftContentName: data.contentsName1,
        rightContentName: data.contentsName2,
        description: data.description,
        reftImgMediaFileNo: data.mediaFileId1,
        rightImgMediaFileNo: data.mediaFileId2,
        // reftImgPath: data.filePath1,
        // rightImgPath: data.filePath2,
        contentNum: data.id,
        gameTitle: data.title,
    };
};
