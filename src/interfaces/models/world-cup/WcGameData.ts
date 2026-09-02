export interface WorldCupRoundData {
    worldCupTitle: string;
    rounds: number[];
}

export interface WorldCupRoundResponse {
    data: WorldCupRoundData;
}

export interface WorldCupGameContent {
    contentsId: number;
    mediaFileId: number;
    name: string;
    internetMovieStartPlayTime?: string;
    videoPlayDuration?: number;
}

export interface WorldCupGameResponse {
    data: {
        contentsList: WorldCupGameContent[];
    };
}

export interface WorldCupClearContent {
    contentsId: number;
    contentsName: string;
    mediaFileId: number;
    rank: number;
}

export interface WorldCupClearResponse {
    data: WorldCupClearContent[];
}

export interface WorldCupRankContent {
    contentsId: number;
    contentsName: string;
    mediaFileId: number;
    gameRank: number;
    gameScore: number;
}

export interface WorldCupRankResponse {
    data: WorldCupRankContent[];
}
