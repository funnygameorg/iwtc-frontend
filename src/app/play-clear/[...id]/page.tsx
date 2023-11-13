'use client';
import { worldCupGameClear } from '@/services/WorldCupService';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const page = ({ params }: { params: { id: any } }) => {
    const [rankList, setRankList] = useState<any>();
    console.log('params', params);
    const { id } = params;
    // console.log('id, data', id, data);
    const { mutate, isLoading, error, isSuccess } = useMutation(worldCupGameClear, {
        onSuccess: (data) => {
            // router.push('/sign-in');
            setRankList(data.data);
            console.log('게임종료 API 성공 ===>', data.data);
        },
        onError: (error) => {
            console.log('에러', error);
        },
    });

    useEffect(() => {
        mutate(id);
    }, []);
    // 게임 종료 API 응답값에 컨텐츠 ID를 내가 보내는데 응답값에 ID에 대한 게임 이름 데이터 내려줘야함
    if (isSuccess && rankList) {
        return (
            <ul>
                {/* {rankList.map(() =>)} */}
                <li>우승 : {rankList.firstWinnerName}</li>
                <li>준우승 : {rankList.secondWinnerName}</li>
                <li>3등 : {rankList.thirdWinnerName}</li>
                <li>4등 : {rankList.fourthWinnerName}</li>
            </ul>
        );
    }
};

export default page;
