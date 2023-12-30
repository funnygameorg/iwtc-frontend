'use client';
import React, { useContext } from 'react';
import { PopupContext } from '../PopupProvider';
import AlertPopup from '../popup/AlertPopup';

const MobileView = () => {
    const { showPopup, hidePopup } = useContext(PopupContext);

    const handleCopyLink = async () => {
        //https
        await window.navigator.clipboard?.writeText(window.location.href);
        showAlertPopup('링크가 복사되었습니다!');
    };

    const showAlertPopup = (maeeage: string) => {
        showPopup(<AlertPopup message={maeeage} hidePopup={hidePopup} />);
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className=" p-8 max-w-md w-full">
                    <h1 className="text-2xl font-bold mb-4 text-center">PC 버전으로 접속해주세요</h1>
                    <p className="text-center text-gray-400 mb-1">아쉽게도 모바일은 지원하지 않아요</p>
                    <p className="text-center text-gray-400 mb-8">추후에 개발 될 예정이에요!</p>
                    {/* <div className="flex justify-center">
                        <button
                            onClick={handleCopyLink}
                            className="bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            링크 복사하기
                        </button>
                    </div> */}
                </div>
            </div>
        </>
        // <div className="bg-gray-200 flex items-center justify-center">
        //     <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        //         <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">PC 버전으로 접속하기</h1>
        //         <p className="text-lg mb-8 text-center text-gray-600">PC 버전으로 접속하셨습니다.</p>
        //         <div className="flex justify-center">
        //             <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        //                 시작하기
        //             </button>
        //         </div>
        //     </div>
        // </div>
    );
};

export default MobileView;
