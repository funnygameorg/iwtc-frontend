'use client';

import { getMyWorldCupList } from '@/services/ManageWorldCupService';
import { getAccessToken } from '@/utils/TokenManager';
import { get } from 'http';
import { useEffect, useState } from 'react';
import MyWorldCupCard from './MyWorldCupCard';

const MyWorldCupList = () => {
    const [myWorldCupList, setMyWorldCupList] = useState([]);

    const accessToken = getAccessToken();

    useEffect(() => {
        const fetchData = async () => {
            const response: any = await getMyWorldCupList(accessToken);
            setMyWorldCupList(response.data.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            {myWorldCupList.map((myWorldCup, index) => (
                <MyWorldCupCard key={index} myWorldCup={myWorldCup} />
            ))}
        </div>
    );
};

export default MyWorldCupList;
