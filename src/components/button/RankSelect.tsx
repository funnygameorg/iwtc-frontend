'use client';
import React, { useState } from 'react';

const RankSelect = () => {
    const [tabList, setTabList] = useState([
        {
            id: 1,
            name: '전체',
            active: true,
        },
        {
            id: 2,
            name: '년',
            active: false,
        },
        {
            id: 3,
            name: '월',
            active: false,
        },
        {
            id: 4,
            name: '일',
            active: false,
        },
    ]);

    const handleTab = (id: number) => {
        setTabList(tabList.map((list) => (list.id === id ? { ...list, active: true } : { ...list, active: false })));
    };

    return (
        <ul className="ml-4 w-200 flex flex-wrap text-sm font-medium text-center text-gray-50">
            {tabList.map((list) => {
                return (
                    <li className="mr-2" key={list.id}>
                        <a
                            href="javascript:"
                            className={`inline-block px-4 py-3 text-gray-400 ${
                                list.active ? 'bg-blue-100 active' : 'bg-gray-100'
                            } rounded-lg`}
                            // aria-current="page"
                            onClick={() => handleTab(list.id)}
                        >
                            {list.name}
                        </a>
                    </li>
                );
            })}
            {/* <li className="mr-2 ">
        <a
          href="#"
          className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
          aria-current="page"
        >
          전체
        </a>
      </li>
      <li className="mr-2">
        <a
          href="#"
          className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          년
        </a>
      </li>
      <li className="mr-2">
        <a
          href="#"
          className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          원
        </a>
      </li>
      <li className="mr-2">
        <a
          href="#"
          className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          일
        </a>
      </li> */}
        </ul>
    );
};

export default RankSelect;
