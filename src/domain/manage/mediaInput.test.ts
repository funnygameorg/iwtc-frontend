import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createImageDraftFields } from './mediaInput';

describe('createImageDraftFields', () => {
    it('maps the selected image metadata and reader data to draft fields', () => {
        assert.deepEqual(
            createImageDraftFields(
                { name: 'candidate.png', type: 'image/png' },
                'data:image/png;base64,example'
            ),
            {
                originalName: 'candidate.png',
                absoluteName: 'candidate.png',
                mediaPath: 'data:image/png;base64,example',
                imgType: 'data:image/png;base64,example',
                detailFileType: 'PNG',
            }
        );
    });

    it('preserves the existing empty fallback for a non-string reader result', () => {
        assert.deepEqual(createImageDraftFields({ name: 'candidate.png', type: 'image/png' }, null), {
            originalName: 'candidate.png',
            absoluteName: 'candidate.png',
            mediaPath: '',
            imgType: '',
            detailFileType: 'PNG',
        });
    });
});
