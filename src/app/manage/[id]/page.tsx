'use client';
import React, { useEffect, useState } from 'react';
import WorldCupManageForm from '@/components/manage/WorldCupManageForm';
import WorldCupContentsManageListWrapper from '@/components/manage/WorldCupContentsManagerListWrapper';
import { useQueryGetMyWorldCup, useQueryGetMyWorldCupContentsList } from '@/services/ManageWorldCupService';
import { getMediaFile } from '@/services/EtcService';
import { normalizePersistedManagedContent } from '@/domain/manage/persistedContent';

/*
    월드컵 관리 페이지를 표현합니다.
*/
const ManageForm = ({ params }: any) => {
    const { id } = params;
    const { data: myWorldCupData, isSuccess: isMyWorldCupSuccess } = useQueryGetMyWorldCup(id);
    const { data: myWorldCupContentsList, isSuccess: isMyWorldCupContentsList } = useQueryGetMyWorldCupContentsList(id);
    // myWorldCupContentsList.data.data가 API이고 이거와, worldCupContentsList 비교를 해서 다르면 변경사항 적용
    const [worldCupContentsList, setWorldCupContentsList] = useState([]); // 최초 수정페이지에서 컨텐츠가 담기는 배열
    const [worldCupId, setWorldCupId] = useState(id ? id : 0);
    const [isCreateWorldCup, setIsCreateWorldCup] = useState(false);
    const [modifyList, setModifyList] = useState([]);
    const [deleteList, setDeleteList] = useState([]);
    const [newList, setNewList] = useState([]);
    const [isChanges, setIsChange] = useState(false);
    const persistedContents = myWorldCupContentsList?.data?.data;

    useEffect(() => {
        if (isMyWorldCupSuccess) {
            setIsCreateWorldCup(true);
        }
    }, [isMyWorldCupSuccess]);

    useEffect(() => {
        const fetchData = async () => {
            if (worldCupContentsList.length < 1 && isMyWorldCupContentsList && id && persistedContents) {
                try {
                    const newData: any = await Promise.all(
                        persistedContents.map(async (items: any, index: number) => {
                            const data = await getMediaFile(items.mediaFileId);
                            return normalizePersistedManagedContent(items, data?.data.data, index);
                        })
                    );

                    setWorldCupContentsList(newData);
                } catch (error) {
                    console.error('비동기 작업 실패:', error);
                }
            }
        };

        fetchData();
    }, [id, isMyWorldCupContentsList, persistedContents, worldCupContentsList.length]);

    useEffect(() => {
        if (newList.length > 0 || deleteList.length > 0 || modifyList.length > 0) {
            setIsChange(true);
        } else {
            setIsChange(false);
        }
    }, [newList, deleteList, modifyList, worldCupContentsList]);

    return (
        <div>
            <div className="flex my-5">
                <div className="flex-none m-5">
                    <WorldCupManageForm
                        setIsCreateWorldCup={setIsCreateWorldCup}
                        setWorldCupId={setWorldCupId}
                        myWorldCupData={isMyWorldCupSuccess ? myWorldCupData.data.data : undefined}
                        isCreateWorldCup={isCreateWorldCup}
                    />
                </div>
                <div className="flex-auto">
                    <WorldCupContentsManageListWrapper
                        isCreateWorldCup={isCreateWorldCup}
                        worldCupContentsList={worldCupContentsList}
                        setWorldCupContentsList={setWorldCupContentsList}
                        worldCupId={worldCupId}
                        setModifyList={setModifyList}
                        setDeleteList={setDeleteList}
                        setNewList={setNewList}
                        newList={newList}
                        modifyList={modifyList}
                        deleteList={deleteList}
                        isChanges={isChanges}
                        isModifyPage={id ? true : false}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageForm;
