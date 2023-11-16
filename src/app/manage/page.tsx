import React from 'react';
import Link from 'next/link';
import WorldCupManageForm from '@/components/manage/WorldCupManageForm';
import WorldCupContentsManageListWrapper from '@/components/manage/WorldCupContentsManagerListWrapper';





/*
    월드컵 관리 페이지를 표현합니다.
*/
const ManageForm = () => {
    return (
        <div>
            <div className='m-8'>
                <WorldCupManageForm />
            </div>
            <div>
                <WorldCupContentsManageListWrapper />
            </div>
        </div>
    );
};

export default ManageForm;