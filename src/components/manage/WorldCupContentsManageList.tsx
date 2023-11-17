"use client";
import React, { useContext, useState } from 'react';
import dummyManageContentsState, { ManageContentsItemType } from './dummyContentsList';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';




/*
    게임 관리 폼에서 월드컵 게임 컨텐츠에 관한 내용을 표현하는 폼
    TODO : 리스트의 Card 내용을 컴포넌트로 따로 분리하기
*/
const WorldCupContentsManageList = () => {



    // 임시 더미데이터
    const [contents] = dummyManageContentsState();

    // TODO : 월드컵 생성 폼 컴포넌트 분리하기
    const createWorldCupComponent = () => {
        return (
            <div className="w-full h-full mb-4 p-4 border rounded-xl shadow bg-gray-200">
                <div className='flex justify-between'>
                    <div className="flex min-w-0 gap-x-4">

                        <div className="flex min-w-0 gap-x-4">
                            <Image
                                className="w-full h-52"
                                src='https://picsum.photos/seed/gf/600/800'
                                width={'50'}
                                height={'10'}
                            />
                        </div>

                        <div>
                            <div className='flex-1 min-w-0'>

                                <div className="mb-2">
                                    <strong>컨텐츠 이름:</strong> [텍스트 인풋 필드]
                                </div>
                                <div className="mb-2">
                                    <strong>파일 :</strong>
                                    <input
                                        type="text"
                                        value="파일 넣기"
                                        className="ml-2 p-1 border rounded"
                                    />
                                </div>

                                <div className="mb-2">
                                    <strong>공개 여부:</strong> [라디오 박스]
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:flex sm:flex-col sm:items-end">
                        <div>
                            <button className="bg-green-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded">
                                추가하기
                            </button>
                        </div>

                    </div>


                </div>
            </div>
        );
    }



    return (
        <div>
            <div className="mt8">
                <span className="h-4 w-4 bg-green-500 rounded-full inline-block mr-2">
                </span>
                <span>
                    새로운 이상형 컨텐츠 1개
                </span>
            </div>
            {createWorldCupComponent()}
            {contents.length !== 0 ?
                (
                    contents.map((content, index) => (

                        // TODO : Card 컴포넌트 분리하기
                        <div key={index} className="mb-4 p-4 border rounded-xl shadow-sm">
                            <div className='flex justify-between'>
                                <div className="flex min-w-0 gap-x-4">

                                    <div className="flex min-w-0 gap-x-4">
                                        <Image
                                            className="w-full h-52"
                                            src='https://picsum.photos/seed/gf/600/800'
                                            width={'50'}
                                            height={'10'}
                                        />
                                    </div>

                                    <div>
                                        <div className='flex-1 min-w-0'>
                                            <div className="mb-2">
                                                <strong>컨텐츠 이름:</strong> {content.name}
                                            </div>
                                            <div className="mb-2">
                                                <strong>파일 경로:</strong>
                                                <input
                                                    type="text"
                                                    value={content.filePath}
                                                    className="ml-2 p-1 border rounded"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <strong>공개 여부:</strong> {content.isVisible === 'PUBLIC' ? "공개" : "비공개"}
                                            </div>

                                            <div className="mb-2">
                                                <strong>게임 랭크:</strong> {content.gameRank}
                                            </div>

                                            <div>
                                                <strong>게임 스코어:</strong> {content.gameScore}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="sm:flex sm:flex-col sm:items-end">
                                    <div>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded">
                                            삭제/ 삭제 취소
                                        </button>
                                    </div>
                                    <div>
                                        <span className="h-4 w-4 bg-green-500 rounded-full inline-block mr-2"></span>
                                        변경 이상형
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                    )
                ) : (<div></div>)
            }
        </div >
    );
};



export default WorldCupContentsManageList;
