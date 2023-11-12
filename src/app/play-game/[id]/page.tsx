'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useQueryGetWorldCupGameRound, worldCupGamePlay } from '@/services/WorldCupService';
import RoundPopup from '@/components/popup/RoundPopup';
import { useMutation } from '@tanstack/react-query';
import { getEncodedArray } from '@/utils/common';
import { useRouter } from 'next/navigation';

const Page = ({ params }: { params: { id: number } }) => {
    const router = useRouter();

    const { id } = params;
    const { data: roundList } = useQueryGetWorldCupGameRound(id);
    // const {worldCupTitle} = roundList?.data
    const [selectRound, setSelectRound] = useState<number>(0);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [gameList, setGameList] = useState<any>([]);
    const [saveClickContents, setSaveClickContents] = useState([]);
    const [rankContents, setRankContents] = useState({
        firstWinnerContentsId: 0,
        secondWinnerContentsId: 0,
        thirdWinnerContentsId: 0,
        fourthWinnerContentsId: 0,
    });

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
        const loseConetentId = gameList[index].contentsId;
        const winContentId = gameList[index === 1 ? 0 : index].contentsId;
        // selectRound가 2이면 결승
        setSaveClickContents(saveClickContents.concat(loseConetentId));
        if (selectRound === 4) {
            if (rankContents.fourthWinnerContentsId !== 0) {
                const updatedRankContents = { ...rankContents, thirdWinnerContentsId: loseConetentId };
                setRankContents(updatedRankContents);
            } else {
                const updatedRankContents = { ...rankContents, fourthWinnerContentsId: loseConetentId };
                setRankContents(updatedRankContents);
            }
        }

        if (selectRound === 2) {
            const updatedRankContents = {
                ...rankContents,
                firstWinnerContentsId: winContentId,
                secondWinnerContentsId: loseConetentId,
            };
            // setRankContents(updatedRankContents);
            console.log('last click ===>', updatedRankContents);
            router.push(
                `/play-clear/${id}/${updatedRankContents.firstWinnerContentsId}/${updatedRankContents.secondWinnerContentsId}/${updatedRankContents.thirdWinnerContentsId}/${updatedRankContents.fourthWinnerContentsId}`
            );
            return;
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
            sliceContents: 1,
            excludeContentsIds: saveClickContents.length < 1 ? undefined : saveClickContents.join(','),
        };
        getGame.mutate(param);
    };

    useEffect(() => {
        if (selectRound) {
            playMutation();
        }
    }, [selectRound]);

    if (!isPlay) {
        return <RoundPopup roundList={roundList} setSelectRound={setSelectRound} />;
    }

    return (
        <>
            <div className="grid h-screen place-items-center box-border">
                <div className="fixed flex p-4 text-black shadow" style={{ width: '1600px', height: '100%' }}>
                    <div className="fixed mx-auto left-0 right-0 text-center">
                        <h1 className="text-white text-3xl">{roundList?.data?.worldCupTitle}</h1>
                        <h1 className="text-white text-3xl">{selectRound === 2 ? '결승' : selectRound + '강'}</h1>
                    </div>
                    <div className="flex items-start" onClick={() => handleSelection(1)}>
                        <span className="fixed text-white text-3xl bottom-0 left-0">{gameList[0].name}</span>

                        <Image
                            className="h-full w-full"
                            src={gameList[0].filePath}
                            width={'750'}
                            height={'500'}
                            alt={gameList[0].name}
                        />
                    </div>
                    {/* <div className="grid place-items-center "> */}
                    <div className="flex items-center justify-center">
                        <div className="fixed">
                            <div className="absolute px-12 py-6 bg-gradient-to-r from-blue-400 via-red-500 to-yellow-500 text-white font-black text-6xl rounded-full shadow-xl opacity-75 transform scale-y-1 animate-pulse infinite">
                                VS
                            </div>
                            <div className="px-12 py-6 bg-gradient-to-l from-green-400 via-purple-500 to-pink-500 text-white font-black text-6xl rounded-full shadow-xl animate-spin-slow animate-bounce infinite">
                                VS
                            </div>
                        </div>
                    </div>
                    {/* <span className='text-white'>VS</span> */}
                    <div className="flex items-end mx-auto left-0 right-0" onClick={() => handleSelection(0)}>
                        <Image
                            className="h-full w-full"
                            src={gameList[1].filePath}
                            width={'750'}
                            height={'500'}
                            alt={gameList[1].name}
                        />
                        <span className="block text-white text-3xl">{gameList[1].name}</span>
                    </div>
                </div>
            </div>
            {/* <div className="grid place-items-center box-border h-32 w-32 p-4 border-4">GamePage</div> */}
        </>
    );
};

export default Page;
