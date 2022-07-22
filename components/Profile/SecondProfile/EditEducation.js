import React, { useCallback, useState, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { modifyEducation } from 'firebaseConfig';
import { updateEducation, setUpdateDoneFalse } from 'slices/education';
import AlertModal from 'components/Common/Modal/AlertModal';
import dynamic from 'next/dynamic'
import {
  useLoadData,
  useSetData,
  useClearDataCallback,
} from "./profileHooks";
import { options } from "components/Common/Editor";

const Editor = dynamic(() =>
  import("components/Common/Editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false })

const EditEducation = ({ education, setViewEdu }) => {
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
  const { updateDone } = useSelector(state => state.education);

  useEffect(() => {
    if (updateDone) {
      setNameError(false);
      setMajorError(false);
      setCategoryError(false);
      setStartError(false);
      setEndError(false);
      setConfirm(true);

      dispatch(setUpdateDoneFalse());

    }
  }, [updateDone, dispatch, onEdit])


  //학교명
  const [name, setName] = useState(education?.name);
  const [nameError, setNameError] = useState(false);
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    setNameError(false);
  }, [])

  //전공명
  const [major, setMajor] = useState(education?.major);
  const [majorError, setMajorError] = useState(false);
  const onChangeMajor = useCallback(
    e => {
      setMajor(e.target.value);
      setMajorError(false);
    },
    []
  );
  const [secondmajor, setSecondmajor] = useState(education?.secondmajor);
  const onChangeSecondMajor = useCallback(
    e => {
      setSecondmajor(e.target.value);
    },
    []
  );

  // 학사/석사/박사/고등학교 category
  const [category, setCategory] = useState(education?.category);
  const [categoryError, setCategoryError] = useState(false);
  const onChangeCategory = useCallback((e) => {
    setCategory(e.target.value);
    setCategoryError(false);
  }, [])

  // 주경력 ismain
  const [ismain, setIsmain] = useState(education?.ismain);
  const onChangeIsmain = useCallback((e) => {
    setIsmain(e.target.checked);
  }, [])

  // 학력설명 description
  const [description, setDescription] = useState(education?.description);
  const { data, loading } = useLoadData({ description })
  // useSetData({ description, data });

  // save handler
  // const onSave = useSaveCallback(description)
  // clear data callback
  const clearData = useClearDataCallback(description);
  const disabled = description === null || loading;


  // 시작일, 종료일
  const standardYear = 2005;
  const [start, setStart] = useState({
    year: parseInt(education?.start?.year),
    month: parseInt(education?.start?.month),
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
    year: parseInt(education?.end?.year),
    month: parseInt(education?.end?.month),
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
  const [finish, setFinish] = useState(education?.finish);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onChangeFinish = useCallback((e) => {
    setFinish(e.target.checked);
  }, [])



  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

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

    if (description) {
      const out = await description?.save();
      var JSONresult = JSON.stringify(out);
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
      description: JSONresult,
      id: education?.id,
    };
    const con = await modifyEducation(educationResult, education?.id);
    document.getElementById('editor').focus();
    dispatch(updateEducation(educationResult));

  }, [dispatch, user?.userID, name, major, secondmajor, start, end, finish, category, ismain, description, education?.id])

  const [confirm, setConfirm] = useState(false);
  const closeConfirm = () => {
    setConfirm(false);
    setViewEdu(false);
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
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    </div>
                    <h2 className="text-violet-600 font-lg font-bold tracking-normal leading-tight mb-4">학력정보 수정</h2>
                  </div>
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
                        // className={finishError ?
                        //   'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        //   :
                        //   'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        // }
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
                        // className={finishError ?
                        //   'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        //   :
                        //   'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        // }
                        className="form-tick bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
                        id="finish"
                        name="finish"
                        checked={finish}
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
                        <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="start">
                          기간
                        </label>
                        <div className="flex">
                          {/* <div className=''>
                    <input className=''
                      type="checkbox"
                      checked={finish !== true}
                      onChange={onChangeFinish}
                      value={finish}
                    ></input>
                    <label>현재 재학중</label>
                  </div> */}
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
                      <div
                        className='bg-slate-50 shadow-inner min-h-[5rem] w-full mb-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
                        id="editor"
                      >


                        <Editor
                          editorRef={setDescription}
                          options={options}
                          // {data}는 초기새팅값
                          data={data} />
                        <a href="#" onClick={clearData}>
                          Clear data
                        </a>
                      </div>
                    </div>


                    <div className="mb-2 text-right">
                      {confirm &&
                        <AlertModal
                          title="학력정보 업데이트 완료"
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



EditEducation.propTypes = {
  education: PropTypes.object,
  setViewEdu: PropTypes.func,
};

export default EditEducation;