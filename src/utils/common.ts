import { getMediaFileAPI } from '@/services/EtcService';

export const getKeyByValue = (obj: any, value: string) => {
    if (Object.keys(obj)) return true;
    return false;
};

export const getEncodedArray = (myArray) => {
    const encodedArray = myArray.map((element) => {
        return encodeURIComponent(element);
    });
    console.log('encodedArray', encodedArray);
    return encodedArray;
};

export const mappingMediaFile = async (gameList: any) => {
    console.log('gameList', gameList);
    const promises = gameList.map(async (item: any) => {
        try {
            const response = await getMediaFileAPI(item.mediaFileId); // API 호출
            item.imgUrl = response.data.mediaData;
            return item; // 응답을 객체에 추가
        } catch (error) {
            console.error(`API 호출 중 오류 발생: ${error}`);
            item.apiResponse = 'API 호출 에러'; // 에러 발생 시 처리
        }
    });

    const newGameList = await Promise.all(promises);
    return newGameList;
};

export const mappingMediaFile2 = async (gameList: any) => {
    console.log('gameList', gameList);
    const promises = gameList.map(async (item: any) => {
        try {
            const results = await Promise.allSettled([
                getMediaFileAPI(item.reftImgMediaFileNo),
                getMediaFileAPI(item.rightImgMediaFileNo),
            ]);

            const successfulResults = results.filter((result) => result.status === 'fulfilled');
            const [response1, response2] = successfulResults.map((result: any) => result.value);
            item.reftImgMediaFileNo = response1 ? response1.data.mediaData : '/images/default.png';
            item.rightImgMediaFileNo = response2 ? response2.data.mediaData : '/images/default.png';

            return item; // 응답을 객체에 추가
        } catch (error) {
            console.error(`API 호출 중 오류 발생: ${error}`);
            return { ...item }; // 에러 발생 시 처리 및 수정된 객체 반환
        }
    });

    const newGameList = await Promise.all(promises);
    return newGameList;
};
