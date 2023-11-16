import React from 'react';
import Link from 'next/link';
import WorldCupManageForm from '@/components/manage/WorldCupManageForm';
import WorldCupContentsManageListWrapper from '@/components/manage/WorldCupContentsManagerListWrapper';





/*
    월드컵 관리 페이지를 표현합니다.
*/
const ManageForm = () => {
    return (
        <div className='flex my-5'>
            <div className='flex-none m-5'>
                <WorldCupManageForm />
            </div>

            <div className='flex-auto'>
                <WorldCupContentsManageListWrapper />
            </div>
        </div>
    );
};

export default ManageForm;