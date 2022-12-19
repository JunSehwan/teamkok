import React, { useCallback, useState, useEffect, useRef } from 'react';
import { signUp } from "slices/user";
import Link from 'next/link';
import { createAccount, emailDubCheck, sendMailForSignUp } from 'firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useRouter } from "next/router";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth
} from "firebase/auth";
import dayjs from "dayjs";
import {
  doc,
  setDoc, getFirestore
} from "firebase/firestore";
import Image from 'next/image';
import LoadingPage from 'components/Common/Loading';
import { BiShow, BiHide } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';
import GoBack from 'components/Common/GoBack';

const Signup = () => {

  const dispatch = useDispatch();
  const { signUpSuccess, user } = useSelector(state => state.user);
  const router = useRouter();
  useEffect(() => {
    if (signUpSuccess || !!user) {
      setUsername("");
      setEmail("");
      setForm({
        year: standardYear,
        month: "",
        day: "01",
      });
      setTel("");
      setPassword("");
      setPasswordCheck("");
      setUsernameError(false);
      setEmailError(false);
      setEmailDubError(false);
      setBirthError(false);
      setTelError(false);
      setPasswordLengthError(false);
      setPasswordError(false);
    }
  }, [signUpSuccess, user])

  useEffect(() => {
    if (signUpSuccess || !!user) {
      router.push("/onboarding")
    }
  }, [router, signUpSuccess, user])

  const [emailSignOpen, setEmailSignOpen] = useState(false);
  const toggleEmail = useCallback(() => {
    setEmailSignOpen(prev => !prev);
  }, [])
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
    setUsernameError(false);
  }, [])

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
  function email_check(email) {
    var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(email);
  }
  // 생년월일
  const standardYear = 1990;
  const [form, setForm] = useState({
    year: standardYear,
    month: "1",
    day: "01",
  });
  const onChangeYear = useCallback(
    e => {
      setForm({ ...form, year: e.target.value })
      setBirthError(false)
    },
    [form]
  );
  const onChangeMonth = useCallback(
    e => {
      setForm({ ...form, month: e.target.value })
      setBirthError(false)
    },
    [form]
  );
  const onChangeDay = useCallback(
    e => {
      setForm({ ...form, day: e.target.value })
      setBirthError(false)
    },
    [form]
  );

  const [birthError, setBirthError] = useState(false);
  const now = new Date();
  let yearsArr = [];
  for (let y = now.getFullYear(); y >= 1950; y -= 1) {
    yearsArr.push(y);
  }
  let monthArr = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      monthArr.push("0" + m.toString());
    } else {
      monthArr.push(m.toString());
    }
  }
  let days = [];
  let date = new Date(form?.year, form?.month, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }

  const years = () => {
    const allYears = [];
    const thisYear = new Date().getFullYear();
    for (let i = thisYear; i >= thisYear - 40; i -= 1)
      allYears.push(<option key={i} value={i}>{i}년</option>);
    return (
      <>
        <option key="" value="">년</option>
        {allYears}
      </>
    );
  };
  const months = () => {
    const monthNames = [
      "1월", "2월", "3월", "4월", "5월", "6월",
      "7월", "8월", "9월", "10월", "11월", "12월",
    ];
    return (
      <>
        <option key="" value="">월</option> {/* 선택창 초기값 */}
        {monthNames?.map((month, i) => (
          <option key={month} value={i + 1}>{month}</option>
        ))}
      </>
    );
  };

  // 전화번호
  const [tel, setTel] = useState("");
  const [telError, setTelError] = useState("");
  const onChangeNumber = useCallback((e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    setTel(e.target.value);
    if (regex.test(e.target.value)) {
      setTelError(false);
    } else {
      setTelError(true);
    }
  }, []);

  // @ 비밀번호 확인
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPswd, setShowPswd] = useState(false);

  // @ 비밀번호 길이 검토
  const onChangePassword = useCallback(
    e => {
      setPassword(e.target.value);
      setPasswordLengthError(e.target.value.length < 8);
    },
    []
  );
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const toggleShowPswd = useCallback(() => {
    setShowPswd(prev => !prev);
  }, [])

  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    setLoading(true);
    if (username?.length === 0) {
      return setUsernameError(true);
    }
    if (email?.length === 0) {
      return setEmailError(true);
    }
    if (!email_check(email)) {
      return setEmailError(true);
    }

    if (form?.year?.length === 0 || form?.month?.length === 0 || form?.day?.length === 0) {
      return setBirthError(true);
    }
    if (tel == '') {
      return setTelError(true);
    }
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (password?.length < 8) {
      return setPasswordLengthError(true);
    }
    await emailDubCheck(email).then(async (dubCheck) => {
      if (dubCheck?.length !== 0) {
        setLoading(false);
        return setEmailDubError(true);
        // alert("중복된 메일주소입니다.")
        // return setEmailDubError(true);
        // return setEmailDubError(true);
      } else {
        const res = await createAccount(email, password, username, form, tel);
        if (res?.uid?.length !== 0) {
          try {
            dispatch(signUp({
              email, username,
              birthday: form,
              tel,
              id: res?.uid,
              avatar: res?.photoURL
            }));
            const getMail = await sendMailForSignUp(
              email, username,
            );
          } catch (err) {
            console.error(err);
          }
        }
        setLoading(false);
      }
    })
    if (emailDubError) {
      return setEmailDubError(true);
    }


  }, [username, email, form, tel, password, passwordCheck, emailDubError, dispatch])

  const nowForCopy = dayjs(now);
  const time = nowForCopy?.format('YYYY-MM-DD HH:mm:ss');
  const [con, setCon] = useState();
  const auth = getAuth();
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
  }, [auth, db, time, dispatch])

  // autoFocus 관련
  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <>

      <div className='max-w-[32rem] mx-auto'>
        <div className="container mx-auto">
          <div className="flex justify-center my-3">
            {/* <!-- Row --> */}
            <div className="w-full flex">
              {/* <!-- Col --> */}
              {/* <!-- Col --> */}
              <div className="mt-6 w-full rounded-lg lg:rounded-l-none">
                {loading ?
                  <div className="min-h-[50vh] w-full">
                    <LoadingPage />
                  </div>
                  :
                  <>
                    {/* 뒤로가기 버튼 */}
                    <div className='w-full fixed left-0 top-0 py-2 bg-[#ffffff51] z-10 backdrop-blur-md	'>
                      <div className='max-w-[32rem] mx-auto'>
                        <div className='w-full flex justify-items-end items-center'>
                          <GoBack />
                        </div>
                        <h3 className='text-xl text-gray-600 my-2 ml-2 w-full'>간단하게 가입하실 수 있습니다.😀</h3>
                      </div>
                    </div>
                    <div className='pt-[100px] px-2 '>

                      <form
                        className="w-full pt-4 pb-2 mb-1 rounded"
                        onSubmit={onSubmit}
                      >
                        {emailSignOpen ?
                          <>
                            <div className="mb-4">
                              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="name">
                                이름
                              </label>
                              <input
                                ref={inputElement}
                                className={usernameError ?
                                  'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                  :
                                  'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                }
                                id="name"
                                type="text"
                                maxLength={10}
                                placeholder="본명을 기재해주세요."
                                onChange={onChangeUsername}
                                value={username}
                              />
                              {usernameError ? (
                                <p className="text-xs mb-[1.5rem] italic text-red-500">이름을 입력해주세요.</p>
                              ) : null}
                            </div>

                            <div className="mb-4">
                              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="e-mail">
                                이메일
                              </label>
                              <input
                                className={emailError || emailDubError ?
                                  'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                  :
                                  'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                }
                                id="e-mail"
                                type="email"
                                placeholder="이메일주소를 입력해주세요."
                                onChange={onChangeEmail}
                                value={email}
                              />
                              {emailError ? (
                                <p className="text-xs mb-[1.5rem] italic text-red-500">올바른 이메일 형식이 아닙니다.</p>
                              ) : null}
                              {emailDubError ? (
                                <p className="text-xs mb-[1.5rem] italic text-red-500">이미 동일한 이메일 계정이 존재합니다.</p>
                              ) : null}
                            </div>

                            <div className="mb-4">
                              <div className="mb-4 md:mr-2 md:mb-0 w-[100%]">
                                <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="birthday">
                                  생년월일
                                </label>
                                <div className="flex gap-2">
                                  <select
                                    className={birthError ? "w-full px-3 py-2 mb-2 border-red-500 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                      :
                                      "w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    }
                                    id="birthyear"
                                    type="text"
                                    placeholder="년"
                                    onChange={onChangeYear}
                                    value={form?.year}
                                  >
                                    {years()}
                                  </select>
                                  <select
                                    className={birthError ? "md:ml-2 w-full border-red-500 px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                      :
                                      "md:ml-2 w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    }
                                    id="birthmonth"
                                    type="text"
                                    placeholder="월"
                                    onChange={onChangeMonth}
                                    value={form?.month}
                                  >
                                    {months()}
                                  </select>
                                  <select
                                    className={birthError ? "border-red-500 md:ml-2 w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                      :
                                      "md:ml-2 w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    }
                                    value={form?.day}
                                    onChange={onChangeDay
                                    }
                                    id="birthday"
                                    type="text"
                                    placeholder="일"
                                  >
                                    {days.map(item => (
                                      <option value={item} key={item}>
                                        {item}일
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              {birthError ? (
                                <p className="text-xs mb-[1.5rem] italic text-red-500">생년월일을 입력해주세요.</p>
                              ) : null}
                            </div>

                            <div className="mb-4">
                              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="phone">
                                연락처
                              </label>
                              <input
                                className={telError ?
                                  'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                  :
                                  'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                }
                                id="phone"
                                type="tel"
                                maxLength='11'
                                placeholder="숫자만 입력 ex. 01012345678"
                                onChange={onChangeNumber}
                                value={tel}
                              />
                              {telError ? (
                                <p className="text-xs mb-[1.5rem] italic text-red-500">연락처를 입력해주세요.</p>
                              ) : null}
                            </div>

                            <div className="mb-4 relative">
                              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="password">
                                비밀번호(8자이상)
                              </label>
                              <input
                                className={passwordLengthError ?
                                  'w-full px-3 py-2 mb-3 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                  :
                                  'w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                }
                                id="password"
                                type={showPswd ? "text" : "password"}
                                placeholder="********"
                                onChange={onChangePassword}
                                value={password}
                              >
                              </input>
                              <div className="inline cursor-pointer absolute top-[33px] right-[8px] sm:right-[14px] text-gray-400">
                                {showPswd ? (
                                  <BiHide onClick={toggleShowPswd} />
                                ) : (
                                  <BiShow onClick={toggleShowPswd} />
                                )}
                              </div>

                              {passwordLengthError ? (
                                <p className="text-xs mb-[1.5rem] mt-[-0.5rem] italic text-red-500">비밀번호는 8자 이상이어야 합니다.</p>
                              ) : null}
                            </div>

                            <div className="mb-4 relative">
                              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="c_password">
                                비밀번호 확인
                              </label>
                              <input
                                className={passwordError ?
                                  'w-full px-3 py-2 mb-3 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                  :
                                  'w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                }
                                onChange={onChangePasswordCheck}
                                value={passwordCheck}
                                id="c_password"
                                type={showPswd ? "text" : "password"}
                                placeholder="********"
                              />
                              <div className="inline cursor-pointer absolute top-[33px] right-[8px] sm:right-[14px] text-gray-400">
                                {showPswd ? (
                                  <BiHide onClick={toggleShowPswd} />
                                ) : (
                                  <BiShow onClick={toggleShowPswd} />
                                )}
                              </div>
                              {passwordError ? (
                                <p className="text-xs mt-[-0.5rem] mb-[1.5rem] italic text-red-500">비밀번호가 일치하지 않습니다.</p>
                              ) : null}
                            </div>


                            <div className="text-center mt-[1rem] mb-[1rem] text-[0.88rem] text-gray-500">
                              회원가입을 클릭하면 JOBCOC의
                              <a
                                className="inline-block text-blue-500 align-baseline hover:text-blue-800"
                                href="/about/Service" target="_blank" rel="noreferrer noopener"
                              >&nbsp;서비스 약관</a>
                              에 동의하고
                              <a
                                className="inline-block text-blue-500 align-baseline hover:text-blue-800"
                                href="/about/Privacy" target="_blank" rel="noreferrer noopener"
                              >&nbsp;개인정보 처리방침&nbsp;</a>
                              적용을 인정하는 것으로 간주합니다.
                            </div>

                            <div className="mb-2 text-center">
                              <button
                                className="w-full px-4 text-md py-4 font-bold text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:shadow-outline"
                                type="submit"
                              >
                                회원가입
                              </button>
                            </div>
                          </>
                          :

                          <div className="mb-2 text-center">
                            <button
                              className="flex items-center justify-center mx-auto px-2 text-md py-2 font-bold text-white bg-amber-500 rounded-full w-[336px] hover:bg-amber-600 focus:outline-none focus:shadow-outline"
                              onClick={toggleEmail}
                            >
                              <FiMail className='w-8 h-8 mr-3' />
                              <span>이메일로 가입하기</span>
                            </button>
                          </div>
                        }



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

                          <button
                            onClick={signInWithKakaoHandler}
                            className="hover:bg-[#FEE50090] rounded-full kakao-btn flex flex-row items-center justify-center w-[70%] mx-auto p-2 bg-[#FEE500] shadow-lg h-[48px] disabled:!cursor-default disabled:!brightness-75"
                          >
                            <div className="mr-3 flex items-center gap-2">
                              <Image width={25} height={25} unoptimized alt="kakao" className="kakao-icon" src="./kakao_bubble.png" />
                            </div>
                            <p className="btn-text"><b>카카오로 시작하기</b></p>
                          </button>

                        </div>

                      </form>
                      <div className="text-center mt-[2rem] mb-[1rem] text-[14px] text-gray-400">
                        이미 가입을 하셨나요? <Link href="/signin"><a className="text-blue-800">로그인</a></Link> 해주세요.
                      </div>

                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default Signup;
