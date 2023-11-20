"use client";
import React, { useContext, useState } from 'react';
import dummyManageContentsState, { ManageContentsItemType } from './dummyContentsList';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';
import YoutubePlayer from '../youtubePlayer/YoutubePlayer';




/*
    게임 관리 폼에서 월드컵 게임 컨텐츠에 관한 내용을 표현하는 폼
    TODO : 리스트의 Card 내용을 컴포넌트로 따로 분리하기
*/
const WorldCupContentsManageList = () => {

    // 유튜브 영상 상태
    const [youtubeUrl, setYoutubeUrl] = useState('');


    // 영상 컴포넌트 리로딩
    const handleYoutubeUrl = (data: any) => {
        let url;

        try {
            url = new URL(data.mediaPath);
        } catch (err) {
            alert('영상 주소를 다시 확인해주세요.');
        }

        // URLSearchParams를 사용하여 매개변수 추출
        const searchParams = new URLSearchParams(url.search);

        // 'v' 매개변수의 값을 가져오기
        const videoId = searchParams.get('v');
        setYoutubeUrl(videoId)
    }



    // 컨텐츠 데이터 
    const [worldCupContents, setWorldCupContents] = useState({
        contentsName: '',
        visibleType: '',

        fileType: '',
        mediaPath: '',
        originalName: '',
        absoluteName: '',
        videoStartTime: '',
        videoPlayDuration: ''

    });
    console.log("컨텐츠 ", worldCupContents);
    const {
        contentsName,
        visibleType,

        fileType,
        mediaPath,
        originalName,
        absoluteName,
        videoStartTime,
        videoPlayDuration

    } = worldCupContents;

    const handleCreateWorldCupContents = (e: any) => {

        const { name, value } = e.target;

        setWorldCupContents(prevWorldCupContents => ({
            ...prevWorldCupContents,
            [name]: value
        }));

    };

    // 공개 여부 상태
    const [selectedValue, setSelectedValue] = useState('option1');


    const handleVisibleType = (value) => {

        setWorldCupContents(prevWorldCupContents => ({
            ...prevWorldCupContents,
            visibleType: value
        }));

        setSelectedValue(value);
    };


    // 생성하기 원하는 이상형의 미디어파일 타입 상태
    const [mediaFileType, setMediaFileType] = useState('');

    const handleMediaFileType = (value) => {
        setWorldCupContents(prevWorldCupContents => ({
            ...prevWorldCupContents,
            fileType: value
        }));

        setMediaFileType(value);
    };



    // 정적 파일 입력 컴포넌트
    const staticMediaFileType = () => {
        return (
            <div className="mb-2">
                <strong>파일</strong>
                <div>
                    <input
                        type="text"
                        value="파일 넣기"
                        className="ml-2 p-1 border rounded"
                    />
                </div>
            </div>
        )
    }



    // 동영상 URL 입력 폼 컴포넌트
    const internetVideoUrl = () => {
        return (
            <div className="mb-2">
                <strong className='ml-1'>동영상 링크</strong>
                <div>
                    <div className="flex">
                        <input
                            id="videoLinkInput"
                            type="text"
                            className=" w-full h-10 p-1 border rounded-xl"
                            name='mediaPath'
                            value={mediaPath}
                            placeholder="유튜브 동영상 링크"
                            onChange={handleCreateWorldCupContents}
                        />
                        <div className='ml-3'>
                            <button
                                className="bg-orange-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleYoutubeUrl({ mediaPath })}
                            >
                                check
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <div className='mr-2'>
                        <div className='ml-1'>
                            영상 시작 시간
                        </div>
                        <input
                            type="text"
                            className="p-1 border rounded-xl"
                            name='videoStartTime'
                            value={videoStartTime}
                            onChange={handleCreateWorldCupContents}
                            placeholder='형식 : 00000'
                        />
                    </div>
                    <div>
                        <div className='ml-1'>
                            반복 시간
                        </div>
                        <input
                            type="text"
                            className="p-1 border rounded-xl"
                            name='videoPlayDuration'
                            value={videoPlayDuration}
                            onChange={handleCreateWorldCupContents}
                            placeholder='3~5초 사이'
                        />
                    </div>
                </div>
                <div className='m-5'>
                    <YoutubePlayer videoId={youtubeUrl} />
                </div>
            </div >
        )
    }



    // 미디어 파일 타입 선택 컴포넌트
    const choiceMediaTypeComponent = () => {
        return (
            <div className="mb-2">
                <div className='mb-3'>
                    <strong> ✅ 만들고 싶은 이상형 파일의 종류를 선택해주세요 </strong>
                </div>
                <div className="mb-4">
                    <button
                        className={`px-4 py-2 border rounded-md mr-4 ${mediaFileType === 'video' ? 'bg-blue-500 text-white' : 'bg-white'
                            }`}
                        onClick={() => handleMediaFileType('video')}
                    >
                        유튜브 영상
                    </button>
                    <button
                        className={`px-4 py-2 border rounded-md ${mediaFileType === 'file' ? 'bg-blue-500 text-white' : 'bg-white'
                            }`}
                        onClick={() => handleMediaFileType('file')}
                    >
                        이미지 파일
                    </button>
                </div>


            </div>

        );
    }


    // 미디어 파일 노출 컴포넌트
    const thumbnailMediaFileComponent = () => {
        return (
            <div className="flex min-w-0 gap-x-4">
                <Image
                    className="w-full h-52"
                    src='https://picsum.photos/seed/gf/600/800'
                    width={'50'}
                    height={'10'}
                />
            </div>
        );
    }

    // 공개 여부 선택 컴포넌트
    const choiceVisibleTypeComponent = () => {
        return (
            <div className="mb-2">
                <div className='mb-3'>
                    <strong>공개 여부 </strong>
                </div>
                <div className="flex items-center space-x-4 ml-3">

                    <label
                        className={`inline-flex items-center px-4 py-2 border rounded-md cursor-pointer ${selectedValue === 'PUBLIC' ? 'bg-blue-500 text-white' : 'bg-white'
                            }`}
                        onClick={() => handleVisibleType('PUBLIC')}
                    >
                        공개
                        <input
                            type="radio"
                            className="hidden"
                            name="radioOption"
                            value="option1"
                            checked={selectedValue === 'PUBLIC'}
                            defaultChecked={true}
                            onChange={() => { }}
                        />
                    </label>

                    <label
                        className={`inline-flex items-center px-4 py-2 border rounded-md cursor-pointer ${selectedValue === 'PRIVATE' ? 'bg-blue-500 text-white' : 'bg-white'
                            }`}
                        onClick={() => handleVisibleType('PRIVATE')}
                    >
                        비공개
                        <input
                            type="radio"
                            className="hidden"
                            name="radioOption"
                            value="option2"
                            checked={selectedValue === 'PRIVATE'}
                            onChange={() => { }}
                        />
                    </label>

                </div>


            </div>
        );
    }




    // 임시 더미데이터
    const [contents] = dummyManageContentsState();

    // TODO : 월드컵 생성 폼 컴포넌트 분리하기
    const createWorldCupComponent = () => {
        return (

            <div className="w-full h-full mb-4 p-4 border rounded-xl shadow bg-gray-200">
                {mediaFileType !== '' ? (
                    < div className='flex justify-between'>

                        <div className="flex min-w-0 gap-x-4">

                            <div className='flex-1 min-w-0'>

                                <div className="mb-2">
                                    <strong className='ml-1'>이상형 이름</strong>
                                    <div className="flex flex-col space-y-2">
                                        <input
                                            id="textInput"
                                            type="text"
                                            className="p-1 border rounded-xl"
                                            placeholder="이상형 이름"
                                            name='contentsName'
                                            value={contentsName}
                                            onChange={handleCreateWorldCupContents}
                                        />
                                    </div>
                                </div>
                                {mediaFileType === 'file' ? staticMediaFileType() : internetVideoUrl()}
                                {choiceVisibleTypeComponent()}
                            </div>



                        </div>

                        <div className="sm:flex sm:flex-col sm:items-end">
                            <div>
                                <button className="bg-green-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded">
                                    추가하기
                                </button>
                            </div>
                            <div>
                                <button
                                    className="bg-orange-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                    onClick={() => handleMediaFileType('')}
                                >
                                    돌아가기
                                </button>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div>
                        {choiceMediaTypeComponent()}
                    </div>)
                }
            </div >
        )
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
