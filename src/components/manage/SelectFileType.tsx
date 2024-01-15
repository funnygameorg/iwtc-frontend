import React from 'react';

interface IProps {
    mediaFileType: string;
    handleMediaFileType: (fileType: string) => void;
}

const SelectFileType = ({ mediaFileType, handleMediaFileType }: IProps) => {
    console.log('mediaFileType', mediaFileType);
    return (
        <div className="mb-2">
            <div className="mb-3">
                <strong> ✅ 만들고 싶은 이상형 파일의 종류를 선택해주세요 </strong>
            </div>
            <div className="mb-4">
                <button
                    className={`px-4 py-2 border rounded-md mr-4 ${
                        mediaFileType === 'video' ? 'bg-blue-500 text-white' : 'bg-white'
                    }`}
                    onClick={() => handleMediaFileType('video')}
                >
                    유튜브 영상
                </button>
                <button
                    className={`px-4 py-2 border rounded-md ${
                        mediaFileType === 'file' ? 'bg-blue-500 text-white' : 'bg-white'
                    }`}
                    onClick={() => handleMediaFileType('file')}
                >
                    이미지 파일
                </button>
            </div>
        </div>
    );
};

export default SelectFileType;
