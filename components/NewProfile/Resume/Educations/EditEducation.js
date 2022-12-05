import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { modifyEducation } from 'firebaseConfig';
import { updateEducation, setUpdateDoneFalse } from 'slices/education';
import Modal from 'components/Common/Modal/Modal';
import toast from 'react-hot-toast';


const EditEducation = ({ education }) => {
  const dispatch = useDispatch();
  // 수정
  const notify = () => toast('학력정보 업데이트 완료!');
  const [onEdit, setOnEdit] = useState(false);
  const open = onEdit === true;
  const openModify = useCallback(() => {
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
      closeModify();
      dispatch(setUpdateDoneFalse());

    }
  }, [updateDone, dispatch, onEdit, closeModify])

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
  const onChangeDescription = useCallback((e) => {
    setDescription(e.currentTarget.value);
  }, [])

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
      id: education?.id,
    };
    const con = await modifyEducation(educationResult, education?.id);
    dispatch(updateEducation(educationResult));

  }, [finish, name, major, category, start, end, user?.userID, secondmajor, ismain, description, education?.id, dispatch])



  return (
    <>
      <button onClick={openModify} className="flex col-start-2 md:col-start-auto md:ml-0 items-center" >
        <svg xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 rounded-lg text-sky-500 hover:text-sky-600 font-bold bg-sky-100  py-1 px-1 text-sm"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>

      {/*       
        // <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        //   <div className="inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        //   <div className="fixed w-[100%] z-50 inset-0 overflow-y-auto">
        //     <div className="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
        //       <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
        //         <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"> */}
      <Modal
        open={openModify}
        onClose={closeModify}
        title="학력정보 수정"
        visible={onEdit}
        widths="800px"
        onCancel={closeModify}
        onSubmit={onSubmit}

      >
        <>

          <form
            className="w-full pt-2 pb-2 mb-1 rounded mt-[1.4rem]"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label className="block mb-1 text-md font-bold text-gray-700" htmlFor="school_name">
                학교명
              </label>
              <input
                className={nameError ?
                  'w-full px-3 py-4 mb-2 text-md border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  :
                  'w-full px-3 py-4 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                }
                id="school_name"
                type="text"
                maxLength={100}
                placeholder="(e.g. 한국대학교)"
                onChange={onChangeName}
                value={name}
              />
              {nameError ? (
                <p className="text-xs mb-[1.5rem] italic text-red-500">학교명을 입력해주세요.</p>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-md font-bold text-gray-700" htmlFor="major">
                전공
              </label>
              <input
                className={majorError ?
                  'w-full px-3 py-4 mb-2 text-md border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  :
                  'w-full px-3 py-4 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
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
                'w-full px-3 py-4 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                id="secondmajor"
                type="text"
                maxLength={100}
                placeholder="부전공(선택)"
                onChange={onChangeSecondMajor}
                value={secondmajor}
              />
              {majorError ? (
                <p className="text-xs mb-[1.5rem] italic text-red-500">전공명을 입력해주세요.</p>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-md font-bold text-gray-700" htmlFor="category">
                학위
              </label>
              <select
                className={categoryError ?
                  'w-full px-3 py-4 mb-2 text-md border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  :
                  'w-full px-3 py-4 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
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
                className="inline-block mb-0 leading-relaxed ml-[8px] text-md font-bold text-gray-700"
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
                className="inline-block mb-0 leading-relaxed ml-[8px] text-md font-bold text-gray-700"
                htmlFor="finish">
                현재 재직중
              </label>
            </div>

            <div className="mb-4">
              <div className="mb-4 md:mr-2 md:mb-0 w-[100%]">
                {finish ?
                  <label className="block mb-1 text-md font-bold text-gray-700" htmlFor="start">
                    기간
                  </label>
                  :
                  <label className="block mb-1 text-md font-bold text-gray-700" htmlFor="start">
                    입학일
                  </label>}
                <div className="flex">

                  <>
                    <select
                      className={startError ? "w-full px-3 py-4 mb-2 border-red-500 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        :
                        "w-full px-3 py-4 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      }
                      id="startyear"
                      placeholder="년"
                      onChange={onChangeStartYear}
                      value={start?.year}
                    >
                      {years()}
                    </select>
                    <select
                      className={startError ? "md:ml-2 w-full border-red-500 px-3 py-4 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        :
                        "md:ml-2 w-full px-3 py-4 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                        className={endError ? "w-full px-3 py-4 mb-2 border-red-500 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          :
                          "w-full px-3 py-4 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        }
                        id="endyear"
                        placeholder="년"
                        onChange={onChangeEndYear}
                        value={end?.year}
                      >
                        {years()}
                      </select>
                      <select
                        className={endError ? "md:ml-2 w-full border-red-500 px-3 py-4 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          :
                          "md:ml-2 w-full px-3 py-4 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
              <label className="block mb-1 text-md font-bold text-gray-700" htmlFor="description">
                학력관련 부가설명
              </label>
              <textarea
                id="description"
                tabIndex={-1}
                placeholder="부가적으로 설명할 내용을 작성해주세요."
                className="w-full px-3 py-4 mb-2 resize-none h-52 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                onChange={onChangeDescription}
                value={description}
              >
              </textarea>
            </div>


            <div className="mb-2 text-right">
              <div className="flex w-full justify-end">
                <button onClick={closeModify} type="button" className="mr-2 py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-600 text-[14px]">Cancel</button>
                <button type="submit" className=" px-8 min-w-[144px] text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg">업데이트</button>
              </div>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
};



EditEducation.propTypes = {
  education: PropTypes.object,
  setViewCar: PropTypes.func,
};

export default EditEducation;