'use client';
import Link from 'next/link';
import React, { useContext } from 'react';
import SignInUpButton from '../header/SignInUpButton';
import { getUserInfo } from '@/stores/LocalStore';
import { useInView } from '@react-spring/web';
import { useAuth } from '../AuthProvider';
import { PopupContext } from '../PopupProvider';
import AlertPopup from '../popup/AlertPopup';

const Header = () => {
    const { isLoggedIn, logout } = useAuth();
    const { showPopup, hidePopup } = useContext(PopupContext);
    const userInfo = getUserInfo();
    const userId = userInfo != null ? userInfo.id : '';

    const handleLoginBaseService = (e: any) => {
        if (!isLoggedIn) {
            e.preventDefault(); // 링크의 기본 동작을 방지합니다.
            showPopup(<AlertPopup message="로그인이 필요한 서비스입니다." hidePopup={hidePopup} />);
        }
        // memberId가 있는 경우, 링크의 기본 동작을 계속 진행합니다.
    };

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <svg
                    className="fill-current h-8 w-8 mr-2"
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                </svg>
                <Link href="/">
                    <span className="font-semibold text-xl tracking-tight">이상형 월드컵</span>
                </Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-lg lg:flex-grow">
                    <Link
                        href="/manage"
                        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                        onClick={handleLoginBaseService}
                    >
                        월드컵 만들기
                    </Link>

                    <Link
                        href={`/members/${userId}/games`}
                        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                        onClick={handleLoginBaseService}
                    >
                        자신의 월드컵 목록
                    </Link>
                </div>
                {/* TODO: 로그인 완료 시 번경 */}
                <SignInUpButton />
            </div>
        </nav>
    );
};

export default Header;
