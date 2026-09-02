import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { normalizeClientManagedContent } from './content';

describe('normalizeClientManagedContent', () => {
    it('maps newly added content to the card model', () => {
        assert.deepEqual(
            normalizeClientManagedContent(
                {
                    id: 2,
                    contentsName: '후보 A',
                    videoStartTime: '00130',
                    videoPlayDuration: 3,
                    visibleType: 'PUBLIC',
                    fileType: 'file',
                    mediaPath: 'data:image/png;base64,example',
                    mediaFileId: 10,
                    mp4Type: false,
                    imgType: true,
                    detailFileType: 'IMAGE',
                    originalName: 'candidate.png',
                },
                2
            ),
            {
                id: 2,
                contentsId: undefined,
                contentsName: '후보 A',
                videoStartTime: '00130',
                videoPlayDuration: 3,
                visibleType: 'PUBLIC',
                fileType: 'file',
                mediaData: 'data:image/png;base64,example',
                mediaFileId: 10,
                mp4Type: false,
                imgType: true,
                detailFileType: 'IMAGE',
                originalName: 'candidate.png',
            }
        );
    });

    it('preserves the existing zero-id normalization', () => {
        assert.equal(
            normalizeClientManagedContent(
                {
                    id: 0,
                    contentsId: 0,
                    contentsName: '후보 B',
                    visibleType: 'PUBLIC',
                    fileType: 'file',
                },
                0
            ).contentsId,
            undefined
        );
    });
});
