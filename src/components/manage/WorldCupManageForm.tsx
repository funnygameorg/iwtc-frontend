'use client';
import { WorldCupIdManageContext } from '@/hooks/WorldCupIdManageContext';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';
import { createWorldCup } from '@/services/ManageWorldCupService';
import { getAccessToken } from '@/utils/TokenManager';
import { useMutation } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { isContext } from 'vm';
import AlertPopup from '../popup/AlertPopup';
import { PopupContext } from '../PopupProvider';

interface IProps {
    setIsCreateWorldCup: any;
    worldCupContentsList: any;
    setWorldCupId: any;
    worldCupId: any;
    myWorldCupData?: any;
    isCreateWorldCup: any;
}
/**
 * 게임 관리 폼에서 월드컵 게임에 관한 내용을 표현하는 폼
 * @param params - 월드컵 게임수정 버튼으로 들어오면 기존 월드컵의 내용이 들어온다.
 * @returns 월드컵 게임 수정 컴포넌트
 */
const WorldCupManageForm = ({
    setIsCreateWorldCup,
    worldCupContentsList,
    setWorldCupId,
    worldCupId,
    myWorldCupData,
    isCreateWorldCup,
}: IProps) => {
    const { showPopup, hidePopup } = useContext(PopupContext);

    const [worldCupInfo, setWorldCuptInfo] = useState({
        title: myWorldCupData ? myWorldCupData.title : '',
        description: myWorldCupData ? myWorldCupData.description : '',
        visibleType: myWorldCupData ? myWorldCupData.visibleType : '',
    });

    useEffect(() => {
        setWorldCuptInfo((prevWorldCup: any) => ({
            ...prevWorldCup,
            visibleType: myWorldCupData ? myWorldCupData.visibleType : 'PUBLIC',
        }));
    }, []);

    useEffect(() => {
        if (myWorldCupData) {
            setWorldCuptInfo((prevWorldCup: any) => ({
                ...prevWorldCup,
                title: myWorldCupData.title,
                description: myWorldCupData.description,
                visibleType: myWorldCupData.visibleType,
            }));
        }
    }, [myWorldCupData]);

    // useEffect(() => {
    //     if (params.initWorldCupGame !== undefined) {
    //         setValue({
    //             title: params.initWorldCupGame.title,
    //             description: params.initWorldCupGame.description,
    //             visibleType: params.initWorldCupGame.visibleType,
    //         });
    //         setFreezeWorldCup({
    //             freezeTitle: params.initWorldCupGame.title,
    //             freezeDescription: params.initWorldCupGame.description,
    //             freezeVisibleType: params.initWorldCupGame.visibleType,
    //         });
    //     }
    // }, [params.initWorldCupGame]);

    // const { title, description, visibleType } = worldCup;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setWorldCuptInfo((prevWorldCup: any) => ({
            ...prevWorldCup,
            [name]: value,
        }));
    };

    const createGame = useMutation(createWorldCup, {
        onSuccess: (data) => {
            setWorldCupId(data.data);
            setIsCreateWorldCup(true);
        },

        onError: (error: any) => {
            const { errorCode, message } = error?.response.data;
            if (errorCode) {
                showAlertPopup(message);
            }
        },
    });

    const showAlertPopup = (maeeage: string) => {
        showPopup(<AlertPopup message={maeeage} hidePopup={hidePopup} />);
    };

    const handleCreateWorldCup = (e: any) => {
        const { title, description, visibleType } = worldCupInfo;
        if (description.length > 100 || description === '') {
            showAlertPopup('월드컵 설명 1자 이상 100자 이하입니다.');
            throw Error();
        }

        if (title === '') {
            showAlertPopup('제목을 입력해주세요.');
            throw Error();
        }

        if (!(visibleType === 'PUBLIC' || visibleType === 'PRIVATE')) {
            showAlertPopup('노출 여부 선택해주세요.');
            throw Error();
        }

        const token = getAccessToken();

        const newWorldCup = {
            title,
            description,
            visibleType,
            token,
        };

        e.preventDefault();

        createGame.mutate(newWorldCup);
    };

    const disabledUpdateButton = () => {
        return (
            <div className="flex justify-end">
                <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    새로운 월드컵 반영 완료
                </button>
            </div>
        );
    };

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
        );
    };

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
                        name="title"
                        value={worldCupInfo.title}
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
                        value={worldCupInfo.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <span className="text-gray-700 text-sm font-bold mb-2">공개 여부</span>
                    <div className="mt-2">
                        <label className="inline-flex items-center ">
                            <input
                                type="radio"
                                name="visibleType"
                                value="PUBLIC"
                                onChange={handleChange}
                                className="form-radio"
                                checked={worldCupInfo.visibleType === 'PUBLIC'}
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
                                checked={worldCupInfo.visibleType === 'PRIVATE'}
                            />
                            <span className="ml-2">비공개</span>
                        </label>
                    </div>
                </div>

                {!isCreateWorldCup ? enableUpdateButton() : disabledUpdateButton()}
            </div>
        </div>
    );
};

export default WorldCupManageForm;
