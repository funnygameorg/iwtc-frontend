import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IProps {
    roundList: any;
    setSelectRound: Dispatch<SetStateAction<number>>;
    setFirstSelectedRound: Dispatch<SetStateAction<number>>;
}

const RoundPopup = ({ roundList, setSelectRound, setFirstSelectedRound }: IProps) => {
    const [isOnPopup, setIsOnPopup] = useState<boolean>(true);

    const selectRound = (round: number) => {
        setSelectRound(round);
        setFirstSelectedRound(round);
        closePopup();
    };

    const closePopup = () => {
        setIsOnPopup(false);
    };

    console.log('roundList', roundList);

    return (
        <>
            {/* <!-- Main modal --> */}
            <div
                id="crypto-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`${
                    isOnPopup ? '' : 'hidden'
                } grid place-items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
                <div className="relative w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="crypto-modal"
                            onClick={closePopup}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        {/* <!-- Modal header --> */}
                        <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                                몇강을 하실지 선택하세요.
                            </h3>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-6">
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                아래 중 하나를 선택하세요.
                            </p>
                            <ul className="my-4 space-y-3">
                                {roundList?.data.rounds.map((item: number, idx: number) => {
                                    if (item !== 2) {
                                        return (
                                            <li key={idx} onClick={() => selectRound(item)}>
                                                <a className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                    <span className="flex-1 ml-3 whitespace-nowrap">{item}강</span>
                                                </a>
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoundPopup;
