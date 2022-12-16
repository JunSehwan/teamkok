import React, { useCallback, useEffect, useState, useRef } from 'react';
import { signIn, emailDubCheck, getUser } from 'firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { login, signUp } from "slices/user";
import PropTypes from 'prop-types';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query, where, getDocs,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Image from 'next/image';
import dayjs from "dayjs";
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoBack from 'components/Common/GoBack';

const Login = () => {
  // useEffect(() => {
  //   if ((user || user?.userID)) {
  //     if (user?.purpose == 1) {
  //       console.log(user?.purpose)
  //       router.push('/friends')
  //     } else {
  //       console.log(user?.purpose)
  //       router.push('/news')
  //     }
  //   }
  // }, [router, user]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailDubError, setEmailDubError] = useState(false);
  const onChangeEmail = useCallback(
    e => {
      setEmail(e.target.value);
      setEmailError(false);
      setEmailDubError(false);
    },
    []
  );

  // @ 비밀번호 길이 검토
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const onChangePassword = useCallback(
    e => {
      setPassword(e.target.value);
      setPasswordError(false);
      setLoginError(false);
    },
    []
  );
  const [loginError, setLoginError] = useState(false);
  const [results, setResults] = useState();

  const { signUpSuccess, isLoggedIn } = useSelector(state => state.user);
  const { user } = useSelector(state => state.user);
  useEffect(() => {
    if (signUpSuccess || isLoggedIn || !!user) {
      setEmail("");
      setPassword("");
      setEmailError(false);
      setEmailDubError(false);
      setPasswordError(false);
    }
  }, [signUpSuccess, isLoggedIn, user])

  useEffect(() => {
    if (signUpSuccess && isLoggedIn && !!user) {
      if (user?.purpose === 1) {
        router.push("/friends")
      } else {
        router.push("/news")
      }
    }
  }, [isLoggedIn, router, signUpSuccess, user])

  const auth = getAuth();

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoginError(false);

    if (password?.length === 0) {
      return setPasswordError(true);
    }
    if (email?.length === 0) {
      return setEmailError(true);
    }
    await emailDubCheck(email).then((dubCheck) => {
      if (dubCheck?.length === 0) {
        throw setEmailDubError(true);
      }
    })
    try {
      let loginResult = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const loginResult = userCredential.user;
          if (!loginResult) {
            throw new Error(
              "Email is not verified. We have sent the verification link again. Please check your inbox/spam."
            );
          }
          return loginResult;
        })
      setResults(loginResult);
      if (!loginResult) setLoginError(true);
      if (loginResult?.uid?.length !== 0) {
        dispatch(login({ results }));
      }
    } catch (e) {
      if (e) { setLoginError(true); }
      console.error(e);
      const errorCode = e.code;
      const errorMessage = e.message;
      alert(errorCode, "에러")
    }

  }, [password, email, auth, results, dispatch])


  // 구글로그인
  const now = new Date();
  const nowForCopy = dayjs(now);
  const time = nowForCopy?.format('YYYY-MM-DD HH:mm:ss');
  const [con, setCon] = useState();
  const db = getFirestore();

  const signInWithKakaoHandler = useCallback(() => {
    const redirectUri = `${location.origin}/auth/kakaologin`;
    Kakao.Auth.authorize({ redirectUri });
  }, [])


  const signInWithGoogleHandler = useCallback(async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider) // popup을 이용한 signup
        .then(async (data) => {
          setCon(data?.user);
          if (!data?.user) {
            return alert("존재하지 않는 계정입니다.")
          }
          const userDB = data?.user;
          if (userDB?.uid?.length !== 0) {

            const userRef = collection(db, "users");
            const q = query(userRef, where("id", "==", userDB?.uid));
            //결과 검색
            const querySnapshot = await getDocs(q);
            const result = querySnapshot?.docs?.map((doc) => (
              {
                ...doc.data(),
                id: doc.id,
              }
            ))
            if (result?.length === 0) {
              setDoc(doc(db, "users", userDB.uid), {
                id: userDB?.uid,
                username: userDB?.displayName,
                avatar: userDB?.photoURL || "",
                email: userDB?.email,
                timestamp: time,
              })
              dispatch(signUp({
                email: userDB?.email,
                username: userDB?.displayName,
                id: userDB?.uid,
                avatar: userDB?.photoURL
              }));
            }
            if (result?.length !== 0) {
              const gettingInfo = await getUser(userDB.uid);
              dispatch(signUp({
                gettingInfo
              }));
            }

          }

          return data?.user
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  }, [auth, db, time, dispatch,])

  const handlePasswordForgot = useCallback(() => {
    router.push("/auth/forgotpassword");
  }, [router,])

  // autoFocus 관련
  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <div>
      <div className="max-w-[32rem] container mx-auto">
        <div className="flex justify-center my-3">
          {/* <!-- Row --> */}
          <div className="w-full flex">
            {/* <!-- Col --> */}

            {/* 뒤로가기 버튼 */}
            <div className='w-full fixed left-0 top-0 py-2 bg-[#ffffff51] z-10 backdrop-blur-md	'>
              <div className='max-w-[32rem] mx-auto'>
                <div className='w-full flex justify-items-end items-center'>
                  <GoBack />
                </div>
                <h3 className='text-xl text-gray-600 my-2 ml-2 w-full'>로그인🔅</h3>
              </div>
            </div>
            <div className='pt-[100px] w-full'>
              <div className="mt-6 px-2 w-full bg-white rounded-lg lg:rounded-l-none">
                <form
                  className="w-full pt-4 pb-2 mb-4 bg-white rounded"
                  onSubmit={onSubmit}
                >

                  <div className="mb-4">
                    <label className="block mb-1 text-md font-bold text-gray-700" htmlFor="login_email">
                      이메일
                    </label>
                    <input
                      className={emailError || emailDubError ?
                        'w-full px-3 py-2 mb-2 text-md border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        :
                        'w-full px-3 py-2 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      }
                      ref={inputElement}
                      id="login_email"
                      type="email"
                      placeholder="이메일주소"
                      onChange={onChangeEmail}
                      value={email}
                    />
                    {emailError ? (
                      <p className="text-xs mb-[1.5rem] italic text-red-500">이메일을 입력해주세요.</p>
                    ) : null}
                    {emailDubError ? (
                      <p className="text-xs mb-[1.5rem] italic text-red-500">해당하는 이메일 계정은 존재하지 않습니다.</p>
                    ) : null}
                  </div>


                  <div className="mb-4">
                    <label className="block mb-1 text-md font-bold text-gray-700" htmlFor="password">
                      비밀번호
                    </label>
                    <input
                      className=
                      'w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      id="login_password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="********"
                      onChange={onChangePassword}
                      value={password}
                    />
                    {passwordError ? (
                      <p className="text-xs mb-[1.5rem] italic text-red-500">비밀번호를 입력해주세요.</p>
                    ) : null}
                    {loginError ? (
                      <p className="text-xs mb-[1.5rem] italic text-red-500">로그인 에러 - 비밀번호를 다시 확인해주세요.</p>
                    ) : null}
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 text-md py-4 font-bold text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:shadow-outline"
                      type="onSubmit"
                    >
                      로그인
                    </button>
                  </div>



                  <div className="text-center text-[14px] text-gray-500">

                    비밀번호를 잊어버렸나요?
                    <a
                      className="inline-block text-[0.88rem] text-blue-500 align-baseline hover:text-blue-800"
                      onClick={handlePasswordForgot}
                    >
                      &nbsp;비밀번호를 재설정
                    </a>
                    해주세요.
                  </div>

                  <div className="text-center mt-[1rem] mb-[1rem] text-[14px] text-gray-500">
                    아직 회원이 아니신가요? <Link href="/signup"><a className="text-[0.88rem] text-blue-500 align-baseline hover:text-blue-800">회원가입</a></Link>을 해주세요.
                  </div>


                  <div className="w-[90%] mx-auto h-[4px] py-4 my-4 border-b-[1px] border-solid border-slate-200"></div>
                  <div className="w-fit bg-white mt-[-24px] px-8 mx-auto text-md text-gray-500">소셜 계정 로그인</div>
                  <div className='mt-4 mb-4 gap-4 p-2 flex flex-col min-w-full items-center'>
                    <button
                      onClick={signInWithGoogleHandler}
                      className="hover:bg-slate-50 rounded-full google-btn flex flex-row items-center justify-center w-[70%] mx-auto p-2 bg-white shadow-lg h-[48px] disabled:!cursor-default disabled:!brightness-75"
                    >
                      <div className="mr-3 flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <Image width={28} height={28} unoptimized alt="google" className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                      </div>
                      <p className="btn-text"><b>구글로 시작하기</b></p>
                    </button>

                    {/* <button
                      onClick={signInWithKakaoHandler}
                      className="hover:bg-[#FEE50090] rounded-full kakao-btn flex flex-row items-center justify-center w-[70%] mx-auto p-2 bg-[#FEE500] shadow-lg h-[48px] disabled:!cursor-default disabled:!brightness-75"
                    >
                      <div className="mr-3 flex items-center gap-2">
                        <Image width={25} height={25} unoptimized alt="kakao" className="kakao-icon" src="./kakao_bubble.png" />
                      </div>
                      <p className="btn-text"><b>카카오로 시작하기</b></p>
                    </button> */}

                  </div>

                </form>

                <div className="g-signin2" data-width="300" data-height="200" data-longtitle="true" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
};

export default Login;