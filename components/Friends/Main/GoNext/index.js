import React, { useCallback } from 'react';
import { Tooltip } from "flowbite-react";
import { FaHandPointDown, FaHandPointUp } from 'react-icons/fa';

const index = () => {


  // window 객체에서 scrollY 값을 받아옴
  // 어느정도 스크롤이 된건지 판단 후, 토글 여부 결정

  // scroll 이벤트 발생 시 이를 감지하고 handleScroll 함수를 실행

  const goDown = useCallback(() => {
    window.scrollBy({
      behavior: 'smooth',
      left: 0,
      top: 624
    });
  }, [])
  const goUp = useCallback(() => {
    window.scrollBy({
      behavior: 'smooth',
      left: 0,
      top: -624
    });
  }, [])
  // 토글 여부 state에 따라 버튼을 보여주거나 감추게 만듦

  return (
    <div className='w-full flex items-center justify-between flex-row'>
      <Tooltip
        placement="bottom"
        className="w-max"
        content="이전카드"
        trigger="hover"
      >
        <button
          onClick={goUp}
          className="md:hidden p-3 fixed bg-gray-600/60 hover:bg-gray-200/50 flex flex-col justify-center items-center w-[50%] left-0 bottom-0 py-3 text-white gap-2 z-[10]">
          <FaHandPointUp className='w-7 h-7' />
          <span className='text-sm'>이전</span>
        </button>
      </Tooltip>
      <Tooltip
        placement="bottom"
        className="w-max"
        content="다음카드"
        trigger="hover"
      >
        <button
          onClick={goDown}
          className="md:hidden p-3 fixed bg-gray-600/60 hover:bg-gray-200/50 flex flex-col justify-center items-center w-[50%] right-0 bottom-0 py-3 text-white gap-2 z-[10]">
          <FaHandPointDown className='w-7 h-7' />
          <span className='text-sm'>다음</span>
        </button>
      </Tooltip>

    </div>
  );
};

export default index;