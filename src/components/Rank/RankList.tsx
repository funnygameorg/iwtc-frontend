import React from 'react';
import Image from 'next/image';
import CustomYoutubePlayer from '../youtubePlayer/CustomYoutubePlayer';

interface IProps {
    contentsName: string;
    rank: number;
    imgUrl: string;
    fileType: string;
    videoStartTime?: any;
    videoPlayDuration?: any;
    gameScore: number;
}

const RankList = ({ contentsName, rank, imgUrl, fileType, videoStartTime, videoPlayDuration, gameScore }: IProps) => {
    return (
        <>
            <li className="w-full h-full py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4 w-full justify-between">
                    <div className=" space-x-4">
                        <span className="text-2xl font-semibold">{rank}등</span>
                        <span className="text-lg">{contentsName}</span>
                        <span>{gameScore} point</span>
                    </div>
                    {fileType === 'INTERNET_VIDEO_URL' ? (
                        <CustomYoutubePlayer
                            videoUrl={imgUrl}
                            time={videoStartTime}
                            width={'100%'}
                            height={'75%'}
                            isAutoPlay={false}
                            playDuration={videoPlayDuration}
                        />
                    ) : (
                        <Image
                            className="w-52 h-40 ml-auto"
                            src={imgUrl}
                            width={'50'}
                            height={'10'}
                            alt={contentsName}
                        />
                    )}
                </div>
                {/* 추가적인 정보가 있다면 여기에 추가하세요 */}
            </li>
        </>
    );
};

export default RankList;
