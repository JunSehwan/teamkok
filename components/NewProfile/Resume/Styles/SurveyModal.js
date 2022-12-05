import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SurveyMatching from 'components/Common/SurveyMatching';
import {
  updateUserStyle, updateUserSurvey,
  updateSurveyFalse, updateStyleFalse,
} from 'slices/user';
import { updateStyle, updateSurvey } from 'firebaseConfig';
import Question from './Question';
import Survey from 'components/Common/Survey';
import PropTypes from 'prop-types';
import Modal from 'components/Common/Modal/Modal';

const SurveyModal = ({ openSurveyModal, openSurvey, closeSurveyModal }) => {
  const dispatch = useDispatch();
  const { user, updateSurveyDone } = useSelector(state => state.user);

  useEffect(() => {
    if (updateSurveyDone) {
      setSurveyError(false);
      closeSurveyModal();
    }
  }, [closeSurveyModal, updateSurveyDone])

  const [surveyError, setSurveyError] = useState(false);
  const [state, setState] = useState(
    user?.survey || {
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
    const surveyRes = await updateSurvey(state);
    dispatch(updateUserSurvey(state));
  }, [dispatch, eight, five, four, one, seven, six, state, three, two])


  return (
    <div className="mt-[12px] container flex flex-col mx-auto w-full items-center justify-center">
      <Modal
        onClose={closeSurveyModal}
        title="업무관련 설문"
        visible={openSurvey}
        widths="620px"
      >
        <>
          {Survey?.map((v) => (
            <React.Fragment
              key={v?.name}>
              <Question
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
          <button
            className='bg-sky-500 w-full my-4 text-white active:bg-sky-600 font-bold uppercase py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
            onClick={onSurveySubmit}>설문 저장</button>
        </>
      </Modal>
    </div>

  );
};

SurveyModal.propTypes = {
  openSurvey: PropTypes.bool,
  openSurveyModal: PropTypes.func,
  closeSurveyModal: PropTypes.func,
};

export default SurveyModal;