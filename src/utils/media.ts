export const getMimeType = (mediaData: string) => {
    const dataPrefix = 'data:';
    const mimeIndex = mediaData.indexOf(dataPrefix);
    if (mimeIndex === -1) {
        return null;
    }

    const mimeTypeAndBase64 = mediaData.substring(mimeIndex + dataPrefix.length);
    return mimeTypeAndBase64.split(';')[0];
};

export const isMP4 = (mediaData: string) => {
    if (mediaData) {
        const mimeType = getMimeType(mediaData);
        if (mimeType === null) {
            return false;
        }

        return mimeType === 'video/mp4';
    }
};
