import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createEducation } from 'firebaseConfig';
import { addEducation, setAddDoneFalse } from 'slices/education';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Sixth = ({ goNextStage, goNews, goPrevStage, goCertStage }) => {

  const { addDone, myEducations } = useSelector(state => state.education);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const noEducations = !myEducations || myEducations?.length === 0;
  useEffect(() => {
    if (addDone) {
      setName("");
      setMajor("");
      setCategory("");
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

      dispatch(setAddDoneFalse());
      goNextStage();
    }
  }, [addDone, dispatch, goNextStage])
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


  // 학사/석사/박사/고등학교 category
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const onChangeCategory = useCallback((e) => {
    setCategory(e.target.value);
    setCategoryError(false);
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
      finish: finish,
      category: category,
      ismain: true,
    };

    const con = await createEducation(educationResult);
    dispatch(addEducation(con));


  }, [user?.userID, dispatch, name, major, start, end, finish, category])

  // autoFocus 관련
  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <div className='w-full h-[100vh] flex flex-col justify-between'>
      {/* 뒤로가기 버튼 ==> 첫번째는 없고 두번째부터*/}
      <div className='py-4 backdrop-blur-md	'>
        <div className='mx-auto text-left'>
          <div className='w-full flex justify-start items-center'>
            <div className='w-max'>
              <div className='flex justify-start items-center'>
                <button className="text-gray-600 p-3 rounded-full hover:bg-gray-100"
                  onClick={() => goCertStage(5)}
                >
                  <IoMdArrowRoundBack className='w-6 h-6' />
                </button>
              </div>
            </div>
            <div className='my-6 px-4 w-full'>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 ">
                <div className=" w-[64%] bg-sky-600 text-xs font-medium text-sky-100 text-center p-0.5 leading-none rounded-full">
                  64%</div>
              </div>
            </div>
          </div>
          <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 my-4 w-full pl-2 cursor-pointer'>
            🏛️최종학력</h3>
          <p className='ml-2 my-1 text-gray-500 text-[1.2rem] leading-8'>최종학력을 입력해주세요.</p>
          {!noEducations &&
            <p className='ml-2 my-0.5 text-red-500 text-[0.8rem] leading-8'>이미 등록된 학력이 존재합니다.</p>
          }
          <form
            className="w-full"
            onSubmit={onSubmit}
          >
            <div className='overflow-y-auto py-4 px-2 h-[55vh] md:h-[60vh]'>
              <div className="max-w-[720px] py-4">
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
                  placeholder="서울대학교"
                  onChange={onChangeName}
                  value={name}
                />
                {nameError ? (
                  <p className="text-xs mt-[0.3rem] italic text-red-500">학교명은 적어주세요!</p>
                ) : null}
              </div>

              <div className="max-w-[720px] py-4">
                <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="major">
                  전공
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
                  placeholder="경영학과"
                  onChange={onChangeMajor}
                  value={major}
                />
                {majorError ? (
                  <p className="text-xs mt-[0.3rem] italic text-red-500">전공명을 입력해주세요.(고등학교: ex.문과)</p>
                ) : null}
              </div>

              <div className="max-w-[720px] py-4">
                <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="category">
                  학위
                </label>
                <select
                  className={categoryError ?
                    "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    :
                    "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  <p className="text-xs mt-[0.3rem] italic text-red-500">학위를 입력해주세요!</p>
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

              <div className="max-w-[720px] py-4">
                <div className="mb-4 md:mr-2 md:mb-0 w-[100%]">
                  {finish ?
                    <label className="block mb-1 text-md font-bold text-gray-700" htmlFor="start">
                      기간
                    </label>
                    :
                    <label className="block mb-1 text-md font-bold text-gray-700" htmlFor="start">
                      입학일
                    </label>}
                  <div className="flex flex-col md:flex-row gap-2">
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



            </div>
          </form>
        </div>
      </div>



      <div className='w-full justify-end flex flex-col items-center px-2'>
        <button className="my-3 py-2 w-[12rem] text-gray-500 text-[14px] underline" onClick={goNews}>나중에 하기</button>

        {noEducations ?
          <button className='my-2 w-full text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC] focus:outline-none focus:shadow-outline rounded-lg' onClick={onSubmit}>다음</button>
          :
          <div className='flex flex-col md:flex-row w-full gap-1'>
            <button className='w-full text-md py-4 font-bold text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline rounded-lg' onClick={goNextStage}>건너뛰기</button>
            <button className='w-full text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC] focus:outline-none focus:shadow-outline rounded-lg' onClick={onSubmit}>추가등록</button>
          </div>
        }
      </div>
    </div>
  );
};

Sixth.propTypes = {
  goNextStage: PropTypes.func,
  goNews: PropTypes.func,
  goPrevStage: PropTypes.func,
  goCertStage: PropTypes.func,
};

export default Sixth;