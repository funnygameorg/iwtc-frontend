import { getMediaFileAPI } from '@/services/EtcService';

export const getKeyByValue = (obj: any, value: string) => {
    if (Object.keys(obj)) return true;
    return false;
};

// export const getEncodedArray = (myArray) => {
//     const encodedArray = myArray.map((element) => {
//         return encodeURIComponent(element);
//     });
//     console.log('encodedArray', encodedArray);
//     return encodedArray;
// };

export const mappingMediaFile = async (gameList: any) => {
    if (gameList) {
        const promises = gameList.map(async (item: any) => {
            try {
                const response = await getMediaFileAPI(item.mediaFileId); // API 호출
                item.imgUrl = response.data.mediaData;
                item.fileType = response.data.fileType;
                item.videoStartTime = response.data.videoStartTime;
                item.videoPlayDuration = response.data.videoPlayDuration;
                return item; // 응답을 객체에 추가
            } catch (error) {
                item.imgUrl = '/images/default.png'; // 에러 발생 시 처리
                return item;
            }
        });

        const newGameList = await Promise.all(promises);
        return newGameList;
    }
};

export const mappingMediaFile2 = async (gameList: any) => {
    if (gameList) {
        const promises = gameList.map(async (item: any) => {
            try {
                const results = await Promise.allSettled([
                    getMediaFileAPI(item.reftImgMediaFileNo),
                    getMediaFileAPI(item.rightImgMediaFileNo),
                ]);

                const successfulResults = results.filter((result) => result.status === 'fulfilled');
                const [response1, response2] = successfulResults.map((result: any) => result.value);
                
                item.reftImgMediaFileNo = response1 ? response1.data.mediaData : '/images/default.png';
                item.reftFileType = response1 ? response1?.data?.fileType : ''
                
                item.rightImgMediaFileNo = response2 ? response2.data.mediaData : '/images/default.png';
                item.rightFileType = response2 ? response2?.data?.fileType : ''
                
                if(response1.data.fileType === 'INTERNET_VIDEO_URL'){
                  item.reftVideoStartTime = response1 ? response1.data.videoStartTime : '00000';
                  item.reftVideoPlayDuration = response1 ? response1.data.videoPlayDuration : 3;
                  
                } 

                if(response2.data.fileType === 'INTERNET_VIDEO_URL'){
                  item.rightVideoStartTime = response2 ? response2.data.videoStartTime : '00000';
                  item.rightVideoPlayDuration = response2 ? response2.data.videoPlayDuration : 3;
                } 

                
                return item; // 응답을 객체에 추가
            } catch (error) {
                return { ...item }; // 에러 발생 시 처리 및 수정된 객체 반환
            }
        });

        const newGameList = await Promise.all(promises);
        return newGameList;
    }
};
