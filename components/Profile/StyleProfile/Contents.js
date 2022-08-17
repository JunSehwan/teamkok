import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StyleCard from './StyleCard';
import Question from './Question';
import Survey from 'components/Common/Survey';
import StyleList from 'components/Common/StyleList';
import {
  updateUserStyle, updateUserSurvey,
  updateSurveyFalse, updateStyleFalse,
} from 'slices/user';
import { updateStyle, updateSurvey } from 'firebaseConfig';
import AlertModal from 'components/Common/Modal/AlertModal';


const Contents = () => {
  const dispatch = useDispatch();
  const { user, updateStyleDone, updateSurveyDone } = useSelector(state => state.user);
  const [openList, setOpenList] = useState(false);
  const toggleList = useCallback(() => {
    setOpenList(prev => !prev);
  }, [])
  const [openSurvey, setOpenSurvey] = useState(false);
  const toggleSurvey = useCallback(() => {
    setOpenSurvey(prev => !prev);
  }, [])

  const [confirm, setConfirm] = useState(false);
  const ConfirmModalOpen = useCallback(() => {
    setConfirm(true);
    dispatch(updateStyleFalse());
    dispatch(updateSurveyFalse());
  }, [dispatch])

  const ConfirmModalClose = () => {
    setConfirm(false);
  }

  useEffect(() => {
    if (updateStyleDone) {
      ConfirmModalOpen();
      setCategoryError(false);
    }
  }, [updateStyleDone, ConfirmModalOpen])

  useEffect(() => {
    if (updateSurveyDone) {
      ConfirmModalOpen();
      setSurveyError(false);
    }
  }, [updateSurveyDone, ConfirmModalOpen])



  const [category, setCategory] = useState(user?.style || "");
  const [categoryError, setCategoryError] = useState(false);
  const onChangeCategory = useCallback((number) => () => {
    setCategory(number);
    setCategoryError(false);
  }, [])

  const onCategorySubmit = useCallback(async (e) => {
    if (category === "") {
      document.getElementById('category').focus();
      return setCategoryError(true);
    }
    const res = await updateStyle(category);
    dispatch(updateUserStyle(category));
  }, [category, dispatch])


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
    <>
      <div className="mb-4">
        <div className="px-[2px] md:lg:xl:px-[4px] border-t border-b py-[12px]">
          <div className=" border">

            <div className="container flex flex-col mx-auto w-full items-center justify-center">
              <button
                onClick={toggleList}
                className="border-t-[6px] border-blue-400 border-solid default:from-gray-400 via-gray-100 default:to-white flex flex-row justify-between text-left items-center px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
                <div className="">
                  <h3 className="text-blue-400 text-base leading-6 font-bold dark:text-white">
                    스타일 선택
                    {user?.style ? <span className="ml-2 text-gray-400 text-sm font-normal">(작성완료)</span> : <span className="ml-2 text-gray-400 text-sm font-normal">(미작성)</span>}
                  </h3>
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openList ?
                <>
                  <ul id="category" className="flex flex-col w-[100%]">
                    {StyleList?.map((v, i) => (
                      <React.Fragment key={v?.src}>
                        <StyleCard
                          title={v?.title}
                          category={category}
                          sub={v?.sub}
                          setCategory={setCategory}
                          onChangeCategory={onChangeCategory}
                          src={v?.src}
                          tag={v?.tag}
                          number={v?.number}
                          index={v?.key}
                        />
                      </React.Fragment>
                    ))}
                  </ul>
                  {categoryError ? (
                    <p className="mt-[6px] w-[100%] font-bold text-xs mb-[1.5rem] italic text-red-500">스타일을 선택해주세요.</p>
                  ) : null}
                  <button
                    className='mt-2 mb-8 bg-sky-500 w-full text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                    onClick={onCategorySubmit}>스타일 저장</button>
                </> : null}
            </div>


            <div className="mt-[12px] container flex flex-col mx-auto w-full items-center justify-center">
              <button
                onClick={toggleSurvey}
                className="border-t-[6px] border-blue-400 border-solid default:from-gray-400  via-gray-100 default:to-white flex flex-row justify-between text-left items-center px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
                <div className="">
                  <h3 className="text-base leading-6 font-bold  text-blue-400 dark:text-white">
                    설문항목 작성
                    {user?.survey ? <span className="ml-2 text-gray-400 text-sm font-normal">(작성완료)</span> : <span className="ml-2 text-gray-400 text-sm font-normal">(미작성)</span>}
                  </h3>
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openSurvey ?
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
                    className='bg-sky-500 w-full my-2 text-white active:bg-sky-600 font-bold uppercase py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                    onClick={onSurveySubmit}>설문 저장</button>
                </> : null}
            </div>
            <AlertModal
              title="업데이트 완료"
              contents="정보등록이 완료되었습니다."
              contents_second="현업 담당자에게 어필할 수 있는 가능성이 커집니다."
              closeOutsideClick={true}
              openModal={confirm}
              closeModal={ConfirmModalClose}
              twobutton={false}

            />
          </div>
        </div>
        {/* <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="school_name">
          내 MBTI 입력
        </label> */}
      </div>
    </>
  );
};

export default Contents;