import { useContext, useEffect, useState } from 'react';
import WorldCupContentsManageList from './WorldCupContentsManageList';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';
import { createWorldCupContents, createWorldCupContentsType } from '@/services/ManageWorldCupService';
import { useMutation } from '@tanstack/react-query';
import { getAccessToken } from '@/utils/TokenManager';
import AlertPopup from '../popup/AlertPopup';
import { PopupContext } from '../PopupProvider';
import { isMP4 } from '@/utils/common';
import { getMediaFile } from '@/services/EtcService';
import NotCreateWorldCupLogo from './NotCreateWorldCupLogo';
import { useRouter } from 'next/navigation';

interface IProps {
    isCreateWorldCup: boolean;
    worldCupContentsList: any;
    setWorldCupContentsList: any;
    worldCupId: any;
}
/**
 * 게임 컨텐츠 리스트 래핑 요소입니다.
 * @param initWorldCupGameContentsList 월드컵 게임수정 버튼으로 들어오면 기존 월드컵 컨텐츠가 들어온다.
 * @returns
 */
const WorldCupContentsManageListWrapper = ({
    isCreateWorldCup,
    worldCupContentsList,
    setWorldCupContentsList,
    worldCupId,
}: IProps) => {
    const router = useRouter();

    const { showPopup, hidePopup } = useContext(PopupContext);

    useEffect(() => {
        // if (worldCupContentsManageContext && worldCupContentsManageContext.length > 0) {
        //     const contentsLst = worldCupContentsManageContext.map((item: any) => ({
        //         contentsId: item.id,
        //         contentsName: item.contentsName,
        //         visibleType: item.visibleType,
        //         createMediaFileRequest: {
        //             fileType: item.fileType === 'file' ? 'STATIC_MEDIA_FILE' : 'INTERNET_VIDEO_URL',
        //             mediaData: item.mediaPath,
        //             originalName: item.originalName,
        //             videoStartTime: item.videoStartTime,
        //             videoPlayDuration: item.videoPlayDuration,
        //         },
        //     }));
        //     setWorldCupContentsManageContext(contentsLst);
        // }
    }, []);

    /**
     * 수정된 월드컵 컨텐츠 서버에 전송
     */
    const transformToCreateWorldCupContentsType = (contextData: any): createWorldCupContentsType => {
        return contextData.map((item: any) => ({
            contentsName: item.contentsName,
            visibleType: item.visibleType,
            createMediaFileRequest: {
                fileType: item.fileType === 'file' ? 'STATIC_MEDIA_FILE' : 'INTERNET_VIDEO_URL',
                mediaData: item.mediaPath || item.mediaData,
                originalName: item.originalName,
                videoStartTime: item.videoStartTime,
                videoPlayDuration: item.videoPlayDuration,
                detailFileType:
                    item.fileType === 'file' || item.fileType === 'STATIC_MEDIA_FILE'
                        ? item.detailFileType
                        : 'YOU_TUBE_URL',
            },
        }));
    };

    // const fetchMediaFile = async (id: any) => {
    //     try {
    //         const data = await getMediaFile(id);
    //         const getMediaFileData = data?.data.data;
    //         return syncFormatMediaData(undefined, getMediaFileData);
    //     } catch (error) {
    //         console.error('월드컵 정보 가져오기 실패:', error);
    //     }
    // };

    // const syncFormatMediaData = (contentsByClient: any, contentsByServer: any) => {
    //     console.log('contentsByServer', contentsByServer);
    //     return {
    //         contentsId: contentsByClient?.id || undefined,
    //         contentsName: contentsByClient.contentsName,
    //         videoStartTime: contentsByServer?.videoStartTime || contentsByClient.videoStartTime,
    //         videoPlayDuration: contentsByServer?.videoPlayDuration || contentsByClient.videoPlayDuration,
    //         visibleType: contentsByServer?.visibleType || contentsByClient.visibleType,
    //         fileType: contentsByServer?.fileType || contentsByClient.filType,
    //         mediaData: contentsByServer?.mediaData || contentsByClient.mediaPath,
    //         mediaFileId: contentsByServer?.mediaFileId,
    //         mp4Type: contentsByServer ? isMP4(contentsByServer.mediaData) : contentsByClient.mp4Type,
    //         imgType: contentsByServer ? !isMP4(contentsByServer.mediaData) : contentsByClient.imgType,
    //         detailFileType: contentsByServer ? contentsByServer.detailType : contentsByClient.detailType,
    //     };
    // };

    const createNewWorldCupContentsList = () => {
        // console.log('데이터 전 ', worldCupContentsList);
        // const newContentsList = worldCupContentsList.filter((item: any) => item.id === undefined);

        const bindingNewWorldCupContents = transformToCreateWorldCupContentsType(worldCupContentsList);
        if (bindingNewWorldCupContents.length === 0) {
            showAlertPopup('새로운 컨텐츠가 없습니다.');
            return;
        }
        const token = getAccessToken();

        mutationWorldCupContents.mutate({
            worldCupId: worldCupId,
            params: bindingNewWorldCupContents,
            token: token,
        });
    };

    const mutationWorldCupContents = useMutation(createWorldCupContents, {
        onSuccess: () => {
            showAlertPopup('성공');
            router.push('/');
            //TODO: 초기화
            // window.location.reload();
        },
        onError: (error) => {
            showAlertPopup('error');
        },
    });

    const showAlertPopup = (maeeage: string) => {
        showPopup(<AlertPopup message={maeeage} hidePopup={hidePopup} />);
    };

    const getSizeNewContents = (newWorldCupContents: any) => {
        return newWorldCupContents.length > 0;
    };
    const createButtonClassName = getSizeNewContents(worldCupContentsList)
        ? 'bg-blue-500 hover:bg-blue-700'
        : 'bg-gray-500';
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold" style={{ marginLeft: '2%' }}>
                    ❤️ 이상형 리스트 ❤️
                </h1>
                {isCreateWorldCup && (
                    <div className="ml-auto" style={{ marginRight: '2%' }}>
                        <div>
                            <button
                                className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${createButtonClassName}`}
                                onClick={createNewWorldCupContentsList}
                            >
                                새로운 컨텐츠 생성 적용 [{worldCupContentsList?.length}개]
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-8">
                {isCreateWorldCup ? (
                    <div className="h-screen overflow-y-auto ">
                        <WorldCupContentsManageList
                            worldCupContentsList={worldCupContentsList}
                            setWorldCupContentsList={setWorldCupContentsList}
                            worldCupId={worldCupId}
                        />
                    </div>
                ) : (
                    <div>
                        <NotCreateWorldCupLogo />
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorldCupContentsManageListWrapper;
