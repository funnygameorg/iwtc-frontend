import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createRoundLabels, getRoundProgressIncrement } from './round';

describe('game round progress', () => {
    it('calculates the progress increment from the initial round', () => {
        assert.equal(getRoundProgressIncrement(4), 100 / 3);
        assert.equal(getRoundProgressIncrement(8), 100 / 7);
        assert.equal(getRoundProgressIncrement(16), 100 / 15);
    });

    it('creates labels for a four-player tournament', () => {
        assert.deepEqual(createRoundLabels(4), {
            '4강': 0,
            결승: 100,
        });
    });

    it('creates labels for an eight-player tournament', () => {
        assert.deepEqual(createRoundLabels(8), {
            '8강': 0,
            '4강': (100 / 7) * 5,
            결승: 100,
        });
    });

    it('creates labels for a sixteen-player tournament', () => {
        assert.deepEqual(createRoundLabels(16), {
            '16강': 0,
            '8강': (100 / 15) * 9,
            '4강': (100 / 15) * 13,
            결승: 100,
        });
    });
});
