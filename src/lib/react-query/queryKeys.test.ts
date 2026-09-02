import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { manageWorldCupQueryKeys, replyQueryKeys, worldCupQueryKeys } from './queryKeys';

describe('React Query keys', () => {
    it('preserves the existing world cup keys', () => {
        assert.deepEqual(worldCupQueryKeys.rounds(10), ['wcRounds', 10]);
        assert.deepEqual(worldCupQueryKeys.rank(), ['AllRankList']);
    });

    it('preserves the existing manage keys', () => {
        assert.deepEqual(manageWorldCupQueryKeys.lists(), ['MyWorldCupList']);
        assert.deepEqual(manageWorldCupQueryKeys.detail(10), ['MyWorldCup', 10]);
        assert.deepEqual(manageWorldCupQueryKeys.contents(10), ['MyWorldCupContentsList', 10]);
    });

    it('creates a prefix key that matches every reply list', () => {
        assert.deepEqual(replyQueryKeys.lists(), ['worldCupReplyList']);
        assert.deepEqual(replyQueryKeys.list(10, 20), ['worldCupReplyList', 10, 20]);
    });
});
