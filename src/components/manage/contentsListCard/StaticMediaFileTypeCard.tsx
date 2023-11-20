import { read } from "fs";
import Image from "next/image";

const StaticMediaFileTypeCard = ({ index, contents }) => {
    // const reader = new FileReader();
    // const image = reader.readAsDataURL(contents.mediaPath);
    console.log(contents.mediaPath);
    return (
        <div>
            <div key={index} className="mb-4 p-4 border rounded-xl shadow-sm">
                <div className='flex justify-between'>
                    <div className="flex min-w-0 gap-x-4">
                        <div className="flex min-w-0 gap-x-4">
                            <Image
                                className="w-full h-52"
                                src={contents.mediaPath}
                                width={'50'}
                                height={'10'}
                                alt="img"
                            />
                        </div>
                        <div>
                            <div className='flex-1 min-w-0'>
                                <div className="mb-2">
                                    <strong>컨텐츠 이름:</strong> {contents.contentsName}
                                </div>

                                <div className="mb-2">
                                    <strong>공개 여부:</strong> {contents.visibleType === 'PUBLIC' ? "공개" : "비공개"}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="sm:flex sm:flex-col sm:items-end">
                        <div>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded">
                                삭제/ 삭제 취소
                            </button>
                        </div>
                        <div>
                            <span className="h-4 w-4 bg-green-500 rounded-full inline-block mr-2"></span>
                            변경 이상형
                        </div>
                    </div>

                </div>
            </div>

        </div >
    );
}

export default StaticMediaFileTypeCard;
