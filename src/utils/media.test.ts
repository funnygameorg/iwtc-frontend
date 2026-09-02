import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getMimeType, isMP4 } from './media';

describe('media utilities', () => {
    describe('getMimeType', () => {
        it('extracts the MIME type from a data URL', () => {
            assert.equal(getMimeType('data:image/png;base64,example'), 'image/png');
        });

        it('returns null when the value is not a data URL', () => {
            assert.equal(getMimeType('https://example.com/video.mp4'), null);
        });
    });

    describe('isMP4', () => {
        it('identifies MP4 data URLs', () => {
            assert.equal(isMP4('data:video/mp4;base64,example'), true);
        });

        it('rejects other media types', () => {
            assert.equal(isMP4('data:image/jpeg;base64,example'), false);
        });

        it('preserves the existing empty-value behavior', () => {
            assert.equal(isMP4(''), undefined);
        });
    });
});
