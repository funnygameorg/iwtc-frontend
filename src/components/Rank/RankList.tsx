import React from 'react';

interface IProps {
    contentsName: string;
}

const RankList = ({ contentsName }: IProps) => {
    return (
        <li>
            <span>{contentsName}</span>
        </li>
    );
};

export default RankList;
