'use client';
import React, { useState } from 'react';
import WorldCupManageForm from '@/components/manage/WorldCupManageForm';
import WorldCupContentsManageListWrapper from '@/components/manage/WorldCupContentsManagerListWrapper';

/*
    월드컵 관리 페이지를 표현합니다.
*/
const ManageForm = () => {
    const [worldCupContentsList, setWorldCupContentsList] = useState([]);
    const [worldCupId, setWorldCupId] = useState(0);
    const [isCreateWorldCup, setIsCreateWorldCup] = useState(false);

    return (
        <div>
            <div className="flex my-5">
                <div className="flex-none m-5">
                    <WorldCupManageForm
                        setIsCreateWorldCup={setIsCreateWorldCup}
                        setWorldCupId={setWorldCupId}
                        isCreateWorldCup={isCreateWorldCup}
                    />
                </div>
                <div className="flex-auto">
                    <WorldCupContentsManageListWrapper
                        isCreateWorldCup={isCreateWorldCup}
                        worldCupContentsList={worldCupContentsList}
                        setWorldCupContentsList={setWorldCupContentsList}
                        worldCupId={worldCupId}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageForm;
