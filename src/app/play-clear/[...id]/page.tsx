'use client';
import { worldCupGameClear } from '@/services/WorldCupService';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const page = ({ params }: { params: { id: any } }) => {
    const [rankList, setRankList] = useState<any>();
    const { id } = params;
    // console.log('id, data', id, data);
    const { mutate, isLoading, error, isSuccess } = useMutation(worldCupGameClear, {
        onSuccess: (data) => {
            // router.push('/sign-in');

            setRankList(data.data);
            console.log('게임종료 API 성공 ===>', data.data);
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
                        <h1 className="text-2xl font-bold mb-4 text-center">왼쪽 영역 타이틀</h1>
                        <div className="flex">
                            <div className="w-1/4 bg-gray-300 p-2 h-5/6 flex flex-col justify-center items-center">
                                {/* 세로로 이미지 4개 배치 */}
                                <img src="/images/default.png" alt="이미지 1" className="mb-2" />
                                <img src="/images/default.png" alt="이미지 2" className="mb-2" />
                                <img src="/images/default.png" alt="이미지 3" className="mb-2" />
                            </div>
                            <div className="w-full bg-gray-300 flex justify-center items-center">
                                <img src="/images/default.png" alt="동일 높이 이미지" className="h-5/6 " />
                            </div>
                            {/* 예시로 h-96 사용 */}
                        </div>
                        <div className="bg-gray-300 h-1/5 mt-12">
                            <span>전체순위 영역</span>
                        </div>
                    </div>

                    <div className="w-4/12 p-4 bg-gray-200">
                        {/* 여기에 오른쪽 영역 컨텐츠를 넣으세요 */}
                        <h1 className="text-2xl font-bold mb-4 text-center">채팅</h1>
                        <div className="h-4/6 bg-gray-400">
                            <div className="w-3/12 p-4 bg-gray-500">
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold mb-2">댓글</h2>
                                    <ul>
                                        <li>댓글 1</li>
                                        <li>댓글 2</li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-2">댓글 작성</h2>
                                <form>
                                    <textarea
                                        className="w-full h-24 border rounded-md p-2 mb-2"
                                        placeholder="댓글을 입력하세요"
                                    ></textarea>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">댓글 작성</button>
                                </form>
                            </div>
                        </div>
                        <div className="h-1/4 bg-gray-400 mt-10">
                            <span>그래프영역</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default page;
