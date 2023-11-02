'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { worldCupGameRound } from '@/services/WorldCupService';
import RoundPopup from '@/components/popup/RoundPopup';

const page = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.add('bg-black');

        return () => {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.remove('bg-black');
        };
    }, []);
    useEffect(() => {
        test();
    }, []);

    const test = async () => {
        const response = await worldCupGameRound(1);
        console.log('response ===>', response);
    };

    return (
        <RoundPopup />
        // <div className="grid h-screen place-items-center box-border">
        //     <div className="flex p-4 text-black shadow" style={{ width: '1600px', height: '1000px' }}>
        //         <div className="flex items-start">
        //             <Image
        //                 className="h-full w-full"
        //                 src={'/images/default.png'}
        //                 width={'750'}
        //                 height={'500'}
        //                 alt={''}
        //             />
        //         </div>
        //         <div className="grid place-items-center ">
        //             <span>VS</span>
        //         </div>
        //         <div className="flex items-end">
        //             <Image
        //                 className="h-full w-full"
        //                 src={'/images/default.png'}
        //                 width={'750'}
        //                 height={'500'}
        //                 alt={''}
        //             />
        //         </div>
        //     </div>
        // </div>
        // <div className='grid place-items-center box-border h-32 w-32 p-4 border-4'>
        //   GamePage
        // </div>
    );
};

export default page;
// public/images/default.png
