'use client';

import { getMyWorldCupList, useQueryGetMyWorldCupList } from '@/services/ManageWorldCupService';
import { getAccessToken } from '@/utils/TokenManager';
import { get } from 'http';
import { useEffect, useState } from 'react';
import MyWorldCupCard from './MyWorldCupCard';

const MyWorldCupList = () => {
    const accessToken = getAccessToken();
    const { data: myWorldCupList, isSuccess, refetch } = useQueryGetMyWorldCupList(accessToken);

    // useEffect(() => {
    //     const accessToken = getAccessToken();

    //     const fetchData = async () => {
    //         const response: any = await getMyWorldCupList(accessToken);
    //         setMyWorldCupList(response.data.data);
    //     };
    //     fetchData();
    // }, []);

    if (isSuccess) {
        return (
            <div>
                {myWorldCupList.data.data.map((myWorldCup: any, index: number) => (
                    <MyWorldCupCard key={index} myWorldCup={myWorldCup} refetch={refetch} />
                ))}
            </div>
        );
    }
};

export default MyWorldCupList;
