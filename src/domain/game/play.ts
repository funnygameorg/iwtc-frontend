export interface WorldCupGameRequest {
    worldcupId: number;
    currentRound: number;
    sliceContents: number;
    excludeContentsIds?: string;
    initialRound: number;
}

interface SelectableGameContent {
    contentsId: number;
}

export interface GameSelectionResult {
    winnerContentId: number;
    loserContentId: number;
    nextExcludedContents: number[];
}

export const resolveGameSelection = (
    contents: readonly [SelectableGameContent, SelectableGameContent, ...SelectableGameContent[]],
    selectedIndex: 0 | 1,
    excludedContentsIds: number[]
): GameSelectionResult => {
    const loserIndex = selectedIndex === 0 ? 1 : 0;
    const winnerContentId = contents[selectedIndex].contentsId;
    const loserContentId = contents[loserIndex].contentsId;

    return {
        winnerContentId,
        loserContentId,
        nextExcludedContents: excludedContentsIds.concat(loserContentId),
    };
};

export const createWorldCupGameRequest = (
    worldCupId: number,
    currentRound: number,
    excludedContentsIds: number[],
    initialRound: number
): WorldCupGameRequest => ({
    worldcupId: worldCupId,
    currentRound,
    sliceContents: 1,
    excludeContentsIds: excludedContentsIds.length === 0 ? undefined : excludedContentsIds.join(','),
    initialRound,
});
