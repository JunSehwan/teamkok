import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, updateUserBasicInfo, } from 'firebaseConfig';
import { updateBasicProfile, updateBasicProfileFalse } from 'slices/user';
import toast, { Toaster } from 'react-hot-toast';
import hangjungdong from 'components/Common/Address';

const index = () => {

  const { user, updateBasicProfileSuccess } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const avatarNotify = () => toast('기초정보 업데이트 완료');

  useEffect(() => {
    if (updateBasicProfileSuccess) {
      setUsernameError(false);
      setEmailError(false);
      setBirthError(false);
      setTelError(false);
      setGenderError(false);
      setAddressError(false);
      avatarNotify();
      dispatch(updateBasicProfileFalse());
    }
  }, [dispatch, updateBasicProfileSuccess])

  const [username, setUsername] = useState(user?.username);
  const [usernameError, setUsernameError] = useState(false);
  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
    setUsernameError(false);
  }, [])

  const [email, setEmail] = useState(user?.email_using || user?.email || "");
  const [emailError, setEmailError] = useState(false);
  const onChangeEmail = useCallback(
    e => {
      setEmail(e.target.value);
      setEmailError(false);
    },
    []
  );
  function email_check(email) {
    var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(email);
  }

  // 생년월일
  const standardYear = 1990;
  const [form, setForm] = useState(
    {
      year: parseInt(user?.birthday?.year),
      month: parseInt(user?.birthday?.month),
      day: parseInt(user?.birthday?.day),
    }
  );

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
  const [tel, setTel] = useState(user?.phonenumber);
  const [telError, setTelError] = useState(false);
  const onChangeNumber = useCallback((e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    setTel(e.target.value);
    if (regex.test(e.target.value)) {
      setTelError(false);
    } else {
      setTelError(true);
    }
  }, []);

  // 성별
  const [gender, setGender] = useState(user?.gender || "male");
  const [genderError, setGenderError] = useState(false);
  const onChangeGender = useCallback((e) => {
    setGender(e.target.value);
    setGenderError(false);
  }, []);

  // 주소
  const [address, setAddress] = useState(user?.address || "");
  const [address_sido, setAddress_sido] = useState(user?.address_sido || "");
  const [addressError, setAddressError] = useState(false);
  const onChangeAddress = useCallback((e) => {
    setAddress(e.target.value);
    setAddressError(false);
  }, []);
  const onChangeAddress_sido = useCallback((e) => {
    setAddress_sido(e.target.value);
    setAddressError(false);
  }, [])
  const { sido, sigugun, dong } = hangjungdong;




  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (username?.length === 0) {
      document.getElementById('username').focus();
      return setUsernameError(true);
    }
    if (email == '') {
      document.getElementById('email_using').focus();
      return setEmailError(true);
    }
    if (!email_check(email)) {
      document.getElementById('email_using').focus();
      return setEmailError(true);
    }
    if (gender == '') {
      document.getElementById('gender').focus();
      return setGenderError(true);
    }
    if (form?.year?.length === 0 || form?.month?.length === 0 || form?.day?.length === 0) {
      document.getElementById('birthyear').focus();
      return setBirthError(true);
    }
    if (tel == '') {
      document.getElementById('phone').focus();
      return setTelError(true);
    }

    if (address == "") {
      document.getElementById('address').focus();
      return setAddressError(true);
    }
    if (!address_sido || address_sido == "") {
      document.getElementById('address').focus();
      return setAddressError(true);
    }
    const newForm = { year: parseInt(form?.year), month: parseInt(form?.month), day: parseInt(form?.day) }
    const res = await updateUserBasicInfo(
      username, newForm, email, tel, gender, address, address_sido
    );
    dispatch(updateBasicProfile(res))
  }, [username, email, form?.year, form?.month, form?.day, tel, gender, address, address_sido, dispatch])



  return (
    <>
 

      <form
        className="px-2 w-full pt-4 pb-2 mb-1"
        onSubmit={onSubmit}
      >
        <p className='ml-2 my-4 text-gray-500 text-[1.2rem] leading-8'>📝기초정보</p>
        <div className="py-4">
          <span className="block mb-1 text-sm font-bold text-gray-400">
            이메일계정:&nbsp;{user?.email}</span>
        </div>
        <div className="py-4">
          <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="username">
            이름
          </label>
          <input
            className={usernameError ?
              "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              :
              "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            id="username"
            type="text"
            maxLength={10}
            
            placeholder="이름"
            onChange={onChangeUsername}
            defaultValue={user?.username}
          />
          {usernameError ? (
            <p className="text-xs mb-[1.5rem] italic text-red-500">이름을 입력해주세요.</p>
          ) : null}
        </div>

        <div className="py-4">
          <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="email_using">
            주로 사용하는 이메일
          </label>
          <input
            className={emailError ?
              "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              :
              "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            id="email_using"
            type="email"
            
            placeholder="이메일주소"
            onChange={onChangeEmail}
            defaultValue={user?.email_using || user?.email || ""}
          />
          {emailError ? (
            <p className="text-xs mb-[1.5rem] italic text-red-500">올바른 이메일 형식이 아닙니다.</p>
          ) : null}
        </div>


        <div className="py-4">
          <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="gender">
            성별
          </label>
          <select
            className={genderError ?
              "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              :
              "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            id="gender"
            type="gender"
            name="gender"
            
            placeholder="이메일주소"
            onChange={onChangeGender}
            defaultValue={user?.gender || gender}
          >
            <option value="male" key="man">남자</option>
            <option value="female" key="woman">여자</option>
          </select>
          {genderError ? (
            <p className="text-xs mb-[1.5rem] italic text-red-500">성별을 선택해주세요.</p>
          ) : null}
        </div>

        <div className="py-4">
          <div className="mb-4 md:mr-2 md:mb-0 w-[100%]">
            <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="firstName">
              생년월일
            </label>
            <div className="flex gap-2">

              <>
                <select
                  className={birthError ?
                    "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    :
                    "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  id="birthyear"
                  placeholder="년"
                  
                  onChange={onChangeYear}
                  defaultValue={parseInt(user?.birthday?.year) || ""}
                >
                  {years()}
                </select>
                <select
                  className={birthError ?
                    "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    :
                    "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  id="birthmonth"
                  
                  placeholder="월"
                  onChange={onChangeMonth}
                  defaultValue={parseInt(user?.birthday?.month) || ""}
                >
                  {months()}
                </select>
                <select
                  className={birthError ?
                    "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    :
                    "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  defaultValue={parseInt(user?.birthday?.day) || ""}
                  onChange={onChangeDay}
                  id="birthday"
                  placeholder="일"
                  
                >
                  {days?.map(item => (
                    <option value={item} key={item}>
                      {item}일
                    </option>
                  ))}
                </select>
              </>
              {/* : null} */}
            </div>
          </div>
          {birthError ? (
            <p className="text-xs mb-[1.5rem] italic text-red-500">생년월일을 입력해주세요.</p>
          ) : null}
        </div>

        <div className="py-4">
          <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="email">
            연락처
          </label>
          <input
            className={telError ?
              "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              :
              "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            id="phone"
            type="tel"
            
            maxLength='11'
            placeholder="-없이 입력"
            onChange={onChangeNumber}
            defaultValue={user?.phonenumber}
          />
          {telError ? (
            <p className="text-xs mb-[1.5rem] italic text-red-500">연락처를 입력해주세요.</p>
          ) : null}
        </div>

        <div className="py-4">
          <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="address">
            거주지 주소<span className='text-red-600'>*</span>
          </label>

          <div>
            <div className='flex sm:flex-row flex-col gap-2'>
              <select
                className={addressError ?
                  "block w-auto p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  :
                  "block w-auto p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                defaultValue={user?.address_sido || ""}
                onChange={(e) => onChangeAddress_sido(e)}>
                <option value="">시/도 선택</option>
                {sido?.map((el) => (
                  <option key={el?.codeNm} value={el?.codeNm}>
                    {el?.codeNm}
                  </option>
                ))}
              </select>

              <input
                className={addressError ?
                  "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 mt-2 sm:mt-0"
                  :
                  "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2 sm:mt-0"
                }
                id="address"
                type="address"
                placeholder="(e.g. 서울특별시 관악구 신림동)"
                // onChange={(e) => setVal4(e.target.value)}
                // value={val4}
                onChange={onChangeAddress}
                value={address}
              />
            </div>
            {addressError ? (
              <p className="text-xs mt-[0.3rem] italic text-red-500">주소를 작성해주세요.</p>
            ) : null}
          </div>
        </div>

        <div className="w-full justify-end flex items-center">
          <button type="submit"
            className="my-2 px-6 text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg">
            기초정보 업데이트</button>
        </div>
     
      </form>
    </>

  );
};


export default index;