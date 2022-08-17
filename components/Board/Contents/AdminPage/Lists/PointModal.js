import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AlertModal from 'components/Common/Modal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import { givePoint } from 'firebaseConfig';
import { pointGive, addPointFalse } from 'slices/user';

const PointModal = ({
  onOpenPointModal,
  onClosePointModal,
  openModal,
  target
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { singleBoard, singleSection } = useSelector(state => state.board);
  //포인트 점수
  const [point, setPoint] = useState();
  const [pointError, setPointError] = useState(false);
  const onChangePoint = useCallback((e) => {
    setPoint(e.target.value);
    setPointError(false);
  }, [])

  const [description, setDescription] = useState();
  const [descriptionError, setDescriptionError] = useState(false);
  const onChangeDescription = useCallback((e) => {
    setDescription(e.currentTarget.value);
    setDescriptionError(false);
  }, [])

  //점수사유 안내
  // 작성자 id, name, avatar / boardid, sectionID / user정보에 넣고 보드정보에 넣기
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!point) {
      document.getElementById('point').focus();
      return setPointError(true);
    }

    if (!description) {
      document.getElementById('description').focus();
      return setDescriptionError(true);
    }


    const con = await givePoint(
      user?.userID, user?.username, user?.avatar, parseInt(point),
      description, singleSection?.id, target?.userID, target?.username, target?.avatar,
      singleBoard?.name);

    const result = {
      userId: user?.userID,
      username: user?.username,
      avatar: user?.avatar,
      point: point,
      description: description,
      sectionId: singleSection?.id,
      targetId: target?.userID,
      targetName: target?.username,
      targetAvatar: target?.avatar,
      boardName: singleBoard?.name,
      createdAt: con?.createdAt,
    };
    if (con) {
      dispatch(pointGive(result));
      ConfirmModalOpen();
    }
  }, [point, description, user?.userID, user?.username, user?.avatar, singleSection?.id, target?.userID, target?.username, target?.avatar, singleBoard?.name, dispatch, ConfirmModalOpen])

  const [confirm, setConfirm] = useState(false);
  const ConfirmModalOpen = useCallback(() => {
    setConfirm(true);
    dispatch(addPointFalse());
  }, [dispatch])

  const ConfirmModalClose = useCallback(() => {
    onClosePointModal();
    setConfirm(false);
  }, [onClosePointModal])


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
                    <button onClick={onClosePointModal}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <h2 className="text-violet-600 text-xl font-bold tracking-normal leading-tight mb-4">
                    포인트 부여
                  </h2>
                  <div className="mb-6">
                    <h3 className="text-base leading-6 font-medium  text-gray-500 dark:text-white">
                      팀에 영입하기 위해 예비 팀원에게 포인트를 부여하세요.
                    </h3>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-bold text-gray-700"
                      htmlFor="point">
                      부여점수
                    </label>
                    <input
                      className={pointError ?
                        'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        :
                        'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      }
                      id="point"
                      type="number"
                      maxLength={100}
                      placeholder="숫자만 입력하세요."
                      onChange={onChangePoint}
                      value={point || ""}
                    />
                    {pointError ? (
                      <p className="text-xs mb-[1.5rem] italic text-red-500">점수를 입력해주세요.</p>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="description">
                      상세정보 안내
                    </label>
                    <div>
                      <textarea
                        id="description"
                        placeholder="포인트 부여 사유를 입력해주세요."
                        className="w-full px-3 py-2 mb-2 resize-none h-52 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        onChange={onChangeDescription}
                        value={description || ""}
                      >
                      </textarea>
                      {descriptionError ? (
                        <p className="text-xs mb-[1.5rem] italic text-red-500">사유를 입력하세요.</p>
                      ) : null}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-4 mb-4">관리자만 내용을 확인할 수 있습니다.</p>

                  <div className="w-full flex justify-end mt-4">
                    <button
                      className='bg-blue-500 text-lg text-white hover:bg-blue-600 active:bg-violet-600 font-bold uppercase px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      onClick={onSubmit}>포인트부여
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertModal
        title="포인드등록 완료"
        contents="포인트 등록이 완료되었습니다."
        contents_second="관리자만 포인트 내역을 확인할 수 있습니다."
        closeOutsideClick={true}
        openModal={confirm}
        cancelFunc={ConfirmModalClose}
        closeModal={ConfirmModalClose}
        twobutton={false}
      />

    </>
  );
};

PointModal.propTypes = {
  onOpenPointModal: PropTypes.func,
  onClosePointModal: PropTypes.func,
  openModal: PropTypes.bool,
  target: PropTypes.object,
};

export default PointModal;