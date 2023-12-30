'use client';
import { userMeSummary, userSignOut } from '@/services/MemberService';
import { getAccessToken } from '@/utils/TokenManager';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo, localStorageClear } from '@/stores/LocalStore';
import { useAuth } from '../AuthProvider';
import { PopupContext } from '../PopupProvider';
import AlertPopup from '../popup/AlertPopup';

const SignInUpButton = () => {
    const router = useRouter();
    const { isLoggedIn, logout } = useAuth();
    const { showPopup, hidePopup } = useContext(PopupContext);

    // const { mutate } = useMutation(userSignOut2, {
    //     onSuccess: (data) => {
    //         console.log('로그아웃 성공', data);
    //     },
    //     onError: (error) => {
    //         console.log('에러', error);
    //     },
    // });

    const onClickHandler = async (isLogin: boolean) => {
        if (isLogin) {
            //TODO: return 받아서 이후 로직처리 필요
            const response = await userSignOut();
            if (response) {
                localStorageClear();
                logout();
                showPopup(<AlertPopup message="로그아웃 하셨습니다." hidePopup={hidePopup} />);
            }
        } else {
            router.push('/sign-in');
        }
    };

    //TODO: 컴포넌트화
    if (isLoggedIn) {
        return (
            <div onClick={() => onClickHandler(true)}>
                <a
                    href="#"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    {'Logout'}
                </a>
            </div>
        );
    }

    // TODO: 로그인정보 확인
    return (
        <div onClick={() => onClickHandler(false)}>
            <a
                href="#"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                {'Login'}
            </a>
        </div>
    );
};

export default SignInUpButton;
