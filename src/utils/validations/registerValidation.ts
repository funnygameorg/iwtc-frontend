import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const getRegisterFormSchema = () =>
  yupResolver(
    yup.object({
      username: yup
        .string()
        .required("Username을 정확하게 입력해주세요.")
        .max(10, "10자리 이하로 입력해주세요."),
      password: yup
        .string()
        .trim()
        .required("비밀번호를 입력해주세요.")
        .min(8, "최소 8자 이상 입력해주세요.")
        .max(16, "최대 16자를 입력해주세요.")
        .matches(
          /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~`!@#$%^&*()-+=]).*$/,
          "비밀번호 생성 조건에 맞지 않습니다. 다시 입력해주세요."
        ),
      passwordConfirm: yup
        .string()
        .trim()
        .required("비밀번호를 확인해주세요.")
        .oneOf(
          [yup.ref("password")],
          "비밀번호가 일치하지 않습니다. 다시 입력해주세요."
        ),
      email: yup
        .string()
        .required("email을 정확하게 입력해주세요.")
        .matches(
          /^.+@.+$/,
          "올바른 이메일 형식이 아닙니다. @를 포함해야 합니다."
        ),
      nickname: yup.string().required("nickname을 정확하게 입력해주세요."),
    })
  );
