import { Dispatch, SetStateAction, useContext } from 'react';
import WorldCupContentsManageList from './WorldCupContentsManageList';
import {
    createWorldCupContents,
    createWorldCupContentsType,
    removeMyWorldCupContents,
    updateMyWorldCupContents,
} from '@/services/ManageWorldCupService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAccessToken } from '@/utils/TokenManager';
import AlertPopup from '../popup/AlertPopup';
import { PopupContext } from '@/providers/PopupProvider';
import NotCreateWorldCupLogo from './NotCreateWorldCupLogo';
import { useRouter } from 'next/navigation';
import { ManagedContent, PersistedManagedContentView } from '@/domain/manage/persistedContent';

interface IProps {
    isCreateWorldCup: boolean;
    worldCupContentsList: ManagedContent[];
    setWorldCupContentsList: Dispatch<SetStateAction<ManagedContent[]>>;
    worldCupId: number;
    setModifyList?: Dispatch<SetStateAction<PersistedManagedContentView[]>>;
    setDeleteList?: Dispatch<SetStateAction<PersistedManagedContentView[]>>;
    setNewList?: Dispatch<SetStateAction<ManagedContent[]>>;
    newList?: ManagedContent[];
    modifyList?: PersistedManagedContentView[];
    deleteList?: PersistedManagedContentView[];
    isChanges?: boolean;
    isModifyPage?: boolean;
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
    setModifyList,
    setDeleteList,
    setNewList,
    newList = [],
    modifyList = [],
    deleteList = [],
    isChanges,
    isModifyPage,
}: IProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { showPopup, hidePopup } = useContext(PopupContext);

    /**
     * 수정된 월드컵 컨텐츠 서버에 전송
     */
    const transformToCreateWorldCupContentsType = (contextData: ManagedContent[]): createWorldCupContentsType => {
        return contextData.map((item) => ({
            contentsName: item.contentsName,
            visibleType: item.visibleType,
            createMediaFileRequest: {
                fileType: item.fileType === 'file' ? 'STATIC_MEDIA_FILE' : 'INTERNET_VIDEO_URL',
                mediaData: item.mediaPath || item.mediaData,
                originalName: item.originalName ? item.originalName : item.absoluteName,
                videoStartTime: item.videoStartTime,
                videoPlayDuration: item.videoPlayDuration,
                detailFileType:
                    item.fileType === 'file' || item.fileType === 'STATIC_MEDIA_FILE'
                        ? item.detailFileType
                        : 'YOU_TUBE_URL',
            },
        }));
    };

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

    const modifyNewWorldCupContentsList = async () => {
        if (!isChanges) {
            showAlertPopup('변경사항이 없습니다.');
            return;
        }

        const accessToken = getAccessToken();
        const promises = [];

        // 삭제 작업을 promises 배열에 추가
        if (deleteList.length > 0) {
            const deletePromises = deleteList.map((item) =>
                removeMyWorldCupContents(worldCupId, item.contentsId, accessToken)
            );
            promises.push(...deletePromises);
        }

        // 업데이트 작업을 promises 배열에 추가
        if (modifyList.length > 0) {
            const updatePromises = modifyList.map((item) => {
                const requestBody = {
                    contentsName: item.contentsName,
                    originalName: item.originalName || 'No_NAME',
                    mediaData: item.mediaData,
                    videoStartTime: item.videoStartTime ? item.videoStartTime : null,
                    videoPlayDuration: item.videoPlayDuration ? item.videoPlayDuration : null,
                    visibleType: item.visibleType,
                    detailFileType: item.detailFileType,
                };
                return updateMyWorldCupContents(worldCupId, item.contentsId, requestBody, accessToken);
            });
            promises.push(...updatePromises);
        }

        // 새 컨텐츠 추가 작업을 promises 배열에 추가 (이 부분은 실제 실행 시점에 따라 조정이 필요할 수 있음)
        if (newList.length > 0) {
            const bindingNewWorldCupContents = transformToCreateWorldCupContentsType(newList);
            const newContentPromise = createWorldCupContents({
                // 가정: mutateAsync 메서드 사용
                worldCupId: worldCupId,
                params: bindingNewWorldCupContents,
                token: accessToken,
            });
            promises.push(newContentPromise);
        }

        // 모든 비동기 작업을 동시에 실행하고, 모든 작업이 완료될 때까지 기다립니다.
        await Promise.all(promises)
            .then(() => {
                // queryClient.invalidateQueries(['MyWorldCupContentsList', worldcupId], { refetchInactive: false })
                setDeleteList?.([]);
                setModifyList?.([]);
                setNewList?.([]);
                // setWorldCupContentsList([]);
                queryClient.invalidateQueries({ queryKey: ['MyWorldCupContentsList'] });
                showAlertPopup('수정이 완료되었습니다.');
            })
            .catch((error) => {
                console.error('작업 중 오류 발생', error);
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

    const showAlertPopup = (message: string) => {
        showPopup(<AlertPopup message={message} hidePopup={hidePopup} />);
    };

    const getSizeNewContents = (newWorldCupContents: ManagedContent[]) => {
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
                {isCreateWorldCup && !isModifyPage && (
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
                {isCreateWorldCup && isModifyPage && (
                    <div className="ml-auto" style={{ marginRight: '2%' }}>
                        <div>
                            <button
                                className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${createButtonClassName}`}
                                onClick={modifyNewWorldCupContentsList}
                            >
                                변경사항 적용 [추가 : {newList.length}개 | 수정 : {modifyList?.length}개 | 삭제 :{' '}
                                {deleteList.length}개]
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
                            setModifyList={setModifyList}
                            setDeleteList={setDeleteList}
                            setNewList={setNewList}
                            newList={newList}
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
