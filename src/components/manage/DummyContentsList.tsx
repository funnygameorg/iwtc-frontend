import exp from 'constants';
import React, { useState } from 'react';





/*
    게임 컨텐츠 더미 데이터로 사용합니다.
 */
export interface ManageContentsItemType {
    id: number;
    name: string;
    filePath: string;
    isVisible: 'PUBLIC';
    gameRank: number;
    gameScore: number;
}

const dummyManageContentsState = () => {
    return useState<ManageContentsItemType[]>([

        // {
        //     id: 1,
        //     name: "컨텐츠 1",
        //     filePath: "path/to/content1",
        //     isVisible: 'PUBLIC',
        //     gameRank: 1,
        //     gameScore: 1200
        // },
        // {
        //     id: 2,
        //     name: "컨텐츠 2",
        //     filePath: "path/to/content2",
        //     isVisible: 'PUBLIC',
        //     gameRank: 2,
        //     gameScore: 1100
        // },
        // {
        //     id: 3,
        //     name: "컨텐츠 3",
        //     filePath: "path/to/content3",
        //     isVisible: 'PUBLIC',
        //     gameRank: 3,
        //     gameScore: 912
        // },
        // {
        //     id: 4,
        //     name: "컨텐츠 4",
        //     filePath: "path/to/content4",
        //     isVisible: 'PUBLIC',
        //     gameRank: 4,
        //     gameScore: 500
        // },
        // {
        //     id: 5,
        //     name: "컨텐츠 5",
        //     filePath: "path/to/content5",
        //     isVisible: 'PUBLIC',
        //     gameRank: 5,
        //     gameScore: 200
        // },
        // {
        //     id: 6,
        //     name: "컨텐츠 6",
        //     filePath: "path/to/content6",
        //     isVisible: 'PUBLIC',
        //     gameRank: 6,
        //     gameScore: 100
        // },
        // {
        //     id: 7,
        //     name: "컨텐츠 7",
        //     filePath: "path/to/content7",
        //     isVisible: 'PUBLIC',
        //     gameRank: 7,
        //     gameScore: 100
        // },

    ]);
}

export default dummyManageContentsState;