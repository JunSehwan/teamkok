import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from 'components/Common/Modal/AlertModal';
import Empty from 'components/Common/Empty';
import { createSections } from 'firebaseConfig';
import CategoryList from 'components/Common/CategoryList';
import { addSections, addSectionDoneFalse } from 'slices/board';


const AddSection = () => {
  const { isAdmin } = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  const onOpen = useCallback(() => { 
     document.body.style.overflow = "hidden";
    setOpen(true); }, [])
  const onClose = useCallback(() => { 
     document.body.style.overflow = "unset";
    setOpen(false); }, [])
  const dispatch = useDispatch();
  const { singleBoard, addSectionsDone } = useSelector(state => state.board);
  // 
  const [category, setCategory] = useState([]);
  const [categoryError, setCategoryError] = useState(false);


  function getFields(input, field) {
    var output = [];
    for (var i = 0; i < input?.length; ++i)
      output.push(input[i][field]);
    return output;
  }

  //초기배열 생성
  var categorylistkeys = getFields(CategoryList, "key");
  var singleboardkeys = getFields(singleBoard?.category, "key");
  const minusArr = categorylistkeys.filter(x => !singleboardkeys.includes(x));
  // const [resulty, setResulty] = useState([]);
  const resulty = [];
  CategoryList.map(m => (
    minusArr?.map(v => (
      m?.key === v && resulty.push({ key: v, name: m.name })
    ))
  ))
  
  const uniqueArr = Array.from(new Set(category?.map(a => a.key)))
    ?.map(key => {
      return category?.find(a => a.key === key)
    })

  const onChangeCategory = useCallback((index, value) => {
    setCategory([{ key: index, name: value }, ...category]);
  }, [category]);

  const onRemoveCategory = useCallback((index) => {
    setCategory(uniqueArr?.filter(v => v?.key !== index))
    uniqueArr?.filter(v => v?.key !== index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueArr, category]);

  

  useEffect(() => {
    if (addSectionsDone) {
      setConfirm(true);
      setCategory([]);
      setCategoryError(false);
      dispatch(addSectionDoneFalse());
    }
  }, [addSectionsDone, dispatch])


  const onSubmit = useCallback(async (e) => {
    if (category?.length === 0) {
      document.getElementById('category').focus();
      return setCategoryError(true);
    }
    const con = await createSections(category, singleBoard?.id);
    dispatch(addSections(category));

  }, [dispatch, category, singleBoard?.id])


  const [confirm, setConfirm] = useState(false);
  const cancelConfirm = () => {
    setConfirm(false);
    onClose();
  }
  const closeConfirm = () => {
    setConfirm(false);
    onClose();
  }

  
  
  return (
    <div className="mt-4 w-full">
      <div className='w-[70%] flex justify-center mx-auto h-[2px] bg-slate-200 my-6'></div>
      {isAdmin ?
        <button
          onClick={onOpen}
          className="w-full px-2">
          <div className='flex flex-row items-center justify-start w-full'>
            <svg xmlns="http://www.w3.org/2000/svg" className="text-blue-700 mr-2 h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <span className='text-base'>새로운 섹션 생성</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>

        </button>
        : null}

      {/* 모달창 */}
      {open ?
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
                      <button onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <h2 className="text-violet-600 text-lg font-bold tracking-normal leading-tight mb-1">새로운 섹션 생성</h2>
                    <div className="mb-6">
                      <h3 className="text-base leading-6 font-medium text-gray-500 dark:text-white">
                        섹션은 제거가 불가하니 필요시에 선택해주시기 바랍니다.
                      </h3>
                    </div>
                  </div>

                  <div className="mb-12">
                    <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="category">
                      채용포지션 분야<br />(선택하신 카테고리의 섹션이 생성됩니다.)
                    </label>

                    <div
                      className='mb-[8px] mt-[4px] p-3 rounded-xl bg-gray-100 pb-[5px]'
                      id="category"
                      tabIndex="-3"
                    >
                      {uniqueArr?.length !== 0 ?
                        uniqueArr?.map(v => (
                          <button
                            className='inline-flex mr-[4px] mb-[6px] text-sm py-2 px-3 bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-fuchsia-500 focus:ring-offset-fuchsia-200 text-white transition ease-in duration-200 text-center font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'
                            type="button"
                            onClick={() => onRemoveCategory(v?.key)}
                            key={v?.name}
                          // onClick={() => onChangeCategory(v?.name)}
                          >
                            {v?.name}
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-[4px] h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        )) : <Empty text="카테고리를 선택해주세요" />}

                    </div>

                    {resulty?.map((v) => (
                      <button
                        className='inline-flex mr-[4px] mb-[6px] text-sm py-1 px-3 bg-gray-100 hover:bg-gray-200 focus:ring-gray-200 focus:ring-offset-gray-100 text-gray-800 transition ease-in duration-200 text-center font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'
                        type="button"
                        key={v?.key}
                        onClick={() => onChangeCategory(v?.key, v?.name)}
                      >
                        {v?.name}
                      </button>
                    ))}
                    {categoryError ? (
                      <p className="text-xs mb-[1.5rem] italic text-red-500">카테고리를 선택해주세요.</p>
                    ) : null}

                  </div>

                  <div className="mb-2 text-right">
                    {confirm &&
                      <AlertModal
                        title={`섹션생성 완료!🎉`}
                        contents={`선택한 섹션이 생성되었습니다.`}
                        contents_second="이제 섹션내에서 다양한 활동을 할 수 있습니다."
                        closeOutsideClick={false}
                        openModal={confirm}
                        closeModal={closeConfirm}
                        cancelFunc={cancelConfirm}
                        twobutton={false}
                      />
                    }


                    <div className="w-full flex justify-end mt-4">
                      <button
                        className='bg-blue-500 text-lg text-white hover:bg-blue-600 active:bg-blue-600 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        onClick={onSubmit}>생성
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null}
    </div>
  );
};

export default AddSection;