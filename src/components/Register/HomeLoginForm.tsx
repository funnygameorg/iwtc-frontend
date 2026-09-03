'use client';
import React, { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { getLoginFormSchema } from '@/utils/validations/loginValidation';
import { useMutation } from '@tanstack/react-query';
import { userMeSummary, userSignIn } from '@/services/MemberService';
import { getUserInfo, setUserInfo } from '@/stores/LocalStore';
import { setToken } from '@/utils/TokenManager';
import { useAuth } from '@/providers/AuthProvider';

interface FormTypes {
    username: string;
    password: string;
}

const HomeLoginForm = () => {
    const {
        register,
        watch,
        setValue,
        handleSubmit,
    } = useForm<FormTypes>({
        resolver: getLoginFormSchema(),
    });
    const { isLoggedIn, login } = useAuth();

    const { mutate } = useMutation(userSignIn, {
        onSuccess: async (data) => {
            const token = data.headers['access-token'];
            const refreshToken = data.headers['refresh-token'];

            // ACCESS_TOKEN 저장
            setToken('ACCESS_TOKEN', token);
            setToken('REFRESH_TOKEN', refreshToken);
            const userInfo = await userMeSummary(token);
            setUserInfo(userInfo.data);
            login();
        },
        onError: (error) => {
            console.log('에러', error);
        },
    });

    /**
     * handlers
     */
    const handleChange = (field: keyof FormTypes) => (e: ChangeEvent<HTMLInputElement>) => {
        setValue(field, e.target.value, { shouldValidate: true });
    };
    const handleLogin = () => {
        const { username, password } = watch();
        const loginParam = {
            serviceId: username,
            password,
        };
        mutate(loginParam);
    };
    if (isLoggedIn) {
        const { serviceId, nickname } = getUserInfo();
        return (
            <div className="p-4 h-32">
                <span className="grid gap-y-2 mb-6 mr-1" style={{ width: '8.6rem' }}>
                    아이디: {serviceId}
                </span>
                <span className="grid gap-y-2 mb-6 mr-1" style={{ width: '8.6rem' }}>
                    닉네임: {nickname}
                </span>
            </div>
        );
    }

    return (
        <>
            <div className="p-4 h-32">
                <form className="flex max-w-sm mx-auto">
                    <div className="grid gap-y-2 mb-6 mr-1" style={{ width: '8.6rem' }}>
                        <input
                            type="text"
                            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                            placeholder="Username을 입력해주세요."
                            {...register('username')}
                            onChange={handleChange('username')}
                            style={{ width: '100%' }}
                        />

                        <input
                            type="password"
                            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                            placeholder="비밀번호를 입력해주세요."
                            {...register('password')}
                            onChange={handleChange('password')}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-max h-full inline-block px-4 py-8 bg-yellow-400 text-white leading-snug rounded shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-yellow-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-400 "
                        onClick={handleSubmit(handleLogin)}
                    >
                        로그인
                    </button>
                </form>
            </div>
        </>
    );
};

export default HomeLoginForm;
