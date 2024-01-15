'use client';
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { type } from 'os';
import ManageCardWrapper from './contentsListCard/ManageCardWrapper';
import AlertPopup from '../popup/AlertPopup';
import { PopupContext } from '../PopupProvider';
import { FFmpeg, createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import SelectFileType from './SelectFileType';
import SelectVisibleType from './SelectVisibleType';
import ImageTypeLayout from './ImageTypeLayout';
import YoutubeTypeLayout from './YoutubeTypeLayout';

/*
    게임 관리 폼에서 월드컵 게임 컨텐츠에 관한 내용을 표현하는 폼
    TODO : 리스트의 Card 내용을 컴포넌트로 따로 분리하기
*/

// const ffmpeg: FFmpeg = createFFmpeg({
//     // corePath: '../../node_modules/@ffmpeg/core/dist/ffmpeg-core.js',
//     // corePath: '/ffmpeg/core@0.11.0/ffmpeg-core.js',
//     corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
//     log: true,
// });
interface IProps {
    worldCupContentsList: any;
    setWorldCupContentsList: any;
    worldCupId: any;
}

const WorldCupContentsManageList = ({ worldCupContentsList, setWorldCupContentsList, worldCupId }: IProps) => {
    const { showPopup, hidePopup } = useContext(PopupContext);

    const imgRef = useRef<any>(null);
    const videoRef = useRef<any>(null);

    const [mediaFileType, setMediaFileType] = useState('');
    const [isImageLoaded, setIsImageLoaded] = useState(false);

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
        mp4Type: '',
        imgType: '',
        detailFileType: '',
    });

    useEffect(() => {
        //ffmpeg load
        // load();
    }, []);

    // const load = async () => {
    //     await ffmpeg.load();
    //     setReady(true);
    // };

    const handleCreateWorldCupContents = (e: any) => {
        const { name, value } = e.target;

        setWorldCupContents((prevWorldCupContents) => ({
            ...prevWorldCupContents,
            [name]: value,
        }));
    };

    // 비디오 형식 컨텐츠 데이터 검증
    const verifyVideoTypeContents = ({ videoStartTime, videoPlayDuration }: any) => {
        const size5AndOnlyNumberRegex = /^\d{5}$/;
        if (!size5AndOnlyNumberRegex.test(videoStartTime)) {
            showAlertPopup("'영상 시작 시간'은 '00000'의 형식입니다. \n 예 : 10분 1초 -> 01001, 0분 30초 -> 00030");
            return false;
        }

        if (!(3 <= videoPlayDuration && videoPlayDuration <= 5)) {
            showAlertPopup('반복 시간은 3~5초로 설정해주세요.');
            return false;
        }
        return true;
    };

    // 파일 형식 컨텐츠 데이터 검증
    const verifyFileTypeContents = ({ mediaPath, originalName }: any) => {
        if (mediaPath === '' || originalName === '') {
            showAlertPopup('파일이 존재하지 않습니다.');
            return false;
        }
        return true;
    };

    // 컨텐츠 데이터 검증 공통 파트
    const verifyAllTypeContents = () => {
        const { contentsName, visibleType, fileType } = worldCupContents;
        if (contentsName === '') {
            showAlertPopup('컨텐츠 이름이 없습니다.');
            return;
        }

        if (!(visibleType === 'PUBLIC' || visibleType === 'PRIVATE')) {
            showAlertPopup('공개 여부를 선택해주세요.');
            return;
        }

        if (!(fileType === 'video' || fileType === 'file')) {
            showAlertPopup('파일 타입이 존재하지 않음');
            return;
        }
        return true;
    };

    const showAlertPopup = (maeeage: string) => {
        showPopup(<AlertPopup message={maeeage} hidePopup={hidePopup} />);
    };

    // 새로운 컨텐츠를 리스트 추가
    const applyNewContents = () => {
        const { fileType, videoStartTime, videoPlayDuration, mediaPath, originalName } = worldCupContents;
        const isVerify = verifyAllTypeContents();
        if (isVerify) {
            if (fileType === 'video') {
                if (!verifyVideoTypeContents({ videoStartTime, videoPlayDuration })) return;
            }

            if (fileType === 'file') {
                if (!verifyFileTypeContents({ mediaPath, originalName })) return;
            }

            handleMediaFileType('');
            // setWorldCupContentsList((prev: any) => [...prev, worldCupContents]);
            setWorldCupContentsList((prev: any) => {
                const id = prev.length; // 이 예제에서는 배열의 길이를 인덱스로 사용
                const updatedContents = { ...worldCupContents, id };
                console.log('updatedContents', updatedContents);
                return [...prev, updatedContents];
            });
        }
    };

    const handleVisibleType = (value: any) => {
        setWorldCupContents((prevWorldCupContents) => ({
            ...prevWorldCupContents,
            visibleType: value,
        }));
    };

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
            mp4Type: '',
            imgType: '',
            detailFileType: '',
        });
        setIsImageLoaded(false);
        if (imgRef.current) {
            imgRef.current.src = '';
        }
        setMediaFileType(value);
    };

    return (
        <div>
            <div className="w-full h-full mb-4 p-4 border rounded-xl shadow bg-gray-200">
                <div>
                    <SelectFileType mediaFileType={mediaFileType} handleMediaFileType={handleMediaFileType} />
                </div>
                {mediaFileType && (
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
                                            value={worldCupContents.contentsName}
                                            onChange={handleCreateWorldCupContents}
                                        />
                                    </div>
                                </div>
                                {mediaFileType === 'file' ? (
                                    <ImageTypeLayout
                                        isImageLoaded={isImageLoaded}
                                        setIsImageLoaded={setIsImageLoaded}
                                        setWorldCupContents={setWorldCupContents}
                                        fowardVideoRef={videoRef}
                                        fowardImgRef={imgRef}
                                        mp4Type={worldCupContents.mp4Type}
                                        imgType={worldCupContents.imgType}
                                    />
                                ) : (
                                    <YoutubeTypeLayout
                                        mediaPath={worldCupContents.mediaPath}
                                        videoStartTime={worldCupContents.videoStartTime}
                                        videoPlayDuration={worldCupContents.videoPlayDuration}
                                        handleCreateWorldCupContents={handleCreateWorldCupContents}
                                    />
                                )}
                                <SelectVisibleType
                                    visibleType={worldCupContents.visibleType}
                                    handleVisibleType={handleVisibleType}
                                />
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
                )}
            </div>
            {worldCupContentsList.length > 0 &&
                worldCupContentsList.map((contents: any, index: number) => (
                    <ManageCardWrapper
                        key={index}
                        contents={contents}
                        index={contents.id}
                        worldCupId={worldCupId}
                        setWorldCupContentsList={setWorldCupContentsList}
                        worldCupContentsList={worldCupContentsList}
                    />
                ))}
        </div>
    );
};

export default WorldCupContentsManageList;
