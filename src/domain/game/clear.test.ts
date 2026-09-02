import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createWorldCupClearRequest } from './clear';

describe('createWorldCupClearRequest', () => {
    it('separates the world cup id from winner ids', () => {
        assert.deepEqual(createWorldCupClearRequest(['10', '1', '2', '3', '4']), {
            worldCupId: '10',
            winnerParams: {
                firstWinnerContentsId: '1',
                secondWinnerContentsId: '2',
                thirdWinnerContentsId: '3',
                fourthWinnerContentsId: '4',
            },
        });
    });

    it('converts unselected zero values to undefined', () => {
        assert.deepEqual(createWorldCupClearRequest(['10', '1', '2', '0', '0']).winnerParams, {
            firstWinnerContentsId: '1',
            secondWinnerContentsId: '2',
            thirdWinnerContentsId: undefined,
            fourthWinnerContentsId: undefined,
        });
    });
});
