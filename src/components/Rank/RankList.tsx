import React from 'react';

interface IProps {
    contentsName: string;
    rank: number;
}

const RankList = ({ contentsName, rank }: IProps) => {
    return (
        <li className="w-full h-full py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4 w-full h-full ">
                <span className="text-2xl font-semibold">{rank}등</span>
                <span className="text-lg">{contentsName}</span>
            </div>
            {/* 추가적인 정보가 있다면 여기에 추가하세요 */}
        </li>
    );
};

export default RankList;
