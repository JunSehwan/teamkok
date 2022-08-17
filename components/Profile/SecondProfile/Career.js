import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCareer } from 'firebaseConfig';
import { addCareer, setAddDoneFalse } from 'slices/career';
import AlertModal from 'components/Common/Modal/AlertModal';
import PropTypes from 'prop-types';

const Career = ({ carform, setCarform }) => {
  const dispatch = useDispatch();
  const { addDone, myCareers } = useSelector(state => state.career);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (addDone) {
      setName("");
      setPosition("");
      setSection("");
      setJob("");
      setType("");
      setIsmain("");
      setDescription("");
      setFinish("");
      setStart({
        year: standardYear,
        month: 1,
      });
      setEnd({
        year: standardYear,
        month: 1,
      });
      setNameError(false);
      setPositionError(false);
      setSectionError(false);
      setJobError(false);
      setStartError(false);
      setEndError(false);
      setTypeError(false);
      setConfirm(true);

      dispatch(setAddDoneFalse());
    }
  }, [addDone, dispatch, myCareers])



  const CancelAdd = useCallback(() => {
    setCarform(false);
    setName("");
    setPosition("");
    setSection("");
    setJob("");
    setType("");
    setIsmain("");
    setDescription("");
    setFinish("");
    setStart({
      year: standardYear,
      month: 1,
    });
    setEnd({
      year: standardYear,
      month: 1,
    });
    setNameError(false);
    setPositionError(false);
    setJobError(false);
    setSectionError(false);
    setTypeError(false);
    setStartError(false);
    setEndError(false);
  }, [setCarform])

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
    };
    const con = await createCareer(careerResult);
    dispatch(addCareer(con));


  }, [user?.userID, dispatch, name, position, section, type, start, end, finish, job, ismain, description])

  const [confirm, setConfirm] = useState(false);
  const closeConfirm = () => {
    setConfirm(false);
    setCarform(false);
  }

  return (
    <div className=''>
      <div className="rounded-lg lg:rounded-l-none">



        {carform ?
          <form
            className="w-full pt-2 pb-2 mb-1 rounded mt-[1.4rem]"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="company_name">
                회사명
              </label>
              <input
                className={nameError ?
                  'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  :
                  'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                }
                id="company_name"
                type="text"
                maxLength={100}
                placeholder="회사명"
                onChange={onChangeName}
                value={name}
              />
              {nameError ? (
                <p className="text-xs mb-[1.5rem] italic text-red-500">회사명을 입력해주세요.</p>
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
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="type">
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
                부가설명
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
                  title="경력정보 업로드 완료"
                  // contents="업데이트 완료"
                  closeOutsideClick={false}
                  openModal={confirm}
                  closeModal={closeConfirm}
                  cancelFunc={closeConfirm}
                  twobutton={false}
                />
              }
              <button type="button" onClick={CancelAdd} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 mr-[6px]">Cancel</button>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">경력저장</button>

            </div>
          </form> : null}
      </div>
    </div>
  );
};

Career.propTypes = {
  carform: PropTypes.bool,
  setCarform: PropTypes.func,
};

export default Career;