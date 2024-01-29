import CustomYoutubePlayer from '@/components/youtubePlayer/CustomYoutubePlayer';
import { isMP4 } from '@/utils/common';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

const WorldCupList = ({ wcList }: any) => {
    const {
        gameTitle,
        reftContentName,
        reftImgMediaFileNo,
        reftFileType,
        reftVideoPlayDuration,
        reftVideoStartTime,
        rightContentName,
        rightImgMediaFileNo,
        rightFileType,
        rightVideoPlayDuration,
        rightVideoStartTime,
        description,
        worldCupId,
        detailType,
    } = wcList;
    return (
        <div className="p-4 max-w-sm">
            <div className="w-120 h-128 rounded overflow-hidden shadow-lg">
                <Link href={`/play-game/${worldCupId}`}>
                    <div className="flex h-2/3">
                        <div className="flex-1">
                            {reftFileType === 'INTERNET_VIDEO_URL' ? (
                                <div className="flex items-center justify-center h-full">
                                    <CustomYoutubePlayer
                                        videoUrl={reftImgMediaFileNo}
                                        time={reftVideoStartTime}
                                        width={'100%'}
                                        height={'100%'}
                                        playDuration={reftVideoPlayDuration}
                                    />
                                </div>
                            ) : isMP4(reftImgMediaFileNo) ? (
                                <div className="flex items-center justify-center h-full">
                                    <video
                                        src={reftImgMediaFileNo}
                                        width={'100%'}
                                        height={'100%'}
                                        autoPlay
                                        muted
                                        loop
                                    />
                                </div>
                            ) : (
                                <Image
                                    className="w-full h-52"
                                    src={reftImgMediaFileNo}
                                    width={'50'}
                                    height={'10'}
                                    alt={reftContentName ? reftContentName : '제공예정'}
                                />
                            )}
                        </div>
                        <div className="flex-1">
                            {rightFileType === 'INTERNET_VIDEO_URL' ? (
                                <div className="flex items-center justify-center h-full">
                                    <CustomYoutubePlayer
                                        videoUrl={rightImgMediaFileNo}
                                        time={rightVideoStartTime}
                                        width={'100%'}
                                        height={'100%'}
                                        playDuration={rightVideoPlayDuration}
                                    />
                                </div>
                            ) : isMP4(rightImgMediaFileNo) ? (
                                <div className="flex items-center justify-center h-full">
                                    <video
                                        src={rightImgMediaFileNo}
                                        width={'100%'}
                                        height={'100%'}
                                        autoPlay
                                        muted
                                        loop
                                    />
                                </div>
                            ) : (
                                <Image
                                    className="w-full h-52"
                                    src={rightImgMediaFileNo}
                                    width={'50'}
                                    height={'10'}
                                    alt={rightContentName ? rightContentName : '제공예정'}
                                />
                            )}
                        </div>
                    </div>
                    <div className="px-6 py-4 h-1/3">
                        <div className="font-bold text-xl mb-2">{gameTitle}</div>
                        <p className="text-gray-700 text-base">{description}</p>
                        <p className="text-gray-700 text-base">{''}</p>
                    </div>
                </Link>
            </div>
            {/* <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div> */}
        </div>
    );
};

export default WorldCupList;
