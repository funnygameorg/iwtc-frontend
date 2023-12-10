import { worldCupGameReplyRegister } from '@/services/ReplyService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

interface IProps {
    worldcupId: number;
    contentsId: number;
}

const ReplyRegisterForm = ({ worldcupId, contentsId }: IProps) => {
    const queryClient = useQueryClient();

    const [text, setText] = useState<string>('');
    const { mutate: replyRegister } = useMutation(worldCupGameReplyRegister, {
        onSuccess: async (data) => {
            // router.push('/sign-in');
            // @ts-ignore
            queryClient.invalidateQueries('worldCupReplyList', { refetchInactive: true });
            // const mappingLsit = await mappingMediaFile(data.data);
            // setRankList(mappingLsit);
        },
        onError: (error) => {
            console.log('에러', error);
        },
    });

    const onClickRegister = () => {
        const params = {
            worldcupId: worldcupId,
            contentsId: contentsId,
            body: text,
            nickname: '테스트',
        };
        replyRegister(params);
    };
    const onChangeText = (e: any) => {
        const comment = e.target.value;
        setText(comment);
    };
    return (
        <div className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label form="comment" className="sr-only">
                    Your comment
                </label>
                <textarea
                    id="comment"
                    rows={6}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                    value={text}
                    onChange={onChangeText}
                ></textarea>
            </div>
            <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                onClick={onClickRegister}
            >
                작성하기
            </button>
        </div>
    );
};

export default ReplyRegisterForm;
