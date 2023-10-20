'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { getLoginFormSchema } from '@/utils/validations/loginValidation';
import ValidateMessage from '../ValidateMessage';
import { useMutation } from '@tanstack/react-query';
import { userMeSummary, userSignIn } from '@/services/MemberService';
import Link from 'next/link';
import { setToken } from '@/utils/TokenManager';
import { useRouter } from 'next/navigation';
import { setUserInfo } from '@/stores/LocalStore';
interface FormTypes {
    username: string;
    password: string;
}

const LoginForm = () => {
    const router = useRouter();

    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormTypes>({
        resolver: getLoginFormSchema(),
    });

    const { mutate } = useMutation(userSignIn, {
        onSuccess: async (data) => {
            const token = data.headers['access-token'];
            // ACCESS_TOKEN 저장
            setToken('ACCESS_TOKEN', token);
            const userInfo = await userMeSummary(token);
            setUserInfo(userInfo.data);
            router.push('/');
        },
        onError: (error) => {
            console.log('에러', error);
        },
    });

    /**
     * handlers
     */
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setValue(name, value, { shouldValidate: true });
    };
    const handleLogin = () => {
        const { username, password } = watch();
        const loginParam = {
            serviceId: username,
            password,
        };
        mutate(loginParam);
    };

    return (
        <>
            <div className="p-4">
                <form className="max-w-sm mx-auto">
                    <div className="grid gap-y-2 mb-6">
                        <input
                            type="text"
                            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                            placeholder="Username을 입력해주세요."
                            {...register('username')}
                            onChange={handleChange}
                        />
                        {errors.username && <ValidateMessage result={errors.username} />}
                        <input
                            type="password"
                            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                            placeholder="비밀번호를 입력해주세요."
                            {...register('password')}
                            onChange={handleChange}
                        />
                        {errors.password && <ValidateMessage result={errors.password} />}
                    </div>
                    <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-yellow-400 text-white leading-snug rounded shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-yellow-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-400 w-full"
                        onClick={handleSubmit(handleLogin)}
                    >
                        로그인
                    </button>

                    {/* <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div> */}

                    {/* <div className="flex justify-between">
        <SocialButton src="/assets/google_logo.svg" />
        <SocialButton
          src="/assets/github_logo.svg"
          backgroundColor="bg-black"
        />
        <SocialButton
          src="/assets/kakao_logo.svg"
          backgroundColor="bg-kakao"
        />
      </div> */}
                </form>
            </div>
            <div className="text-center mt-4">
                <Link href="/sign-up">회원가입 </Link>
            </div>
        </>
    );
};

export default LoginForm;
