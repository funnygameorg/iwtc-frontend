import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { hasRetryableUnauthorizedRequest } from './axiosError';

describe('hasRetryableUnauthorizedRequest', () => {
    it('rejects a network error without a response', () => {
        assert.equal(hasRetryableUnauthorizedRequest({ config: { url: '/world-cups' } }), false);
    });

    it('rejects an unauthorized response without request config', () => {
        assert.equal(hasRetryableUnauthorizedRequest({ response: { status: 401 } }), false);
    });

    it('rejects a configured non-unauthorized response', () => {
        assert.equal(
            hasRetryableUnauthorizedRequest({ response: { status: 500 }, config: { url: '/world-cups' } }),
            false
        );
    });

    it('accepts an unauthorized response with retry config', () => {
        const config = { url: '/world-cups' };
        const error = { response: { status: 401 }, config };

        assert.equal(hasRetryableUnauthorizedRequest(error), true);
        assert.equal(error.config, config);
    });
});
