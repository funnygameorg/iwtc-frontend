import userInfo from "@/interfaces/models/login/MemberData";
import { ajaxPost } from "./BaseService";

//TODO: type 설정
export const userSignUp = async (param: userInfo) => {
  const response = await ajaxPost("/members/sign-up", param);
  return response;
};
