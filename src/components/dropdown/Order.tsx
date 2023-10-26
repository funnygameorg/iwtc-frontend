'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';

enum OrderType {
  Latest = '최신순',
  Popularity = '인기순'
}

interface IProps {
  setRank: Dispatch<SetStateAction<string>>
}


const Order = ({setRank}:IProps) => {
    const orderOptions = Object.values(OrderType);

    const [selectedOrder, setSelectedOrder] = useState<OrderType>(OrderType.Latest);
    const [isOpen, setOpen] = useState<boolean>(false);
    
    const handleDropDown = () => {
        setOpen(!isOpen);
    };

    return (
        <div className="ml-4 w-200">
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-gray-400 bg-gray-100 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={handleDropDown}
            >
                {selectedOrder}
                <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {/* // <!-- Dropdown menu --> */}
            <div
                id="dropdown"
                className={`z-50 ${
                    isOpen ? 'block' : 'hidden'
                } bg-white divide-y relative divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 `}
            >
                <ul
                    className="py-2 z-50 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                >
                    {orderOptions.map((option, index) => (
                        <li key={index}>
                            <a
                                href="#"
                                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${option === selectedOrder ? 'font-bold' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedOrder(option);
                                    setOpen(false);
                                }}
                            >
                                {option}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Order;
