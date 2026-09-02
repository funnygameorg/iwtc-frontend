import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import InternetVideoUrlCard from './InternetVideoUrlCard';
import StaticMediaFileTypeCard from './StaticMediaFileTypeCard';
import { normalizeClientManagedContent } from '@/domain/manage/content';
import { ManagedContent, PersistedManagedContentView } from '@/domain/manage/persistedContent';

interface IProps {
    contents: ManagedContent;
    index: number;
    setWorldCupContentsList: Dispatch<SetStateAction<ManagedContent[]>>;
    setModifyList?: Dispatch<SetStateAction<PersistedManagedContentView[]>>;
    setDeleteList?: Dispatch<SetStateAction<PersistedManagedContentView[]>>;
    setNewList?: Dispatch<SetStateAction<ManagedContent[]>>;
    newList: ManagedContent[];
}

const ManageCardWrapper = ({
    contents,
    index,
    setWorldCupContentsList,
    setModifyList,
    setDeleteList,
    setNewList,
    newList,
}: IProps) => {
    const [mediaData, setMediaData] = useState<ManagedContent | ''>('');

    useEffect(() => {
        if (contents.contentsId !== undefined) {
            setMediaData(contents);
            return;
        }

        setMediaData(normalizeClientManagedContent(contents, index));
    }, [contents, index]);

    return (
        // 데이터 문자열에 "https://www.youtube.com/"를 포함한다면 유튜브 타입 데이터를 의미한다.
        mediaData && mediaData.mediaData && mediaData.mediaData.includes('https://www.youtube.com/') ? (
            <InternetVideoUrlCard
                index={index}
                contents={mediaData}
                setWorldCupContentsList={setWorldCupContentsList}
                setModifyList={setModifyList}
                setDeleteList={setDeleteList}
                setNewList={setNewList}
                newList={newList}
            />
        ) : (
            <StaticMediaFileTypeCard
                index={index}
                contents={mediaData}
                setWorldCupContentsList={setWorldCupContentsList}
                setModifyList={setModifyList}
                setDeleteList={setDeleteList}
                setNewList={setNewList}
                newList={newList}
            />
        )
    );
};
export default ManageCardWrapper;
