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

    const [worldCupContentsList, setWorldCupContentsList] = useState([]);
    const [worldCupId, setWorldCupId] = useState(id ? id : 0);
    const [isCreateWorldCup, setIsCreateWorldCup] = useState(false);

    useEffect(() => {
        if (isMyWorldCupSuccess) {
            setIsCreateWorldCup(true);
        }
    }, [isMyWorldCupSuccess]);

    useEffect(() => {
        const fetchData = async () => {
            if (isMyWorldCupContentsList && id) {
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
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageForm;
