
import React from 'react';



// 플레이어 사용 위치에 따라 플레이어 크기 선택
const getPlayerSize = (componentType) => {
    const uploadComponentWidth = 560;
    const uploadComponentHeight = 315;

    const uploadListComponentWidth = 400;
    const uploadListComponentHeight = 200;

    if (componentType == 'uploadForm') {
        return [uploadComponentWidth, uploadComponentHeight];
    } else if (componentType == 'uploadList') {
        return [uploadListComponentWidth, uploadListComponentHeight];
    } else {
        alert('sorry..');
    }
}



// 유튜브 URL로 비디오 ID 획득
const getVideoIdByYoutubeUrl = (data) => {

    let url;
    try {
        url = new URL(data);

        const searchParams = new URLSearchParams(url.search);

        return searchParams.get('v');
    } catch (err) {

    }
}




const YoutubePlayer = ({ url, componentType }) => {

    const videoId = getVideoIdByYoutubeUrl(url);

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const [width, height] = getPlayerSize(componentType);

    return (
        <div>
            <iframe
                width={width}
                height={height}
                src={embedUrl}
                title="YouTube Video Player"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default YoutubePlayer;