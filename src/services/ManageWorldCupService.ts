import axios from "axios";

const createHeader = (token) => {
    return {
        'Content-Type': 'application/json',
        'access-token': `${token}`,
    };
}



// 이상형 생성
export const createWorldCup = async ({ title, description, visibleType, token }: any) => {

    const authHeaders = createHeader(token);

    const param = { title, description, visibleType };
    console.log("월드컵 생성 시 요청값 ", authHeaders, param);
    const response = await axios.post(
        `http://localhost:8080/api/world-cups/me`,
        param,
        { headers: authHeaders }
    );
    console.log('response ===>', response);
    return response.data;

}



// 이상형 컨텐츠 생성
export type createWorldCupContentsType = {
    contentsName: string,
    visibleType: string,
    createMediaFileRequest: {
        fileType: string,
        mediaPath: string,
        originalName: string,
        absoluteName: string,
        videoStartTime: string,
        videoPlayDuration: number
    }
}[];


export const createWorldCupContents = async (
    { worldCupId, params, token }: { worldCupId: number, params: createWorldCupContentsType, token: string }
) => {

    const authHeaders = createHeader(token);

    const response = await axios.post(
        `http://localhost:8080/api/world-cups/me/${worldCupId}/contents`,
        { data: params },
        { headers: authHeaders }
    );

    console.log('response ===>', response);

    return response.data;

}