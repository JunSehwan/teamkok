import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { auth } from 'firebaseConfig';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { sendPasswordResetEmail } from "firebase/auth";

const PasswordRemake = () => {
  const { user } = useSelector(state => state.user);
  const router = useRouter();
  auth.languageCode = 'ko';

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const onChangeEmail = useCallback((e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setEmailError(false);
  }, [])

  if (!!user) return router.push("/");
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (email?.length === 0) return setEmailError(true);
    if (email?.length !== 0) {
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          alert("비밀번호 재설정 이메일을 발송하였습니다.")
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
  }, [email])

  return (
    <div className='w-full max-w-full h-[calc(100vh-60.0px)] pt-12 bg-slate-100'>
    <div className='w-full max-w-2xl mx-auto h-full mt-[-10rem] flex flex-col justify-center'>
      <h4 className="text-3xl mb-8 font-bold">비밀번호 재설정</h4>
      <h2 className="text-lg mt-4 mb-4 font-semibold">본인의 이메일 계정을 작성해주세요.</h2>
      {/* <form onSubmit={onSubmit}> */}
        <input
        className='w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          type="text"
          placeholder="이메일 입력"
          onChange={onChangeEmail}
        />
          {emailError ? (
            <p className="text-xs mb-[1.5rem] italic text-red-500">이메일을 입력해주세요.</p>
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
      {/* </form> */}
      <Link href="/">
        <a 
            className="text-center w-full mt-4 inline-block text-[0.88rem] text-blue-500 align-baseline hover:text-blue-800"
        >
          홈으로 돌아가기
        </a>
      </Link>
    </div>
    </div>
  );
};

export default PasswordRemake;