export const getRoundProgressIncrement = (initialRound: number) => 100 / (initialRound - 1);

export const createRoundLabels = (initialRound: number) => {
    const labels: Record<string, number> = {};
    let currentRound = initialRound;
    let positionIncrement = 100;
    let completedMatchCount = initialRound / 2;

    while (currentRound > 2) {
        if (currentRound === initialRound) {
            labels[`${currentRound}강`] = 100 - positionIncrement;
            positionIncrement /= 2;
        } else {
            labels[`${currentRound}강`] = getRoundProgressIncrement(initialRound) * (completedMatchCount + 1);
            completedMatchCount += currentRound / 2;
        }
        currentRound /= 2;
    }

    labels['결승'] = 100;

    return labels;
};
