import React, { useCallback } from 'react';
import { sideOpen } from 'slices/board';
import { useDispatch, useSelector } from 'react-redux';



const index = () => {
  const dispatch = useDispatch();
  const { sidebarIn } = useSelector(state => state.board);
  const sideBarOpen = useCallback(() => {
    dispatch(sideOpen());
  }, [dispatch])

  return (
    <>
      {sidebarIn === false ?
        <button
          className="shadow z-[5] fixed left-[17px] top-[62px] flex justify-end mb-[2.2rem] p-[0.57rem] rounded-xl w-[fit-content] ml-auto hover:bg-sky-200 hover:text-sky-700 text-violet-600 bg-violet-100"
          onClick={sideBarOpen}
        >
          <div className=''>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </div>
        </button>
        : null}
    </>
  );
};

export default index;