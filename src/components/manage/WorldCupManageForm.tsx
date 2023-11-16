import React from 'react';




/*
    게임 관리 폼에서 월드컵 게임에 관한 내용을 표현하는 폼

*/
const WorldCupManageForm = () => {

    const title = '더미 타이틀';
    const description = '더미 설명';
    const visibleType = '더미 노출 여부';

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div>
                <div className="mb-4">

                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        월드컵 제목
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        설명
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>


                <div className="mb-4">
                    <span className="text-gray-700 text-sm font-bold mb-2">노출 여부</span>
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="visibleType"
                                value="public"
                                checked={visibleType === 'PUBLIC'}
                                className="form-radio"
                            />
                            <span className="ml-2">공개</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                            <input
                                type="radio"
                                name="visibleType"
                                value="private"
                                checked={visibleType === 'PRIVATE'}
                                className="form-radio"
                            />
                            <span className="ml-2">비공개</span>
                        </label>
                    </div>
                </div>


                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        월드컵 생성/수정
                    </button>
                </div>


            </div>
        </div>
    );
};

export default WorldCupManageForm;