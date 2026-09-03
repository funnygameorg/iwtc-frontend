'use client';

import { useQueryGetMyWorldCupList } from '@/services/ManageWorldCupService';
import { getAccessToken } from '@/utils/TokenManager';
import MyWorldCupCard from './MyWorldCupCard';

const MyWorldCupList = () => {
    const accessToken = getAccessToken();
    const { data: myWorldCupList, isSuccess, refetch } = useQueryGetMyWorldCupList(accessToken);

    if (isSuccess) {
        return (
            <div>
                {myWorldCupList.data.data.map((myWorldCup, index) => (
                    <MyWorldCupCard key={index} myWorldCup={myWorldCup} refetch={refetch} />
                ))}
            </div>
        );
    }
};

export default MyWorldCupList;
