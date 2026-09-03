import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { WCListDataType } from '../../interfaces/models/world-cup/WcListData';
import { mapWorldCupListMedia, WorldCupListMediaLoader } from './worldCupListMedia';

const createItem = (): WCListDataType => ({
    reftContentName: 'left',
    rightContentName: 'right',
    description: 'description',
    worldCupId: 1,
    gameTitle: 'title',
    reftImgMediaFileNo: 10,
    rightImgMediaFileNo: 20,
});

const media = (mediaData: string) => ({
    data: {
        mediaData,
        fileType: 'STATIC_MEDIA_FILE',
    },
});

describe('mapWorldCupListMedia', () => {
    it('maps both sides when both media requests succeed', async () => {
        const loader: WorldCupListMediaLoader = async (id) => media(id === 10 ? 'left-image' : 'right-image');

        const [result] = await mapWorldCupListMedia([createItem()], loader);

        assert.equal(result.reftImgMediaFileNo, 'left-image');
        assert.equal(result.rightImgMediaFileNo, 'right-image');
    });

    it('preserves the existing shifted placement when only the left request rejects', async () => {
        const loader: WorldCupListMediaLoader = async (id) => {
            if (id === 10) throw new Error('left failed');
            return media('right-image');
        };

        const [result] = await mapWorldCupListMedia([createItem()], loader);

        assert.equal(result.reftImgMediaFileNo, 'right-image');
        assert.equal(result.rightImgMediaFileNo, '/images/default.png');
    });

    it('keeps the left response in place when only the right request rejects', async () => {
        const loader: WorldCupListMediaLoader = async (id) => {
            if (id === 20) throw new Error('right failed');
            return media('left-image');
        };

        const [result] = await mapWorldCupListMedia([createItem()], loader);

        assert.equal(result.reftImgMediaFileNo, 'left-image');
        assert.equal(result.rightImgMediaFileNo, '/images/default.png');
    });

    it('uses both fallback images when both requests reject', async () => {
        const loader: WorldCupListMediaLoader = async () => {
            throw new Error('failed');
        };

        const [result] = await mapWorldCupListMedia([createItem()], loader);

        assert.equal(result.reftImgMediaFileNo, '/images/default.png');
        assert.equal(result.rightImgMediaFileNo, '/images/default.png');
    });
});
