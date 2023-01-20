import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux'
import PostForm from './PostForm';
import Posts from './Posts';
import TopNavBar from './TopNavBar';
import BtnToTop from 'components/Common/BtnToTop';
import { FcAdvertising } from 'react-icons/fc';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => documentRef?.current?.removeEventListener('scroll', throttleScroll);
  }, [pageY, throttleScroll]);


  return (
    <>
      <TopNavBar
        hide={hide}
      />
      <div className='px-1 md:px-8 pb-[70px] md:pb-auto pt-[calc(var(--navbar-height)+3.2rem)]'>
        <div className="mt-[2.4rem] py-4 flex justify-between max-w-xl mx-auto items-center">
          <h2 className="text-2xl text-blue-700 font-extrabold flex flex-row">
            <span>잡톡!</span>
            <FcAdvertising className=''></FcAdvertising>
            <span className="ml-16 animate-ping absolute inline-flex h-5 w-5 rounded-full bg-sky-300 opacity-65"></span>
          </h2>
          {/* {user?.purpose === 1 ? */}
          <button type="button"
            onClick={onOpenForm}
            className="flex items-center mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-3 py-2 text-sm shadow-md font-medium tracking-wider text-white rounded-lg hover:shadow-sm hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-[4px] h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <p className='font-bold'>
              글 작성하기
            </p>
          </button>
          {/* : null} */}
          {openForm ?
            <PostForm
              onCloseForm={onCloseForm}
              openForm={openForm}
            />
            : null}
        </div>
        <p className="text-md text-gray-500 max-w-xl mx-auto mb-8">궁금하거나 재밌는 회사이야기를 나누어보아요!😛</p>
        <Posts />
      </div>
      <BtnToTop />
    </>
  );
};

export default Main;