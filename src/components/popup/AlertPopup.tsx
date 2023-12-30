import React from 'react';

interface IProps {
    message: string;
    hidePopup: () => void;
}

const AlertPopup = ({ message, hidePopup }: IProps) => {
    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto">
            <div className="relative rounded-lg shadow bg-gray-700">
                <div className="flex justify-center bg-gray-700 border-b rounded-t dark:border-gray-600 py-4">
                    <h1 className="text-xl font-bold text-white">알림</h1>
                </div>
                <div className="p-6 text-white">{message}</div>
                <div className="flex items-center justify-center p-4 rounded-b-lg bg-gray-700">
                    {/* <button
                        onClick={hidePopup}
                        className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg mr-2 focus:outline-none"
                    >
                        Cancel
                    </button> */}
                    <button
                        onClick={hidePopup}
                        className="px-4 py-2 bg-yellow-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertPopup;
