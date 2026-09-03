import { getPassedTimeMessage } from '@/utils/Time';
import moment from 'moment';
import { ReplyData } from '@/services/ReplyService';

interface IProps {
    replyData: ReplyData;
}

const ReplyList = ({ replyData }: IProps) => {
    const { body, createdAt, writerNickname } = replyData;

    return (
        <>
            <article className="bg-zinc-900 border border-zinc-600 p-3 text-base rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm font-semibold">
                            <span className="text-yellow-400">{writerNickname}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time dateTime="2022-02-08" title="February 8th, 2022">
                                {getPassedTimeMessage(moment(createdAt, 'YYYY-MM-DD a hh:mm:ss'))}
                            </time>
                        </p>
                    </div>
                </footer>

                <p className="text-white dark:text-gray-400">{body}</p>
            </article>
        </>
    );
};

export default ReplyList;
