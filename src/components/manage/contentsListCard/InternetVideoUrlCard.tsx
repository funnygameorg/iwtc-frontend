import YoutubePlayer from "@/components/youtubePlayer/YoutubePlayer";
import { WorldCupContentsManageContext } from "@/hooks/WorldCupContentsManageContext";
import exp from "constants";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";




const InternetVideoUrlCard = ({ index, contents }) => {


    const { worldCupContentsManageContext, setWorldCupContentsManageContext } = useContext(WorldCupContentsManageContext);

    // 유튜브 영상 플레이어에 제공한다.
    const [youtubeUrl, setYoutubeUrl] = useState("");

    const [isUpdateMode, setIsUpdateMode] = useState(false);

    useEffect(() => {
        setYoutubeUrl(contents.mediaData)
    }, [youtubeUrl]);

    // 해당 요소 삭제
    const removeContents = (contentsName) => {
        setWorldCupContentsManageContext(prev =>
            prev.filter(contents => contents.contentsName !== contentsName)
        )
    }

    // 해당 요소 수정
    const updateContentsMode = () => {
        setIsUpdateMode(true);
    }

    // 해당 요소 수정
    const applyUpdate = () => {
        setIsUpdateMode(false);
    }


    return (
        <div>
            <div key={index} className="mb-4 p-4 border rounded-xl shadow-sm">

                <div className='flex justify-between'>
                    <div className="flex min-w-0 gap-x-4">

                        <div className="flex min-w-0 gap-x-4">
                            <YoutubePlayer url={youtubeUrl} componentType={'uploadList'} />
                        </div>


                        <div className='flex-1'>
                            <div className="mb-2">
                                <strong>컨텐츠 이름:</strong>
                                <span className="ml-1">
                                    {!isUpdateMode ?
                                        <span>{contents.contentsName}</span>
                                        :
                                        <span>
                                            <input
                                                id="textInput"
                                                type="text"
                                                className="p-1 border rounded-xl"
                                                placeholder="이상형 이름"
                                                name='contentsName'
                                                value={contents.contentsName}
                                            />
                                        </span>
                                    }
                                </span>
                            </div>
                            <div className="mb-2">
                                <strong>영상 주소: </strong>
                                <span className="ml-1">
                                    {!isUpdateMode ?
                                        <a
                                            href={youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >{youtubeUrl}</a>
                                        :
                                        <input
                                            id="textInput"
                                            type="text"
                                            className="p-1 border rounded-xl"
                                            placeholder="YouTube URL"
                                            name='youtubeUrl'
                                            value={youtubeUrl}
                                        />
                                    }
                                </span>
                            </div>

                            <div className="mb-2">
                                <strong>영상 시작 시간:</strong>
                                <span className="ml-1">
                                    {!isUpdateMode ?
                                        <span>
                                            {contents.videoStartTime}
                                        </span>
                                        :
                                        <span>
                                            <input
                                                id="textInput"
                                                type="text"
                                                className="p-1 border rounded-xl"
                                                placeholder="ex 00100"
                                                name='videoStartTime'
                                                value={contents.videoStartTime}
                                            />
                                        </span>
                                    }
                                </span>
                            </div>

                            <div className="mb-2">
                                <strong>반복 시간:</strong>
                                <span className="ml-1">
                                    {!isUpdateMode ?
                                        <span>
                                            {contents.videoPlayDuration}
                                        </span>
                                        :
                                        <span>
                                            <input
                                                id="textInput"
                                                type="text"
                                                className="p-1 border rounded-xl"
                                                placeholder="3 ~ 5"
                                                name='videoPlayDuration'
                                                value={contents.videoPlayDuration}
                                            />
                                        </span>
                                    }
                                </span>
                            </div>

                            <div className="mb-2">
                                <strong>공개 여부:</strong>
                                <span className="ml-1">
                                    {!isUpdateMode ?
                                        <span>
                                            {contents.visibleType === 'PUBLIC' ? "공개" : "비공개"}
                                        </span>
                                        :
                                        <span>
                                            <input
                                                id="textInput"
                                                type="text"
                                                className="p-1 border rounded-xl"
                                                placeholder="공개 여부"
                                                name='visibleType'
                                                value={contents.visibleType}
                                            />
                                        </span>
                                    }
                                </span>
                            </div>

                        </div>

                    </div>



                    <div className="sm:flex sm:flex-col sm:items-end">
                        <div>
                            <div>
                                {!isUpdateMode ?
                                    < button
                                        className="bg-green-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                        onClick={() => updateContentsMode()}
                                    >
                                        수정
                                    </button>
                                    :
                                    <button
                                        className="bg-blue-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                        onClick={() => applyUpdate()}
                                    >
                                        적용
                                    </button>
                                }
                            </div>
                            {!isUpdateMode ?
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                    onClick={() => removeContents(contents.contentsName)}
                                >
                                    삭제
                                </button> :
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default InternetVideoUrlCard;
