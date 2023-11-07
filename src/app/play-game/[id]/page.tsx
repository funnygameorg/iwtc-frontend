'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useQueryGetWorldCupGameRound, worldCupGamePlay } from '@/services/WorldCupService';
import RoundPopup from '@/components/popup/RoundPopup';
import { useMutation } from '@tanstack/react-query';
import { getEncodedArray } from '@/utils/common';

const Page = ({ params }: { params: { id: number } }) => {
    const { id } = params;
    const { data: roundList } = useQueryGetWorldCupGameRound(id);
    // const {worldCupTitle} = roundList?.data
    const [selectRound, setSelectRound] = useState<number>(0);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [gameList, setGameList] = useState<any>([]);
    const [saveClickContents, setSaveClickContents] = useState([]);

    const getGame: any = useMutation(worldCupGamePlay, {
        onSuccess: (data: any) => {
            setIsPlay(true);
            setGameList(data.data.contentsList);
        },
    });

    useEffect(() => {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.add('bg-black');

        return () => {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.remove('bg-black');
        };
    }, []);

    useEffect(() => {
        if (gameList) {
            console.log('gameList', gameList);
        }
    }, [gameList]);

    const handleSelection = (index: number) => {
        // selectRound가 2이면 결승
        setSaveClickContents(saveClickContents.concat(gameList[index].name));

        if (selectRound === 2) {
            // 최종 선택 API 호출 후 return
        }
        // 배열을 2개씩 자름 결국 2개 남았을 때 클릭 하면 다음 라운드 진출
        if (gameList.length === 2) {
            setSelectRound((prev) => prev / 2);
            return;
        }
        //클릭한 아이템은 저장!
        const newGameList = gameList.slice(2);
        setGameList(newGameList);
    };

    const playMutation = () => {
        const param = {
            worldcupId: id,
            currentRound: selectRound,
            divideContentsSizePerRequest: 1,
            alreadyPlayedContentsIds: saveClickContents.length < 1 ? undefined : saveClickContents.join('&'),
        };
        getGame.mutate(param);
    };

    useEffect(() => {
        if (selectRound) {
            playMutation();
        }
    }, [selectRound]);

    useEffect(() => {
        console.log('saveClickContents', saveClickContents);
    }, [saveClickContents]);

    // const handleSelection = (index) => {
    //     setSelectedIndex(index);
    // };

    if (!isPlay) {
        return <RoundPopup roundList={roundList} setSelectRound={setSelectRound} />;
    }

    return (
        <>
            <div className="grid h-screen place-items-center box-border">
                <h1 className="text-white text-3xl">{roundList?.data?.worldCupTitle}</h1>
                <h1 className="text-white text-3xl">{selectRound === 2 ? '결승' : selectRound}강</h1>

                <div className="flex p-4 text-black shadow" style={{ width: '1600px', height: '1000px' }}>
                    <div className="flex items-start" onClick={() => handleSelection(0)}>
                        <Image
                            className="h-full w-full"
                            src={gameList[0].filePath}
                            width={'750'}
                            height={'500'}
                            alt={gameList[0].name}
                        />
                    </div>
                    <div className="grid place-items-center ">
                        <span>VS</span>
                    </div>
                    <div className="flex items-end" onClick={() => handleSelection(1)}>
                        <Image
                            className="h-full w-full"
                            src={gameList[1].filePath}
                            width={'750'}
                            height={'500'}
                            alt={gameList[1].name}
                        />
                    </div>
                </div>
            </div>
            {/* <div className="grid place-items-center box-border h-32 w-32 p-4 border-4">GamePage</div> */}
        </>
    );
};

export default Page;
