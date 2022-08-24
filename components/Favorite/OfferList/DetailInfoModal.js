import React, { useEffect, createRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styled from 'styled-components';

const DetailInfoModal = ({ offer }) => {
  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)
  const modalEl = createRef();
  const handleClickOutside = (event) => {
    if (detailOpen === true && !modalEl?.current?.contains(event.target))
      onCloseDetail();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const [detailOpen, setDetailOpen] = useState(false);
  const onOpenDetail = useCallback(() => {
    document.body.style.overflow =  "hidden";
    setDetailOpen(true);
  }, [])
  const onCloseDetail = useCallback(() => {
    document.body.style.overflow =  "unset";
    setDetailOpen(false);
  }, [])

  return (
    <>
      <button
        onClick={onOpenDetail}
        className="p-2 ml-1 hover:bg-blue-100 text-blue-600 rounded-full " >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {detailOpen &&
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div ref={modalEl} className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
            {/* <!--content--> */}
            <div className="text-left p-2 sm:p-5 flex-auto justify-center w-full">
              {/* <!--body--> */}
              <div className="">
                <div className='flex flex-col w-full justify-end items-center text-right'>
                  {offer?.answer === "yes" && <span className='mb-4 font-md font-bold text-blue-600 bg-blue-50 rounded-lg p-4'>상대방이 승낙하였습니다! 이제 1:1대화를 통해 추가 일정을 안내해주세요.</span>}
                  {offer?.answer === "no" && <span className='mb-4 font-md font-bold text-red-600 bg-red-50 rounded-lg p-4'>상대방이 거절하였습니다! 아쉽지만 더 좋은 인재를 찾을 수 있을겁니다.</span>}
                  <span className="w-full overflow-hidden font-semibold text-lg text-ellipsis whitespace-nowrap text-purple-600">
                    {offer?.boardName}
                  </span>
                  <span className='w-full text-purple-400'>
                    {offer?.sectionName}분야
                  </span>
                </div>
                <div className="flex flex-row justify-between mt-4">
                  <div className="mb-4 sm:max-w-full text-2xl sm:text-xl font-semibold text-black overflow-hidden text-ellipsis whitespace-nowrap ">
                    to. {offer?.targetName || ""}
                  </div>
                  <p className='text-gray-400'>
                    {dayjs(offer?.timestamp).fromNow()}
                  </p>
                </div>

                <StyledContainer className="overflow-y-auto max-h-[72vh] w-full">
                  <div className="sm:max-w-full text-sm sm:text-md text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap ">
                    <p className="font-semibold text-lg mt-8 mb-2">직급</p> {offer?.position || ""}
                  </div>
                  <div className="sm:max-w-full text-sm sm:text-md text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap ">
                    <p className="font-semibold text-lg mt-8 mb-2">월평균급여(초봉)</p> {offer?.income || ""}
                  </div>
                  <div className="sm:max-w-full text-sm sm:text-md text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap ">
                    <p className="font-semibold text-lg mt-8 mb-2">근무장소</p> {offer?.space || ""}
                  </div>
                  <div className="sm:max-w-full text-sm sm:text-md text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap ">
                    <p className="font-semibold text-lg mt-8 mb-2">입사일</p> {offer?.workday || ""}
                  </div>
                  <div className="whitespace-pre-wrap leading-normal font-normal sm:max-w-full text-sm sm:text-md text-gray-600 overflow-hidden text-ellipsis ">
                    <p className="font-semibold text-lg mt-8 mb-2">주요업무</p> {offer?.duty || ""}
                  </div>
                  {offer?.description &&
                    <div className="whitespace-pre-wrap leading-normal font-normal sm:max-w-full text-sm sm:text-md text-gray-600 overflow-hidden text-ellipsis ">
                      <p className="font-semibold text-lg mt-8 mb-2">부가설명</p> {offer?.description || ""}
                    </div>
                  }

                </StyledContainer>
              </div>
              {/* <!--footer--> */}
              <div className="p-1  mt-1 text-center space-x-4 md:block">
                <button type="button" onClick={onCloseDetail}
                  className="mb-2 md:mb-0 bg-blue-600 border border-blue-600 px-8 py-2 text-lg shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-700">
                  닫기</button>
              </div>
            </div>
          </div>
        </div>}</>
  );
};

const StyledContainer = styled.div`

 ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.16);
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`


DetailInfoModal.propTypes = {
  offer: PropTypes.object,
};

export default DetailInfoModal;