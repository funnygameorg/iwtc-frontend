'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
interface IProps {
  setRank: Dispatch<SetStateAction<string>>
}

const RankSelect = ({setRank}: IProps) => {
    const [tabList, setTabList] = useState([
        {
            id: 1,
            name: '전체',
            active: true,
            type: 'ALL'
        },
        {
            id: 2,
            name: '년',
            active: false,
            type: 'YEAR'
        },
        {
            id: 3,
            name: '월',
            active: false,
            type: 'MONTH'
        },
        {
            id: 4,
            name: '일',
            active: false,
            type: 'DAY'
        },
    ]);

    const handleTab = (list: any) => {
      const {id, type} = list;
        setRank(type);
        setTabList(tabList.map((list) => (list.id === id ? { ...list, active: true } : { ...list, active: false })));
    };

    return (
        <ul className="ml-4 w-200 flex flex-wrap text-sm font-medium text-center text-gray-50">
            {tabList.map((list) => {
                return (
                    <li className="mr-2" key={list.id} onClick={() => handleTab(list)}>
                        <a
                            href="#"
                            className={`inline-block px-4 py-3 text-gray-400 ${
                                list.active ? 'bg-blue-100 active' : 'bg-gray-100'
                            } rounded-lg`}
                            // aria-current="page"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            {list.name}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};

export default RankSelect;
