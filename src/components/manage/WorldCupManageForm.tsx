'use client'
import { WorldCupIdManageContext } from '@/hooks/WorldCupIdManageContext';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';
import { createWorldCup } from '@/services/ManageWorldCupService';
import { getAccessToken } from '@/utils/TokenManager';
import { useMutation } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { isContext } from 'vm';




/**
 * 게임 관리 폼에서 월드컵 게임에 관한 내용을 표현하는 폼
 * @param params - 월드컵 게임수정 버튼으로 들어오면 기존 월드컵의 내용이 들어온다.
 * @returns 월드컵 게임 수정 컴포넌트
 */
const WorldCupManageForm = (params) => {
    const { isCreateWorldCup, setIsCreateWorldCup } = useContext(WorldCupManageContext);
    const { worldCupId, setWorldCupId } = useContext(WorldCupIdManageContext);

    const [worldCup, setValue] = useState({
        title: "",
        description: "",
        visibleType: "PUBLIC"
    });

    const [freezeWorldCup, setFreezeWorldCup] = useState({
        freezeTitle: "",
        freezeDescription: "",
        freezeVisibleType: ""
    });

    useEffect(() => {

        if (params.initWorldCupGame !== undefined) {
            setValue({
                title: params.initWorldCupGame.title,
                description: params.initWorldCupGame.description,
                visibleType: params.initWorldCupGame.visibleType
            });
        }
    }, [params.initWorldCupGame]

    );

    const { title, description, visibleType } = worldCup;

    const handleChange = (e: any) => {

        const { name, value } = e.target;
        setValue(prevWorldCup => ({
            ...prevWorldCup,
            [name]: value
        }));

    };


    const mutation = useMutation(createWorldCup, {

        onSuccess: (data) => {

            setFreezeWorldCup({
                freezeTitle: title,
                freezeDescription: description,
                freezeVisibleType: visibleType
            });

            setWorldCupId(data.data);
            setIsCreateWorldCup(false);

        },

        onError: (error) => {
            alert(error);
        }
    });



    const handleCreateWorldCup = (e: any) => {

        if (description.length > 100 || description === '') {
            alert("월드컵 설명 1자 이상 100자 이하입니다.");
            throw Error();
        }

        if (title === '') {
            alert("제목을 입력해주세요.");
            throw Error();
        }

        if (!(visibleType === 'PUBLIC' || visibleType === 'PRIVATE')) {
            alert("노출 여부 선택해주세요.");
            throw Error();
        }

        const token = getAccessToken();

        const newWorldCup = {
            title,
            description,
            visibleType,
            token
        };

        e.preventDefault();

        mutation.mutate(newWorldCup);
    }


    // 월드컵 업데이트를 한 후의 상태와 다르거나 처음 월드컵 상태(blank)일 때만 업데이트 버튼이 활성화된다.
    const isNotUpdateWorldCupState = (freezeWorldCup: any, worldCup: any) => {

        const equalsUpdateWorldCup = freezeWorldCup.freezeTitle === worldCup.title &&
            freezeWorldCup.freezeDescription === worldCup.description &&
            freezeWorldCup.freezeVisibleType === worldCup.visibleType;

        const blankWorldCup = freezeWorldCup.freezeTitle !== "" &&
            freezeWorldCup.freezeDescription !== "" &&
            freezeWorldCup.freezeVisibleType !== "";

        return equalsUpdateWorldCup && blankWorldCup;
    }




    const disabledUpdateButton = () => {
        return (
            <div className="flex justify-end">
                <button
                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    새로운 월드컵 반영 완료
                </button>
            </div>
        )
    }



    const enableUpdateButton = () => {
        return (
            <div className="flex justify-end">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleCreateWorldCup}
                >
                    월드컵 생성/수정
                </button>
            </div>
        )
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
                        <label className="inline-flex items-center ">
                            <input
                                type="radio"
                                name="visibleType"
                                value="PUBLIC"
                                onChange={handleChange}
                                className="form-radio"
                                checked={visibleType === 'PUBLIC'}
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
                                checked={visibleType === 'PRIVATE'}
                            />
                            <span className="ml-2">비공개</span>
                        </label>
                    </div>
                </div>

                {isNotUpdateWorldCupState(freezeWorldCup, worldCup) ? disabledUpdateButton() : enableUpdateButton()}

            </div>
        </div>
    );
};

export default WorldCupManageForm;