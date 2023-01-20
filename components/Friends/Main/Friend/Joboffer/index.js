import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/Common/Modal/Modal';
import { createOffer, sendMailForJobOffer } from 'firebaseConfig';
import { addJoboffer } from 'slices/joboffer';
import AlertModal from 'components/Common/Modal/AlertModal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
const index = ({ jobofferOn, openJoboffer, closeJoboffer, friendname, friend, detail }) => {

  const dispatch = useDispatch();
  // 수정

  const { user } = useSelector(state => state.user);
  const { addJobofferDone } = useSelector(state => state.joboffer);

  useEffect(() => {
    if (addJobofferDone || !jobofferOn) {
      setSectionError(false);
      setSalaryError(false);
      setTypeError(false);
      setJobError(false);
      setSpaceError(false);
      setDuedateError(false);
      setEnddateError(false);
      closeConfirmModal();
      closeJoboffer();
      setJob("");
      setDescription("");
      setType("");
      setSpace("");
      setSection(user?.mysection);
      setSalary("");
      setDuedate({
        year: standardYear,
        month: 1,
      });



    }
  }, [dispatch, closeJoboffer, closeConfirmModal, jobofferOn, user?.mysection, addJobofferDone])


  //주요업무
  const [job, setJob] = useState();
  const [jobError, setJobError] = useState(false);
  const onChangeJob = useCallback((e) => {
    setJob(e.target.value);
    setJobError(false);
  }, [])

  //근무장소
  const [space, setSpace] = useState();
  const [spaceError, setSpaceError] = useState(false);
  const onChangeSpace = useCallback((e) => {
    setSpace(e.target.value);
    setSpaceError(false);
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

  const now = new Date();
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

  const [enddate, setEnddate] = useState(new Date());
  const [enddateError, setEnddateError] = useState(false);
  const dateToString = (date) => {
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
  }




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
    if (!space || space == 0) {
      document.getElementById('space').focus();
      return setSpaceError(true);
    }
    if (!enddate || enddate?.length == 0) {
      document.getElementById('enddate').focus();
      return setEnddateError(true);
    }

    const final = dayjs(enddate).format('YYYY-MM-DDTHH:mm:ss.sssZ');
    const finalEnddate = new Date(final);


    await createOffer(
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
        space: space,
        enddate: final,
        mycompany: user?.mycompany,
        mysection: user?.mysection,
        companylogo: user?.companylogo,
      }
    ).then(async (result) => {
      if (result) {
        await sendMailForJobOffer(
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
      dispatch(addJoboffer({
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
        space: space,
        enddate: final,
        mycompany: user?.mycompany,
        mysection: user?.mysection,
        companylogo: user?.companylogo,
      }));
    } else {
      dispatch(addJoboffer({
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
        enddate: final,
        company: user?.mycompany,
        section: section,
        space: space,
        mycompany: user?.mycompany,
        mysection: user?.mysection,
        companylogo: user?.companylogo,
      }));
    }


  }, [user?.userID, user?.username, user?.avatar, user?.mycompany, user?.mysection, user?.companylogo, duedate, section, job, salary, type, space, enddate, friend?.userID, friend?.username, friend?.avatar, friend?.email, description, detail, dispatch])

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
    if (!space || space == 0) {
      document.getElementById('space').focus();
      return setSpaceError(true);
    }
    if (!enddate || enddate?.length == 0) {
      document.getElementById('enddate').focus();
      return setEnddateError(true);
    }

    setConfirmModalOpened(true);
  }, [duedate?.month?.length, duedate?.year?.length, enddate, job, salary, section, space, type, user?.userID])

  const closeConfirmModal = useCallback(() => {
    setConfirmModalOpened(false);
  }, [])

  return (

    <>
      <Modal
        open={openJoboffer}
        onClose={closeJoboffer}
        title={`👨‍👦‍👦입사 제안하기`}
        visible={jobofferOn}
        widths="800px"
        onCancel={closeJoboffer}
        onSubmit={onSubmit}

      >
        <div className='p-3'>
          <h3 className='sm:text-[2.1rem] text-[1.8rem] text-gray-700 my-4 w-full'>
            {user?.mycompany}에서 {friend?.username}에게 입사제안하기</h3>
          <p className='ml-2 my-1 text-gray-700 text-[1.2rem] leading-6'>
            입사 이전에 안내받은 처우가 다르다고 느껴서 퇴사하는 케이스가 많습니다. <br />
            상세하게 처우를 기재하셔서 원하는 인재에게 제안해보세요.
          </p>
          <p className='text-gray-500 text-md mt-2'>🤐 해당 콕!은 당사자만이 확인할 수 있습니다.</p>

          <div
            className="w-full pt-2 pb-2 mb-1 rounded mt-[1.4rem]"
          >

            <div className="py-4">
              <div className="mb-4 md:mr-2 md:mb-0 w-[100%]">
                <label className="block mb-1 text-md font-bold text-gray-700" htmlFor="duedate">
                  입사 예정일
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
                연봉수준 (단위: 만원, 숫자만 입력)
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
              <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="space">
                근무장소
              </label>
              <input
                className={spaceError ?
                  "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  :
                  "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                id="space"
                type="address"
                placeholder='(e.g. 서울특별시 광진구)'
                maxLength={1000}
                onChange={onChangeSpace}
                value={space}
              />
              {spaceError ? (
                <p className="text-xs mt-[0.3rem] italic text-red-500">간단하게 작성해주세요!</p>
              ) : null}
            </div>

            <div className="py-4">
              <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="description">
                추가로 덧붙일 말이 있으신가요?
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
            <div className="py-4">
              <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="enddate">
                응답기한을 언제까지로 설정할까요?
              </label>

              <DatePicker
                className={duedateError ?
                  "block w-full cursor-pointer p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  :
                  "block w-full cursor-pointer p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                id="enddate" selected={enddate}
                onChange={setEnddate}
                showTimeSelect
                dateFormat="Pp"
              />
              {enddateError ? (
                <p className="text-xs mt-[0.3rem] italic text-red-500">언제까지 응답을 받으실건가요?</p>
              ) : null}
            </div>


            <div className="mb-2 text-right">
              <div className="flex w-full justify-end">
                <button onClick={closeJoboffer} type="button" className="mr-2 py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-600 text-[14px]">Cancel</button>
                <button type="button" onClick={onSubmit} className=" px-8 min-w-[144px] text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg">제안하기</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <AlertModal
        openModal={confirmModalOpened}
        twobutton={true}
        title="입사를 제안하시겠습니까?"
        contents="입사제안 결과를 되돌릴 수는 없습니다. 내용이 정확한지 확인해보세요!"
        closeModal={onSubmit}
        cancelFunc={closeConfirmModal}
      />
    </>
  );
};


index.propTypes = {
  jobofferOn: PropTypes.bool,
  openJoboffer: PropTypes.func,
  closeJoboffer: PropTypes.func,
  friendname: PropTypes.string,
  friend: PropTypes.object,
};


export default index;