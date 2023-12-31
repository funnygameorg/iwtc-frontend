import { getPassedTimeMessage } from '@/utils/Time';
import moment from 'moment';
import React, { useState } from 'react';
import ReplyPopup from './ReplyPopup';

interface ReplyData {
    body: string;
    commentId: number;
    commentWriterId: any;
    createdAt: string;
    writerNickname: string;
}

interface IProps {
    replyData: ReplyData;
}

const ReplyList = ({ replyData }: IProps) => {
    const { body, commentId, commentWriterId, createdAt, writerNickname } = replyData;
    const [isPopup, setIsPopup] = useState<boolean>(false);

    const onCickPopup = () => {
        setIsPopup(!isPopup);
    };
    return (
        <>
            <article className="bg-zinc-900 border border-zinc-600 p-6 text-base rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm font-semibold">
                            <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                alt="Michael Gough"
                            />
                            <span className="text-yellow-400">{writerNickname}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time dateTime="2022-02-08" title="February 8th, 2022">
                                {getPassedTimeMessage(moment(createdAt, 'YYYY-MM-DD a hh:mm:ss'))}
                            </time>
                        </p>
                    </div>
                    {/* <button
                        id={`dropdownComment${commentId}Button`}
                        data-dropdown-toggle={`dropdownComment${commentId}`}
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button"
                        onClick={onCickPopup}
                    >
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3"
                        >
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                        <span className="sr-only">Comment settings</span>
                    </button> */}
                    {/* <ReplyPopup commentId={commentId} isPopup={isPopup} /> */}
                </footer>

                <p className="text-white dark:text-gray-400">{body}</p>
            </article>
        </>
    );
};

export default ReplyList;
