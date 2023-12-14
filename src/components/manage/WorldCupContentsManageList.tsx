'use client';
import React, { ChangeEvent, useContext, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';
import YoutubePlayer from '../youtubePlayer/YoutubePlayer';
import { WorldCupContentsManageContext } from '@/hooks/WorldCupContentsManageContext';
import InternetVideoUrlCard from './contentsListCard/InternetVideoUrlCard';
import StaticMediaFileTypeCard from './contentsListCard/StaticMediaFileTypeCard';
import { type } from 'os';

/*
    게임 관리 폼에서 월드컵 게임 컨텐츠에 관한 내용을 표현하는 폼
    TODO : 리스트의 Card 내용을 컴포넌트로 따로 분리하기
*/
const WorldCupContentsManageList = () => {
    // 유튜브 영상 상태
    const [youtubeUrl, setYoutubeUrl] = useState('');

    // 컨텐츠 데이터
    const [worldCupContents, setWorldCupContents] = useState({
        contentsName: '',
        visibleType: '',

        fileType: '',
        mediaPath: '',
        originalName: '',
        absoluteName: '',
        videoStartTime: '',
        videoPlayDuration: '',
    });

    const {
        contentsName,
        visibleType,

        fileType,
        mediaPath,
        originalName,
        absoluteName,
        videoStartTime,
        videoPlayDuration,
    } = worldCupContents;

    const handleCreateWorldCupContents = (e: any) => {
        const { name, value } = e.target;

        setWorldCupContents((prevWorldCupContents) => ({
            ...prevWorldCupContents,
            [name]: value,
        }));
    };

    console.log(worldCupContents);

    /*
        새로운 컨텐츠를 적용
    */

    const { worldCupContentsManageContext, setWorldCupContentsManageContext } = useContext(
        WorldCupContentsManageContext
    ) as any;

    // 비디오 형식 컨텐츠 데이터 검증
    const verifyVideoTypeContents = ({ videoStartTime, videoPlayDuration }: any) => {
        const size5AndOnlyNumberRegex = /^\d{5}$/;
        if (!size5AndOnlyNumberRegex.test(videoStartTime)) {
            alert("'영상 시작 시간'은 '00000'의 형식입니다. \n 예 : 10분 1초 -> 01001, 0분 30초 -> 00030");
            throw Error();
        }

        if (!(3 <= videoPlayDuration && videoPlayDuration <= 5)) {
            alert('반복 시간은 3~5초로 설정해주세요.');
            throw Error();
        }
    };

    // 파일 형식 컨텐츠 데이터 검증
    const verifyFileTypeContents = ({ mediaPath, originalName }: any) => {
        if (mediaPath === '' || originalName === '') {
            alert('파일이 존재하지 않습니다.');
            throw Error();
        }
    };

    // 컨텐츠 데이터 검증 공통 파트
    const verifyAllTypeContents = ({ contentsName, visibleType, fileType }: any) => {
        if (contentsName === '') {
            alert('컨텐츠 이름이 없습니다.');
            throw Error();
        }

        if (!(visibleType === 'PUBLIC' || fileType === 'PRIVATE')) {
            alert('공개 여부를 선택해주세요.');
            throw Error();
        }

        if (!(fileType === 'video' || fileType === 'file')) {
            alert('파일 타입이 존재하지 않음');
            throw Error();
        }
    };

    // 새로운 컨텐츠를 리스트 추가
    const applyNewContents = () => {
        verifyAllTypeContents({ contentsName, visibleType, fileType });

        if (fileType === 'video') {
            verifyVideoTypeContents({ videoStartTime, videoPlayDuration });
        }

        if (fileType === 'file') {
            verifyFileTypeContents({ mediaPath, originalName });
        }

        const newContent = {
            contentsName,
            visibleType,
            fileType,
            mediaPath,
            originalName,
            absoluteName,
            videoStartTime,
            videoPlayDuration,
        };
        handleMediaFileType('');
        setWorldCupContentsManageContext((prev: any) => [...prev, newContent]);
    };

    // 공개 여부 상태
    const [selectedValue, setSelectedValue] = useState('option1');

    const handleVisibleType = (value: any) => {
        setWorldCupContents((prevWorldCupContents) => ({
            ...prevWorldCupContents,
            visibleType: value,
        }));

        setSelectedValue(value);
    };

    // 생성하기 원하는 이상형의 미디어파일 타입 상태
    const [mediaFileType, setMediaFileType] = useState('');

    const handleMediaFileType = (value: any) => {
        setWorldCupContents({
            contentsName: '',
            visibleType: 'PUBLIC',
            fileType: value,
            mediaPath: '',
            originalName: '',
            absoluteName: '',
            videoStartTime: '',
            videoPlayDuration: '',
        });
        setIsImageLoaded(false);
        if (imgRef.current) {
            imgRef.current.src = '';
        }
        setYoutubeUrl('');
        setMediaFileType(value);
    };

    // 정적 파일 입력 컴포넌트
    const imgRef = useRef<HTMLImageElement>(null);

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const staticMediaFileType = () => {
        const readImage = (e: React.ChangeEvent<HTMLInputElement>) => {
            setIsImageLoaded(true);

            if (!e.target.files?.length) return;

            const imageFile = e.target.files[0];
            const reader = new FileReader();

            setWorldCupContents((prevWorldCupContents) => ({
                ...prevWorldCupContents,
                originalName: imageFile.name,
                absoluteName: imageFile.name,
            }));

            reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
                if (!e || !e.target) return;
                if (typeof e.target.result !== 'string' || !imgRef.current) return;

                imgRef.current.src = e.target.result;
                setWorldCupContents((prevWorldCupContents: any) => ({
                    ...prevWorldCupContents,
                    mediaPath: e.target?.result,
                }));
            });

            reader.readAsDataURL(imageFile);
        };

        return (
            <div className="mb-2">
                <strong>파일</strong>
                <div className="mb-3 w-96">
                    <input
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        type="file"
                        id="formFileMultiple"
                        name="mediaPath"
                        onChange={readImage}
                        multiple
                    />
                    {isImageLoaded === true ? (
                        <div style={{ marginTop: '10px' }}>
                            <img ref={imgRef} width={'auto'} height={100} alt="img" />
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        );
    };

    // 동영상 URL 입력 폼 컴포넌트
    const internetVideoUrl = () => {
        return (
            <div className="mb-2">
                <strong className="ml-1">동영상 링크</strong>
                <div>
                    <div className="flex">
                        <input
                            id="videoLinkInput"
                            type="text"
                            className=" w-full h-10 p-1 border rounded-xl"
                            name="mediaPath"
                            value={mediaPath}
                            placeholder="유튜브 동영상 링크"
                            onChange={handleCreateWorldCupContents}
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className="mr-2">
                        <div className="ml-1">영상 시작 시간</div>
                        <input
                            type="text"
                            className="p-1 border rounded-xl"
                            name="videoStartTime"
                            value={videoStartTime}
                            onChange={handleCreateWorldCupContents}
                            placeholder="형식 : 00000"
                        />
                    </div>
                    <div>
                        <div className="ml-1">반복 시간</div>
                        <input
                            type="text"
                            className="p-1 border rounded-xl"
                            name="videoPlayDuration"
                            value={videoPlayDuration}
                            onChange={handleCreateWorldCupContents}
                            placeholder="3~5초 사이"
                        />
                    </div>
                </div>
                <div className="m-5">
                    <YoutubePlayer url={mediaPath} componentType={'uploadForm'} />
                </div>
            </div>
        );
    };

    // 미디어 파일 타입 선택 컴포넌트
    const choiceMediaTypeComponent = () => {
        return (
            <div className="mb-2">
                <div className="mb-3">
                    <strong> ✅ 만들고 싶은 이상형 파일의 종류를 선택해주세요 </strong>
                </div>
                <div className="mb-4">
                    <button
                        className={`px-4 py-2 border rounded-md mr-4 ${
                            mediaFileType === 'video' ? 'bg-blue-500 text-white' : 'bg-white'
                        }`}
                        onClick={() => handleMediaFileType('video')}
                    >
                        유튜브 영상
                    </button>
                    <button
                        className={`px-4 py-2 border rounded-md ${
                            mediaFileType === 'file' ? 'bg-blue-500 text-white' : 'bg-white'
                        }`}
                        onClick={() => handleMediaFileType('file')}
                    >
                        이미지 파일
                    </button>
                </div>
            </div>
        );
    };

    // 공개 여부 선택 컴포넌트
    const choiceVisibleTypeComponent = () => {
        return (
            <div className="mb-2">
                <div className="mb-3">
                    <strong>공개 여부 </strong>
                </div>
                <div className="flex items-center space-x-4 ml-3">
                    <label
                        className={`inline-flex items-center px-4 py-2 border rounded-md cursor-pointer ${
                            visibleType === 'PUBLIC' ? 'bg-blue-500 text-white' : 'bg-white'
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
                            onChange={() => {}}
                        />
                    </label>

                    <label
                        className={`inline-flex items-center px-4 py-2 border rounded-md cursor-pointer ${
                            visibleType === 'PRIVATE' ? 'bg-blue-500 text-white' : 'bg-white'
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
                            onChange={() => {}}
                        />
                    </label>
                </div>
            </div>
        );
    };

    // 임시 더미데이터
    const applyContentsList = worldCupContentsManageContext;

    // TODO : 월드컵 생성 폼 컴포넌트 분리하기
    const createWorldCupComponent = () => {
        return (
            <div className="w-full h-full mb-4 p-4 border rounded-xl shadow bg-gray-200">
                {mediaFileType !== '' ? (
                    <div className="flex justify-between">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="flex-1 min-w-0">
                                <div className="mb-2">
                                    <strong className="ml-1">이상형 이름</strong>
                                    <div className="flex flex-col space-y-2">
                                        <input
                                            id="textInput"
                                            type="text"
                                            className="p-1 border rounded-xl"
                                            placeholder="이상형 이름"
                                            name="contentsName"
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
                                <button
                                    className="bg-green-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                    onClick={() => applyNewContents()}
                                >
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
                    <div>{choiceMediaTypeComponent()}</div>
                )}
            </div>
        );
    };

    return (
        <div>
            <div className="mt8 mb-4">
                <span className="h-4 w-4 bg-green-500 rounded-full inline-block mr-2"></span>
                <span>새로운 이상형 컨텐츠 {applyContentsList.length}개</span>
            </div>
            {createWorldCupComponent()}
            {applyContentsList.length !== 0 ? (
                applyContentsList.map((contents: any, index: number) =>
                    contents.fileType === 'video' ? (
                        <InternetVideoUrlCard key={index} index={index} contents={contents} />
                    ) : (
                        <StaticMediaFileTypeCard key={index} index={index} contents={contents} />
                    )
                )
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default WorldCupContentsManageList;
