import React from 'react';
import RankList from './RankList';
import { useQueryGetWorldCupGameResultRankList } from '@/services/WorldCupService';
interface IProps {
    contentsId: number;
}

const RankListWrapper = ({ contentsId }: IProps) => {
    const { data: allRankList, isSuccess: allRankIsSuccess } = useQueryGetWorldCupGameResultRankList(contentsId);
    console.log('datadata allRankList', allRankList);
    return (
        <div className="block bg-gray-300 h-1/5 mt-12">
            <ul>
                {allRankList.data.map((items: any, index: number) => {
                    const { contentsName } = items;
                    return <RankList key={index} contentsName={contentsName} />;
                })}
            </ul>
        </div>
    );
};

export default RankListWrapper;
