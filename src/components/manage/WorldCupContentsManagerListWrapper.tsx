import { useContext, useState } from 'react';
import WorldCupContentsManageList from './WorldCupContentsManageList';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';
import { createWorldCupContents, createWorldCupContentsType } from '@/services/ManageWorldCupService';
import { useMutation } from '@tanstack/react-query';
import { getAccessToken } from '@/utils/TokenManager';
import { WorldCupContentsManageContext } from '@/hooks/WorldCupContentsManageContext';
import { WorldCupIdManageContext } from '@/hooks/WorldCupIdManageContext';

/*
    게임 컨텐츠 리스트 래핑 요소입니다.
*/
const WorldCupContentsManageListWrapper = () => {
    const { worldCupContentsManageContext, setWorldCupContentsManageContext }: any =
        useContext(WorldCupContentsManageContext);
    const { isCreateWorldCup }: any = useContext(WorldCupManageContext);
    const { worldCupId, setWorldCupId }: any = useContext(WorldCupIdManageContext);

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
        const bindingNewWorldCupContents = transformToCreateWorldCupContentsType(worldCupContentsManageContext);

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
        },
        onError: (error) => {
            alert(error);
        },
    });

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
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => createNewWorldCupContentsList()}
                                >
                                    이상형 컨텐츠 적용
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
