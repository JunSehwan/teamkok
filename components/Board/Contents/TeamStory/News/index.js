import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux'
import PostForm from './PostForm';
import Posts from './Posts';

const index = () => {

  const [openForm, setOpenForm] = useState(false);
  const onOpenForm = useCallback(() => {
    document.body.style.overflow =  "hidden";
    setOpenForm(true);
  }, [])
  const onCloseForm = useCallback(() => {
    document.body.style.overflow =  "unset";
    setOpenForm(false);
  },[])
  const { isAdmin, isExpert } = useSelector(state => state.user);

  return (
    <>
    <div className="w-full mt-[2.4rem] p-[1rem] flex justify-between">
      <h2 className="text-xl text-blue-700 font-extrabold mb-2">팀이야기</h2>
      {isExpert || isAdmin ?
        <button type="button"
          onClick={onOpenForm}
          className="flex items-center mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-3 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-[4px] h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <p className='font-bold'>
          이야기 작성
          </p>
          </button>
        : null}
      {openForm ?
        <PostForm
          onCloseForm={onCloseForm}
          openForm={openForm}
        />
        : null}
    </div>
    <Posts/>
    </>
  );
};

export default index;