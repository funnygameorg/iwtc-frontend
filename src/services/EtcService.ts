import axios from "axios";

// 이상형 리스트 조회
export const getMediaFile = async (mediaFileId: number) => {

    const response = await axios.get(
        `http://localhost:8080/api/media-files/${mediaFileId}`,
        { timeout: 20000 }
    );

    // console.log("조회 데이터", response?.data.data.mediaData);
    if (response) {
        return response;
    }

}