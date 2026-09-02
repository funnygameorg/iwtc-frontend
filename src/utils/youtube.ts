export const getYoutubeVideoId = (youtubeUrl: string) => {
    try {
        const url = new URL(youtubeUrl);
        const searchParams = new URLSearchParams(url.search);

        return searchParams.get('v') ?? undefined;
    } catch {
        return undefined;
    }
};
