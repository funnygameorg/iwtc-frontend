export const createWorldCupClearRequest = (routeParams: string[]) => {
    const [worldCupId, firstWinnerContentsId, secondWinnerContentsId, thirdWinnerContentsId, fourthWinnerContentsId] =
        routeParams.map((value) => (value === '0' ? undefined : value));

    return {
        worldCupId,
        winnerParams: {
            firstWinnerContentsId,
            secondWinnerContentsId,
            thirdWinnerContentsId,
            fourthWinnerContentsId,
        },
    };
};
