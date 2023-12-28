'use client';
import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

interface IProps {
    videoUrl: string;
    time: string;
    width: string;
    height: string;
    isAutoPlay?: boolean;
    playDuration: number;
}

const CustomYoutubePlayer = ({ videoUrl, time, width, height, isAutoPlay = true, playDuration = 3 }: IProps) => {
    const playerRef = useRef(null);
    let currentRepeat = 0; // 현재 반복 횟수

    const onReady = (event: any) => {
        playerRef.current = event.target;
    };

    const onStateChange = (event: any) => {
        // 동영상 재생이 끝나면
        if (event.data === YouTube.PlayerState.ENDED) {
            // 특정 구간 내에서 반복 재생
            event.target.seekTo(time);
            event.target.playVideo();
        }
    };

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
                width: width,
                height: height,
                playerVars: {
                    autoplay: isAutoPlay ? 1 : 0, //자동재생 O
                    rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                    modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음,
                    start: convertTimeToSeconds(time),
                    end: convertTimeToSeconds(time) + playDuration + 1,
                    controls: 0,
                    mute: 1,
                },
            }}
            onReady={onReady}
            onStateChange={onStateChange}
            // onEnd={(e) => {
            //     e.target.stopVideo(0);
            // }}
        />
    );
};

export default CustomYoutubePlayer;
