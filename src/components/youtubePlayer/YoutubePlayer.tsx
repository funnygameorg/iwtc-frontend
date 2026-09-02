import { getYoutubeVideoId } from '@/utils/youtube';

interface IProps {
    url?: string;
    componentType: 'uploadForm' | 'uploadList';
}

const YoutubePlayer = ({ url, componentType }: IProps) => {
    // 플레이어 사용 위치에 따라 플레이어 크기 선택
    const getPlayerSize = (componentType: IProps['componentType']): [number, number] => {
        const uploadComponentWidth = 560;
        const uploadComponentHeight = 315;

        const uploadListComponentWidth = 400;
        const uploadListComponentHeight = 200;

        if (componentType === 'uploadForm') {
            return [uploadComponentWidth, uploadComponentHeight];
        }

        return [uploadListComponentWidth, uploadListComponentHeight];
    };

    const videoId = getYoutubeVideoId(url || '');

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const [width, height] = getPlayerSize(componentType);

    return (
        <div>
            <iframe width={width} height={height} src={embedUrl} title="YouTube Video Player" allowFullScreen></iframe>
        </div>
    );
};

export default YoutubePlayer;
