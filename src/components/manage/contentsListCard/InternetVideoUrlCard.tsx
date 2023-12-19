import YoutubePlayer from '@/components/youtubePlayer/YoutubePlayer';
import { WorldCupContentsManageContext } from '@/hooks/WorldCupContentsManageContext';
import { WorldCupIdManageContext } from '@/hooks/WorldCupIdManageContext';
import { removeMyWorldCupContents, updateMyWorldCupContents } from '@/services/ManageWorldCupService';
import { getAccessToken } from '@/utils/TokenManager';
import exp from 'constants';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

const InternetVideoUrlCard = ({ index, contents }: any) => {
    const { worldCupContentsManageContext, setWorldCupContentsManageContext }: any =
        useContext(WorldCupContentsManageContext);

    // 유튜브 영상 플레이어에 제공한다.
    const [youtubeUrl, setYoutubeUrl] = useState('');

    const { worldCupId, setWorldCupId }: any = useContext(WorldCupIdManageContext);

    const [mediaData, setMediaData] = useState<any>({});

    const [isUpdateMode, setIsUpdateMode] = useState(false);

    useEffect(() => {
        setYoutubeUrl(contents.mediaData);

        setMediaData({
            contentsId: contents.contentsId,
            contentsName: contents.contentsName,
            originalName: contents.originalName,
            visibleType: contents.visibleType,
            mediaData: contents.mediaData,
            videoStartTime: contents.videoStartTime,
            videoPlayDuration: contents.videoPlayDuration,
        });
    }, []);

    // 해당 요소 삭제
    const removeContents = (contentsName: any) => {
        const accessToken = getAccessToken();
        removeMyWorldCupContents(worldCupId, mediaData.contentsId, accessToken);
        setWorldCupContentsManageContext((prev: any) =>
            prev.filter((contents: any) => contents.contentsName !== contentsName)
        );
    };

    // 해당 요소 수정
    const updateContentsMode = () => {
        setIsUpdateMode(true);
    };

    const changeVideo = (e: any) => {
        setYoutubeUrl(e.target.value);
    };

    const handleMediaData = (e: any) => {
        const { name, value } = e.target;

        setMediaData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
        if (name === 'visibleType') {
            // forceUpdate({}); //TODO: forceUpdate 사용처 확인
        }
    };

    const applyUpdateContents = () => {
        const requestBody = {
            contentsName: mediaData.contentsName,
            originalName: '',
            mediaData: youtubeUrl,
            videoStartTime: mediaData.videoStartTime,
            videoPlayDuration: mediaData.videoPlayDuration,
            visibleType: mediaData.visibleType,
        };

        const accessToken = getAccessToken();
        console.log('전송 데이터', requestBody);

        updateMyWorldCupContents(worldCupId, mediaData.contentsId, requestBody, accessToken);

        setIsUpdateMode(false);
    };

    return (
        <div>
            <div key={index} className="mb-4 p-4 border rounded-xl shadow-sm">
                <div className="flex justify-between">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="flex min-w-0 gap-x-4">
                            <YoutubePlayer url={youtubeUrl} componentType={'uploadList'} />
                        </div>

                        <div className="flex-1">
                            <div className="mb-2">
                                <strong>컨텐츠 이름:</strong>
                                <span className="ml-1">
                                    {!isUpdateMode ? (
                                        <span>{mediaData.contentsName}</span>
                                    ) : (
                                        <span>
                                            <input
                                                id="textInput"
                                                type="text"
                                                className="p-1 border rounded-xl"
                                                placeholder="이상형 이름"
                                                name="contentsName"
                                                value={mediaData.contentsName}
                                                onChange={handleMediaData}
                                            />
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="mb-2">
                                <strong>영상 주소: </strong>
                                <span className="ml-1">
                                    {!isUpdateMode ? (
                                        <a
                                            href={youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {youtubeUrl}
                                        </a>
                                    ) : (
                                        <input
                                            id="textInput"
                                            type="text"
                                            className="p-1 border rounded-xl"
                                            placeholder="YouTube URL"
                                            name="youtubeUrl"
                                            onChange={changeVideo}
                                            value={youtubeUrl}
                                        />
                                    )}
                                </span>
                            </div>

                            <div className="mb-2">
                                <strong>영상 시작 시간:</strong>
                                <span className="ml-1">
                                    {!isUpdateMode ? (
                                        <span>{mediaData.videoStartTime}</span>
                                    ) : (
                                        <span>
                                            <input
                                                id="textInput"
                                                type="text"
                                                className="p-1 border rounded-xl"
                                                placeholder="ex 00100"
                                                name="videoStartTime"
                                                onChange={handleMediaData}
                                                value={mediaData.videoStartTime}
                                            />
                                        </span>
                                    )}
                                </span>
                            </div>

                            <div className="mb-2">
                                <strong>반복 시간:</strong>
                                <span className="ml-1">
                                    {!isUpdateMode ? (
                                        <span>{mediaData.videoPlayDuration}</span>
                                    ) : (
                                        <span>
                                            <input
                                                id="textInput"
                                                type="text"
                                                className="p-1 border rounded-xl"
                                                placeholder="3 ~ 5"
                                                name="videoPlayDuration"
                                                onChange={handleMediaData}
                                                value={mediaData.videoPlayDuration}
                                            />
                                        </span>
                                    )}
                                </span>
                            </div>

                            <div className="flex">
                                <div className="mt-0.4">
                                    <strong>공개 여부:</strong>
                                </div>
                                <div className="ml-1 mb-2">
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
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sm:flex sm:flex-col sm:items-end">
                        <div>
                            <div>
                                {!isUpdateMode ? (
                                    <button
                                        className="bg-green-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                        onClick={() => updateContentsMode()}
                                    >
                                        수정
                                    </button>
                                ) : (
                                    <div className="sm:flex-col">
                                        <div>
                                            <button
                                                className="bg-green-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                                onClick={() => applyUpdateContents()}
                                            >
                                                적용하기
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {!isUpdateMode ? (
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                    onClick={() => removeContents(contents.contentsName)}
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

export default InternetVideoUrlCard;
