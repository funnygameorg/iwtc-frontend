import { useContext, useEffect, useState } from 'react';
import InternetVideoUrlCard from './InternetVideoUrlCard';
import StaticMediaFileTypeCard from './StaticMediaFileTypeCard';
import { getMediaFile } from '@/services/EtcService';
import { isMP4 } from '@/utils/common';
import { WorldCupContentsManageContext } from '@/hooks/WorldCupContentsManageContext';

interface IProps {
    contents: any;
    index?: number;
    worldCupId: any;
    setWorldCupContentsList: any;
    worldCupContentsList: any;
    setModifyList?: any;
    setDeleteList?: any;
    setNewList?: any;
    newList?: any;
}

const ManageCardWrapper = ({
    contents,
    index,
    worldCupId,
    setWorldCupContentsList,
    worldCupContentsList,
    setModifyList,
    setDeleteList,
    setNewList,
    newList,
}: IProps) => {
    // DB에서 가져온 데이터 양식과 새로 추가된 컨텐츠의 데이터 양식이 다르다.
    // 하위 컴포넌트에 뿌려주기 위해 포맷을 통일시킨다.
    // ByServer를 우선적용하고 없다면 ByClient를 적용한다.
    const [mediaData, setMediaData] = useState<any>('');

    const syncFormatMediaData = (contentsByClient: any, contentsByServer: any) => {
        return {
            id: index,
            contentsId: contentsByClient?.contentsId || undefined,
            contentsName: contentsByClient.contentsName,
            videoStartTime: contentsByServer?.videoStartTime || contentsByClient.videoStartTime,
            videoPlayDuration: contentsByServer?.videoPlayDuration || contentsByClient.videoPlayDuration,
            visibleType: contentsByServer?.visibleType || contentsByClient.visibleType,
            fileType: contentsByServer?.fileType || contentsByClient.fileType,
            mediaData: contentsByServer?.mediaData || contentsByClient.mediaPath,
            mediaFileId: contentsByServer?.mediaFileId || contentsByClient.mediaFileId,
            mp4Type: contentsByServer ? isMP4(contentsByServer.mediaData) : contentsByClient.mp4Type,
            imgType: contentsByServer ? !isMP4(contentsByServer.mediaData) : contentsByClient.imgType,
            detailFileType: contentsByServer ? contentsByServer.detailType : contentsByClient.detailFileType,
            originalName: contentsByServer ? contentsByServer.originalName : contentsByClient.originalName,
        };
    };

    // 월드컵 게임 상태 저장
    const fetchMediaFile = async () => {
        try {
            // const data = await getMediaFile(contents.mediaFileId);
            // const getMediaFileData = data?.data.data;
            // const newData = syncFormatMediaData(contents, getMediaFileData);
            setMediaData(contents);
        } catch (error) {
            console.error('월드컵 정보 가져오기 실패:', error);
        }
    };

    useEffect(() => {
        //server
        if (contents.contentsId !== undefined) {
            fetchMediaFile();
        } else {
            //client
            setMediaData(syncFormatMediaData(contents, undefined));
        }
    }, [contents]);

    return (
        // 데이터 문자열에 "https://www.youtube.com/"를 포함한다면 유튜브 타입 데이터를 의미한다.
        mediaData.mediaData && mediaData.mediaData.includes('https://www.youtube.com/') ? (
            <InternetVideoUrlCard
                index={index}
                contents={mediaData}
                worldCupId={worldCupId}
                setWorldCupContentsList={setWorldCupContentsList}
                setModifyList={setModifyList}
                setDeleteList={setDeleteList}
                setNewList={setNewList}
                newList={newList}
            />
        ) : (
            <StaticMediaFileTypeCard
                index={index}
                contents={mediaData}
                worldCupId={worldCupId}
                setWorldCupContentsList={setWorldCupContentsList}
                setModifyList={setModifyList}
                setDeleteList={setDeleteList}
                setNewList={setNewList}
                newList={newList}
            />
        )
    );
};
export default ManageCardWrapper;
