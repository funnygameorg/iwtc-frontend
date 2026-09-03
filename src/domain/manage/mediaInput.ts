import { ManagedContentDraft } from './persistedContent';

interface SelectedMediaFile {
    name: string;
    type: string;
}

type ImageDraftFields = Pick<
    ManagedContentDraft,
    'originalName' | 'absoluteName' | 'mediaPath' | 'imgType' | 'detailFileType'
>;

export const createImageDraftFields = (
    file: SelectedMediaFile,
    readerResult: string | ArrayBuffer | null
): ImageDraftFields => {
    const mediaData = typeof readerResult === 'string' ? readerResult : '';

    return {
        originalName: file.name,
        absoluteName: file.name,
        mediaPath: mediaData,
        imgType: mediaData,
        detailFileType: file.type.replace('image/', '').toUpperCase(),
    };
};
