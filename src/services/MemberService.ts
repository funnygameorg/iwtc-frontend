import userInfo from "@/interfaces/models/login/MemberData";
import { ajaxPost } from "./BaseService";

//TODO: type 설정
export const tempAuthLogin = async (param: userInfo) => {
  const response = await ajaxPost("/members/sign-up", {
    serviceId: "test",
    email: "testEmail@naver.com",
    nickname: "dongmin",
    password: "asdfqwer1234~",
  });
  return response;
};
