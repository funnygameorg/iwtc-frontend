'use client';

const MobileView = () => {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className=" p-8 max-w-md w-full">
                    <h1 className="text-2xl font-bold mb-4 text-center">PC 버전으로 접속해주세요</h1>
                    <p className="text-center text-gray-400 mb-1">아쉽게도 모바일은 지원하지 않아요</p>
                    <p className="text-center text-gray-400 mb-8">추후에 개발 될 예정이에요!</p>
                </div>
            </div>
        </>
    );
};

export default MobileView;
