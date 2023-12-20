import React from 'react';
import YouTube from 'react-youtube';

interface IProps {
    videoUrl: string;
    time: string;
}

const CustomYoutubePlayer = ({ videoUrl, time }: IProps) => {
    const getVideoIdByYoutubeUrl = (data: any): any => {
        let url;
        try {
            url = new URL(data);

            const searchParams = new URLSearchParams(url.search);

            return searchParams.get('v');
        } catch (err) {}
    };

    const convertTimeToSeconds = (timeString: string) => {
        // 문자열을 시, 분, 초로 분리
        const hours = parseInt(timeString?.substring(0, 1));
        const minutes = parseInt(timeString?.substring(1, 3));
        const seconds = parseInt(timeString?.substring(3, 5));

        // 시, 분, 초를 초로 환산하여 반환
        return hours * 3600 + minutes * 60 + seconds;
    };

    return (
        <YouTube
            iframeClassName="vod-box"
            videoId={getVideoIdByYoutubeUrl(videoUrl)}
            opts={{
                width: '750',
                height: '500',
                playerVars: {
                    autoplay: 1, //자동재생 O
                    // rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                    // modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음,
                    start: convertTimeToSeconds(time),
                },
            }}
            onEnd={(e) => {
                e.target.stopVideo(0);
            }}
        />
    );
};

export default CustomYoutubePlayer;
