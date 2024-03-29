import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEducation } from 'firebaseConfig';
import { addEducation, setAddDoneFalse } from 'slices/education';
import AlertModal from 'components/Common/Modal/AlertModal';
import PropTypes from 'prop-types';

const Education = ({eduform, setEduform}) => {
  const dispatch = useDispatch();
  const { addDone, myEducations } = useSelector(state => state.education);
  const { user } = useSelector(state => state.user);

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

      setConfirm(true);

      dispatch(setAddDoneFalse());
    }
  }, [addDone, dispatch, myEducations])

  
  const CancelAdd = useCallback(() => {
    setEduform(false);
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
  }, [setEduform])

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

  // 주경력 ismain
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
    if (category == '') {
      document.getElementById('category').focus();
      return setCategoryError(true);
    }
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


  }, [user?.userID, dispatch, name, major, secondmajor, start, end, finish, category, ismain, description])

  const [confirm, setConfirm] = useState(false);
  const closeConfirm = () => {
    setConfirm(false);
    setEduform(false);
  }

  return (
    <div className=''>
      <div className="rounded-lg lg:rounded-l-none">
          {eduform ?
          <form
            className="w-full pt-2 pb-2 mb-1 rounded mt-[1.4rem]"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="school_name">
                학교명
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
                placeholder="학교명"
                onChange={onChangeName}
                value={name}
              />
              {nameError ? (
                <p className="text-xs mb-[1.5rem] italic text-red-500">학교명을 입력해주세요.</p>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="major">
                전공
              </label>
              <input
                className={majorError ?
                  'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  :
                  'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                }
                id="major"
                type="text"
                maxLength={100}
                placeholder="ex.경영학과"
                onChange={onChangeMajor}
                value={major}
              />
              <input
                className=
                'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                id="secondmajor"
                type="text"
                placeholder='부전공(선택)'
                maxLength={100}
                onChange={onChangeSecondMajor}
                value={secondmajor}
              />
              {majorError ? (
                <p className="text-xs mb-[1.5rem] italic text-red-500">전공명을 입력해주세요.(고등학교: ex.문과)</p>
              ) : null}
            </div>


            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="category">
                학위
              </label>
              <select
                className={categoryError ?
                  'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  :
                  'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
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
                <p className="text-xs mb-[1.5rem] italic text-red-500">학위를 선택해주세요.</p>
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
                대표학력(내 학력 중 1개만 선택)
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
                현재 재학중
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
                    입학일
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
                  title="학력정보 업로드 완료"
                  // contents="업데이트 완료"
                  closeOutsideClick={false}
                  openModal={confirm}
                  closeModal={closeConfirm}
                  cancelFunc={closeConfirm}
                  twobutton={false}
                />
              }
              <button type="button" onClick={CancelAdd} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 mr-[6px]">Cancel</button>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">학력저장</button>

            </div>
          </form> : null}
      </div>
    </div>
  );
};

Education.propTypes = {
  eduform: PropTypes.bool,
  setEduform: PropTypes.func,
};

export default Education;