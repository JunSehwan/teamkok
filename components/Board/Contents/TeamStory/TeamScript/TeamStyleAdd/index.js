import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AlertModal from 'components/Common/Modal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateTeamSurvey, updateTeamSurveyFalse,
} from 'slices/board';
import { updateAdminSurvey } from 'firebaseConfig';
import SurveyForAdmin from 'components/Common/SurveyForAdmin';
import AdminQuestion from './AdminQuestion';

const index = ({ onStyleClose, teamStyleOpen, singleSection }) => {
  const dispatch = useDispatch();
  const { updateTeamSurveyDone } = useSelector(state => state.board);
  const [surveyError, setSurveyError] = useState(false);
  const [state, setState] = useState(
    singleSection?.survey || {
      one: "", two: "", three: "", four: "",
      five: "", six: "", seven: "", eight: "",
    }
  )
  const { one, two, three, four, five, six, seven, eight
  } = state;
  const values = {
    one, two, three, four, five, six, seven, eight
  };
  const onChangeSurvey = useCallback((name, e) => () => {
    setState({ ...state, [name]: e });
    setSurveyError(false);
  }, [state]);

  const onSurveySubmit = useCallback(async (e) => {
    if (one === "" || two === "" || three === "" || four === "" || five === "" || six === "" || seven === "" || eight === "") {
      return setSurveyError(true);
    }
    const surveyRes = await updateAdminSurvey(state, singleSection?.id);
    dispatch(updateTeamSurvey(state));
  }, [dispatch, eight, five, four, one, seven, singleSection?.id, six, state, three, two])

  const [confirm, setConfirm] = useState(false);
  const ConfirmModalOpen = useCallback(() => {
    setConfirm(true);
    dispatch(updateTeamSurveyFalse());
  }, [dispatch])

  const ConfirmModalClose = () => {
    onStyleClose();
    setConfirm(false);
  }

  useEffect(() => {
    if (updateTeamSurveyDone === true) {
      ConfirmModalOpen();
      setSurveyError(false);
      dispatch(updateTeamSurveyFalse());
    }
  }, [updateTeamSurveyDone, ConfirmModalOpen, dispatch])

  return (
    <>
      {teamStyleOpen ?
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
                      <button onClick={onStyleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <h2 className="text-violet-600 font-lg font-bold tracking-normal leading-tight mb-4">설문항목 작성</h2>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-base leading-6 font-medium  text-gray-500 dark:text-white">
                      선호하는 팀원 스타일을 등록함으로써,<br /> 좀 더 스타일에 맞는 인재를 쉽게 찾을 수 있습니다.
                    </h3>
                    {/* 구분선 */}
                    <div className="bg-gray-100 my-4 h-0.5 rounded-full" />
                  </div>
                  {SurveyForAdmin?.map((v) => (
                    <React.Fragment
                      key={v?.name}>
                      <AdminQuestion
                        value={v?.value}
                        state={state}
                        name={v?.name}
                        onChangeSurvey={onChangeSurvey}
                      />
                    </React.Fragment>
                  ))}
                  {surveyError ? (
                    <p className="mt-[6px] w-[100%] font-bold text-xs mb-[1.5rem] italic text-red-500">설문항목을 다 작성하셨나요?</p>
                  ) : null}
                  <div className="w-full flex justify-end mt-4">
                    <button
                      className='bg-blue-500 text-lg text-white hover:bg-blue-600 active:bg-violet-600 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      onClick={onSurveySubmit}>저장
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        : null}

        <AlertModal
          title="업데이트 완료"
          contents="정보등록이 완료되었습니다."
          contents_second="팀 스타일에 적합한 팀원을 확인할 수 있습니다."
          closeOutsideClick={true}
          openModal={confirm}
          closeModal={ConfirmModalClose}
          twobutton={false}
        />
    </>
  );
};

index.propTypes = {
  teamStyleOpen: PropTypes.bool,
  onStyleClose: PropTypes.func,
  singleSection: PropTypes.object,
};

export default index;