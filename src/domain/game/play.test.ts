import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createWorldCupGameRequest } from './play';

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
