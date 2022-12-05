import React, { useCallback, useState, useEffect, useRef } from 'react';
import { createEducation } from 'firebaseConfig';
import { addEducation, setAddDoneFalse, addEducationOpenFalse } from 'slices/education';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const AddEducation = () => {
  const notify = () => toast('학력정보 등록 완료!');
  const { addDone } = useSelector(state => state.education);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const closeForm = useCallback(() => {
    dispatch(addEducationOpenFalse());
  }, [dispatch])

  useEffect(() => {
    if (addDone) {
      setName("");
      setMajor("");
      setSecondmajor("");
      setCategory("");
      setIsmain("");
      setDescription("");
      setFinish("");
      setStart({
        year: standardYear,
        month: "1",
      });
      setEnd({
        year: standardYear,
        month: "1",
      });
      setNameError(false);
      setMajorError(false);
      setCategoryError(false);
      setStartError(false);
      setEndError(false);
      notify();
      dispatch(setAddDoneFalse());
      closeForm();

    }
  }, [addDone, closeForm, dispatch])

  //학교명
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    setNameError(false);
  }, [])

  //전공명
  const [major, setMajor] = useState("");
  const [majorError, setMajorError] = useState(false);
  const onChangeMajor = useCallback(
    e => {
      setMajor(e.target.value);
      setMajorError(false);
    },
    []
  );
  const [secondmajor, setSecondmajor] = useState("");
  const onChangeSecondMajor = useCallback(
    e => {
      setSecondmajor(e.target.value);
    },
    []
  );

  // 학사/석사/박사/고등학교 category
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const onChangeCategory = useCallback((e) => {
    setCategory(e.target.value);
    setCategoryError(false);
  }, [])

  // 주학력 ismain
  const [ismain, setIsmain] = useState(false);
  const onChangeIsmain = useCallback((e) => {
    setIsmain(e.target.checked);
  }, [])

  // 학력설명 description
  const [description, setDescription] = useState("");
  const onChangeDescription = useCallback((e) => {
    setDescription(e.currentTarget.value);
  }, [])


  // 시작일, 종료일
  const standardYear = 2010;
  const [start, setStart] = useState({
    year: standardYear,
    month: "1",
  });
  const [startError, setStartError] = useState(false);
  const onChangeStartYear = useCallback(
    e => {
      setStart({ ...start, year: parseInt(e.target.value) })
      setStartError(false)
    },
    [start]
  );
  const onChangeStartMonth = useCallback(
    e => {
      setStart({ ...start, month: parseInt(e.target.value) })
      setStartError(false)
    },
    [start]
  );

  const [end, setEnd] = useState({
    year: 9999,
    month: 12,
  });
  const [endError, setEndError] = useState(false);
  const onChangeEndYear = useCallback(
    e => {
      setEnd({ ...end, year: parseInt(e.target.value) })
      setEndError(false)
    },
    [end]
  );
  const onChangeEndMonth = useCallback(
    e => {
      setEnd({ ...end, month: parseInt(e.target.value) })
      setEndError(false)
    },
    [end]
  );

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
  const years = () => {
    const allYears = [];
    const thisYear = new Date().getFullYear();
    for (let i = thisYear; i + 5 >= thisYear - 40; i -= 1)
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

  // 종료 finish
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [finish, setFinish] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onChangeFinish = useCallback((e) => {
    setFinish(!e.target.checked);
    if (!finish) {
      setEnd({
        year: 9999,
        month: 12,
      });
    }
  }, [finish])

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!finish) {
      setEnd({
        year: 9999,
        month: 12,
      });
    }
    if (name?.length === 0) {
      document.getElementById('school_name').focus();
      return setNameError(true);
    }
    if (major == '') {
      document.getElementById('major').focus();
      return setMajorError(true);
    }
    if (category == '') {
      document.getElementById('category').focus();
      return setCategoryError(true);
    }
    if (start?.year?.length === 0 || start?.month?.length === 0) {
      document.getElementById('start').focus();
      return setStartError(true);
    }
    if (end?.year?.length === 0 || end?.month?.length === 0) {
      document.getElementById('startyear').focus();
      return setStartError(true);
    }
    if (parseInt(start?.year) > parseInt(end?.year) ||
      (parseInt(start?.year) == parseInt(end?.year) && parseInt(start?.month) > parseInt(end?.month))
    ) { return setEndError(true); }


    const educationResult = {
      userId: user?.userID,
      name: name,
      major: major,
      start: start,
      end: end,
      secondmajor: secondmajor,
      finish: finish,
      category: category,
      ismain: ismain,
      description: description,
    };
    const con = await createEducation(educationResult);
    dispatch(addEducation(con));
  }, [category, description, dispatch, end, finish, ismain, major, name, secondmajor, start, user?.userID])

  // autoFocus 관련
  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <div className='w-full flex flex-col justify-between py-4 bg-slate-50 shadow-inner px-4 rounded-lg'>
      <div className='mx-auto w-full'>
        <div className="flex items-start justify-between p-5 rounded-t">
          <div className="relative rounded border w-full">
            <h2 className="text-[#1890FF] text-2xl font-bold tracking-normal leading-tight w-full text-center">
              새학력 등록</h2>
          </div>
          <button
            className="p-2 rounded-full hover:bg-slate-200 ml-auto bg-transparent border-0 text-black opacity-30 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={() => closeForm()}
          >
            <span className="bg-transparent opacity-100 text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </button>
        </div>

        <form
          className="w-full"
          onSubmit={onSubmit}
        >
          <div className="py-4 flex aligns-center">
            <input
              className="form-tick bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
              id="ismain"
              name="ismain"
              checked={ismain}
              onChange={onChangeIsmain}
              value={ismain}
              type="checkbox"
            >
            </input>
            <label
              className="inline-block mb-0 leading-relaxed ml-[8px] text-sm font-bold text-gray-700"
              htmlFor="ismain">
              대표학력(내 학력 중 1개만 선택)
            </label>
          </div>
          <div className="py-4">
            <label
              className="block mb-2 text-md font-bold text-gray-700 "
              htmlFor="school_name">
              학교명
            </label>
            <input
              className={nameError ?
                "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                :
                "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
              ref={inputElement}
              id="school_name"
              type="text"
              maxLength={100}
              placeholder="(e.g. 한국대학교)"
              onChange={onChangeName}
              value={name}
            />
            {nameError ? (
              <p className="text-xs mt-[0.3rem] italic text-red-500">학교명을 잊어버리셨어요!</p>
            ) : null}
          </div>

          <div className="py-4">
            <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="major">
              전공/부전공
            </label>
            <input
              className={majorError ?
                "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                :
                "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
              id="major"
              type="text"
              maxLength={100}
              placeholder="(e.g. 경영학과)"
              onChange={onChangeMajor}
              value={major}
            />
            <input
              className=
              "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="secondmajor"
              type="text"
              maxLength={100}
              placeholder="부전공(선택)"
              onChange={onChangeSecondMajor}
              value={secondmajor}
            />
            {majorError ? (
              <p className="text-xs mt-[0.3rem] italic text-red-500">전공을 작성해주세요!</p>
            ) : null}
          </div>

          <div className="py-4">
            <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="type">
              학위
            </label>

            <select
              className={categoryError ?
                "block w-full cursor-pointer p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                :
                "block w-full cursor-pointer p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
              id="category"
              name="category"
              onChange={onChangeCategory}
              value={category}
            >
              <option value="">선택</option>
              <option value={9}>박사</option>
              <option value={7}>석사</option>
              <option value={5}>학사</option>
              <option value={4}>전문학사</option>
              <option value={2}>고등학교</option>
              <option value={99}>기타</option>
            </select>
            {categoryError ? (
              <p className="text-xs mt-[0.3rem] italic text-red-500">학위를 선택해주세요.</p>
            ) : null}
          </div>

          
          <div className="my-4 flex aligns-center">
            <input
              className="cursor-pointer form-tick bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
              id="finish"
              name="finish"
              checked={!finish}
              onChange={onChangeFinish}
              value={finish}
              type="checkbox"
            >
            </input>
            <label
              className="cursor-pointer inline-block mb-0 leading-relaxed ml-[8px] text-sm font-bold text-gray-700"
              htmlFor="finish">
              현재 재학중
            </label>
          </div>

          <div className="py-4">
            <div className="mb-4 md:mr-2 md:mb-0 w-[100%]">
              {finish ?
                <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="start">
                  기간
                </label>
                :
                <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="start">
                  입사일
                </label>}
              <div className="flex flex-row gap-2">
                <>
                  <select
                    className={startError ?
                      "block w-full cursor-pointer p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                      :
                      "block w-full cursor-pointer p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    id="startyear"
                    placeholder="년"
                    onChange={onChangeStartYear}
                    value={start?.year}
                  >
                    {years()}
                  </select>
                  <select
                    className={startError ?
                      "block w-full cursor-pointer p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                      :
                      "block w-full cursor-pointer p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    id="startmonth"
                    placeholder="월"
                    onChange={onChangeStartMonth}
                    value={start?.month}
                  >
                    {months()}
                  </select>

                  {finish && <>

                    <span
                      className='mx-[4px] flex items-center mb-[10px]'
                    >~</span>

                    <select
                      className={endError ?
                        "block w-full cursor-pointer p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        :
                        "block w-full cursor-pointer p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      id="endyear"
                      placeholder="년"
                      onChange={onChangeEndYear}
                      value={end?.year}
                    >
                      {years()}
                    </select>
                    <select
                      className={endError ?
                        "block w-full cursor-pointer p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        :
                        "block w-full cursor-pointer p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      id="startmonth"
                      placeholder="월"
                      onChange={onChangeEndMonth}
                      value={end?.month}
                    >
                      {months()}
                    </select>


                  </>}
                </>
              </div>
            </div>
            {startError || endError ? (
              <p className="text-xs mt-[0.3rem] italic text-red-500">기간을 정확히 입력해주세요.</p>
            ) : null}
          </div>

          <div className="py-4">
            <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="description">
              부가설명
            </label>
            <textarea
              id="description"
              placeholder="부가적으로 설명할 내용을 작성해주세요."
              className="w-full px-3 py-2 mb-2 resize-none h-52 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              onChange={onChangeDescription}
              value={description}
            >
            </textarea>
          </div>

        </form>
      </div>

      <div className='w-full justify-center flex flex-col items-center px-2'>
        <button className="my-3 py-2 w-[12rem] text-gray-500 text-[14px] underline" onClick={closeForm}>나중에 하기</button>
        <div className='flex flex-row w-full'>
          <button className='my-2 ml-1 w-full text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg' onClick={onSubmit}>등록</button>
        </div>
      </div>
    </div>
  );
};



export default AddEducation;