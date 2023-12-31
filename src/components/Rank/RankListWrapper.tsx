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
        <div className="w-full flex flex-col bg-zinc-900 border border-zinc-600 rounded-md shadow-md p-6 mt-2">
            <div className="h-full">
                <h2 className="text-2xl font-bold mb-4">게임 결과 랭킹 목록</h2>
                {allRankIsSuccess ? (
                    <ul className="divide-y divide-gray-200 w-full h-1/6">
                        {allRankList.data.map((items: any, index: number) => {
                            const { contentsName } = items;
                            return <RankList key={index} contentsName={contentsName} rank={index + 1} />;
                        })}
                    </ul>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </div>
    );
};

export default RankListWrapper;
