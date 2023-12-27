import React from 'react';
import RankList from './RankList';
import { useQueryGetWorldCupGameResultRankList } from '@/services/WorldCupService';
interface IProps {
    contentsId: number;
}

const RankListWrapper = ({ contentsId }: IProps) => {
    const { data: allRankList, isSuccess: allRankIsSuccess } = useQueryGetWorldCupGameResultRankList(contentsId);
    // return (
    //     <div className="block bg-gray-300 h-1/5 mt-12">
    //         <ul>
    //             {allRankList.data.map((items: any, index: number) => {
    //                 const { contentsName } = items;
    //                 return <RankList key={index} contentsName={contentsName} />;
    //             })}
    //         </ul>
    //     </div>
    // );

    return (
        <div className="bg-gray-100 rounded-md shadow-md p-6 mt-12">
            <h2 className="text-2xl font-bold mb-4">게임 결과 랭킹 목록</h2>
            {allRankIsSuccess ? (
                <ul className="divide-y divide-gray-200">
                    {allRankList.data.map((items: any, index: number) => {
                        const { contentsName } = items;
                        return <RankList key={index} contentsName={contentsName} rank={index + 1} />;
                    })}
                </ul>
            ) : (
                <p>로딩 중...</p>
            )}
        </div>
    );
};

export default RankListWrapper;
