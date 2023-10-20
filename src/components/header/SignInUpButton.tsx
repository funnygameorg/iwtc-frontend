'use client'
import { userSignOut } from '@/services/MemberService'
import { getAccessToken } from '@/utils/TokenManager'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const SignInUpButton = () => {
  const [isLogin, setIsLogin] = useState(getAccessToken() ? true : false)

  const { mutate } = useMutation(userSignOut, {
        onSuccess: (data) => {
            console.log('로그아웃 성공', data.headers);
        },
        onError: (error) => {
            console.log('에러', error);
        },
    });

  useEffect(() => {
    if(getAccessToken()){
      setIsLogin(true)
    }else {
      setIsLogin(false)
    }

  }, [isLogin])

  const onClickHandler = () => {
    if(isLogin){  


      // 로그아웃 Api 호출
    }  
  }

  // TODO: 로그인정보 확인
  return (
    <div >
        <Link
            href="/sign-in"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        >
            {isLogin ? 'Logout' : 'Login'}
        </Link>
    </div>
  )
}

export default SignInUpButton