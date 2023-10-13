import React from 'react';
import { useForm } from 'react-hook-form';
import { getRegisterFormSchema } from '@/utils/validations/registerValidation';
import ValidateMessage from '../ValidateMessage';

type FormTypes = {
  username: string;
  password: string;
  passwordConfirm: string;
  nickname?: string;
  email?:  string;
};

interface inputTypes {
  id: number,
  type: string,
  placeholder: string,
  inputText: 'username' | 'password' | 'passwordConfirm' | 'nickname' | 'email'
}
const RegisterForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({
    resolver: getRegisterFormSchema(),
  });

  /**
   * handlers
   */
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValue(name, value, { shouldValidate: true });
  };
  const handleRegister = () => {
    // mutate 사용
    console.log('회원가입 클릭');
  };
  const inputCss = "w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"

  const inputList: inputTypes[] = [
    {
      id:1,
      type:'text',
      placeholder: 'username을 입력해주세요.',
      inputText: 'username'    
    },
    {
      id:2,
      type:'password',
      placeholder: '비밀번호를 입력해주세요.',
      inputText: 'password'    
    },
    {
      id:3,
      type:'password',
      placeholder: '비밀번호를 다시 입력해주세요.',
      inputText: 'passwordConfirm'    
    },
    {
      id:4,
      type:'text',
      placeholder: 'Email을 입력해주세요.',
      inputText: 'email'    
    },
    {
      id:5,
      type:'text',
      placeholder: 'Nickname을 입력해주세요.',
      inputText: 'nickname'    
    },

]

  return (
    <div className="p-4">
      <form className="max-w-sm mx-auto">
        <div className="grid gap-y-2 mb-6">
          {/* TODO: errors 확인 */}
          {/* {
            inputList.map((items, index) => (
              <input
                key={index}
                className={inputCss}
                type={items.type}
                placeholder={items.placeholder}
                {...register(items.inputText)}
              />
              errors[items.inputText as keyof FieldErrors<FormTypes>] && 
              <ValidateMessage result={errors.username} />
            ))
          } */}
          {/* <input
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
          <input
            type="password"
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
            placeholder="비밀번호를 다시 입력해주세요."
            {...register('passwordConfirm')}
            onChange={handleChange}
          />
          {errors.passwordConfirm && (
            <ValidateMessage result={errors.passwordConfirm} />
          )}
          <input
              type="text"
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
              placeholder="Email을 입력해주세요."
              {...register('email')}
              onChange={handleChange}
          />
          <input
              type="text"
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
              placeholder="Nickname을 입력해주세요."
              {...register('nickname')}
              onChange={handleChange}
          /> */}
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
