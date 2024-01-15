import React, { useEffect, useState } from 'react';
import RankList from './RankList';
import { useQueryGetWorldCupGameResultRankList } from '@/services/WorldCupService';
import { mappingMediaFile } from '@/utils/common';
interface IProps {
    contentsId: number;
}

const RankListWrapper = ({ contentsId }: IProps) => {
    const { data: allRankList, isSuccess: allRankIsSuccess } = useQueryGetWorldCupGameResultRankList(contentsId);
    const [lastResult, setLastResult] = useState<any>([]);

    useEffect(() => {
        if (allRankIsSuccess) {
            getMediaFile(allRankList.data);
        }
    }, [allRankIsSuccess]);

    const getMediaFile = async (list: any) => {
        const mappingList = await mappingMediaFile(list);
        setLastResult(mappingList);
    };

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
        <div className="w-full h-max flex flex-col bg-zinc-900 border  border-zinc-600 rounded-md shadow-md p-4 mt-2 mb-10">
            <h2 className="text-2xl font-bold mb-4">게임 결과 랭킹 목록</h2>
            <div className="">
                {allRankIsSuccess ? (
                    <ul className="divide-y divide-zinc-600  w-full h-auto ">
                        {lastResult.map((items: any, index: number) => {
                            const {
                                contentsName,
                                gameRank,
                                imgUrl,
                                fileType,
                                videoStartTime,
                                videoPlayDuration,
                                gameScore,
                            } = items;
                            return (
                                <RankList
                                    key={index}
                                    contentsName={contentsName}
                                    rank={gameRank}
                                    imgUrl={imgUrl}
                                    fileType={fileType}
                                    videoStartTime={videoStartTime}
                                    videoPlayDuration={videoPlayDuration}
                                    gameScore={gameScore}
                                />
                            );
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
