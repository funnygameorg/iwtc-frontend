import { useEffect, useState } from 'react';
import InternetVideoUrlCard from './InternetVideoUrlCard';
import StaticMediaFileTypeCard from './StaticMediaFileTypeCard';
import { getMediaFile } from '@/services/EtcService';
import { isMP4 } from '@/utils/common';

const ManageCardWrapper = ({ contents, index }: any) => {
    // DB에서 가져온 데이터 양식과 새로 추가된 컨텐츠의 데이터 양식이 다르다.
    // 하위 컴포넌트에 뿌려주기 위해 포맷을 통일시킨다.
    // ByServer를 우선적용하고 없다면 ByClient를 적용한다.
    const syncFormatMediaData = (contentsByClient: any, contentsByServer: any) => {
        return {
            contentsId: contentsByClient?.id || undefined,
            contentsName: contentsByClient.contentsName,
            videoStartTime: contentsByServer?.videoStartTime || contentsByClient.videoStartTime,
            videoPlayDuration: contentsByServer?.videoPlayDuration || contentsByClient.videoPlayDuration,
            visibleType: contentsByServer?.visibleType || contentsByClient.visibleType,
            fileType: contentsByServer?.fileType || contentsByClient.filType,
            mediaData: contentsByServer?.mediaData || contentsByClient.mediaPath,
            mediaFileId: contentsByServer?.mediaFileId,
            mp4Type: contentsByServer ? isMP4(contentsByServer.mediaData) : contentsByClient.mp4Type,
            imgType: contentsByServer ? !isMP4(contentsByServer.mediaData) : contentsByClient.imgType,
        };
    };

    const [mediaData, setMediaData] = useState<any>('');

    // 월드컵 게임 상태 저장
    const fetchMediaFile = async () => {
        try {
            const data = await getMediaFile(contents.mediaFileId);
            const getMediaFileData = data?.data.data;

            setMediaData(syncFormatMediaData(contents, getMediaFileData));
        } catch (error) {
            console.error('월드컵 정보 가져오기 실패:', error);
        }
    };

    useEffect(() => {
        if (contents.mediaFileId !== undefined) {
            fetchMediaFile();
        } else {
            setMediaData(syncFormatMediaData(contents, undefined));
        }
    }, []);

    return (
        // 데이터 문자열에 "https://www.youtube.com/"를 포함한다면 유튜브 타입 데이터를 의미한다.
        mediaData.mediaData && mediaData.mediaData.includes('https://www.youtube.com/') ? (
            <InternetVideoUrlCard index={index} contents={mediaData} />
        ) : (
            <StaticMediaFileTypeCard index={index} contents={mediaData} />
        )
    );
};
export default ManageCardWrapper;
