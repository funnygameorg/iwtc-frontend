import { useContext, useEffect, useState } from 'react';
import WorldCupContentsManageList from './WorldCupContentsManageList';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';
import { createWorldCupContents, createWorldCupContentsType } from '@/services/ManageWorldCupService';
import { useMutation } from '@tanstack/react-query';
import { getAccessToken } from '@/utils/TokenManager';
import { WorldCupContentsManageContext } from '@/hooks/WorldCupContentsManageContext';
import { WorldCupIdManageContext } from '@/hooks/WorldCupIdManageContext';

/**
 * 게임 컨텐츠 리스트 래핑 요소입니다.
 * @param initWorldCupGameContentsList 월드컵 게임수정 버튼으로 들어오면 기존 월드컵 컨텐츠가 들어온다.
 * @returns
 */
const WorldCupContentsManageListWrapper = (params: any) => {
    const { worldCupContentsManageContext, setWorldCupContentsManageContext }: any =
        useContext(WorldCupContentsManageContext);

    const { isCreateWorldCup }: any = useContext(WorldCupManageContext);

    const { worldCupId, setWorldCupId }: any = useContext(WorldCupIdManageContext);

    const [createdContentsNames, setCreatedContentsNames] = useState([]);

    useEffect(() => {
        if (params.initWorldCupGameContentsList) {
            const contentsLst = params.initWorldCupGameContentsList.map((item: any) => ({
                contentsId: item.id,
                contentsName: item.contentsName,
                visibleType: item.visibleType,
                createMediaFileRequest: {
                    fileType: item.fileType === 'file' ? 'STATIC_MEDIA_FILE' : 'INTERNET_VIDEO_URL',
                    mediaData: item.mediaPath,
                    originalName: item.originalName,
                    videoStartTime: item.videoStartTime,
                    videoPlayDuration: item.videoPlayDuration,
                },
            }));

            setWorldCupContentsManageContext(contentsLst);
        }
    }, []);

    // 월드컵을 우선적으로 만들지 않았을 때 노출
    const isNotCreateWorldCupLogo = () => {
        return (
            <div className="w-full h-full mb-4 p-4 border rounded shadow bg-gray-100">
                😭 왼쪽에서 월드컵 게임을 먼저 추가해주세요 😭
            </div>
        );
    };

    /**
     * 수정된 월드컵 컨텐츠 서버에 전송
     */
    const transformToCreateWorldCupContentsType = (contextData: any): createWorldCupContentsType => {
        return contextData.map((item: any) => ({
            contentsName: item.contentsName,
            visibleType: item.visibleType,
            createMediaFileRequest: {
                fileType: item.fileType === 'file' ? 'STATIC_MEDIA_FILE' : 'INTERNET_VIDEO_URL',
                mediaData: item.mediaPath,
                originalName: item.originalName,
                videoStartTime: item.videoStartTime,
                videoPlayDuration: item.videoPlayDuration,
            },
        }));
    };

    const createNewWorldCupContentsList = () => {
        console.log('데이터 전 ', worldCupContentsManageContext);
        const newContentsList = worldCupContentsManageContext.filter((item: any) => item.id === undefined);

        const bindingNewWorldCupContents = transformToCreateWorldCupContentsType(newContentsList);

        if (bindingNewWorldCupContents.length === 0) {
            alert('새로운 컨텐츠가 없습니다.');
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
            alert('성공');
            window.location.reload();
        },
        onError: (error) => {
            alert(error);
        },
    });

    const getSizeNewContents = (newWorldCupContents: any) =>
        newWorldCupContents.filter((item: any) => item.id === undefined).length;

    // 반환 컴포넌트
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold" style={{ marginLeft: '2%' }}>
                    ❤️ 이상형 리스트 ❤️
                </h1>

                <div className="ml-auto" style={{ marginRight: '2%' }}>
                    {isCreateWorldCup === false ? (
                        <>
                            <div>
                                <button
                                    className={`${
                                        getSizeNewContents(worldCupContentsManageContext)
                                            ? 'bg-blue-500'
                                            : 'bg-gray-500'
                                    } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                    onClick={() => createNewWorldCupContentsList()}
                                >
                                    새로운 컨텐츠 생성 적용 [{getSizeNewContents(worldCupContentsManageContext)}개]
                                </button>
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
            <div className="p-8">
                {isCreateWorldCup === false ? (
                    <div className="h-screen overflow-y-auto ">
                        <WorldCupContentsManageList />
                    </div>
                ) : (
                    <div>{isNotCreateWorldCupLogo()}</div>
                )}
            </div>
        </div>
    );
};

export default WorldCupContentsManageListWrapper;
