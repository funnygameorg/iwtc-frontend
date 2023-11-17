'use client'
import { createWorldCup } from '@/services/WorldCupService';
import { getAccessToken } from '@/utils/TokenManager';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';




/*
    게임 관리 폼에서 월드컵 게임에 관한 내용을 표현하는 폼

*/
const WorldCupManageForm = () => {

    const [worldCup, setValue] = useState({
        title: "",
        description: "",
        visibleType: ""
    });

    const { title, description, visibleType } = worldCup;


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setValue(prevWorldCup => ({
            ...prevWorldCup,
            [name]: value
        }));
    };


    const mutation = useMutation(createWorldCup, {
        onSuccess: () => {
            window.alert('성공');
        },
        onError: (error) => {
            console.log('에러', error)
        }
    });


    const handleCreateWorldCup = (e: any) => {
        e.preventDefault();
        const token = getAccessToken();
        mutation.mutate({
            title,
            description,
            visibleType,
            token
        });
    }


    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div>
                <div className="mb-4">

                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        월드컵 제목
                    </label>
                    <input
                        type="text"
                        id="title"
                        name='title'
                        value={title}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        설명
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <span className="text-gray-700 text-sm font-bold mb-2">노출 여부</span>
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="visibleType"
                                value="PUBLIC"
                                onChange={handleChange}
                                className="form-radio"
                            />
                            <span className="ml-2">공개</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                            <input
                                type="radio"
                                name="visibleType"
                                value="PRIVATE"
                                onChange={handleChange}
                                className="form-radio"
                            />
                            <span className="ml-2">비공개</span>
                        </label>
                    </div>
                </div>


                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleCreateWorldCup}
                    >
                        월드컵 생성/수정
                    </button>
                </div>


            </div>
        </div>
    );
};

export default WorldCupManageForm;