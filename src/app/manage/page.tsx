'use client';
import React, { useContext, useEffect, useState } from 'react';
import WorldCupManageForm from '@/components/manage/WorldCupManageForm';
import WorldCupContentsManageListWrapper from '@/components/manage/WorldCupContentsManagerListWrapper';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';
import { WorldCupIdManageContext } from '@/hooks/WorldCupIdManageContext';
import { WorldCupContentsManageContext } from '@/hooks/WorldCupContentsManageContext';

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
                        worldCupContentsList={worldCupContentsList}
                        setWorldCupId={setWorldCupId}
                        worldCupId={worldCupId}
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
