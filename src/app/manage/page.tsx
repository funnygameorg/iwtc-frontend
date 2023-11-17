'use client'
import React, { useState } from 'react';
import WorldCupManageForm from '@/components/manage/WorldCupManageForm';
import WorldCupContentsManageListWrapper from '@/components/manage/WorldCupContentsManagerListWrapper';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';





/*
    월드컵 관리 페이지를 표현합니다.
*/
const ManageForm = () => {

    const [isCreateWorldCup, setIsCreateWorldCup] = useState("");
    return (
        <div>
            <WorldCupManageContext.Provider value={{ isCreateWorldCup, setIsCreateWorldCup }}>

                <div className='flex my-5'>
                    <div className='flex-none m-5'>
                        <WorldCupManageForm />
                    </div>

                    <div className='flex-auto'>
                        <WorldCupContentsManageListWrapper />
                    </div>
                </div>

            </WorldCupManageContext.Provider>
        </div>
    );
};

export default ManageForm;