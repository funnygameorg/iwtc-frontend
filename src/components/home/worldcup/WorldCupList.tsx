'use client';
import { useQueryGetWorldCupAllList, worldCupAllList } from '@/services/WorldCupService';
import Image from 'next/image';
import React, { useEffect } from 'react';

const WorldCupList = ({wcList} : any) => {

    return (
        <div className="w-80 h-128 rounded overflow-hidden shadow-lg">
            <div className="flex">
                <div className="flex-1">
                    <Image
                        className="w-full h-52"
                        src="/images/default.png"
                        width={'50'}
                        height={'10'}
                        alt="Sunset in the mountains"
                    />
                </div>
                <div className="flex-1">
                    <Image
                        className="w-full h-52"
                        src="/images/default.png"
                        width={'50'}
                        height={'10'}
                        alt="Sunset in the mountains"
                    />
                </div>
            </div>
            <div className="px-6 py-4 h-52">
                <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nullㅁㄴㅇㅁㄴㅇㅁㄴa!
                </p>
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
