import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { mergeMediaFile } from './mediaFile';

describe('mergeMediaFile', () => {
    it('adds media response fields without changing content fields', () => {
        const content = {
            contentsId: 10,
            contentsName: '후보 A',
            mediaFileId: 20,
        };

        assert.deepEqual(
            mergeMediaFile(content, {
                mediaData: 'data:image/png;base64,example',
                fileType: 'STATIC_MEDIA_FILE',
                videoStartTime: '00100',
                videoPlayDuration: 3,
            }),
            {
                contentsId: 10,
                contentsName: '후보 A',
                mediaFileId: 20,
                imgUrl: 'data:image/png;base64,example',
                fileType: 'STATIC_MEDIA_FILE',
                videoStartTime: '00100',
                videoPlayDuration: 3,
            }
        );
    });

    it('preserves the existing fallback image when media lookup fails', () => {
        const content = {
            contentsId: 10,
            mediaFileId: 20,
        };

        assert.deepEqual(mergeMediaFile(content, undefined), {
            contentsId: 10,
            mediaFileId: 20,
            imgUrl: '/images/default.png',
        });
    });
});
