import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AlertModal from 'components/Common/Modal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSmallIntern, addSmallInternFalse,
} from 'slices/board';
import { createSmallIntern } from 'firebaseConfig';

const index = ({ onInternClose, smallInternOpen, singleSection }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { addSmallInternDone } = useSelector(state => state.board);

  //채용여부
  const [hiring, setHiring] = useState(singleSection?.smallintern?.hiring);
  const onChangeHiring = useCallback((e) => {
    setHiring(e.target.checked);
  }, [])

  //채용일정
  const [period, setPeriod] = useState(singleSection?.smallintern?.period);
  const [periodError, setPeriodError] = useState(false);
  const onChangePeriod = useCallback((e) => {
    setPeriod(e.target.value);
    setPeriodError(false);
  }, [])



  //채용인원 수
  const [count, setCount] = useState(singleSection?.smallintern?.count);
  const [countError, setCountError] = useState(false);
  const onChangeCount = useCallback((e) => {
    setCount(e.target.value);
    setCountError(false);
  }, [])

  // 근무형태
  const [employtype, setEmploytype] = useState(singleSection?.smallintern?.employtype);
  const [employtypeError, setEmploytypeError] = useState(false);
  const onChangeEmploytype = useCallback((e) => {
    setEmploytype(e.target.value);
    setEmploytypeError(false);
  }, [])

  //상세정보 안내
  const [description, setDescription] = useState(singleSection?.smallintern?.description);
  const [descriptionError, setDescriptionError] = useState(false);
  const onChangeDescription = useCallback((e) => {
    setDescription(e.currentTarget.value);
    setDescriptionError(false);
  }, [])

  //수행과제 안내
  const [assignment, setAssignment] = useState(singleSection?.smallintern?.assignment);
  const onChangeAssignment = useCallback((e) => {
    setAssignment(e.currentTarget.value);
  }, [])

  //과제제출 기한
  const [limit, setLimit] = useState(singleSection?.smallintern?.limit);
  const onChangeLimit = useCallback((e) => {
    setLimit(e.target.value);
  }, [])

  //과제제출 기한
  const [sendway, setSendway] = useState(singleSection?.smallintern?.sendway);
  const onChangeSendway = useCallback((e) => {
    setSendway(e.target.value);
  }, [])

  //혜택
  const [merit, setMerit] = useState(singleSection?.smallintern?.merit);
  const [meritError, setMeritError] = useState(false);
  const onChangeMerit = useCallback((e) => {
    setMerit(e.currentTarget.value);
    setMeritError(false);
  }, [])

  // 제출
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!period) {
      document.getElementById('period').focus();
      return setPeriodError(true);
    }
    if (!count) {
      document.getElementById('count').focus();
      return setCountError(true);
    }
    if (!employtype) {
      document.getElementById('employtype').focus();
      return setEmploytypeError(true);
    }
    if (!description) {
      document.getElementById('description').focus();
      return setDescriptionError(true);
    }
    if (!merit) {
      document.getElementById('merit').focus();
      return setMeritError(true);
    }

    const internResult = {
      userId: user?.userID,
      username: user?.username,
      period: period,
      count: count,
      employtype: employtype,
      description: description,
      assignment: assignment,
      limit: limit,
      sendway: sendway,
      merit: merit,
      hiring: hiring,
    };
    const con = await createSmallIntern(internResult, singleSection?.id);

    dispatch(addSmallIntern(con));
  }, [assignment,hiring, count, description, dispatch, employtype, limit, merit, period, sendway, singleSection?.id, user?.userID, user?.username])

  const [confirm, setConfirm] = useState(false);
  const ConfirmModalOpen = useCallback(() => {
    setConfirm(true);
    dispatch(addSmallInternFalse());
  }, [dispatch])

  const ConfirmModalClose = () => {
    onInternClose();
    setConfirm(false);
  }

  useEffect(() => {
    if (addSmallInternDone === true) {
      ConfirmModalOpen();
      setPeriodError(false);
      setCountError(false);
      setEmploytypeError(false);
      setDescriptionError(false);
      setMeritError(false);
      dispatch(addSmallInternFalse());
    }
  }, [ConfirmModalOpen, addSmallInternDone, dispatch])

  return (
    <>
      {smallInternOpen ?
        <div className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed w-[100%] z-50 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
              <div className="border-solid border-t-8 border-violet-400 relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                  <div className="relative bg-white rounded border">
                    <div className="w-full flex justify-between text-violet-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                      </svg>
                      <button onClick={onInternClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <h2 className="text-violet-600 text-xl font-bold tracking-normal leading-tight mb-4">
                      Small Intern
                    </h2>
                    <div className="mb-6">
                      <h3 className="text-base leading-6 font-medium  text-gray-500 dark:text-white">
                        채용이 시작되었음을 알리는 내용입니다.
                      </h3>
                    </div>

                    <div className="my-4">
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          name="toggle"
                          id="hiring"
                          className="checked:bg-purple-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          onChange={onChangeHiring}
                          checked={hiring}
                        />
                        <label htmlFor="hiring" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                        </label>
                      </div>
                      <span className="text-gray-600 font-medium">
                        채용 진행(체크시에만 내용이 공개됩니다.)
                      </span>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="period">
                        채용일정
                      </label>
                      <input
                        className={periodError ?
                          'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                          :
                          'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        }
                        id="period"
                        type="text"
                        maxLength={100}
                        placeholder="ex. 12월 31일 24시까지"
                        onChange={onChangePeriod}
                        value={period}
                        disabled={!hiring}
                      />
                      {periodError ? (
                        <p className="text-xs mb-[1.5rem] italic text-red-500">채용기간을 입력해주세요.</p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="count">
                        채용인원 수
                      </label>
                      <input
                        className={countError ?
                          'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                          :
                          'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        }
                        id="count"
                        type="text"
                        maxLength={100}
                        placeholder="ex. 5명 내외"
                        onChange={onChangeCount}
                        value={count}
                        disabled={!hiring}
                      />
                      {countError ? (
                        <p className="text-xs mb-[1.5rem] italic text-red-500">인원수를 입력해주세요.</p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="employtype">
                        근무형태
                      </label>
                      <select
                        className={employtypeError ?
                          'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                          :
                          'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        }
                        id="employtype"
                        name="employtype"
                        onChange={onChangeEmploytype}
                        value={employtype}
                        disabled={!hiring}
                      >
                        <option value="">선택</option>
                        <option value={1}>정규직</option>
                        <option value={2}>계약직</option>
                        {/* <option value={3}>자영업/개인사업</option> */}
                        {/* <option value={4}>프리랜서</option> */}
                        <option value={5}>인턴/수습</option>
                        <option value={6}>아르바이트</option>
                        <option value={99}>기타</option>
                      </select>
                      {employtypeError ? (
                        <p className="text-xs mb-[1.5rem] italic text-red-500">근무형태를 선택해주세요.</p>
                      ) : null}
                    </div>


                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="description">
                        상세정보 안내
                      </label>
                      <div>
                        <textarea
                          id="description"
                          tabIndex={-1}
                          placeholder="채용관련 상세사항을 입력해주세요."
                          className="w-full px-3 py-2 mb-2 resize-none h-52 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          onChange={onChangeDescription}
                          value={description}
                          disabled={!hiring}
                        >
                        </textarea>
                        {descriptionError ? (
                          <p className="text-xs mb-[1.5rem] italic text-red-500">조금이라도 정보를 주세요.</p>
                        ) : null}
                      </div>
                    </div>


                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="merit">
                        Smaill Intern 선정시 혜택에 대해서 안내해주세요.
                      </label>
                      <div>
                        <textarea
                          id="merit"
                          tabIndex={-1}
                          placeholder="ex. 서류통과, 바로 입사제의 등"
                          className="w-full px-3 py-2 mb-2 resize-none h-52 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          onChange={onChangeMerit}
                          value={merit}
                          disabled={!hiring}
                        >
                        </textarea>
                        {meritError ? (
                          <p className="text-xs mb-[1.5rem] italic text-red-500">혜택을 제시해주세요.</p>
                        ) : null}
                      </div>
                    </div>

                    {/* 구분선 */}
                    <div className="bg-slate-100 my-10 h-1 w-[50%] mx-auto text-center rounded-full" />

                    <label className="block my-3 text-base font-bold text-violet-500" htmlFor="assignment">
                      과제관련(선택사항)
                    </label>

                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-semibold text-gray-500" htmlFor="assignment">
                        수행해야하는 과제를 입력해주세요
                      </label>
                      <div>
                        <textarea
                          id="assignment"
                          tabIndex={-1}
                          placeholder="수행과제를 작성해주세요."
                          className="w-full px-3 py-2 mb-2 resize-none h-52 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          onChange={onChangeAssignment}
                          value={assignment}
                          disabled={!hiring}
                        >
                        </textarea>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-semibold text-gray-500" htmlFor="limit">
                        과제제출기한
                      </label>
                      <input
                        className=
                        'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        id="limit"
                        type="text"
                        maxLength={100}
                        placeholder="12월 10일 18시까지 제출"
                        onChange={onChangeLimit}
                        value={limit}
                        disabled={!hiring}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-semibold text-gray-500" htmlFor="sendway">
                        과제제출 방법
                      </label>
                      <input
                        className=
                        'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        id="sendway"
                        type="text"
                        maxLength={100}
                        placeholder="회사명"
                        onChange={onChangeSendway}
                        value={sendway}
                        disabled={!hiring}
                      />
                    </div>

                    
                  

                    <p className="text-sm text-gray-600 mt-4 mb-4">해당 기간내에 채용이 이루어집니다.<br />
                      과제제출기한 후 선정된 인원에게는 별도의 메시지를 발송합니다.</p>

                    <div className="w-full flex justify-end mt-4">
                      <button
                        className='bg-blue-500 text-lg text-white hover:bg-blue-600 active:bg-violet-600 font-bold uppercase px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        onClick={onSubmit}>저장
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        : null}

      <AlertModal
        title="등록완료"
        contents="SMALL INTERN 상태가 완료되었습니다."
        contents_second="SMALL INTERN 진행을 통해 인재를 채용할 수 있습니다."
        closeOutsideClick={true}
        openModal={confirm}
        closeModal={ConfirmModalClose}
        twobutton={false}
      />
    </>
  );
};

index.propTypes = {
  smallInternOpen: PropTypes.bool,
  onInternClose: PropTypes.func,
  singleSection: PropTypes.object,
};

export default index;