import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getYoutubeVideoId } from './youtube';

describe('getYoutubeVideoId', () => {
    it('extracts the video id from the supported watch URL', () => {
        assert.equal(getYoutubeVideoId('https://www.youtube.com/watch?v=video-id'), 'video-id');
    });

    it('returns undefined when a valid URL has no video id', () => {
        assert.equal(getYoutubeVideoId('https://www.youtube.com/watch'), undefined);
    });

    it('returns undefined for an invalid URL', () => {
        assert.equal(getYoutubeVideoId('not-a-url'), undefined);
    });
});
