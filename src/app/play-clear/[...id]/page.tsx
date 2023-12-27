'use client';
import RankListWrapper from '@/components/Rank/RankListWrapper';
import ReplyRegisterForm from '@/components/reply/ReplyRegisterForm';
import ReplyList from '@/components/reply/ReplyList';
import { useQueryGetWorldCupGameResultRankList, worldCupGameClear } from '@/services/WorldCupService';
import { useQueryGetReplyList, worldCupGameReplyRegister } from '@/services/ReplyService';
import { mappingMediaFile } from '@/utils/common';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import CustomYoutubePlayer from '@/components/youtubePlayer/CustomYoutubePlayer';

const Page = ({ params }: { params: { id: any } }) => {
    const [rankList, setRankList] = useState<any>();
    const { id } = params;
    const { data: reply, isSuccess: replyIsSuccess } = useQueryGetReplyList(id[0], 0);
    const { data: allRankList, isSuccess: allRankIsSuccess } = useQueryGetWorldCupGameResultRankList(id[0]);

    const { mutate, isLoading, error, isSuccess } = useMutation(worldCupGameClear, {
        onSuccess: async (data) => {
            const mappingLsit = await mappingMediaFile(data.data);
            setRankList(mappingLsit);
        },
        onError: (error) => {
            console.log('에러', error);
        },
    });

    useEffect(() => {
        mutate(id);
    }, []);
    // 게임 종료 API 응답값에 컨텐츠 ID를 내가 보내는데 응답값에 ID에 대한 게임 이름 데이터 내려줘야함
    if (isSuccess && rankList) {
        return (
            <>
                <div className="flex h-screen">
                    {/* 왼쪽 영역 */}
                    <div className="w-8/12 p-4 bg-blue-200 h-100% ">
                        {/* 여기에 왼쪽 영역 컨텐츠를 넣으세요 */}
                        <h1 className="text-2xl font-bold mb-4 text-center">월드컵 우승</h1>
                        <div className="flex">
                            <div className="w-1/4 bg-gray-100 rounded-md shadow-md p-2 h-5/6 flex flex-col justify-center items-center">
                                {/* 세로로 이미지 4개 배치 */}
                                <ul>
                                    {rankList.map((items: any) => {
                                        if (items.rank !== 1) {
                                            return items.fileType === 'INTERNET_VIDEO_URL' ? (
                                                <li className="text-center" key={items.contentsId}>
                                                    <span>{items.rank}등</span>
                                                    <CustomYoutubePlayer
                                                        videoUrl={items.imgUrl}
                                                        time={items.videoStartTime}
                                                        width={'100%'}
                                                        height={'100%'}
                                                        isAutoPlay={false}
                                                        playDuration={items.videoPlayDuration}
                                                    />
                                                </li>
                                            ) : (
                                                <li className="text-center" key={items.contentsId}>
                                                    <span>{items.rank}등</span>
                                                    {/* <Image src={items.imgUrl} alt={items.contentsName} className="mb-2"/> */}
                                                    <img src={items.imgUrl} alt={items.contentsName} className="mb-2" />
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </div>
                            <ul className="w-full bg-gray-100 rounded-md shadow-md ">
                                {rankList.map((items: any) => {
                                    if (items.rank === 1) {
                                        return items.fileType === 'INTERNET_VIDEO_URL' ? (
                                            <li className="w-full h-full flex justify-center items-center">
                                                <CustomYoutubePlayer
                                                    videoUrl={items.imgUrl}
                                                    time={items.videoStartTime}
                                                    width={'600'}
                                                    height={'400'}
                                                    playDuration={items.videoPlayDuration}
                                                />
                                            </li>
                                        ) : (
                                            <>
                                                <li className="w-full h-full flex justify-center items-center ">
                                                    {/* <span>{items.rank}</span> */}
                                                    <img src={items.imgUrl} alt={items.contentsId} className="h-5/6" />
                                                </li>
                                            </>
                                        );
                                    }
                                })}
                            </ul>
                            {/* 예시로 h-96 사용 */}
                        </div>
                        <RankListWrapper contentsId={id[0]} />
                    </div>

                    <div className="w-4/12 p-4 bg-blue-200" style={{ height: '100%' }}>
                        {/* 여기에 오른쪽 영역 컨텐츠를 넣으세요 */}
                        <h1 className="text-2xl font-bold mb-4 text-center">채팅</h1>
                        <div className="h-full flex flex-col">
                            <section
                                className="bg-gray-100 rounded-md shadow-md py-8 antialiased h-full"
                                // style={{ height: 'auto' }}
                            >
                                <div className="max-w-2xl mx-auto px-4">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                            댓글 ({reply.data.length})
                                        </h2>
                                    </div>
                                    {reply.data.map((items: any, idx: number) => {
                                        return <ReplyList key={idx} replyData={items} />;
                                    })}
                                </div>
                            </section>
                            <div>
                                <ReplyRegisterForm worldcupId={id[0]} contentsId={id[1]} />
                            </div>
                        </div>

                        {/* <div className="h-1/4 bg-gray-400 mt-10">
                            <span>그래프영역</span>
                        </div> */}
                    </div>
                </div>
            </>
        );
    }
};

export default Page;
