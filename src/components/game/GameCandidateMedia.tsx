import CustomYoutubePlayer from '@/components/youtubePlayer/CustomYoutubePlayer';
import { MappedMediaContent } from '@/domain/game/mediaFile';
import { WorldCupGameContent } from '@/interfaces/models/world-cup/WcGameData';
import { isMP4 } from '@/utils/common';
import Image from 'next/image';

interface GameCandidateMediaProps {
    content: MappedMediaContent<WorldCupGameContent>;
}

const GameCandidateMedia = ({ content }: GameCandidateMediaProps) => {
    if (content.fileType === 'INTERNET_VIDEO_URL') {
        return (
            <div className="flex items-center justify-center h-full">
                <CustomYoutubePlayer
                    videoUrl={content.imgUrl}
                    time={content.internetMovieStartPlayTime}
                    width={'750'}
                    height={'500'}
                    playDuration={content.videoPlayDuration}
                />
            </div>
        );
    }

    if (isMP4(content.imgUrl)) {
        return (
            <div className="flex items-center justify-center h-full">
                <video src={content.imgUrl} width={'700'} height={'300'} autoPlay muted loop />
            </div>
        );
    }

    return (
        <Image
            className="h-full w-full"
            src={content.imgUrl}
            width={'750'}
            height={'500'}
            alt={content.name}
        />
    );
};

export default GameCandidateMedia;
