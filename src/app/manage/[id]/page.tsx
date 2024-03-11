'use client';
import React, { useContext, useEffect, useState } from 'react';
import WorldCupManageForm from '@/components/manage/WorldCupManageForm';
import WorldCupContentsManageListWrapper from '@/components/manage/WorldCupContentsManagerListWrapper';
import { WorldCupIdManageContext } from '@/hooks/WorldCupIdManageContext';
import { WorldCupContentsManageContext } from '@/hooks/WorldCupContentsManageContext';
import { useQueryGetMyWorldCup, useQueryGetMyWorldCupContentsList } from '@/services/ManageWorldCupService';
import { getAccessToken } from '@/utils/TokenManager';
import { getMediaFile } from '@/services/EtcService';
import { isMP4 } from '@/utils/common';

/*
    월드컵 관리 페이지를 표현합니다.
*/
const ManageForm = ({ params }: any) => {
    const { id } = params;
    const { data: myWorldCupData, isSuccess: isMyWorldCupSuccess } = useQueryGetMyWorldCup(id);
    const { data: myWorldCupContentsList, isSuccess: isMyWorldCupContentsList } = useQueryGetMyWorldCupContentsList(id);
    // myWorldCupContentsList.data.data가 API이고 이거와, worldCupContentsList 비교를 해서 다르면 변경사항 적용
    const [worldCupContentsList, setWorldCupContentsList] = useState([]); // 최초 수정페이지에서 컨텐츠가 담기는 배열
    const [worldCupId, setWorldCupId] = useState(id ? id : 0);
    const [isCreateWorldCup, setIsCreateWorldCup] = useState(false);
    const [modifyList, setModifyList] = useState([]);
    const [deleteList, setDeleteList] = useState([]);
    const [newList, setNewList] = useState([]);
    const [isChanges, setIsChange] = useState(false);

    useEffect(() => {
        if (isMyWorldCupSuccess) {
            setIsCreateWorldCup(true);
        }
    }, [isMyWorldCupSuccess]);

    useEffect(() => {
        const fetchData = async () => {
            if (worldCupContentsList.length < 1 && isMyWorldCupContentsList && id) {
                try {
                    const newData: any = await Promise.all(
                        myWorldCupContentsList.data.data.map(async (items: any, index: number) => {
                            const data = await getMediaFile(items.mediaFileId);
                            const dataForm = syncFormatMediaData(items, data?.data.data, index);
                            return dataForm;
                        })
                    );

                    setWorldCupContentsList(newData);
                } catch (error) {
                    console.error('비동기 작업 실패:', error);
                }
            }
        };

        fetchData();
    }, [isMyWorldCupContentsList, id]);

    useEffect(() => {
        if (newList.length > 0 || deleteList.length > 0 || modifyList.length > 0) {
            setIsChange(true);
        } else {
            setIsChange(false);
        }
    }, [newList, deleteList, modifyList, worldCupContentsList]);

    const syncFormatMediaData = (contentsByClient: any, contentsByServer: any, index: number) => {
        return {
            id: index,
            contentsId: contentsByClient?.worldCupId,
            contentsName: contentsByClient.contentsName,
            videoStartTime: contentsByServer?.videoStartTime
                ? contentsByServer?.videoStartTime
                : '' || contentsByClient.videoStartTime,
            videoPlayDuration: contentsByServer?.videoPlayDuration
                ? contentsByServer?.videoPlayDuration
                : '' || contentsByClient.videoPlayDuration,
            visibleType: contentsByServer?.visibleType || contentsByClient.visibleType,
            fileType: contentsByServer?.fileType === 'STATIC_MEDIA_FILE' ? 'file' : '' || contentsByClient.fileType,
            mediaData: contentsByServer?.mediaData || contentsByClient.mediaPath,
            mediaFileId: contentsByServer?.mediaFileId || contentsByClient.mediaFileId,
            mp4Type: contentsByServer
                ? isMP4(contentsByServer.mediaData)
                    ? contentsByServer?.mediaData
                    : undefined
                : contentsByClient.mp4Type,
            imgType: contentsByServer
                ? !isMP4(contentsByServer.mediaData)
                    ? contentsByServer?.mediaData
                    : undefined
                : contentsByClient.imgType,
            detailFileType: contentsByServer ? contentsByServer.detailType : contentsByClient.detailFileType,
            originalName: contentsByServer ? contentsByServer.originalName : contentsByClient.originalName,
        };
    };

    // 월드컵 게임 상태 저장
    // const fetchMediaFile = async () => {
    //     try {
    //         const data = await getMediaFile(contents.mediaFileId);
    //         const getMediaFileData = data?.data.data;
    //         const newData = syncFormatMediaData(contents, getMediaFileData);
    //         setMediaData(newData);
    //     } catch (error) {
    //         console.error('월드컵 정보 가져오기 실패:', error);
    //     }
    // };
    return (
        <div>
            <div className="flex my-5">
                <div className="flex-none m-5">
                    <WorldCupManageForm
                        setIsCreateWorldCup={setIsCreateWorldCup}
                        worldCupContentsList={worldCupContentsList}
                        setWorldCupId={setWorldCupId}
                        worldCupId={worldCupId}
                        myWorldCupData={isMyWorldCupSuccess && myWorldCupData.data.data}
                        isCreateWorldCup={isCreateWorldCup}
                    />
                </div>
                <div className="flex-auto">
                    <WorldCupContentsManageListWrapper
                        isCreateWorldCup={isCreateWorldCup}
                        worldCupContentsList={worldCupContentsList}
                        setWorldCupContentsList={setWorldCupContentsList}
                        worldCupId={worldCupId}
                        setModifyList={setModifyList}
                        setDeleteList={setDeleteList}
                        setNewList={setNewList}
                        newList={newList}
                        modifyList={modifyList}
                        deleteList={deleteList}
                        isChanges={isChanges}
                        isModifyPage={id ? true : false}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageForm;
