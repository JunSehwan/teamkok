import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, updateUserBasicInfo, } from 'firebaseConfig';
import { updateBasicProfile } from 'slices/user';
import AlertModal from 'components/Common/Modal/AlertModal';
import Category from './Category';
import PropTypes from 'prop-types';

const PersonalInfo = ({ setTabIndex }) => {
  const dispatch = useDispatch();
  const { user, updateBasicProfileSuccess } = useSelector(state => state.user);


  useEffect(() => {
    if (updateBasicProfileSuccess) {

      setUsernameError(false);
      setEmailError(false);
      setBirthError(false);
      setTelError(false);
      setGenderError(false);
      setCategoryError(false);
      setAddressError(false);
    }
  }, [updateBasicProfileSuccess, user])

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
  // const [fixBirth, setFixBirth] = useState(false);
  // const toggFix = () => {
  //   setFixBirth(prev => !prev);
  // }
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
  const [addressError, setAddressError] = useState(false);
  const onChangeAddress = useCallback((e) => {
    setAddress(e.target.value);
    setAddressError(false);
  }, []);


  // URL
  const [url_one, setUrl_one] = useState(user?.url_one || "");
  const onChangeURL_1 = useCallback((e) => {
    setUrl_one(e.target.value);
  }, []);

  const [url_two, setUrl_two] = useState(user?.url_two || "");
  const onChangeURL_2 = useCallback((e) => {
    setUrl_two(e.target.value);
  }, [])

  const [url_three, setUrl_three] = useState(user?.url_three || "");
  const onChangeURL_3 = useCallback((e) => {
    setUrl_three(e.target.value);
  }, [])

  // 카테고리
  const [checkedCategory, setCheckedCategory] = useState(parseInt(user?.category) || 1);
  const [categoryError, setCategoryError] = useState(false);

  const [confirm, setConfirm] = useState(false);
  const closeConfirm = () => {
    setTabIndex(2);
    setConfirm(false);
  }

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (username?.length === 0) {
      document.getElementById('username').focus();
      return setUsernameError(true);
    }
    if (email == '') {
      document.getElementById('e-mail').focus();
      return setEmailError(true);
    }
    if (!email_check(email)) {
      document.getElementById('e-mail').focus();
      return setEmailError(true);
    }
    if (form?.year?.length === 0 || form?.month?.length === 0 || form?.day?.length === 0) {
      document.getElementById('birthyear').focus();
      return setBirthError(true);
    }
    if (tel == '') {
      document.getElementById('phone').focus();
      return setTelError(true);
    }
    if (gender == '') {
      document.getElementById('gender').focus();
      return setGenderError(true);
    }
    if (checkedCategory == "") {
      document.getElementById('category').focus();
      return setCategoryError(true);
    }
    if (address == "") {
      document.getElementById('address').focus();
      return setAddressError(true);
    }
    const newForm = { year: parseInt(form?.year), month: parseInt(form?.month), day: parseInt(form?.day) }
    const res = await updateUserBasicInfo(
      username, newForm, email, tel, checkedCategory, gender, url_one, url_two, url_three, address
    );
    dispatch(updateBasicProfile(res))
    setConfirm(true);
  }, [username, dispatch, email, tel, gender, checkedCategory, url_one, url_two, url_three, address, form?.year, form?.month, form?.day])

  return (
    <div className="w-full rounded-lg lg:rounded-l-none">

      <form
        className="w-full pt-4 pb-2 mb-1 rounded"
        onSubmit={onSubmit}
      >
        <div className="mb-4">
          <label className="block mb-1 text-sm font-bold text-gray-400" htmlFor="email">
            이메일계정
          </label>
          <input
            className=
            'w-full px-3 py-2 mb-2 text-sm leading-tight bg-gray-100 text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline'
            id="email"
            type="email"
            placeholder="이메일주소"
            disabled
            defaultValue={auth?.currentUser?.email}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="username">
            이름
          </label>
          <input
            className={usernameError ?
              'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              :
              'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            }
            id="username"
            type="text"
            maxLength={10}
            tabIndex={-1}
            placeholder="이름"
            onChange={onChangeUsername}
            defaultValue={user?.username}
          />
          {usernameError ? (
            <p className="text-xs mb-[1.5rem] italic text-red-500">이름을 입력해주세요.</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="email_using">
            주로 사용하는 이메일
          </label>
          <input
            className={emailError ?
              'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              :
              'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            }
            id="email_using"
            type="email"
            tabIndex={-1}
            placeholder="이메일주소"
            onChange={onChangeEmail}
            defaultValue={user?.email_using || user?.email || ""}
          />
          {emailError ? (
            <p className="text-xs mb-[1.5rem] italic text-red-500">올바른 이메일 형식이 아닙니다.</p>
          ) : null}
        </div>


        <div className="mb-4">
          <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="gender">
            성별
          </label>
          <select
            className={genderError ?
              'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              :
              'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            }
            id="gender"
            type="gender"
            name="gender"
            tabIndex={-1}
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

        <div className="mb-4">
          <div className="mb-4 md:mr-2 md:mb-0 w-[100%]">
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="firstName">
              생년월일
            </label>
            <div className="flex">

              <>
                <select
                  className={birthError ? "w-full px-3 py-2 mb-2 border-red-500 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    :
                    "w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  }
                  id="birthyear"
                  placeholder="년"
                  tabIndex={-1}
                  onChange={onChangeYear}
                  defaultValue={parseInt(user?.birthday?.year) || ""}
                >
                  {years()}
                </select>
                <select
                  className={birthError ? "md:ml-2 w-full border-red-500 px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    :
                    "md:ml-2 w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  }
                  id="birthmonth"
                  tabIndex={-1}
                  placeholder="월"
                  onChange={onChangeMonth}
                  defaultValue={parseInt(user?.birthday?.month) || ""}
                >
                  {months()}
                </select>
                <select
                  className={birthError ? "border-red-500 md:ml-2 w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    :
                    "md:ml-2 w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  }
                  defaultValue={parseInt(user?.birthday?.day) || ""}
                  onChange={onChangeDay}
                  id="birthday"
                  placeholder="일"
                  tabIndex={-1}
                >
                  {days.map(item => (
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
            tabIndex={-1}
            maxLength='11'
            placeholder="-없이 입력"
            onChange={onChangeNumber}
            defaultValue={user?.phonenumber}
          />
          {telError ? (
            <p className="text-xs mb-[1.5rem] italic text-red-500">연락처를 입력해주세요.</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="email">
            거주지 주소
          </label>
          <input
            className={addressError ?
              'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              :
              'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            }
            id="address"
            type="address"
            tabIndex={-1}
            placeholder="ex. 서울시 관악구 봉천로8길 11"
            onChange={onChangeAddress}
            defaultValue={user?.address}
          />
          {addressError ? (
            <p className="text-xs mb-[1.5rem] italic text-red-500">거주지를 입력해주세요.</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="website">
            Website URL(SNS, 포트폴리오 등)
          </label>
          <input
            className=
            'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            id="url1"
            type="url"
            tabIndex={-1}
            htmlFor="website"
            placeholder="https://sitename1.com"
            onChange={onChangeURL_1}
            defaultValue={user?.url_one}
          />
          <input
            className=
            'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            id="url2"
            type="url"
            htmlFor="website"
            tabIndex={-1}
            placeholder="https://sitename2.com"
            onChange={onChangeURL_2}
            defaultValue={user?.url_two}
          />
          <input
            className=
            'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            id="url3"
            type="url"
            htmlFor="website"
            tabIndex={-1}
            placeholder="https://sitename3.com"
            onChange={onChangeURL_3}
            defaultValue={user?.url_three}
          />
        </div>

        <div className="mb-4">
          <Category
            id="category"
            user={user}
            tabIndex={-1}
            checkedCategory={checkedCategory}
            setCheckedCategory={setCheckedCategory}
          />


          {categoryError ? (
            <p className="text-xs mb-[1.5rem] italic text-red-500">카테고리를 선택해주세요.</p>
          ) : null}
        </div>


        <div className="mb-2 text-right">
          {confirm &&
            <AlertModal
              title="기본정보 업데이트 완료"
              // contents="업데이트 완료"
              closeOutsideClick={true}
              openModal={confirm}
              closeModal={closeConfirm}
              cancelFunc={closeConfirm}
              twobutton={false}
            />

          }
          <button type="submit"
            className="inline-flex justify-center py-3 px-4 w-full border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            업데이트</button>
        </div>
      </form>
    </div >
  );
};

PersonalInfo.propTypes = {
  setTabIndex: PropTypes.func,
};


export default PersonalInfo;