import { ManagedContentDraft } from '@/domain/manage/persistedContent';
import { ChangeEvent, Dispatch, RefObject, SetStateAction } from 'react';
import ImageTypeLayout from './ImageTypeLayout';
import SelectFileType from './SelectFileType';
import SelectVisibleType from './SelectVisibleType';
import YoutubeTypeLayout from './YoutubeTypeLayout';

interface WorldCupContentCreateFormProps {
    mediaFileType: string;
    contents: ManagedContentDraft;
    isImageLoaded: boolean;
    setIsImageLoaded: Dispatch<SetStateAction<boolean>>;
    setContents: Dispatch<SetStateAction<ManagedContentDraft>>;
    videoRef: RefObject<HTMLVideoElement>;
    imageRef: RefObject<HTMLImageElement>;
    onContentsChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onVisibleTypeChange: (value: string) => void;
    onMediaFileTypeChange: (value: string) => void;
    onAdd: () => void;
}

const WorldCupContentCreateForm = ({
    mediaFileType,
    contents,
    isImageLoaded,
    setIsImageLoaded,
    setContents,
    videoRef,
    imageRef,
    onContentsChange,
    onVisibleTypeChange,
    onMediaFileTypeChange,
    onAdd,
}: WorldCupContentCreateFormProps) => {
    return (
        <div className="w-full h-full mb-4 p-4 border rounded-xl shadow bg-gray-200">
            <div>
                <SelectFileType mediaFileType={mediaFileType} handleMediaFileType={onMediaFileTypeChange} />
            </div>
            {mediaFileType && (
                <div className="flex justify-between">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="flex-1 min-w-0">
                            <div className="mb-2">
                                <strong className="ml-1">이상형 이름</strong>
                                <div className="flex flex-col space-y-2">
                                    <input
                                        id="textInput"
                                        type="text"
                                        className="p-1 border rounded-xl"
                                        placeholder="이상형 이름"
                                        name="contentsName"
                                        value={contents.contentsName}
                                        onChange={onContentsChange}
                                    />
                                </div>
                            </div>
                            {mediaFileType === 'file' ? (
                                <ImageTypeLayout
                                    isImageLoaded={isImageLoaded}
                                    setIsImageLoaded={setIsImageLoaded}
                                    setWorldCupContents={setContents}
                                    fowardVideoRef={videoRef}
                                    fowardImgRef={imageRef}
                                    mp4Type={contents.mp4Type}
                                    imgType={contents.imgType}
                                />
                            ) : (
                                <YoutubeTypeLayout
                                    mediaPath={contents.mediaPath}
                                    videoStartTime={contents.videoStartTime}
                                    videoPlayDuration={contents.videoPlayDuration}
                                    handleCreateWorldCupContents={onContentsChange}
                                />
                            )}
                            <SelectVisibleType
                                visibleType={contents.visibleType}
                                handleVisibleType={onVisibleTypeChange}
                            />
                        </div>
                    </div>

                    <div className="sm:flex sm:flex-col sm:items-end">
                        <div>
                            <button
                                className="bg-green-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                onClick={onAdd}
                            >
                                추가하기
                            </button>
                        </div>
                        <div>
                            <button
                                className="bg-orange-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
                                onClick={() => onMediaFileTypeChange('')}
                            >
                                돌아가기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorldCupContentCreateForm;
