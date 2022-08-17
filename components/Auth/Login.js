import React, { useCallback, useEffect, useState } from 'react';
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

const Login = ({ handleCancelModal }) => {
  const dispatch = useDispatch();
const router=useRouter();
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

  const { signUpSuccess, logInSuccess } = useSelector(state => state.user);
  const { user } = useSelector(state => state.user);
  useEffect(() => {
    if (signUpSuccess || logInSuccess || !!user) {
      setEmail("");
      setPassword("");
      setEmailError(false);
      setEmailDubError(false);
      setPasswordError(false);
      handleCancelModal();
    }
  }, [signUpSuccess, logInSuccess,user, handleCancelModal])


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
        handleCancelModal();
      }
    } catch (e) {
      if (e) { setLoginError(true); }
      console.error(e);
      const errorCode = e.code;
      const errorMessage = e.message;
      alert(errorCode, "에러")
    }

  }, [password, email, auth, results, dispatch, handleCancelModal])


  // 구글로그인
  const now = new Date();
  const nowForCopy = dayjs(now);
  const time = nowForCopy?.format('YYYY-MM-DD HH:mm:ss');
  const [con, setCon] = useState();
  const db = getFirestore();
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

            handleCancelModal();
          }

          return data?.user
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  }, [auth, db, time, dispatch, handleCancelModal])

  const handlePasswordForgot = useCallback(()=>{
    router.push("/auth/forgotpassword");
    handleCancelModal();
  }, [router, handleCancelModal])

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center my-3">
          {/* <!-- Row --> */}
          <div className="w-full flex">
            {/* <!-- Col --> */}
            {/* <!-- Col --> */}
            <div className="mt-6 w-full bg-white rounded-lg lg:rounded-l-none">

              <button
                onClick={signInWithGoogleHandler}
                className="flex min-w-full cursor-pointer items-center gap-3 rounded-md bg-white p-2 text-black transition duration-300 disabled:!cursor-default disabled:!brightness-75"
              >
                <div className="hover:bg-slate-100 google-btn flex flex-row items-center justify-center w-[70%] mx-auto p-2 bg-white shadow-lg">
                  <div className="google-icon-wrapper mr-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Image width={34} height={34} alt="google" className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                  </div>
                  <p className="btn-text"><b>Sign in with google</b></p>
                </div>
              </button>

              <div className="w-[90%] mx-auto h-[4px] py-4 my-4 border-b-[1px] border-solid border-slate-200"></div>
              <div className="w-fit bg-white mt-[-24px] px-6 mx-auto text-sm text-gray-500">또는</div>


              <form className="w-full pt-4 pb-2 mb-4 bg-white rounded">

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="email">
                    이메일
                  </label>
                  <input
                    className={emailError || emailDubError ?
                      'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      :
                      'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    }
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
                  <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="password">
                    비밀번호
                  </label>
                  <input
                    className=
                    'w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
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
                    className="w-full px-4 text-md py-4 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={onSubmit}
                  >
                    로그인
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-[0.88rem] text-blue-500 align-baseline hover:text-blue-800"
                    onClick={handlePasswordForgot}
                  >
                    Forgot Password?
                  </a>
                </div>


              </form>

              <div className="g-signin2" data-width="300" data-height="200" data-longtitle="true" />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  handleCancelModal: PropTypes.func,
};

export default Login;