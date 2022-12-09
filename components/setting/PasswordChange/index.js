import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { auth } from 'firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";

const index = () => {
  const { user } = useSelector(state => state.user);
  const router = useRouter();
  auth.languageCode = 'fr';

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  
  const onChangeEmail = useCallback((e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setEmailError(false);
  }, [])

  // if (!!user) return router.push("/dashboard");
  
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (email?.length === 0) return setEmailError(true);
    if (email !== user?.email) return setEmailError(true);
    if (email?.length !== 0) {
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          alert("비밀번호 재설정 이메일을 발송하였습니다. 잠시 기다렸다가 이메일을 확인해보세요!")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          alert("이메일이 맞지 않습니다.")
        });
    } else {
      alert("이메일이 맞지 않습니다.")
    }
  }, [email, user?.email])

  return (
    <div className='pt-[var(--navbar-height)] md:px-8 pb-[70px] md:pb-auto'>

      <div className='pt-5'>

        <div className='py-6'>
          <div className='mx-auto text-left'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                🔐 비밀번호 재설정
              </p>
            </div>
          </div>

          <h2 className="text-lg mt-4 mb-4 font-semibold">본인의 이메일 계정을 작성해주세요.</h2>
          {/* <form onSubmit={onSubmit}> */}
          <input
            className='w-full px-3 py-2 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            type="email"
            placeholder="이메일 입력"
            onChange={onChangeEmail}
          />
          {emailError ? (
            <p className="text-sm mb-[1.5rem] italic text-red-500">이메일을 정확히 입력해주세요.</p>
          ) : null}
          <div className="w-full flex items-center justify-center mt-8">
            <button
              className="w-[30%] mx-auto px-4 text-md py-4 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onSubmit}
            >
              메일보내기
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default index;