'use client';
import React, { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import ManageCardWrapper from './contentsListCard/ManageCardWrapper';
import AlertPopup from '../popup/AlertPopup';
import { PopupContext } from '@/providers/PopupProvider';
import { FFmpeg, createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import SelectFileType from './SelectFileType';
import SelectVisibleType from './SelectVisibleType';
import ImageTypeLayout from './ImageTypeLayout';
import YoutubeTypeLayout from './YoutubeTypeLayout';
import {
    ManagedContent,
    ManagedContentDraft,
    PersistedManagedContentView,
} from '@/domain/manage/persistedContent';
import { validateManagedContentDraft } from '@/domain/manage/content';

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
    worldCupContentsList: ManagedContent[];
    setWorldCupContentsList: Dispatch<SetStateAction<ManagedContent[]>>;
    setModifyList?: Dispatch<SetStateAction<PersistedManagedContentView[]>>;
    setDeleteList?: Dispatch<SetStateAction<PersistedManagedContentView[]>>;
    setNewList?: Dispatch<SetStateAction<ManagedContent[]>>;
    newList?: ManagedContent[];
}

const WorldCupContentsManageList = ({
    worldCupContentsList,
    setWorldCupContentsList,
    setModifyList,
    setDeleteList,
    setNewList,
    newList = [],
}: IProps) => {
    const { showPopup, hidePopup } = useContext(PopupContext);

    const imgRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [mediaFileType, setMediaFileType] = useState('');
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // 컨텐츠 데이터
    const [worldCupContents, setWorldCupContents] = useState<ManagedContentDraft>({
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

    const handleCreateWorldCupContents = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setWorldCupContents((prevWorldCupContents) => ({
            ...prevWorldCupContents,
            absoluteName: `uniqueName_${Math.random().toString(36).substr(2, 9)}`,
            [name]: value,
        }));
    };

    const showAlertPopup = (message: string) => {
        showPopup(<AlertPopup message={message} hidePopup={hidePopup} />);
    };

    // 새로운 컨텐츠를 리스트 추가
    const applyNewContents = () => {
        const validationMessage = validateManagedContentDraft(worldCupContents);
        if (validationMessage) {
            showAlertPopup(validationMessage);
            return;
        }

        handleMediaFileType('');
        const updatedContents: ManagedContent = {
            ...worldCupContents,
            id: worldCupContentsList.length,
        };
        setWorldCupContentsList((prev) => [...prev, updatedContents]);
        setNewList?.((prev) => [...prev, updatedContents]);
    };

    const handleVisibleType = (value: string) => {
        setWorldCupContents((prevWorldCupContents) => ({
            ...prevWorldCupContents,
            visibleType: value,
        }));
    };

    const handleMediaFileType = (value: string) => {
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
                worldCupContentsList.map((contents, index) => (
                    <ManageCardWrapper
                        key={index}
                        contents={contents}
                        index={contents.id}
                        setWorldCupContentsList={setWorldCupContentsList}
                        setModifyList={setModifyList}
                        setDeleteList={setDeleteList}
                        setNewList={setNewList}
                        newList={newList}
                    />
                ))}
        </div>
    );
};

export default WorldCupContentsManageList;
