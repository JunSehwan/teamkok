import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux'
import PostForm from './PostForm';
import Posts from './Posts';
import TopNavBar from './TopNavBar';
import BtnToTop from 'components/Common/BtnToTop';

const throttle = function (callback, waitTime) {
  let timerId = null;
  return (e) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, e);
      timerId = null;
    }, waitTime);
  };
};

const Main = () => {

  const [openForm, setOpenForm] = useState(false);
  const onOpenForm = useCallback(() => {
    document.body.style.overflow = "hidden";
    setOpenForm(true);
  }, [])
  const onCloseForm = useCallback(() => {
    document.body.style.overflow = "unset";
    setOpenForm(false);
  }, [])
  const { user } = useSelector(state => state.user);

  // 스크롤 내리면 메뉴바 안보이게
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
    documentRef?.current?.addEventListener('scroll', throttleScroll);
    return () => documentRef?.current?.removeEventListener('scroll', throttleScroll);
  }, [pageY, throttleScroll]);


  return (
    <>
      <TopNavBar
        hide={hide}
      />
      <div className=' md:px-8 pb-[70px] md:pb-auto pt-[calc(var(--navbar-height)+3.2rem)]'>
        <div className="mt-[2.4rem] py-4 items-center flex justify-between max-w-[672px] mx-auto">
          <h2 className="text-xl text-gray-700 font-extrabold mb-2">팀이야기</h2>
          {user?.purpose === 4 ?
            <button type="button"
              onClick={onOpenForm}
              className="flex items-center mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-3 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-[4px] h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <p className='font-bold'>
                새로운 그룹소식
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
        <Posts />
      </div>
      <BtnToTop />
    </>
  );
};

export default Main;