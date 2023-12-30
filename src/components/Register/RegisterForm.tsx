'use client';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getRegisterFormSchema } from '@/utils/validations/registerValidation';
import ValidateMessage from '../ValidateMessage';
import { useMutation } from '@tanstack/react-query';
import { userSignUp } from '@/services/MemberService';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/consts';
import { PopupContext } from '../PopupProvider';
import AlertPopup from '../popup/AlertPopup';

type FormTypes = {
    username: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
};

interface inputTypes {
    id: number;
    type: string;
    placeholder: string;
    inputText: 'username' | 'password' | 'passwordConfirm' | 'nickname';
}
const RegisterForm = () => {
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormTypes>({
        resolver: getRegisterFormSchema(),
    });

    const router = useRouter();
    const { showPopup, hidePopup } = useContext(PopupContext);

    const inputCss =
        'w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none';

    const inputList: inputTypes[] = [
        {
            id: 1,
            type: 'text',
            placeholder: 'username을 입력해주세요.',
            inputText: 'username',
        },
        {
            id: 2,
            type: 'password',
            placeholder: '비밀번호를 입력해주세요.',
            inputText: 'password',
        },
        {
            id: 3,
            type: 'password',
            placeholder: '비밀번호를 다시 입력해주세요.',
            inputText: 'passwordConfirm',
        },
        // {
        //   id: 4,
        //   type: "text",
        //   placeholder: "email을 입력해주세요.",
        //   inputText: "email",
        // },
        {
            id: 4,
            type: 'text',
            placeholder: 'nickname을 입력해주세요.',
            inputText: 'nickname',
        },
    ];

    const { mutate, isLoading, error, isSuccess } = useMutation(userSignUp, {
        onSuccess: () => {
            router.push('/sign-in');
            showPopup(<AlertPopup message={'회원가입에 성공하셨습니다.'} hidePopup={hidePopup} />);
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

    const handleRegister = () => {
        const { username, password, nickname } = watch();
        const userInfo = {
            serviceId: username,
            password,
            nickname,
        };
        mutate(userInfo);
        // mutate 사용
    };

    return (
        <div className="p-4">
            <form className="max-w-sm mx-auto">
                <div className="grid gap-y-2 mb-6">
                    {/* TODO: errors 확인 */}
                    {inputList.map((items, index) => (
                        <>
                            <input
                                key={index}
                                className={inputCss}
                                type={items.type}
                                placeholder={items.placeholder}
                                {...register(items.inputText)}
                                onChange={handleChange}
                            />
                            {errors[items.inputText] && <ValidateMessage result={errors[items.inputText]} />}
                        </>
                    ))}
                </div>
                <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-yellow-400 text-white leading-snug rounded shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-yellow-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-400 w-full"
                    onClick={handleSubmit(handleRegister)}
                >
                    회원가입
                </button>
            </form>
        </div>
    );
};
export default React.memo(RegisterForm);
