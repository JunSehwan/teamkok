import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { modifyCareer } from 'firebaseConfig';
import { updateCareer, setUpdateDoneFalse } from 'slices/career';
import AlertModal from 'components/Common/Modal/AlertModal';


const EditCareer = ({ career, setViewCar }) => {
  const dispatch = useDispatch();
  // 수정

  const [onEdit, setOnEdit] = useState(false);
  const onClickModify = useCallback(() => {
    setOnEdit(true);
  }, []);
  const closeModify = useCallback(() => {
    setOnEdit(false);
  }, [])

  const { user } = useSelector(state => state.user);
  const { updateDone } = useSelector(state => state.career);

  useEffect(() => {
    if (updateDone) {
      setNameError(false);
      setPositionError(false);
      setSectionError(false);
      setJobError(false);
      setStartError(false);
      setEndError(false);
      setTypeError(false);
      setConfirm(true);

      dispatch(setUpdateDoneFalse());

    }
  }, [updateDone, dispatch, onEdit])


  //직장명
  const [name, setName] = useState(career?.name);
  const [nameError, setNameError] = useState(false);
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    setNameError(false);
  }, [])

  //직급명
  const [position, setPosition] = useState(career?.position);
  const [positionError, setPositionError] = useState(false);
  const onChangePosition = useCallback(
    e => {
      setPosition(e.target.value);
      setPositionError(false);
    },
    []
  );

  // 부서명
  const [section, setSection] = useState(career?.section);
  const [sectionError, setSectionError] = useState(false);
  const onChangeSection = useCallback(
    e => {
      setSection(e.target.value);
      setSectionError(false);
    },
    []
  );

  // 직무, 주요업무
  const [job, setJob] = useState(career?.job);
  const [jobError, setJobError] = useState(false);
  const onChangeJob = useCallback((e) => {
    setJob(e.target.value);
    setJobError(false);
  }, [])


  // 근무형태
  const [type, setType] = useState(career?.type);
  const [typeError, setTypeError] = useState(false);
  const onChangeType = useCallback((e) => {
    setType(e.target.value);
    setTypeError(false);
  }, [])


  // 주경력 ismain
  const [ismain, setIsmain] = useState(career?.ismain);
  const onChangeIsmain = useCallback((e) => {
    setIsmain(e.target.checked);
  }, [])

  const [description, setDescription] = useState(career?.description);
  const onChangeDescription = useCallback((e) => {
    setDescription(e.currentTarget.value);
  }, [])

  // 시작일, 종료일
  const standardYear = 2005;
  const [start, setStart] = useState({
    year: parseInt(career?.start?.year),
    month: parseInt(career?.start?.month),
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
    year: parseInt(career?.end?.year),
    month: parseInt(career?.end?.month),
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
  const [finish, setFinish] = useState(career?.finish);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onChangeFinish = useCallback((e) => {
    setFinish(!e.target.checked);
  }, [])



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
    if (position == '') {
      document.getElementById('position').focus();
      return setPositionError(true);
    }
    if (section == '') {
      document.getElementById('section').focus();
      return setSectionError(true);
    }
    if (job == '') {
      document.getElementById('job').focus();
      return setJobError(true);
    }
    if (type == '') {
      document.getElementById('type').focus();
      return setTypeError(true);
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
      ismain: ismain,
      description: description,
      id: career?.id,
    };
    const con = await modifyCareer(careerResult, career?.id);
    dispatch(updateCareer(careerResult));

  }, [dispatch, user?.userID, name, position, type, section, start, end, finish, job, ismain, description, career?.id])

  const [confirm, setConfirm] = useState(false);
  const closeConfirm = () => {
    setConfirm(false);
    setViewCar(false);
    closeModify();

  }

  return (
    <>
      <button onClick={onClickModify} className="mr-[8px] flex col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-end items-center" >
        <svg xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 rounded-lg text-sky-500 hover:text-sky-600 font-bold bg-sky-100  py-1 px-1 text-sm"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>

      {onEdit ?
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed w-[100%] z-50 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
              <div className="border-solid border-t-8 border-violet-400 relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                  <div className="relative bg-white rounded border">
                    <div className="w-full flex justify-start text-violet-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h2 className="text-violet-600 font-lg font-bold tracking-normal leading-tight mb-4">경력정보 수정</h2>
                  </div>
                  <form
                    className="w-full pt-2 pb-2 mb-1 rounded mt-[1.4rem]"
                    onSubmit={onSubmit}
                  >
                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="school_name">
                        회사명
                      </label>
                      <input
                        className={nameError ?
                          'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                          :
                          'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        }
                        id="school_name"
                        type="text"
                        maxLength={100}
                        placeholder="회사명"
                        onChange={onChangeName}
                        value={name}
                      />
                      {nameError ? (
                        <p className="text-xs mb-[1.5rem] italic text-red-500">학교명을 입력해주세요.</p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="position">
                        직위
                      </label>
                      <input
                        className={positionError ?
                          'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                          :
                          'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        }
                        id="position"
                        type="text"
                        maxLength={100}
                        placeholder="대리"
                        onChange={onChangePosition}
                        value={position}
                      />
                      {positionError ? (
                        <p className="text-xs mb-[1.5rem] italic text-red-500">직위명을 입력해주세요.</p>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="section">
                        부서명
                      </label>
                      <input
                        className=
                        'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        id="section"
                        type="text"
                        placeholder='인사팀'
                        maxLength={100}
                        onChange={onChangeSection}
                        value={section}
                      />
                      {sectionError ? (
                        <p className="text-xs mb-[1.5rem] italic text-red-500">직위명을 입력해주세요.</p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="category">
                        근무형태
                      </label>
                      <select
                        className={typeError ?
                          'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                          :
                          'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
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
                        <p className="text-xs mb-[1.5rem] italic text-red-500">근무형태를 선택해주세요.</p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="job">
                        주요업무
                      </label>
                      <input
                        className=
                        'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        id="job"
                        type="text"
                        placeholder='간단한 업무소개'
                        maxLength={1000}
                        onChange={onChangeJob}
                        value={job}
                      />
                      {jobError ? (
                        <p className="text-xs mb-[1.5rem] italic text-red-500">수행 업무를 작성해주세요.</p>
                      ) : null}
                    </div>

                    <div className="mb-4 flex aligns-center">
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
                        대표경력(내 경력 중 1개만 선택)
                      </label>
                    </div>

                    <div className="mb-4 flex aligns-center">
                      <input
                        className="form-tick bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
                        id="finish"
                        name="finish"
                        checked={!finish}
                        onChange={onChangeFinish}
                        value={finish}
                        type="checkbox"
                      >
                      </input>
                      <label
                        className="inline-block mb-0 leading-relaxed ml-[8px] text-sm font-bold text-gray-700"
                        htmlFor="finish">
                        현재 재직중
                      </label>
                    </div>

                    <div className="mb-4">
                      <div className="mb-4 md:mr-2 md:mb-0 w-[100%]">
                        {finish ?
                          <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="start">
                            기간
                          </label>
                          :
                          <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="start">
                            입사일
                          </label>}
                        <div className="flex">
          
                          <>
                            <select
                              className={startError ? "w-full px-3 py-2 mb-2 border-red-500 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                :
                                "w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                              }
                              id="startyear"
                              placeholder="년"
                              onChange={onChangeStartYear}
                              value={start?.year}
                            >
                              {years()}
                            </select>
                            <select
                              className={startError ? "md:ml-2 w-full border-red-500 px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                :
                                "md:ml-2 w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                              className={endError ? "w-full px-3 py-2 mb-2 border-red-500 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                :
                                "w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                              }
                              id="endyear"
                              placeholder="년"
                              onChange={onChangeEndYear}
                              value={end?.year}
                            >
                              {years()}
                            </select>
                            <select
                              className={endError ? "md:ml-2 w-full border-red-500 px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                :
                                "md:ml-2 w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                        <p className="text-xs mb-[1.5rem] italic text-red-500">기간을 정확히 입력해주세요.</p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="description">
                        경력 관련부가설명
                      </label>
                      <textarea
                        id="description"
                        tabIndex={-1}
                        placeholder="부가적으로 설명할 내용을 작성해주세요."
                        className="w-full px-3 py-2 mb-2 resize-none h-52 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        onChange={onChangeDescription}
                        value={description}
                      >
                      </textarea>
                    </div>


                    <div className="mb-2 text-right">
                      {confirm &&
                        <AlertModal
                          title="경력정보 업데이트 완료"
                          // contents="업데이트 완료"
                          closeOutsideClick={false}
                          openModal={confirm}
                          closeModal={closeConfirm}
                          cancelFunc={closeConfirm}
                          twobutton={false}
                        />
                      }

                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm">업데이트</button>
                        <button onClick={closeModify} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
        : null}
    </>
  );
};



EditCareer.propTypes = {
  career: PropTypes.object,
  setViewCar: PropTypes.func,
};

export default EditCareer;