import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/Common/Modal/Modal';
import { createCoccoc, sendMailForCoccoc } from 'firebaseConfig';
import { addCoccoc } from 'slices/coccoc';
import AlertModal from 'components/Common/Modal/AlertModal';

const index = ({ coccocOn, openCoccoc, closeCoccoc, friendname, friend, detail }) => {

  const dispatch = useDispatch();
  // 수정

  const { user } = useSelector(state => state.user);
  const { addCoccocDone } = useSelector(state => state.coccoc);

  useEffect(() => {
    if (addCoccocDone || !coccocOn) {
      setSectionError(false);
      setSalaryError(false);
      setTypeError(false);
      setJobError(false);
      setDuedateError(false);
      closeConfirmModal();
      closeCoccoc();
      setJob("");
      setDescription("");
      setType("");
      setSection(user?.mysection);
      setSalary("");
      setDuedate({
        year: standardYear,
        month: 1,
      });
    }
  }, [addCoccocDone, dispatch, closeCoccoc, closeConfirmModal, coccocOn, user?.mysection])


  //주요업무
  const [job, setJob] = useState();
  const [jobError, setJobError] = useState(false);
  const onChangeJob = useCallback((e) => {
    setJob(e.target.value);
    setJobError(false);
  }, [])

  // 직무, 주요업무
  const [description, setDescription] = useState();
  const onChangeDescription = useCallback((e) => {
    setDescription(e.currentTarget.value);
  }, [])

  // 유형
  const [type, setType] = useState("");
  const [typeError, setTypeError] = useState(false);
  const onChangeType = useCallback((e) => {
    setType(e.target.value);
    setTypeError(false);
  }, [])

  // 근무부서
  const [section, setSection] = useState(user?.mysection);
  const [sectionError, setSectionError] = useState(false);
  const onChangeSection = useCallback((e) => {
    setSection(e.target.value);
    setSectionError(false);
  }, [])

  // 연봉수준
  const [salary, setSalary] = useState();
  const [salaryError, setSalaryError] = useState(false);
  const onChangeSalary = useCallback((e) => {
    setSalary(e.target.value);
    setSalaryError(false);
  }, [])

  // 시작일, 종료일
  const standardYear = 2023;
  const [duedate, setDuedate] = useState({
    year: standardYear,
    month: 1,
  });
  const [duedateError, setDuedateError] = useState(false);
  const onChangeDuedateYear = useCallback(
    e => {
      setDuedate({ ...duedate, year: parseInt(e.target.value) })
      setDuedateError(false)
    },
    [duedate]
  );
  const onChangeDuedateMonth = useCallback(
    e => {
      setDuedate({ ...duedate, month: parseInt(e.target.value) })
      setDuedateError(false)
    },
    [duedate]
  );


  const years = () => {
    const allYears = [];
    const thisYear = new Date().getFullYear() + 10;
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

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }
    if (duedate?.year?.length === 0 || duedate?.month?.length === 0) {
      document.getElementById('duedate').focus();
      return setDuedateError(true);
    }
    if (!section || section == 0) {
      document.getElementById('section').focus();
      return setSectionError(true);
    }
    if (!job || job?.length === 0) {
      document.getElementById('job').focus();
      return setJobError(true);
    }
    if (!salary || salary == 0) {
      document.getElementById('salary').focus();
      return setSalaryError(true);
    }
    if (!type || type == 0) {
      document.getElementById('type').focus();
      return setTypeError(true);
    }



    await createCoccoc(
      {
        targetId: friend?.userID,
        targetName: friend?.username,
        targetAvatar: friend?.avatar,
        userId: user?.userID,
        username: user?.username,
        userAvatar: user?.avatar,
        description: description,
        job: job,
        salary: parseInt(salary),
        type: type,
        duedate: duedate,
        company: user?.mycompany,
        section: section,
        mycompany: user?.mycompany,
        mysection: user?.mysection,
        companylogo: user?.companylogo,
      }
    ).then(async (result) => {
      if (result) {
        await sendMailForCoccoc(
          {
            targetEmail: friend?.email,
            targetName: friend?.username,
            mycompany: user?.mycompany,
            username: user?.username,
            section: section,
          }
        )
      }
    })
    if (detail === true) {
      dispatch(addCoccoc({
        targetId: friend?.userID,
        targetName: friend?.username,
        targetAvatar: friend?.avatar,
        userId: user?.userID,
        username: user?.username,
        userAvatar: user?.avatar,
        description: description,
        job: job,
        salary: parseInt(salary),
        type: type,
        duedate: duedate,
        company: user?.mycompany,
        section: section,
        mycompany: user?.mycompany,
        mysection: user?.mysection,
        companylogo: user?.companylogo,
      }));
    } else {
      dispatch(addCoccoc({
        targetId: friend?.userID,
        targetName: friend?.username,
        targetAvatar: friend?.avatar,
        userId: user?.userID,
        username: user?.username,
        userAvatar: user?.avatar,
        description: description,
        job: job,
        salary: parseInt(salary),
        type: type,
        duedate: duedate,
        company: user?.mycompany,
        section: section,
        mycompany: user?.mycompany,
        mysection: user?.mysection,
        companylogo: user?.companylogo,
      }));

    }

  }, [user?.userID, user?.username, user?.avatar, user?.mycompany, user?.mysection, user?.companylogo, duedate, section, job, salary, type, friend?.userID, friend?.username, friend?.avatar, friend?.email, description, detail, dispatch])

  // autoFocus 관련
  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const openConfirmModal = useCallback(() => {
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }
    if (duedate?.year?.length === 0 || duedate?.month?.length === 0) {
      document.getElementById('duedate').focus();
      return setDuedateError(true);
    }
    if (!section || section == 0) {
      document.getElementById('section').focus();
      return setSectionError(true);
    }
    if (!job || job?.length === 0) {
      document.getElementById('job').focus();
      return setJobError(true);
    }
    if (!salary || salary == 0) {
      document.getElementById('salary').focus();
      return setSalaryError(true);
    }
    if (!type || type == 0) {
      document.getElementById('type').focus();
      return setTypeError(true);
    }
    setConfirmModalOpened(true);
  }, [duedate?.month?.length, duedate?.year?.length, job, salary, section, type, user?.userID])
  const closeConfirmModal = useCallback(() => {
    setConfirmModalOpened(false);
  }, [])

  return (

    <>
      <Modal
        open={openCoccoc}
        onClose={closeCoccoc}
        title={`👆콕! 찍어두기`}
        visible={coccocOn}
        widths="800px"
        onCancel={closeCoccoc}
        onSubmit={onSubmit}

      >
        <div className='p-3'>

          <h3 className='sm:text-[2.1rem] text-[1.8rem] text-gray-700 my-4 w-full'>
            {user?.mycompany}에서 {friendname} 님을 콕!</h3>
          <p className='ml-2 my-1 text-gray-700 text-[1.2rem] leading-6'>
            현재 채용중이지는 않더라도 향후 T.O 발생시 영입할 의사가 있다면, ‘콕’ 해보세요!
          </p>
          <p className='text-gray-500 text-md mt-2'>🤐 해당 콕!은 당사자만이 확인할 수 있습니다.</p>

          <div
            className="w-full pt-2 pb-2 mb-1 rounded mt-[1.4rem]"
          >

            <div className="py-4">
              <div className="mb-4 md:mr-2 md:mb-0 w-[100%]">
                <label className="block mb-1 text-md font-bold text-gray-700" htmlFor="duedate">
                  입사제안 예정일
                </label>
                <div className="flex flex-row gap-2">
                  <>
                    <select
                      className={duedateError ?
                        "block w-full cursor-pointer p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        :
                        "block w-full cursor-pointer p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      id="duedateyear"
                      placeholder="년"
                      onChange={onChangeDuedateYear}
                      value={duedate?.year}
                    >
                      {years()}
                    </select>
                    <select
                      className={duedateError ?
                        "block w-full cursor-pointer p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        :
                        "block w-full cursor-pointer p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      id="duedatemonth"
                      placeholder="월"
                      onChange={onChangeDuedateMonth}
                      value={duedate?.month}
                    >
                      {months()}
                    </select>
                  </>
                </div>
              </div>
              {duedateError ? (
                <p className="text-xs mt-[0.3rem] italic text-red-500">대략적인 예정일을 선택해주세요.</p>
              ) : null}
            </div>

            <div className="py-4">
              <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="section">
                근무부서
              </label>
              <input
                className={sectionError ?
                  "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  :
                  "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                id="section"
                type="text"
                placeholder='근무하게 될 부서'
                maxLength={1000}
                onChange={onChangeSection}
                value={section}
              />
              {sectionError ? (
                <p className="text-xs mt-[0.3rem] italic text-red-500">근무부서를 작성해주세요!</p>
              ) : null}
            </div>

            <div className="py-4">
              <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="job">
                주요업무
              </label>
              <input
                className={jobError ?
                  "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  :
                  "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

            <div className="py-4">
              <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="salary">
                대략의 연봉수준 (단위: 만원, 숫자만 입력)
              </label>
              <input
                className={salaryError ?
                  "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  :
                  "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                id="salary"
                type="number"
                placeholder='(e.g. 3500)'
                onChange={onChangeSalary}
                value={salary}
              />
              {salaryError ? (
                <p className="text-xs mt-[0.3rem] italic text-red-500">대략적인 연봉이라도 작성해주세요!</p>
              ) : null}
            </div>

            <div className="py-4">
              <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="type">
                근무형태
              </label>

              <select
                className={typeError ?
                  "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  :
                  "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

            <div className="py-4">
              <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="description">
                준비기간동안 권장하는 학습내용이 있으신가요?
              </label>
              <textarea
                id="description"
                placeholder="추가하고 싶은 말이 있으시다면 작성해주세요."
                className="w-full px-3 py-4 mb-2 resize-none h-52 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                onChange={onChangeDescription}
                value={description}
              >
              </textarea>
            </div>
            <div className="mb-2 text-right">
              <div className="flex w-full justify-end">
                <button onClick={closeCoccoc} type="button" className="mr-2 py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-600 text-[14px]">Cancel</button>
                <button type="button" onClick={onSubmit} className=" px-8 min-w-[144px] text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg">콕!찍기</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <AlertModal
        openModal={confirmModalOpened}
        twobutton={true}
        title="콕! 하시겠습니까?"
        contents="콕!한 결과를 되돌릴 수는 없습니다. 내용이 정확한지 확인해보세요!"
        closeModal={onSubmit}
        cancelFunc={closeConfirmModal}
      />
    </>
  );
};


index.propTypes = {
  coccocOn: PropTypes.bool,
  openCoccoc: PropTypes.func,
  closeCoccoc: PropTypes.func,
  friendname: PropTypes.string,
  friend: PropTypes.object,
};


export default index;