'use client';
import { worldCupGameClear } from '@/services/WorldCupService';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';

const page = ({ params }: { params: { id: any } }) => {
    console.log('params', params);
    const { id } = params;
    // console.log('id, data', id, data);
    const { mutate, isLoading, error, isSuccess } = useMutation(worldCupGameClear, {
        onSuccess: (data) => {
            // router.push('/sign-in');
            console.log('게임종료 API 성공 ===>', data);
        },
        onError: (error) => {
            console.log('에러', error);
        },
    });

    useEffect(() => {
        mutate(id);
    }, []);
    // 게임 종료 API 응답값에 컨텐츠 ID를 내가 보내는데 응답값에 ID에 대한 게임 이름 데이터 내려줘야함
    if (isSuccess) {
        <ul>
            <li></li>
        </ul>;
    }
    return <div>게임종료 !</div>;
};

export default page;