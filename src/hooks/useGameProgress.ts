import { createRoundLabels, getRoundProgressIncrement } from '@/domain/game/round';
import { useEffect, useState } from 'react';

export const useGameProgress = () => {
    const [initialRound, setInitialRound] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [roundLabels, setRoundLabels] = useState<Record<string, number>>({});

    useEffect(() => {
        if (initialRound !== 0) {
            setRoundLabels(createRoundLabels(initialRound));
        }
    }, [initialRound]);

    const advanceProgress = (round: number) => {
        if (round !== 0) {
            setProgressPercentage((previous) => previous + getRoundProgressIncrement(round));
        }
    };

    return {
        initialRound,
        progressPercentage,
        roundLabels,
        initializeProgress: setInitialRound,
        advanceProgress,
    };
};
