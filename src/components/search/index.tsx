'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface IProps {
    setKeyword: Dispatch<SetStateAction<undefined | string>>;
}

const SearchBar = ({ setKeyword }: IProps) => {
    const [text, setText] = useState('');

    const onChangeKeyword = (e) => {
        const { value } = e.target;

        setText(value ? value : undefined);
    };

    const onClickSearch = () => {
        setKeyword(text);
    };
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            onClickSearch();
        }
    };

    return (
        <div className="ml-4 w-200">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
            </label>
            <div className="relative">
                <div className="absolute right-0 inset-y-0 flex items-center pr-3 " onClick={onClickSearch}>
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block p-4 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="키워드를 검색하세요."
                    required
                    onChange={(e) => onChangeKeyword(e)}
                    onKeyPress={(e) => handleOnKeyPress(e)}
                    value={text}
                />
                {/* <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Search
                </button> */}
            </div>
        </div>
    );
};

export default SearchBar;
