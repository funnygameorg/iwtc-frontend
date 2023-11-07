'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useQueryGetWorldCupGameRound, worldCupGamePlay } from '@/services/WorldCupService';
import RoundPopup from '@/components/popup/RoundPopup';
import { useMutation } from '@tanstack/react-query';

const Page = ({ params }: { params: { id: number } }) => {
    const { id } = params;
    const { data: roundList } = useQueryGetWorldCupGameRound(id);
    // const {worldCupTitle} = roundList?.data
    const [selectRound, setSelectRound] = useState<number>(0);

    const gameList:any = useMutation(worldCupGamePlay, {
      onSuccess: (data: any) => {
        console.log("data", data);
      }
    })

    useEffect(() => {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.add('bg-black');

        return () => {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.remove('bg-black');
        };
    }, []);

    const playMutation = 
      () => {
        const param = {
          worldcupId: id,
          currentRound: selectRound,
          divideContentsSizePerRequest: 2,
          alreadyPlayedContentsIds: undefined
        };
        gameList.mutate(param);
      }
      
    ;

    // useEffect(() => {
    //     if (selectRound) {
    //         playMutation();
    //     }
    // }, [selectRound]);

    
    
    return (
        <>
            <RoundPopup roundList={roundList} setSelectRound={setSelectRound} />
            <div className="grid h-screen place-items-center box-border">
            <h1 className='text-white text-3xl'>{roundList?.data?.worldCupTitle}</h1>
                <div className="flex p-4 text-black shadow" style={{ width: '1600px', height: '1000px' }}>
                    <div className="flex items-start">
                        <Image
                            className="h-full w-full"
                            src={'/images/default.png'}
                            width={'750'}
                            height={'500'}
                            alt={''}
                        />
                    </div>
                    <div className="grid place-items-center ">
                        <span>VS</span>
                    </div>
                    <div className="flex items-end">
                        <Image
                            className="h-full w-full"
                            src={'/images/default.png'}
                            width={'750'}
                            height={'500'}
                            alt={''}
                        />
                    </div>
                </div>
            </div>
            {/* <div className="grid place-items-center box-border h-32 w-32 p-4 border-4">GamePage</div> */}
        </>
    );
};

export default Page;
// public/images/default.png
