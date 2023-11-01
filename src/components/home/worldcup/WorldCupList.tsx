'use client';
import { useQueryGetWorldCupAllList, worldCupAllList } from '@/services/WorldCupService';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

const WorldCupList = ({ wcList }: any) => {
    const { gameTitle, reftContentName, reftImgPath, rightContentName, rightImgPath, description, contentNum } = wcList;

    return (
        <div className="p-4 max-w-sm">
            <div className="w-80 h-128 rounded overflow-hidden shadow-lg">
                <Link href="/play-game">
                    <div className="flex">
                        <div className="flex-1">
                            <Image
                                className="w-full h-52"
                                src={reftImgPath}
                                width={'50'}
                                height={'10'}
                                alt={reftContentName}
                            />
                        </div>
                        <div className="flex-1">
                            <Image
                                className="w-full h-52"
                                src={rightImgPath}
                                width={'50'}
                                height={'10'}
                                alt={rightContentName}
                            />
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
