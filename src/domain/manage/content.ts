import { ManagedContent, ManagedContentDraft } from './persistedContent';

export const validateManagedContentDraft = (contents: ManagedContentDraft): string | null => {
    if (contents.contentsName === '') {
        return '컨텐츠 이름이 없습니다.';
    }

    if (!(contents.visibleType === 'PUBLIC' || contents.visibleType === 'PRIVATE')) {
        return '공개 여부를 선택해주세요.';
    }

    if (!(contents.fileType === 'video' || contents.fileType === 'file')) {
        return '파일 타입이 존재하지 않음';
    }

    if (contents.fileType === 'video') {
        if (!/^\d{5}$/.test(contents.videoStartTime)) {
            return "'영상 시작 시간'은 '00000'의 형식입니다. \n 예 : 10분 1초 -> 01001, 0분 30초 -> 00030";
        }

        const playDuration = Number(contents.videoPlayDuration);
        if (!(3 <= playDuration && playDuration <= 5)) {
            return '반복 시간은 3~5초로 설정해주세요.';
        }
    }

    if (contents.fileType === 'file' && (contents.mediaPath === '' || contents.originalName === '')) {
        return '파일이 존재하지 않습니다.';
    }

    return null;
};

export const normalizeClientManagedContent = (contents: ManagedContent, index: number): ManagedContent => ({
    id: index,
    contentsId: contents.contentsId || undefined,
    contentsName: contents.contentsName,
    videoStartTime: contents.videoStartTime,
    videoPlayDuration: contents.videoPlayDuration,
    visibleType: contents.visibleType,
    fileType: contents.fileType,
    mediaData: contents.mediaPath,
    mediaFileId: contents.mediaFileId,
    mp4Type: contents.mp4Type,
    imgType: contents.imgType,
    detailFileType: contents.detailFileType,
    originalName: contents.originalName,
});
