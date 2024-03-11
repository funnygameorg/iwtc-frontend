import { WorldCupContentsManageContext } from '@/hooks/WorldCupContentsManageContext';
import { WorldCupIdManageContext } from '@/hooks/WorldCupIdManageContext';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';
import { removeMyWorldCupContents, updateMyWorldCupContents } from '@/services/ManageWorldCupService';
import { getAccessToken } from '@/utils/TokenManager';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

interface IProps {
    contents: any;
    index?: any;
    worldCupId: any;
    setWorldCupContentsList: any;
    setModifyList?: any;
    setDeleteList?: any;
    setNewList?: any;
    newList?: any;
}

const StaticMediaFileTypeCard = ({
    contents,
    index,
    worldCupId,
    setWorldCupContentsList,
    setModifyList,
    setDeleteList,
    setNewList,
    newList,
}: IProps) => {
    // const [image, setImage] = useState<any>('');
    const [mediaData, setMediaData] = useState<any>({});
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    useEffect(() => {
        setMediaData({
            contentsId: contents.contentsId,
            contentsName: contents.contentsName,
            originalName: contents.originalName,
            visibleType: contents.visibleType,
            mediaData: contents.mediaData,
            videoStartTime: contents.videoStartTime,
            videoPlayDuration: contents.videoPlayDuration,
            imgType: contents.imgType,
            mp4Type: contents.mp4Type,
            detailFileType: contents.detailFileType,
            mediaFileId: contents.mediaFileId,
        });
        // setImage(contents.mediaData);
    }, [contents]);

    const handleMediaData = (e: any) => {
        const { name, value } = e.target;

        setMediaData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 해당 요소 삭제
    const removeContents = async () => {
        let deleteContent: any = null;

        setWorldCupContentsList((prev: any) => {
            // 먼저 삭제할 컨텐츠를 식별합니다.
            const foundContent = prev.find((contents: any) => contents.id === index);
            if (foundContent) {
                deleteContent = { ...foundContent };
            }

            // 삭제할 컨텐츠를 제외하고 리스트를 반환합니다.
            return prev
                .filter((contents: any) => contents.id !== index)
                .map((contents: any, newIndex: number) => ({ ...contents, id: newIndex }));
        });

        if (deleteContent && setNewList && setDeleteList) {
            // newList에서 deleteContent와 일치하는 항목을 제외하고 새로운 배열을 생성합니다.
            //새롭게 추가된 컨텐츠는 deleteList에 넣으면 안된다. 네임과 미디어패스로 구분 이후 수정할 때 newList도 수정해줘야함
            if (!deleteContent.contentsId) {
                if (newList.length > 0) {
                    setNewList((prev: any) =>
                        prev.filter(
                            (item: any) =>
                                item.contentsName !== deleteContent.contentsName &&
                                item.mediaPath !== deleteContent.mediaPath
                        )
                    );
                    // setNewList((prev: any) => prev.filter((item: any) => item.contentsName !== deleteContent.contentsName));
                }
            } else {
                setDeleteList((prev: any) => [...prev, deleteContent]);
            }

            // deleteContent가 newList에 존재하지 않는 경우에만 setDeleteList를 업데이트합니다.
            // if (
            //     !newList.some(
            //         (item: any) =>
            //             item.contentsName === deleteContent.contentsName && item.mediaPath === deleteContent.mediaPath
            //     )
            // ) {
            // }
        }

        // setWorldCupContentsList((prev: any) =>
        //     prev
        //         .filter((contents: any) => contents.id !== index)
        //         .map((contents: any, newIndex: number) => ({ ...contents, id: newIndex }))
        // );
        // if (mediaData.contentsId) {
        //     const accessToken = getAccessToken();

        //     await removeMyWorldCupContents(worldCupId, mediaData.contentsId, accessToken);
        // }
        // setDeleteList
    };

    const updateContentsMode = () => {
        setIsUpdateMode(true);
    };

    const applyUpdateContents = async () => {
        let modifiedContent: any = null;

        setWorldCupContentsList(
            (prev: any) =>
                prev.map((contents: any) => {
                    if (contents.id === index) {
                        // 수정 조건을 만족하는 경우, 수정된 컨텐츠 정보를 저장
                        if (
                            contents.contentsName !== mediaData.contentsName ||
                            contents.mediaData !== mediaData.mediaData
                        ) {
                            modifiedContent = {
                                ...contents,
                                contentsName: mediaData.contentsName,
                                mediaData: mediaData.mediaData,
                            };

                            return modifiedContent;
                        }
                    }
                    return contents;
                })
            // prev.map((contents: any) =>
            //     contents.id === index
            //         ? { ...contents, contentsName: mediaData.contentsName, mediaData: mediaData.mediaData }
            //         : contents
            // )
        );

        if (modifiedContent && setNewList && setModifyList) {
            //새로 추가된 컨텐츠
            if (!modifiedContent.contentsId) {
                if (newList.length) {
                    setNewList((prevList: any[]) =>
                        prevList.map((item) =>
                            item.absoluteName === modifiedContent.absoluteName ? modifiedContent : item
                        )
                    );
                }
            } else {
                setModifyList((prev: any[]) => {
                    // 수정하려는 컨텐츠의 오리지널 네임을 찾음. 없으면 -1을 반환합니다.
                    const existingIndex = prev.findIndex((item) => item.originalName === modifiedContent.originalName);

                    if (existingIndex !== -1) {
                        // 일치하는 항목이 있으면, 그 항목을 업데이트합니다.
                        return prev.map((item, index) => (index === existingIndex ? modifiedContent : item));
                    } else {
                        // 일치하는 항목이 없으면, 새 항목을 배열에 추가합니다.
                        return [...prev, modifiedContent];
                    }
                });
            }
        }

        // setMediaData((prevData: any) => ({
        //     ...prevData,
        //     contentsName: imageFile.name,
        // }));
        // if (mediaData.contentsId) {
        //     const requestBody = {
        //         contentsName: mediaData.contentsName,
        //         originalName: mediaData.originalName || 'No_NAME',
        //         mediaData: mediaData.mediaData,
        //         videoStartTime: null,
        //         videoPlayDuration: null,
        //         visibleType: mediaData.visibleType,
        //         detailFileType: mediaData.detailFileType,
        //     };

        //     const accessToken = getAccessToken();
        //     await updateMyWorldCupContents(worldCupId, mediaData.contentsId, requestBody, accessToken);
        // }

        setIsUpdateMode(false);
    };

    const changeImage = (e: any) => {
        const imageFile = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
            // setImage(e?.target?.result);
            setMediaData((prevData: any) => ({
                ...prevData,
                mediaData: e?.target?.result,
            }));
        });

        reader.readAsDataURL(imageFile);

        setMediaData((prevData: any) => ({
            ...prevData,
            originalName: imageFile.name,
        }));
    };

    return (
        <div>
            <div key={index} className="mb-4 p-4 border rounded-xl shadow-sm">
                <div className="flex justify-between">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="flex min-w-0 gap-x-4">
                            {mediaData.mp4Type && (
                                <video
                                    src={mediaData.mediaData}
                                    width={'auto'}
                                    height={100}
                                    autoPlay
                                    muted
                                    loop
                                ></video>
                            )}
                            {mediaData.imgType && (
                                <Image
                                    className="w-full h-52"
                                    src={mediaData.mediaData}
                                    width={'10'}
                                    height={'10'}
                                    alt="img"
                                />
                            )}
                        </div>
                        <div>
                            <div className="flex-1 min-w-0">
                                <div className="mb-2">
                                    <strong>컨텐츠 이름:</strong>
                                    <span className="ml-2">
                                        {!isUpdateMode ? (
                                            <span>{mediaData.contentsName}</span>
                                        ) : (
                                            <span>
                                                <input
                                                    id="textInput"
                                                    type="text"
                                                    className="p-1 border rounded-xl"
                                                    placeholder="컨텐츠 이름"
                                                    name="contentsName"
                                                    onChange={handleMediaData}
                                                    value={mediaData.contentsName}
                                                />
                                            </span>
                                        )}
                                    </span>
                                </div>

                                <div className="mb-2 flex">
                                    <div>
                                        <strong>공개 여부:</strong>
                                    </div>
                                    <span className="ml-2">
                                        {!isUpdateMode ? (
                                            <div>{mediaData.visibleType === 'PUBLIC' ? '공개' : '비공개'}</div>
                                        ) : (
                                            <div>
                                                <select
                                                    name="visibleType"
                                                    value={mediaData.visibleType}
                                                    onChange={handleMediaData}
                                                    className="p-1 border rounded-xl"
                                                >
                                                    <option value="PUBLIC">공개</option>
                                                    <option value="PRIVATE">비공개</option>
                                                </select>
                                            </div>
                                        )}
                                    </span>
                                </div>
                                <div>
                                    {isUpdateMode ? (
                                        <div className="flex">
                                            <div className="mt-1.5">
                                                <strong>이미지 변경</strong>
                                            </div>
                                            <div className="ml-3">
                                                <input
                                                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                                    type="file"
                                                    id="formFileMultiple"
                                                    name="mediaPath"
                                                    onChange={changeImage}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sm:flex sm:flex-col sm:items-end">
                        <div>
                            {!isUpdateMode ? (
                                <button
                                    className="bg-green-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                    onClick={updateContentsMode}
                                >
                                    수정
                                </button>
                            ) : (
                                <button
                                    className="bg-green-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                    onClick={applyUpdateContents}
                                >
                                    적용
                                </button>
                            )}
                        </div>
                        <div>
                            {!isUpdateMode ? (
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                    onClick={() => removeContents()}
                                >
                                    삭제
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaticMediaFileTypeCard;
