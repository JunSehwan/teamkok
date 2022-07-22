import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StyleCard from './StyleCard';
import Question from './Question';
import Survey from 'components/Common/Survey';
import StyleList from 'components/Common/StyleList';
import { updateUserStyle, updateUserSurvey } from 'slices/user';
import { updateStyle, updateSurvey } from 'firebaseConfig';


const Contents = () => {
  const dispatch = useDispatch();
  const { user, updateStyleDone, updateSurveyDone } = useSelector(state => state.user);
  const [openList, setOpenList] = useState(false);
  const toggleList = useCallback(() => {
    setOpenList(prev => !prev);
  }, [])
  const [openSurvey, setOpenSurvey] = useState(false);
  const toggleSurvey = useCallback(() => {
    setOpenSurvey(prev => !prev);
  }, [])

  useEffect(() => {
    if (updateSurveyDone) {
      setSurveyError(false);
    }
  }, [updateSurveyDone])

  useEffect(() => {
    if (updateStyleDone) {
      setCategoryError(false);
    }
  }, [updateStyleDone])

  const [category, setCategory] = useState();
  const [categoryError, setCategoryError] = useState(false);
  const onChangeCategory = useCallback((index) => () => {
    setCategory(index + 1);
    setCategoryError(false);
    console.log(category, "ah");

  }, [category])

  const onCategorySubmit = useCallback(async (e) => {
    if (category === "") {
      document.getElementById('category').focus();
      return setCategoryError(true);
    }
    const res = await updateStyle(category);
    dispatch(updateUserStyle(category));
  }, [category, dispatch])


  const [surveyError, setSurveyError] = useState(false);
  const [state, setState] = useState(
    {
      one: "", two: "", three: "", four: "",
      five: "", six: "", seven: "", eight: "",
    }
  )
  const { one, two, three, four, five, six, seven, eight
  } = state;
  const values = {
    one, two, three, four, five, six, seven, eight
  };
  const onChangeSurvey = useCallback((name, e) => () => {
    setState({ ...state, [name]: e });
    setSurveyError(false);
    console.log("state", state);
  }, [state]);

  const onSurveySubmit = useCallback(async (e) => {
    if (one === "" || two === "" || three === "" || four === "" || five === "" || six === "" || seven === "" || eight === "") {
      return setSurveyError(true);
    }
    const surveyRes = await updateSurvey(state);
    dispatch(updateUserSurvey(state));
  }, [dispatch, eight, five, four, one, seven, six, state, three, two])

  // useEffect(() => {
  //   if (surveyDone) {
  //     setState({
  //       name: "", company: "", type: "", leave: "",
  //     });

  //     setError(false);

  //     // 팝업창 완료
  //     // setConfirmOpen(true);
  //   }
  // }, [surveyDone]);


  // const onSubmit = useCallback(async (e) => {
  //   e.preventDefault();

  //   if (username?.length === 0) {
  //     document.getElementById('username').focus();
  //     return setUsernameError(true);
  //   }
  //   if (email == '') {
  //     document.getElementById('e-mail').focus();
  //     return setEmailError(true);
  //   }
  //   if (!email_check(email)) {
  //     document.getElementById('e-mail').focus();
  //     return setEmailError(true);
  //   }
  //   if (form?.year?.length === 0 || form?.month?.length === 0 || form?.day?.length === 0) {
  //     document.getElementById('birthyear').focus();
  //     return setBirthError(true);
  //   }
  //   if (tel == '') {
  //     document.getElementById('phone').focus();
  //     return setTelError(true);
  //   }
  //   if (gender == '') {
  //     document.getElementById('gender').focus();
  //     return setGenderError(true);
  //   }
  //   if (category == "") {
  //     document.getElementById('category').focus();
  //     return setCategoryError(true);
  //   }
  //   if (address == "") {
  //     document.getElementById('address').focus();
  //     return setAddressError(true);
  //   }
  //   const res = await updateUserBasicInfo(
  //     username, form, email, tel, checkedCategory, gender, url_one, url_two, url_three, address
  //   );
  //   dispatch(updateBasicProfile({ username, form, email, tel, gender, checkedCategory, url_one, url_two, url_three, address }))
  //   setConfirm(true);
  // }, [username, dispatch, form, email, tel, gender, checkedCategory, url_one, url_two, url_three, address])


  return (
    <>
      <div className="mb-4">
        <div className="px-[2px] md:lg:xl:px-[4px] border-t border-b py-[12px]">
          <div className=" bg-white shadow-xl shadow-neutral-100 border ">

            <div className="container flex flex-col mx-auto w-full items-center justify-center">
              <button
                onClick={toggleList}
                className="border-t-[6px] border-blue-400 border-solid default:from-gray-400 via-gray-100 default:to-white flex flex-row justify-between text-left items-center px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
                <div className="">
                  <h3 className="text-blue-500 text-base leading-6 font-bold dark:text-white">
                    스타일 선택
                  </h3>
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openList ?
                <>
                  <ul id="category" className="flex flex-col w-[100%]">
                    {StyleList?.map((v, i) => (
                      <React.Fragment key={v?.src}>
                        <StyleCard
                          title={v?.title}
                          category={category}
                          sub={v?.sub}
                          setCategory={setCategory}
                          onChangeCategory={onChangeCategory}
                          src={v?.src}
                          tag={v?.tag}
                          index={i}
                        />
                      </React.Fragment>
                    ))}
                  </ul>
                  {categoryError ? (
                    <p className="mt-[6px] w-[100%] font-bold text-xs mb-[1.5rem] italic text-red-500">스타일을 선택해주세요.</p>
                  ) : null}
                  <button onClick={onCategorySubmit}>확인</button>
                </> : null}
            </div>


            <div className="mt-[12px] container flex flex-col mx-auto w-full items-center justify-center">
              <button
                onClick={toggleSurvey}
                className="border-t-[6px] border-blue-400 border-solid default:from-gray-400  via-gray-100 default:to-white flex flex-row justify-between text-left items-center px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
                <div className="">
                  <h3 className="text-base leading-6 font-bold  text-blue-500 dark:text-white">
                    설문항목 작성
                  </h3>
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openSurvey ?
                <>
                  {Survey?.map((v) => (
                    <React.Fragment
                      key={v?.name}>
                      <Question

                        value={v?.value}
                        state={state}
                        name={v?.name}
                        onChangeSurvey={onChangeSurvey}
                      />
                    </React.Fragment>
                  ))}
                  {surveyError ? (
                    <p className="mt-[6px] w-[100%] font-bold text-xs mb-[1.5rem] italic text-red-500">설문항목을 다 작성하셨나요?</p>
                  ) : null}
                  <button onClick={onSurveySubmit}>확인</button>
                </> : null}
            </div>

          </div>
        </div>
        <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="school_name">
          내 MBTI 입력
        </label>
      </div>
    </>
  );
};

export default Contents;