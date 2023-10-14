"use client"
import { tempAuthLogin } from "@/services/MemberService"
import Link from "next/link"
import { useEffect, useState } from "react";
import RegisterForm from "../Register/RegisterForm";

export default function LoginForm() {

  const [userInfo, setUserInfo] = useState({
    serviceId: '',
    email: '',
    nickname: '',
    password: '',
  })

  // useEffect(() => {
  //   memberJoin();
  // }, [])

  // const memberJoin = async () => {
  //   const response = await tempAuthLogin();
  //   console.log("response", response);
  // }

  //TODO: any형식 수정
  const handleSubmit = async (event:any) => {
    event.preventdefault();
    const formData = new FormData(event.target);
    const newUser = {
      serviceId: formData.get('serviceId'),
      email: formData.get('email'),
      nickname: formData.get('NickName'),
      password: formData.get('password'),
    }
    console.log("newUser ===>", newUser);
  }

  return (
    <RegisterForm/>
    // <form onSubmit={(e) => handleSubmit(e)}>
    //   <label htmlFor="serviceId">Id:</label>
    //   <input type="text" name="serviceId" />
    //   <br />
    //   <label htmlFor="email">Email:</label>
    //   <input type="email" name="email" />
    //   <br />
    //   <label htmlFor="nickname">NickName:</label>
    //   <input type="text" name="nickname" />
    //   <br />
    //   <label htmlFor="password">Password:</label>
    //   <input type="text" name="password" />
    //   <br />
    //   {/* <button type="submit" disabled={isLoading}> */}
    //   <button type="submit" >
    //     Create user
    //   </button>
    //   {/* {error && <p>Error: {error.message}</p>} */}
    // </form>
  )
}
