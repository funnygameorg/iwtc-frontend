export interface WorldCupGameRequest {
    worldcupId: number;
    currentRound: number;
    sliceContents: number;
    excludeContentsIds?: string;
    initialRound: number;
}

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
