import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import companypic from 'public/image/company.png';
import { useRouter } from 'next/router';
import { sideClose } from 'slices/board';

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { singleBoard, sidebarIn } = useSelector(state => state.board);
  const onClickCategory = useCallback((category) => {
    router.push(`/board/${singleBoard?.id}/${category}`);
  }, [router, singleBoard])
  const onClickHome = useCallback((category) => {
    router.push(`/board/${singleBoard?.id}`);
  }, [router, singleBoard])
  const sideBarClose = useCallback(() => {
    dispatch(sideClose());
  }, [dispatch])

  return (<>
    {sidebarIn === true ?

      <div className="z-10 w-screen sm:w-64 bg-white border-r px-5 pt-[66px] flex flex-col justify-between h-[100%]">
        <div className="mt-15 mb-4">
          <h1 className="hidden md:block font-bold text-sm md:text-xl text-center mb-2">
            {singleBoard?.name}
          </h1>
          <div id="profile" className="space-y-3 w-[100%] flex flex-col items-center">
            <Image
              width={62}
              height={62}
              src={singleBoard?.logo || companypic}
              alt="CompanyLogo"
              className="w-10 md:w-16 rounded-lg mx-auto"
            />
            <div>
              <h2
                className="font-medium text-xs md:text-sm text-center text-violet-600"
              >
                {singleBoard?.creatorName}
              </h2>
              <p className="text-xs text-gray-500 text-center">보드제작자</p>
            </div>
          </div>

          <p className="text-sm font-medium text-gray-400 mt-9 mb-4">서비스안내</p>

          {/* <!-- menu-item --> */}
          <button
            className="pl-[6px] w-[100%] my-1 py-2 text-base font-semibold text-slate-600 hover:text-violet-500 group cursor-pointer flex items-center mr-1"
            onClick={onClickHome}
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-5 stroke-slate-500 mr-2 group-hover:stroke-violet-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            홈
          </button>

          <p className="text-sm font-medium text-gray-400 mt-9 mb-4">분야별 섹션</p>
          {singleBoard?.category?.map((v) => (
            <button
              key={v?.key}
              type="button"
              onClick={() => onClickCategory(v?.key)}
              className="pl-[6px] w-[100%] my-1 py-2 text-base font-semibold text-slate-600 hover:text-violet-500 group cursor-pointer flex items-center"

            >
              {v?.name}
            </button>
          ))}
        </div>
        <button
          className="fixed right-8 bottom-4 shadow z-20 flex justify-end text-gray-400 mb-[2.2rem] p-[0.57rem] rounded-xl w-[fit-content] ml-auto bg-gray-100 hover:text-violet-600 hover:bg-violet-100"
          onClick={sideBarClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </button>
      </div>
      : null}
  </>
  );
};

export default index;