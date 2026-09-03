import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createWorldCupGameRequest, resolveGameContinuation, resolveGameSelection } from './play';

describe('createWorldCupGameRequest', () => {
    it('creates the initial round request without exclusions', () => {
        assert.deepEqual(createWorldCupGameRequest(10, 16, [], 16), {
            worldcupId: 10,
            currentRound: 16,
            sliceContents: 1,
            excludeContentsIds: undefined,
            initialRound: 16,
        });
    });

    it('serializes excluded content ids for the next request', () => {
        assert.deepEqual(createWorldCupGameRequest(10, 8, [3, 7, 9], 16), {
            worldcupId: 10,
            currentRound: 8,
            sliceContents: 1,
            excludeContentsIds: '3,7,9',
            initialRound: 16,
        });
    });
});

describe('resolveGameSelection', () => {
    const contents = [{ contentsId: 10 }, { contentsId: 20 }] as const;

    it('selects the left candidate and excludes the right candidate', () => {
        assert.deepEqual(resolveGameSelection(contents, 0, [3]), {
            winnerContentId: 10,
            loserContentId: 20,
            nextExcludedContents: [3, 20],
        });
    });

    it('selects the right candidate and excludes the left candidate', () => {
        assert.deepEqual(resolveGameSelection(contents, 1, [3]), {
            winnerContentId: 20,
            loserContentId: 10,
            nextExcludedContents: [3, 10],
        });
    });
});

describe('resolveGameContinuation', () => {
    it('finishes immediately after a final-round selection', () => {
        assert.deepEqual(resolveGameContinuation([1, 2], 2, [20], 8), {
            type: 'finish',
        });
    });

    it('requests half of the current round after its last pair', () => {
        assert.deepEqual(resolveGameContinuation([1, 2], 8, [20, 40], 8), {
            type: 'request-next-round',
            nextRound: 4,
            excludedContentsIds: [20, 40],
            initialRound: 8,
        });
    });

    it('removes the played pair while the current round still has candidates', () => {
        const contents = [{ contentsId: 1 }, { contentsId: 2 }, { contentsId: 3 }, { contentsId: 4 }];

        assert.deepEqual(resolveGameContinuation(contents, 8, [2], 8), {
            type: 'show-next-pair',
            remainingContents: [{ contentsId: 3 }, { contentsId: 4 }],
        });
    });
});
