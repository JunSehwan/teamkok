import React, { useCallback } from 'react';
import { Tooltip } from "flowbite-react";
import { FaHandPointDown } from 'react-icons/fa';

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

  // 토글 여부 state에 따라 버튼을 보여주거나 감추게 만듦

  return (
    <>
      <Tooltip
        placement="bottom"
        className="w-max"
        content="다음카드"
        trigger="hover"
      >
        <button
          onClick={goDown}
          className="md:hidden p-3 fixed bg-gray-600/60 hover:bg-gray-200/50 z-1 flex flex-col justify-center items-center w-full left-0 right-0 bottom-0 py-4 text-white gap-2">
          <FaHandPointDown className='w-8 h-8' />
          <span>NEXT</span>
        </button>
      </Tooltip>

    </>
  );
};

export default index;