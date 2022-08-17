import React, { useCallback, useState, useEffect } from 'react';
import { signUp } from "slices/user";
import { createAccount, emailDubCheck } from 'firebaseConfig';
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

const Signup = ({ handleCancelModal }) => {

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
      handleCancelModal();
    }
  }, [handleCancelModal, signUpSuccess, user])




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
    month: "",
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

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
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
    await emailDubCheck(email).then((dubCheck) => {
      if (dubCheck?.length !== 0) {
        throw setEmailDubError(true);
        // return setEmailDubError(true);
      }
    })
    if (emailDubError == true) {
      return setEmailDubError(true);
    }

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
        handleCancelModal();
      } catch (err) {
        console.error(err);
      }
    }
  }, [username, email, emailDubError, form, tel, password, passwordCheck, dispatch, handleCancelModal])

  const nowForCopy = dayjs(now);
  const time = nowForCopy?.format('YYYY-MM-DD HH:mm:ss');
  const [con, setCon] = useState();
  const auth = getAuth();
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

  return (
    <>

      <div>
        <div className="container mx-auto">
          <div className="flex justify-center my-3">
            {/* <!-- Row --> */}
            <div className="w-full flex">
              {/* <!-- Col --> */}
              {/* <!-- Col --> */}
              <div className="mt-6 w-full rounded-lg lg:rounded-l-none">

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

                <form
                  className="w-full pt-4 pb-2 mb-1 rounded"
                  onSubmit={onSubmit}
                >
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="name">
                      이름
                    </label>
                    <input
                      className={usernameError ?
                        'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        :
                        'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      }
                      id="name"
                      type="text"
                      maxLength={10}
                      placeholder="이름"
                      onChange={onChangeUsername}
                      value={username}
                    />
                    {usernameError ? (
                      <p className="text-xs mb-[1.5rem] italic text-red-500">이름을 입력해주세요.</p>
                    ) : null}
                  </div>

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
                      id="e-mail"
                      type="email"
                      placeholder="이메일주소"
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
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="firstName">
                        생년월일
                      </label>
                      <div className="flex">
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
                    <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="email">
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
                      placeholder="-없이 입력"
                      onChange={onChangeNumber}
                      value={tel}
                    />
                    {telError ? (
                      <p className="text-xs mb-[1.5rem] italic text-red-500">연락처를 입력해주세요.</p>
                    ) : null}
                  </div>

                  <div className="mb-4">
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
                      type="password"
                      placeholder="********"
                      onChange={onChangePassword}
                      value={password}
                    />
                    {passwordLengthError ? (
                      <p className="text-xs mb-[1.5rem] mt-[-0.5rem] italic text-red-500">비밀번호는 8자 이상이어야 합니다.</p>
                    ) : null}
                  </div>
                  <div className="mb-4">
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
                      type="password"
                      placeholder="********"
                    />
                    {passwordError ? (
                      <p className="text-xs mt-[-0.5rem] mb-[1.5rem] italic text-red-500">비밀번호가 일치하지 않습니다.</p>
                    ) : null}
                  </div>


                  <div className="text-center mt-[1rem] mb-[1rem] text-[0.88rem] text-gray-500">
                    회원가입을 클릭하면 TEAMZ의
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
                      className="w-full px-4 text-md py-4 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      회원가입
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Signup.propTypes = {
  handleCancelModal: PropTypes.func,
};


export default Signup;