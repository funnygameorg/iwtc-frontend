'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useQueryGetWorldCupGameRound, worldCupGamePlay } from '@/services/WorldCupService';
import RoundPopup from '@/components/popup/RoundPopup';
import { useMutation } from '@tanstack/react-query';
import { isMP4, mappingMediaFile } from '@/utils/common';
import { useRouter } from 'next/navigation';
import { animated, useSpring } from '@react-spring/web';
import CustomYoutubePlayer from '@/components/youtubePlayer/CustomYoutubePlayer';
import Spiner from '@/components/common/Spiner';
import { createRoundLabels, getRoundProgressIncrement } from '@/domain/game/round';

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
    const [isSwapping, setIsSwapping] = useState<boolean>(false);
    const [firstSelectedRound, setFirstSelectedRound] = useState<number>(0);
    const [progressPercentage, setProgressPercentage] = useState<number>(0);
    const [roundLabels, setRoundLabels] = useState({});
    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {
        // 8강 기준 4번의 게임을 하면 4강으로 진출 71.4286
        // (100 / 7 ) * (4 + 1)
        // 16강 기준 8번의 게임을 하면 8강으로 진출
        // (100 / 15) * (8 + 1)
        // 8강에서 4강 계산 총 12번 클릭
        //
        //결승은 1
        // 4강은 2번
        // 8강은 6번
        // 16강은 14번에 결승 15번에 끝
        //32강은 30번에 결승 31번에 끝
        if (firstSelectedRound !== 0) {
            const percentage = getRoundProgressIncrement(firstSelectedRound);
            setProgressPercentage((prev) => prev + percentage);
        }
    }, [gameList]);

    useEffect(() => {
        if (firstSelectedRound !== 0) {
            const newRoundLabels = createRoundLabels(firstSelectedRound);
            setRoundLabels(newRoundLabels);
        }
    }, [firstSelectedRound]);

    const useSpringAnimation = (from: number, to: number) => {
        return useSpring(() => ({
            from: { x: from },
            to: { x: to },
            loop: {
                reset: true,
            },
        }));
    };

    const [left, leftApi] = useSpringAnimation(0, 0);
    const [light, lightApi] = useSpringAnimation(0, 0);

    const handleLeftImageClick = (left: number, light: number) => {
        leftApi.start({ to: { x: left } });
        lightApi.start({ to: { x: light } });
    };

    const handleRightImageClick = (light: number, left: number) => {
        lightApi.start({ to: { x: -light } });
        leftApi.start({ to: { x: -left } });
    };

    const getGame: any = useMutation(worldCupGamePlay, {
        onSuccess: async (data: any) => {
            setIsPlay(true);
            const list = await mappingMediaFile(data.data.contentsList);
            setIsLoding(false);
            setGameList(list);
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

    const handleSelection = async (index: number) => {
        if (isSwapping) return;
        setIsSwapping(true);
        if (index === 1) {
            handleLeftImageClick(400, 2000);
        } else {
            handleRightImageClick(400, 2000);
        }
        const loseConetentId = gameList[index].contentsId;
        const winContentId = gameList[index === 1 ? 0 : 1].contentsId;
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
            router.push(
                `/play-clear/${id}/${updatedRankContents.firstWinnerContentsId}/${updatedRankContents.secondWinnerContentsId}/${updatedRankContents.thirdWinnerContentsId}/${updatedRankContents.fourthWinnerContentsId}`
            );
            return;
            // 최종 선택 API 호출 후 return
        }
        // 배열을 2개씩 자름 결국 2개 남았을 때 클릭 하면 다음 라운드 진출
        if (gameList.length === 2) {
            setTimeout(() => {
                handleRightImageClick(0, 0);
                handleLeftImageClick(0, 0);
                setSelectRound((prev) => prev / 2);
                setIsSwapping(false);
            }, 1000);
            return;
        }
        setTimeout(() => {
            handleRightImageClick(0, 0);
            handleLeftImageClick(0, 0);
            const newGameList = gameList.slice(2);
            setGameList(newGameList);
            setIsSwapping(false);
        }, 1000);
        // useSpringAnimation(0, 0);
        //클릭한 아이템은 저장!
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
        return (
            <RoundPopup
                roundList={roundList}
                setSelectRound={setSelectRound}
                setFirstSelectedRound={setFirstSelectedRound}
            />
        );
    }

    if (isLoding) {
        return <Spiner />;
    }

    if (gameList.length > 0) {
        const wcTitle = roundList?.data?.worldCupTitle;
        const nameLength = wcTitle ? wcTitle.length : 0;
        const calculatedWidth = `${nameLength * 2}rem`; // 예시로 간단한 계산을 적용했습니다.
        return (
            <>
                <div className="grid h-full flex  place-items-center box-border" style={{ height: '1000px' }}>
                    {/* <div
                        className="absolute mx-auto left-0 right-0 text-center z-10 rounded-md shadow-md "
                        style={{ width: calculatedWidth }}
                    > */}
                    <div style={{ height: '15px' }} />
                    <h1 className="text-white text-2xl font-black">🔥 {roundList?.data?.worldCupTitle} 🔥</h1>
                    <h1 className="text-white text-2xl font-black">
                        {selectRound === 2 ? '결승' : selectRound + '강'}
                    </h1>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative ">
                        <div
                            className={`bg-blue-600 h-2.5 rounded-full absolute left-0 transition-width transition-all duration-700 ease-in-out`}
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                        {Object.entries(roundLabels).map(([label, position]) => (
                            <div
                                key={label}
                                className={`absolute ${
                                    Math.round(position as number) === Math.round(progressPercentage)
                                        ? 'text-blue text-1xl text-orange-500 font-bold'
                                        : 'text-white'
                                } flex`}
                                style={{
                                    left: `${position === 100 ? 96 : position}%`,
                                    transform: `translateX(${position === 100 ? `50` : '-50'}%)`,
                                }}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                    <div
                        // key={index}
                        className="absolute left-0 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${progressPercentage}%`, top: '50%' }}
                    >
                        {`4강`}
                    </div>
                    {/* </div> */}
                    <div className="relative flex p-4 text-black shadow " style={{ width: '1600px', height: '800px' }}>
                        {/* <div className="flex items-start relative" onClick={() => handleClick()}> */}
                        <animated.div
                            className={'flex items-start mx-auto left-0 right-0 w-full'}
                            style={{
                                ...left,
                            }}
                            onClick={() => handleSelection(1)}
                        >
                            {gameList[0]?.fileType === 'INTERNET_VIDEO_URL' ? (
                                <div className="flex items-center justify-center h-full">
                                    <CustomYoutubePlayer
                                        videoUrl={gameList[0]?.imgUrl}
                                        time={gameList[0]?.internetMovieStartPlayTime}
                                        width={'750'}
                                        height={'500'}
                                        playDuration={gameList[0]?.videoPlayDuration}
                                    />
                                </div>
                            ) : isMP4(gameList[0]?.imgUrl) ? (
                                <div className="flex items-center justify-center h-full">
                                    <video src={gameList[0]?.imgUrl} width={'700'} height={'300'} autoPlay muted loop />
                                </div>
                            ) : (
                                <>
                                    {/* {isLeftImageLoding && (
                                        <ImageSpiner
                                            style={
                                                'flex items-center justify-center mx-auto left-0 right-0 w-full h-full'
                                            }
                                        />
                                    )} */}
                                    <Image
                                        className="h-full w-full"
                                        src={gameList[0]?.imgUrl}
                                        width={'750'}
                                        height={'500'}
                                        alt={gameList[0]?.name}
                                        // onLoadingComplete={() => setIsLeftImageLoding(false)}
                                        // onError={() => setIsLeftImageLoding(true)}
                                        // style={{ display: isLeftImageLoding ? 'none' : 'block' }}
                                        // placeholder="blur"
                                    />
                                </>
                            )}
                            <div className="absolute bottom-10 left-10">
                                <div className="bg-white text-6xl font-bold text-black px-3 py-3 rounded-md">
                                    {gameList[0]?.name}
                                </div>
                            </div>
                        </animated.div>
                        {/* <div className="fixed bottom-0 left-0 bg-white p-4 text-white"> */}

                        {/* </div> */}
                        {/* </div> */}
                        {/* <div className="grid place-items-center "> */}
                        <div className="flex items-center justify-center">
                            <div className="absolute">
                                <div className="flex items-center justify-center h-screen">
                                    <div className="relative">
                                        <div className="px-6 py-6 bg-red-500 text-white font-extrabold text-4xl rounded-lg shadow-lg animate-bounce">
                                            VS
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <span className='text-white'>VS</span> */}
                        {/* <div className="flex items-end mx-auto left-0 right-0" onClick={() => handleSelection(0)}> */}
                        <animated.div
                            className={'flex items-end mx-auto left-0 right-0 w-full'}
                            style={{
                                ...light,
                            }}
                            onClick={() => handleSelection(0)}
                        >
                            {gameList[1]?.fileType === 'INTERNET_VIDEO_URL' ? (
                                <div className="flex items-center justify-center h-full">
                                    <CustomYoutubePlayer
                                        videoUrl={gameList[1]?.imgUrl}
                                        time={gameList[1]?.internetMovieStartPlayTime}
                                        width={'750'}
                                        height={'500'}
                                        playDuration={gameList[1]?.videoPlayDuration}
                                    />
                                </div>
                            ) : isMP4(gameList[1]?.imgUrl) ? (
                                <div className="flex items-center justify-center h-full">
                                    <video src={gameList[1]?.imgUrl} width={'700'} height={'300'} autoPlay muted loop />
                                </div>
                            ) : (
                                <Image
                                    className="h-full w-full"
                                    src={gameList[1]?.imgUrl}
                                    width={'750'}
                                    height={'500'}
                                    alt={gameList[1]?.name}
                                    // placeholder="blur"
                                />
                            )}
                            <div className="absolute bottom-10 right-10">
                                <div className="bg-white text-6xl font-bold text-black px-3 py-3 rounded-md">
                                    {gameList[1]?.name}
                                </div>
                            </div>
                        </animated.div>
                        {/* </div> */}
                    </div>
                </div>
                {/* <div className="grid place-items-center box-border h-32 w-32 p-4 border-4">GamePage</div> */}
            </>
        );
    }
};

export default Page;
