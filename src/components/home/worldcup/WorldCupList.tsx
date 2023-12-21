import CustomYoutubePlayer from '@/components/youtubePlayer/CustomYoutubePlayer';
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
        contentNum,
    } = wcList;
    return (
        <div className="p-4 max-w-sm">
            <div className="w-80 h-128 rounded overflow-hidden shadow-lg">
                <Link href={`/play-game/${contentNum}`}>
                    <div className="flex">
                        <div className="flex-1">
                          {reftFileType === 'INTERNET_VIDEO_URL' ? 
                          <div className="flex items-center justify-center h-full">
                              <CustomYoutubePlayer 
                                  videoUrl={reftImgMediaFileNo}
                                  time={reftVideoStartTime}
                                  width={'100%'}
                                  height={'100%'}
                              />
                          </div>
                            :
                            <Image
                                className="w-full h-52"
                                src={reftImgMediaFileNo}
                                width={'50'}
                                height={'10'}
                                alt={reftContentName ? reftContentName :"제공예정"}
                            />
                          }
                        
                        </div>
                        <div className="flex-1">
                        {rightFileType === 'INTERNET_VIDEO_URL' ? 
                            <div className="flex items-center justify-center h-full">
                              <CustomYoutubePlayer 
                                  videoUrl={rightImgMediaFileNo}
                                  time={rightVideoStartTime}
                                  width={'100%'}
                                  height={'100%'}
                              />
                            </div>
                            :
                            <Image
                                className="w-full h-52"
                                src={rightImgMediaFileNo}
                                width={'50'}
                                height={'10'}
                                alt={rightContentName ? rightContentName : '제공예정'}
                            />
                        }
                        </div>
                    </div>
                </Link>
                <div className="px-6 py-4 h-52">
                    <div className="font-bold text-xl mb-2">{gameTitle}</div>
                    <p className="text-gray-700 text-base">{description}</p>
                </div>
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
