'use client'
import React, { useContext, useEffect, useState } from 'react';
import WorldCupManageForm from '@/components/manage/WorldCupManageForm';
import WorldCupContentsManageListWrapper from '@/components/manage/WorldCupContentsManagerListWrapper';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';
import { WorldCupIdManageContext } from '@/hooks/WorldCupIdManageContext';
import { WorldCupContentsManageContext } from '@/hooks/WorldCupContentsManageContext';
import { getMyWorldCup, getMyWorldCupContentsList } from '@/services/ManageWorldCupService';
import { getAccessToken } from '@/utils/TokenManager';
import { UpdateContentsListContest } from '@/hooks/UpdateContentsListContest';





/*
    월드컵 관리 페이지를 표현합니다.
*/
const ManageForm = (params) => {

    // 월드컵 데이터
    const [worldCupManageContext, setWorldCupManageContext] = useState("");

    // 월드컵 컨텐츠 데이터
    const [worldCupContentsManageContext, setWorldCupContentsManageContext] = useState([]);

    // 월드컵 데이터 상태로 대신 사용해도 가능할 듯?
    const [worldCupId, setWorldCupId] = useState(0);

    // 월드컵이 현재 생성 상태인가?
    const [isCreateWorldCup, setIsCreateWorldCup] = useState("");

    // 수정 요청에 포함시키는 contents list
    const [updateContentsList, setUpdateContentsList] = useState([]);

    console.log("보낼 예정인 데이터", updateContentsList);

    useEffect(() => {

        // 월드컵 게임 상태 저장
        const fetchMyWorldCup = async () => {
            try {
                const myWorldCup = await getMyWorldCup(worldCupId, accessToken);
                setWorldCupManageContext(myWorldCup.data.data);
            } catch (error) {
                console.error('월드컵 정보 가져오기 실패:', error);
            }
        };

        // 월드컵 게임 컨텐츠 리스트 상태 저장
        const fetchMyWorldCupContents = async () => {
            try {
                const myWorldCupContents = await getMyWorldCupContentsList(worldCupId, accessToken);

                setWorldCupContentsManageContext(myWorldCupContents.data.data);

            } catch (error) {
                console.error('월드컵 게임 컨텐츠 정보 가져오기 실패:', error);
            }
        };

        const accessToken = getAccessToken();

        if (params.params.id !== null) {

            setIsCreateWorldCup(false);
            setWorldCupId(params.params.id);
            fetchMyWorldCup();
            fetchMyWorldCupContents();

        } else {

            setIsCreateWorldCup(true);

        }

    }, [params.params.id, worldCupId]);




    return (
        <div>
            <UpdateContentsListContest.Provider value={{ updateContentsList, setUpdateContentsList }}>
                <WorldCupIdManageContext.Provider value={{ worldCupId, setWorldCupId }}>
                    <WorldCupContentsManageContext.Provider value={{ worldCupContentsManageContext, setWorldCupContentsManageContext }}>
                        <WorldCupManageContext.Provider value={{ isCreateWorldCup, setIsCreateWorldCup }}>

                            <div className='flex my-5'>
                                <div className='flex-none m-5'>
                                    <WorldCupManageForm initWorldCupGame={worldCupManageContext} />
                                </div>

                                <div className='flex-auto'>
                                    <WorldCupContentsManageListWrapper initWorldCupGameContentsList={worldCupContentsManageContext} />
                                </div>
                            </div>

                        </WorldCupManageContext.Provider>
                    </WorldCupContentsManageContext.Provider>
                </WorldCupIdManageContext.Provider>
            </UpdateContentsListContest.Provider>
        </div>
    );
};

export default ManageForm;