import { WorldCupContentsManageContext } from "@/hooks/WorldCupContentsManageContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

const StaticMediaFileTypeCard = ({ index, contents }) => {

    const { worldCupContentsManageContext, setWorldCupContentsManageContext } = useContext(WorldCupContentsManageContext);

    const [image, setImage] = useState("");

    const [isUpdateMode, setIsUpdateMode] = useState(false);


    useEffect(
        () => {
            setImage(contents.mediaData);
        }, [contents.mediaData]
    );



    const removeContents = (contentsName) => {
        setWorldCupContentsManageContext(prev =>
            prev.filter(contents => contents.contentsName !== contentsName)
        )
    }

    const updateContentsMode = () => {
        setIsUpdateMode(true);
    }

    const applyUpdateContents = () => {
        setIsUpdateMode(false);
    }


    const changeImage = (e) => {
        const imageFile = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = function (e) {
            setImage(e.target.result);
        }

        reader.readAsDataURL(imageFile);

    }
    console.log(image)


    return (
        <div>
            <div key={index} className="mb-4 p-4 border rounded-xl shadow-sm">
                <div className='flex justify-between'>
                    <div className="flex min-w-0 gap-x-4">
                        <div className="flex min-w-0 gap-x-4">
                            <Image
                                className="w-full h-52"
                                src={image || ''}
                                width={'10'}
                                height={'10'}
                                alt="img"
                            />
                        </div>
                        <div>
                            <div className='flex-1 min-w-0'>
                                <div className="mb-2">
                                    <strong>컨텐츠 이름:</strong>
                                    <span className="ml-2">
                                        {!isUpdateMode ?
                                            <span>{contents.contentsName}</span>
                                            :
                                            <span>
                                                <input
                                                    id="textInput"
                                                    type="text"
                                                    className="p-1 border rounded-xl"
                                                    placeholder="컨텐츠 이름"
                                                    name='contentsName'
                                                    value={contents.contentsName}
                                                />
                                            </span>
                                        }
                                    </span>
                                </div>

                                <div className="mb-2">
                                    <strong>공개 여부:</strong>
                                    <span className="ml-2">
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
                                                    name='contentsName'
                                                    value={contents.contentsName}
                                                />
                                            </span>
                                        }
                                    </span>
                                </div>

                                {isUpdateMode ?
                                    <span>
                                        <span>
                                            <strong>이미지 변경</strong>
                                        </span>
                                        <div className="m-3">
                                            <input
                                                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                                type="file"
                                                id="formFileMultiple"
                                                name='mediaPath'
                                                onChange={changeImage}
                                            />
                                        </div>
                                    </span>
                                    :
                                    <></>
                                }

                            </div>
                        </div>

                    </div>

                    <div className="sm:flex sm:flex-col sm:items-end">
                        <div>
                            {!isUpdateMode ?
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                    onClick={() => removeContents(contents.contentsName)}
                                >
                                    삭제
                                </button>
                                :
                                <></>
                            }
                        </div>
                        <div>
                            {!isUpdateMode ?
                                <button
                                    className="bg-green-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                    onClick={updateContentsMode}
                                >
                                    수정
                                </button>
                                :
                                <button
                                    className="bg-green-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                    onClick={applyUpdateContents}
                                >
                                    적용
                                </button>
                            }
                        </div>
                    </div>

                </div>
            </div>

        </div >
    );
}

export default StaticMediaFileTypeCard;
