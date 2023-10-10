import { ajaxPost } from './BaseService';

//TODO: type 설정
export const tempAuthLogin = async () => {
  const response = await ajaxPost('/members/sign-in', {
    serviceId: 'test',
    email: 'testEmail@naver.com',
    nickname: 'dongmin',
    password: 'asdfqwer1234~',
  });
  return response;
};