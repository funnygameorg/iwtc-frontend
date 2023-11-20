import React from 'react';

function YoutubePlayer({ videoId }) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div>
            <iframe
                width="560"
                height="315"
                src={embedUrl}
                title="YouTube Video Player"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default YoutubePlayer;