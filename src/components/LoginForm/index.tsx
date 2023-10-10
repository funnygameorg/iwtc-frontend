import { tempAuthLogin } from "@/services/MemberService"
import Link from "next/link"
import { useEffect } from "react";

export default function LoginForm() {

  useEffect(() => {
    memberJoin();
  }, [])

  const memberJoin = async () => {
    const response = await tempAuthLogin();
    console.log("response", response);
  }

  return (
    <div>
      <div>
        <span>아이디</span>
        <input type="text"></input>
      </div>
      <div>
        <span>이메일</span>
        <input type="text"></input>
      </div>
      <div>
        <span>닉네임</span>
        <input type="text"></input>
      </div>
      <div>
        <span>비밀번호</span>
        <input type="text"></input>
      </div>
     
      <button>회원가입</button>

    </div>
  )
}
