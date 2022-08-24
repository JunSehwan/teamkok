import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AlertModal from 'components/Common/Modal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import { setSectionUpdateDoneFalse, updateSectionInfo } from 'slices/board';
import { updateSection } from 'firebaseConfig';


const TeamScriptAdd = ({ addOpen, onAddClose, singleSection }) => {

  const dispatch = useDispatch();
  // 수정
  const { singleBoard, selectedCategory } = useSelector(state => state.board);
  const { user } = useSelector(state => state.user);
  const { updateSectionInfoDone } = useSelector(state => state.board);

  useEffect(() => {
    if (updateSectionInfoDone) {
      setIntroError(false);
      setAdvantageError(false);
      setPeopleCountError(false);
      setConfirm(true);

      dispatch(setSectionUpdateDoneFalse());

    }
  }, [updateSectionInfoDone, dispatch])


  //1줄 간략소개
  const [intro, setIntro] = useState(singleSection?.intro);
  const [introError, setIntroError] = useState(false);
  const onChangeIntro = useCallback((e) => {
    setIntro(e.target.value);
    setIntroError(false);
  }, [])

  //팀 장점
  const [advantage, setAdvantage] = useState(singleSection?.advantage);
  const [advantageError, setAdvantageError] = useState(false);
  const onChangeAdvantage = useCallback(
    e => {
      setAdvantage(e.target.value);
      setAdvantageError(false);
    },
    []
  );

  // 인원수
  const [peopleCount, setPeopleCount] = useState(singleSection?.peopleCount);
  const [peopleCountError, setPeopleCountError] = useState(false);
  const onChangePeopleCount = useCallback(
    e => {

      setPeopleCount(e.target.value);
      setPeopleCountError(false);
    },
    []
  );

  const [description, setDescription] = useState(singleSection?.description);
  const [descriptionError, setDescriptionError] = useState(false);
  const onChangeDescription = useCallback((e) => {
    setDescription(e.currentTarget.value);
    setDescriptionError(false);
  }, [])

  // const { data, loading } = useLoadData({ description });
  // const clearData = useClearDataCallback(description);
  // const disabled = description === null || loading;


  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!intro) {
      document.getElementById('intro').focus();
      return setIntroError(true);
    }
    if (!advantage) {
      document.getElementById('advantage').focus();
      return setAdvantageError(true);
    }
    if (!peopleCount) {
      document.getElementById('peopleCount').focus();
      return setPeopleCountError(true);
    }

    if (!description) {
      document.getElementById('description').focus();
      return setIntroError(true);
    }
    // if (description) {
    //   const out = await description?.save();
    //   var JSONresult = JSON.stringify(out);
    // }

    const Result = {
      intro: intro,
      advantage: advantage,
      peopleCount: peopleCount,
      description: description,
      boardCategory: selectedCategory?.key,
      boardId: singleBoard?.id,
    };
    const sectionId = singleSection?.id;
    const con = await updateSection(Result, sectionId);
    dispatch(updateSectionInfo(con));

  }, [dispatch, intro, advantage, singleSection?.id, peopleCount, description, selectedCategory?.key, singleBoard?.id])

  const [confirm, setConfirm] = useState(false);
  const closeConfirm = () => {
    setConfirm(false);
    onAddClose();

  }

  return (
    <>
      {addOpen ?
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed w-[100%] z-50 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
              <div className="border-solid border-t-8 border-violet-400 relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                  <div className="relative bg-white rounded border">
                    <div className="w-full flex justify-start text-violet-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-violet-600 font-lg font-bold tracking-normal leading-tight mb-4">섹션 기본정보</h2>
                  </div>
                  <form
                    className="w-full pt-2 pb-2 mb-1 rounded mt-[1rem]"
                    onSubmit={onSubmit}
                  >
                    <div className="mb-1">
                      <p className="block mb-4 text-sm font-bold text-gray-700">
                        관심을 갖는 사람들에게 부서(섹션) 정보를 전해주세요.
                      </p>
    
                    </div>

                    <div className="mb-1">
                      <input
                        className={introError ?
                          'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                          :
                          'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        }
                        id="intro"
                        tabIndex={-1}
                        type="text"
                        maxLength={100}
                        placeholder="팀 간략소개"
                        onChange={onChangeIntro}
                        value={intro || ""}
                      />
                      {introError ? (
                        <p className="text-xs mb-[1.5rem] italic text-red-500">팀을 소개해주세요.</p>
                      ) : null}
                    </div>

                    <div className="mb-1">
                      <input
                        className={advantageError ?
                          'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                          :
                          'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        }
                        id="advantage"
                        tabIndex={-1}
                        type="text"
                        maxLength={100}
                        placeholder="팀 강점 3가지 (ex. 화기애애한 분위기, 다양한 복지, 빠른 퇴근!)"
                        onChange={onChangeAdvantage}
                        value={advantage || ""}
                      />
                      {advantageError ? (
                        <p className="text-xs mb-[1.5rem] italic text-red-500">팀의 장점을 작성해주세요.</p>
                      ) : null}
                    </div>



                    <div className="mb-4">
                      <input
                        className={peopleCountError ?
                          'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                          :
                          'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        }
                        id="peopleCount"
                        tabIndex={-1}
                        type="number"
                        placeholder="조직원 수(숫자입력)"
                        onChange={onChangePeopleCount}
                        value={peopleCount || ""}
                      />
                      {peopleCountError ? (
                        <p className="text-xs mb-[1.5rem] italic text-red-500">팀의 인원수를 작성해주세요.</p>
                      ) : null}
                    </div>



                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="description">
                        팀 주요업무 또는 신입이 하는 업무를 상세히 작성해주세요.
                      </label>
                      <div>
                        <textarea
                          id="description"
                          tabIndex={-1}
                          placeholder="주요업무를 작성해주세요."
                          className="w-full resize-none outline-none h-32 px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          onChange={onChangeDescription}
                          value={description}
                        >
                        </textarea>
                        {descriptionError ? (
                          <p className="text-xs mb-[1.5rem] italic text-red-500">팀이야기를 얘기해주세요.</p>
                        ) : null}

                      </div>


                      {/* <div
                        className='bg-slate-50 shadow-inner min-h-[5rem] w-full mb-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
                        id="editorContainer"
                        // tabIndex={-1}
                      >
                        <Editor
                          editorRef={setDescription}
                          options={options}
                          // {data}는 초기새팅값
                          data={data} />
                        <a href="#" onClick={clearData}>
                          Clear data
                        </a>
                      </div> */}
                    </div>
                    <div className="mb-2 text-right">
                      {confirm &&
                        <AlertModal
                          title="업데이트 완료"
                          // contents="업데이트 완료"
                          closeOutsideClick={false}
                          openModal={confirm}
                          closeModal={closeConfirm}
                          cancelFunc={closeConfirm}
                          twobutton={false}
                        />
                      }

                      <div className="sm:flex sm:flex-row-reverse">
                        <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">업데이트</button>
                        <button onClick={onAddClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
        : null}

      {/* 
      <style jsx>{`
        
        .editorContainer {
          width: 100%;
          margin-bottom: 10px;
        }
       
      `}</style> */}

    </>
  );
};

TeamScriptAdd.propTypes = {
  addOpen: PropTypes.bool,
  onAddClose: PropTypes.func,
  singleSection: PropTypes.object,
};

export default TeamScriptAdd;