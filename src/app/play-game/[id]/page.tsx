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
    // console.log('gameList', gameList);
    // const mappingMediaFile = async (test: any) => {
    //     const promises = test.map(async (item: any) => {
    //         getMediaFileAPI(item.mediaFileId)); // 각 mediaFileId에 대해 API를 호출하는 Promise 배열 생성
    //     const responses = await Promise.all(promises); // 모든 Promise가 완료될 때까지 기다림
    //     console.log('asdasdasdasd', responses);

    //     return responses; // API 응답 값들을 배열로 반환
    // };

    // const mappingMediaFile = async (gameList: any) => {
    //     const promises = gameList.map(async (item: any) => {
    //         try {
    //             const response = await getMediaFileAPI(item.mediaFileId); // API 호출
    //             item.imgUrl = response.data.mediaData;
    //             return item; // 응답을 객체에 추가
    //         } catch (error) {
    //             console.error(`API 호출 중 오류 발생: ${error}`);
    //             item.apiResponse = 'API 호출 에러'; // 에러 발생 시 처리
    //         }
    //     });

    //     const newGameList = await Promise.all(promises);
    //     return newGameList;
    // };
    const handleAnimationRest = () => {
        console.log('Animation finished.');
        // 여기에 원하는 작업을 추가할 수 있습니다.
    };

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
        return <RoundPopup roundList={roundList} setSelectRound={setSelectRound} />;
    }
    if (gameList) {
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
                                <Image
                                    className="h-full w-full"
                                    src={gameList[0]?.imgUrl}
                                    width={'750'}
                                    height={'500'}
                                    alt={gameList[0]?.name}
                                />
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
