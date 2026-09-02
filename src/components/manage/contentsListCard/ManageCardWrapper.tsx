import { useEffect, useState } from 'react';
import InternetVideoUrlCard from './InternetVideoUrlCard';
import StaticMediaFileTypeCard from './StaticMediaFileTypeCard';
import { normalizeClientManagedContent } from '@/domain/manage/content';

interface IProps {
    contents: any;
    index?: number;
    worldCupId: any;
    setWorldCupContentsList: any;
    worldCupContentsList: any;
    setModifyList?: any;
    setDeleteList?: any;
    setNewList?: any;
    newList?: any;
}

const ManageCardWrapper = ({
    contents,
    index,
    worldCupId,
    setWorldCupContentsList,
    worldCupContentsList,
    setModifyList,
    setDeleteList,
    setNewList,
    newList,
}: IProps) => {
    const [mediaData, setMediaData] = useState<any>('');

    useEffect(() => {
        if (contents.contentsId !== undefined) {
            setMediaData(contents);
            return;
        }

        setMediaData(normalizeClientManagedContent(contents, index));
    }, [contents, index]);

    return (
        // 데이터 문자열에 "https://www.youtube.com/"를 포함한다면 유튜브 타입 데이터를 의미한다.
        mediaData.mediaData && mediaData.mediaData.includes('https://www.youtube.com/') ? (
            <InternetVideoUrlCard
                index={index}
                contents={mediaData}
                worldCupId={worldCupId}
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
                worldCupId={worldCupId}
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
