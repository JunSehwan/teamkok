import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createCareer } from 'firebaseConfig';
import { addCareer, setAddDoneFalse } from 'slices/career';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Fifth = ({ goNextStage, goNews, goPrevStage, goCertStage }) => {

  const { addDone, myCareers } = useSelector(state => state.career);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const noCareers = !myCareers || myCareers?.length === 0;
  useEffect(() => {
    if (addDone) {
      // setName("");
      // setPosition("");
      // setSection("");
      // setJob("");
      // setType("");
      // setIsmain("");
      // setDescription("");
      // setFinish("");
      // setStart({
      //   year: standardYear,
      //   month: 1,
      // });
      // setEnd({
      //   year: standardYear,
      //   month: 1,
      // });
      setNameError(false);
      setPositionError(false);
      setSectionError(false);
      setJobError(false);
      setStartError(false);
      setEndError(false);
      setTypeError(false);
      dispatch(setAddDoneFalse());
      goNextStage();
    }
  }, [addDone, dispatch, goNextStage])

  //회사명
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    setNameError(false);
  }, [])

  //직위명
  const [position, setPosition] = useState("");
  const [positionError, setPositionError] = useState(false);
  const onChangePosition = useCallback(
    e => {
      setPosition(e.target.value);
      setPositionError(false);
    },
    []
  );

  // 부서명
  const [section, setSection] = useState("");
  const [sectionError, setSectionError] = useState(false);
  const onChangeSection = useCallback(e => {
    setSection(e.target.value);
    setSectionError(false);
  },
    []
  );

  // 직무, 주요업무
  const [job, setJob] = useState("");
  const [jobError, setJobError] = useState(false);
  const onChangeJob = useCallback((e) => {
    setJob(e.target.value);
    setJobError(false);
  }, [])

  // 근무형태
  const [type, setType] = useState("");
  const [typeError, setTypeError] = useState(false);
  const onChangeType = useCallback((e) => {
    setType(e.target.value);
    setTypeError(false);
  }, [])

  // 주경력 ismain
  const [ismain, setIsmain] = useState(false);
  const onChangeIsmain = useCallback((e) => {
    setIsmain(e.target.checked);
  }, [])

  // 경력설명 description
  const [description, setDescription] = useState("");
  const onChangeDescription = useCallback((e) => {
    setDescription(e.currentTarget.value);
  }, [])


  // 시작일, 종료일
  const standardYear = 2010;
  const [start, setStart] = useState({
    year: standardYear,
    month: 1,
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
      document.getElementById('company_name').focus();
      return setNameError(true);
    }
    if (position == '') {
      document.getElementById('position').focus();
      return setPositionError(true);
    }
    if (section == '') {
      document.getElementById('section').focus();
      return setSectionError(true);
    }
    if (type == '') {
      document.getElementById('type').focus();
      return setTypeError(true);
    }
    if (job == '') {
      document.getElementById('job').focus();
      return setJobError(true);
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

    const careerResult = {
      userId: user?.userID,
      name: name,
      position: position,
      start: start,
      end: end,
      section: section,
      finish: finish,
      job: job,
      type: type,
      ismain: true,
      description: description,
    };
    const con = await createCareer(careerResult);
    dispatch(addCareer(con));
  }, [user?.userID, dispatch, name, position, section, type, start, end, finish, job, description])


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
                  onClick={() => goCertStage(4)}
                >
                  <IoMdArrowRoundBack className='w-6 h-6'/>
                </button>
              </div>
            </div>
            <div className='my-6 px-4 w-full'>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 ">
                <div className="w-[42%] bg-sky-600 text-xs font-medium text-sky-100 text-center p-0.5 leading-none rounded-full">
                  42%</div>
              </div>
            </div>
          </div>
          <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 my-4 w-full plcursor-pointer -2'>
            🏢현 직장</h3>
          <p className='ml-2 my-1 text-gray-500 text-[1.2rem] leading-8'>현재 재직중인 회사 또는 최종경력을 입력해주세요.</p>
          {!noCareers &&
            <p className='ml-2 my-0.5 text-red-500 text-[0.8rem] leading-8'>이미 등록된 경력이 존재합니다.</p>
          }

          <form
            className="w-full"
            onSubmit={onSubmit}
          >
            <div className='overflow-y-auto py-4 px-2 h-[41vh] md:h-[60vh]'>
              <div className="max-w-[720px] py-4">
                <label
                  className="block mb-2 text-md font-bold text-gray-700 "
                  htmlFor="company_name">
                  회사명
                </label>
                <input
                  className={nameError ?
                    "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    :
                    "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  ref={inputElement}
                  id="company_name"
                  type="text"
                  maxLength={100}
                  placeholder="ABC회사"
                  onChange={onChangeName}
                  value={name}
                />
                {nameError ? (
                  <p className="text-xs mt-[0.3rem] italic text-red-500">회사명을 잊어버리셨어요!</p>
                ) : null}
              </div>

              <div className="max-w-[720px] py-4">
                <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="position">
                  직위
                </label>
                <input
                  className={positionError ?
                    "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    :
                    "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  id="position"
                  type="text"
                  maxLength={100}
                  placeholder="대리"
                  onChange={onChangePosition}
                  value={position}
                />
                {positionError ? (
                  <p className="text-xs mt-[0.3rem] italic text-red-500">직급을 작성해주세요!</p>
                ) : null}
              </div>

              <div className="max-w-[720px] py-4">
                <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="section">
                  부서명
                </label>
                <input
                  className={sectionError ?
                    "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    :
                    "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  id="section"
                  type="text"
                  placeholder='인사팀'
                  maxLength={100}
                  onChange={onChangeSection}
                  value={section}
                />
                {sectionError ? (
                  <p className="text-xs mt-[0.3rem] italic text-red-500">부서명을 입력해주세요!</p>
                ) : null}
              </div>


              <div className="max-w-[720px] py-4">
                <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="type">
                  근무형태
                </label>

                <select
                  className={typeError ?
                    "block w-full cursor-pointer p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    :
                    "block w-full cursor-pointer p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  id="type"
                  name="type"
                  onChange={onChangeType}
                  value={type}
                >
                  <option value="">선택</option>
                  <option value={1}>정규직</option>
                  <option value={2}>계약직</option>
                  <option value={3}>자영업/개인사업</option>
                  <option value={4}>프리랜서</option>
                  <option value={5}>인턴/수습</option>
                  <option value={6}>아르바이트</option>
                  <option value={99}>기타</option>
                </select>
                {typeError ? (
                  <p className="text-xs mt-[0.3rem] italic text-red-500">근무형태를 선택해주세요.</p>
                ) : null}
              </div>

              <div className="max-w-[720px] py-4">
                <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="job">
                  주요업무
                </label>
                <textarea
                  className={jobError ?
                    "block w-full h-32 p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    :
                    "block w-full h-32 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  id="job"
                  type="text"
                  placeholder='간단한 업무소개'
                  maxLength={1000}
                  onChange={onChangeJob}
                  value={job}
                />
                {jobError ? (
                  <p className="text-xs mt-[0.3rem] italic text-red-500">간단하게 작성해주세요!</p>
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
                  현재 재직중
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
                      입사일
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
        {noCareers ?
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

Fifth.propTypes = {
  goNextStage: PropTypes.func,
  goNews: PropTypes.func,
  goPrevStage: PropTypes.func,
  goCertStage: PropTypes.func,
};

export default Fifth;