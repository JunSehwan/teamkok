import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AlertModal from 'components/Common/Modal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import { createOffer } from 'firebaseConfig';
import { addJoboffer } from 'slices/joboffer';

const JobOfferModal = ({
  onOpenOfferModal,
  onCloseOfferModal,
  openOfferModal,
  target
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { singleBoard, singleSection, selectedCategory } = useSelector(state => state.board);

  // 직급
  const [position, setPosition] = useState();
  const [positionError, setPositionError] = useState(false);
  const onChangePosition = useCallback((e) => {
    setPosition(e.target.value);
    setPositionError(false);
  }, [])

  // 입사예정일
  const [workday, setWorkday] = useState();
  const [workdayError, setWorkdayError] = useState(false);
  const onChangeWorkday = useCallback((e) => {
    setWorkday(e.target.value);
    setWorkdayError(false);
  }, [])

  // 월평균급여
  const [income, setIncome] = useState();
  const [incomeError, setIncomeError] = useState(false);
  const onChangeIncome = useCallback((e) => {
    setIncome(e.target.value);
    setIncomeError(false);
  }, [])

  // 근무장소
  const [space, setSpace] = useState();
  const [spaceError, setSpaceError] = useState(false);
  const onChangeSpace = useCallback((e) => {
    setSpace(e.target.value);
    setSpaceError(false);
  }, [])

  // 주요업무
  const [duty, setDuty] = useState();
  const [dutyError, setDutyError] = useState(false);
  const onChangeDuty = useCallback((e) => {
    setDuty(e.currentTarget.value);
    setDutyError(false);
  }, [])

  const [description, setDescription] = useState();
  const onChangeDescription = useCallback((e) => {
    setDescription(e.currentTarget.value);
  }, [])

  //점수사유 안내
  // 작성자 id, name, avatar / boardid, sectionID / user정보에 넣고 보드정보에 넣기
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const result = {
      userId: user?.userID,
      username: user?.username,
      avatar: user?.avatar,
      position: position,
      workday: workday,
      income: income,
      space: space,
      duty: duty,
      description: description,
      sectionId: singleSection?.id,
      sectionName: selectedCategory?.name,
      boardId: singleBoard?.id,
      boardName: singleBoard?.name,
      targetId: target?.userID,
      targetName: target?.username,
      targetAvatar: target?.avatar,
    };
    const con = await createOffer(result);
    if (con) {
      dispatch(addJoboffer(con));
      ConfirmModalClose();
      onClickEndModalOpen();
    }
  }, [singleBoard?.id, singleBoard?.name, selectedCategory?.name, position, workday, income, space, duty, user?.userID, user?.username, user?.avatar, description, target?.userID, target?.username, target?.avatar, singleSection?.id, dispatch, onClickEndModalOpen,ConfirmModalClose])

  const [confirm, setConfirm] = useState(false);
  const ConfirmModalOpen = useCallback(() => {

    if (!position) {
      document.getElementById('position').focus();
      return setPositionError(true);
    }
    if (!workday) {
      document.getElementById('workday').focus();
      return setWorkdayError(true);
    }
    if (!income) {
      document.getElementById('income').focus();
      return setIncomeError(true);
    }
    if (!space) {
      document.getElementById('space').focus();
      return setSpaceError(true);
    }
    if (!duty) {
      document.getElementById('duty').focus();
      return setDutyError(true);
    }
    setConfirm(true);
  }, [duty, income, position, space, workday])

  const ConfirmModalClose = useCallback(() => {
    setConfirm(false);
  }, [])

  // 확인종료모달
  const [endModal, setEndModal] = useState(false);
  const onClickEndModalOpen = useCallback(() => {
    setEndModal(true);
  }, [])

  const onClickEndModalClose = useCallback(() => {
    setEndModal(false);
    onCloseOfferModal();
  }, [onCloseOfferModal])

  return (
    <>

      <div className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"></div>
        <div className="fixed w-[100%] z-50 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
            <div className="border-solid border-t-8 border-violet-400 relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                <div className="relative bg-white rounded border">
                  <div className="w-full flex justify-between text-violet-600 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                    <button onClick={onCloseOfferModal}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <h2 className="text-violet-600 text-xl font-bold tracking-normal leading-tight mb-4">
                    {target?.username}에게 입사제안하기
                  </h2>
                  <div className="mb-6">
                    <h3 className="text-base leading-6 font-medium  text-gray-500 dark:text-white">
                      입사 이전에 안내받은 처우가 다르다고 느껴서 퇴사하는 케이스가 많습니다. <br />
                      상세하게 처우를 기재하셔서 원하는 인재에게 제안해보세요.
                    </h3>
                  </div>

                  <div className="mb-1">
                    <input
                      className={positionError ?
                        'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        :
                        'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      }
                      id="position"
                      type="text"
                      maxLength={100}
                      placeholder="직급(ex. 대리 1년차)"
                      onChange={onChangePosition}
                      value={position || ""}
                    />
                    {positionError ? (
                      <p className="text-xs mb-[1.5rem] italic text-red-500">입사할 경우 해당 인재의 직급을 작성해주세요.</p>
                    ) : null}
                  </div>

                  <div className="mb-1">
                    <input
                      className={workdayError ?
                        'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        :
                        'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      }
                      id="workday"
                      type="text"
                      placeholder="입사예정일(ex. 10월 1일)"
                      onChange={onChangeWorkday}
                      value={workday || ""}
                    />
                    {workdayError ? (
                      <p className="text-xs mb-[1.5rem] italic text-red-500">입사예정일을 작성해주세요.</p>
                    ) : null}
                  </div>

                  <div className="mb-1">
                    <input
                      className={incomeError ?
                        'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        :
                        'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      }
                      id="income"
                      type="text"
                      placeholder="월평균급여(초봉)"
                      onChange={onChangeIncome}
                      value={income || ""}
                    />
                    {incomeError ? (
                      <p className="text-xs mb-[1.5rem] italic text-red-500">월평균 급여를 작성해주세요.</p>
                    ) : null}
                  </div>

                  <div className="mb-1">
                    <input
                      className={spaceError ?
                        'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        :
                        'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      }
                      id="space"
                      type="text"
                      placeholder="근무장소"
                      onChange={onChangeSpace}
                      value={space || ""}
                    />
                    {spaceError ? (
                      <p className="text-xs mb-[1.5rem] italic text-red-500">근무장소를 작성해주세요.</p>
                    ) : null}
                  </div>

                  <div className="mb-1">
                    <div>
                      <textarea
                        id="duty"
                        placeholder="주요업무"
                        className="w-full px-3 py-2 mb-2 resize-none h-32 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        onChange={onChangeDuty}
                        value={duty || ""}
                      >
                      </textarea>
                      {dutyError ? (
                        <p className="text-xs mb-[1.5rem] italic text-red-500">사유를 입력하세요.</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-1">
                    <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="description">
                      부가설명
                    </label>
                    <div>
                      <textarea
                        id="description"
                        placeholder="추가로 기재하실 정보를 입력해주세요."
                        className="w-full px-3 py-2 mb-2 resize-none h-52 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        onChange={onChangeDescription}
                        value={description || ""}
                      >
                      </textarea>
                    </div>
                  </div>


                  <div className="w-full flex justify-end mt-4">
                    <button
                      className='bg-blue-500 text-lg text-white hover:bg-blue-600 active:bg-violet-600 font-bold uppercase px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      onClick={ConfirmModalOpen}>입사제안
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertModal
        title="입사제안을 하시겠습니까?"
        contents="제안시 상대방이 확인할 수 있습니다."
        // contents_second="관리자만 포인트 내역을 확인할 수 있습니다."
        closeOutsideClick={true}
        openModal={confirm}
        cancelFunc={ConfirmModalClose}
        closeModal={onSubmit}
        twobutton={true}
      />
      <AlertModal
        title="입사제안 내용이 전달되었습니다."
        contents="입사제안 관리는 상단 메뉴바(🔖북마크)에서 할 수 있습니다."
        // contents_second="관리자만 포인트 내역을 확인할 수 있습니다."
        closeOutsideClick={true}
        openModal={endModal}
        closeModal={onClickEndModalClose}
        twobutton={false}
      />
    </>
  );
};

JobOfferModal.propTypes = {
  onOpenOfferModal: PropTypes.func,
  onCloseOfferModal: PropTypes.func,
  openOfferModal: PropTypes.bool,
  target: PropTypes.object,
};

export default JobOfferModal;