interface WCListDataType {
    reftContentName: string;
    rightContentName: string;
    description: string;
    reftImgPath: string;
    rightImgPath: string;
    contentNum: number;
    gameTitle: string;
}

interface WCListParent {
    totalCount: number;
    list: WCListDataType[];
    pageable: any;
}

export const loadWCListData = (data: any): WCListParent => {
    return {
        totalCount: data.totalElements,
        list: (data.content || []).map(mapWCListData),
        pageable: data.pageable,
    };
};

export const mapWCListData = (data: any): WCListDataType => {
    return {
        reftContentName: data.contentsName1,
        rightContentName: data.contentsName2,
        description: data.description,
        reftImgPath: data.filePath1,
        rightImgPath: data.filePath2,
        contentNum: data.id,
        gameTitle: data.title,
    };
};
