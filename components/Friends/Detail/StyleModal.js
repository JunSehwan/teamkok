import React, { useCallback, useState, createRef, useEffect } from 'react';
import StyleList from 'components/Common/StyleList';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FcBiotech, FcMindMap } from 'react-icons/fc';
import Survey from 'components/Common/Survey';
import { Tooltip } from "flowbite-react";
const StyleModal = () => {
  const { friend } = useSelector(state => state.user);
  const styleObject = StyleList?.filter(obj => obj.number == friend?.style);

  const [modal, setModal] = useState(false);
  const openModal = useCallback(() => {
    document.body.style.overflow = "hidden";
    setModal(true);
  }, [])
  const closeModal = useCallback(() => {
    document.body.style.overflow = "unset";
    setModal(false);
  }, [])

  const modalEl = createRef();
  const handleClickOutside = (event) => {
    if (modal === true && !modalEl?.current?.contains(event.target))
      closeModal();
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const onInternOpen = useCallback(() => {
    document.body.style.overflow = "hidden";
    setSmallInternOpen(true);
  }, [])

  const onInternClose = useCallback(() => {
    document.body.style.overflow = "unset";
    setSmallInternOpen(false);
  }, [])

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className='flex flex-col gap-1 items-center justify-center'>
          <Tooltip
            placement="bottom"
            className="w-max"
            content="스타일 확인"
            trigger="hover"
          >
            <button className="rounded-full p-3 hover:bg-white bg-amber-300/60 border-solid border-amber-600 flex items-center justify-center flex-col"
              onClick={openModal}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FcBiotech className="w-6 h-6 text-amber-600" />
              </motion.div>
            </button>
          </Tooltip>
        </div>
        <>
          {modal ?
            <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[#00000090]">
              <div className="w-[100%] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="sticky w-[100%] mt-auto mb-auto mx-auto min-w-auto max-w-[920px]" ref={modalEl}>
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-center justify-between p-5 rounded-t">
                      <p className='font-bold text-2xl'>{friend?.username}님의 업무스타일</p>
                      <button
                        className="p-3 rounded-xl hover:bg-slate-200 ml-auto bg-transparent border-0 text-gray-500 hover:text-gray-700 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={closeModal}
                      >
                        <span className="bg-transparent opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      </button>
                    </div>
                    <div className='p-6'>
                      <div className='w-full flex justify-center md:justify-around md:flex-row flex-col items-start'>
                        {styleObject?.length !== 0 && styleObject[0] ?
                          <div className="py-2 sm:py-0 flex justify-center w-full md:w-auto">
                            <div className=" inline-block mr-2 w-full md:w-auto">
                              <div className="flex h-full items-center w-full">
                                <div className="mx-[auto] border-gray-400 flex flex-row mb-2 w-[100%]">
                                  <div
                                    className="flex-col sm:flex-row bg-sky-100 text-left transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer hover:bg-sky-200 click:active:checked:focus:bg-sky-300 dark:bg-gray-800 rounded-md flex flex-1 items-center p-4 w-full"
                                  >
                                    <div className="flex flex-col h-10 justify-center items-center">
                                      {styleObject[0]?.src &&
                                        <div href="#" className="block relative my-4 sm:my-0">
                                          <Image
                                            className="mx-auto object-cover rounded-full h-14 w-14"
                                            src={styleObject[0]?.src || ""}
                                            width={46}
                                            height={46}
                                            unoptimized
                                            alt="Style picture"
                                          />
                                        </div>
                                      }
                                    </div>
                                    <div className="flex-1 pl-0 sm:pl-3 ">
                                      <div className="leading-snug font-bold dark:text-white text-lg mt-2 sm:mt-0 text-center sm:text-left">
                                        {styleObject[0]?.title}
                                      </div>
                                      <div className="text-gray-500 dark:text-gray-200 text-sm mt-1">
                                        {styleObject[0]?.sub}
                                      </div>
                                      <div className="text-violet-500 dark:text-gray-200 text-sm mt-1">
                                        {styleObject[0]?.tag}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          : <span className='my-4 text-lg h-full flex'>등록된 업무스타일이 없어요!🤔</span>}
                        <div className='flex flex-col'>
                          {friend?.survey ?
                            Survey?.map((v, i) => (
                              <div
                                key={i}
                                className='flex flex-col w-[100%] mx-auto py-2 px-2 bg-gray-50 rounded text-left md:mx-4 mb-2'>
                                <span className='text-sm font-normal text-gray-600 py-[4px]'>{v?.name}</span>
                                <div className='flex w-[100%] justify-between'>
                                  <div
                                    className=
                                    'flex group sm:min-w-[5rem] py-[4px] text-left'
                                  >
                                    <div className='flex items-centerpy-1'>
                                      <p
                                        className=
                                        'text-gray-700 text-sm transition-all duration-300'
                                      >
                                        {friend?.survey[v.value] &&
                                          <span>{(() => {
                                            switch (friend?.survey[v.value]) {
                                              case 1: return (<span className="text-blue-800">매우 그렇다</span>)
                                              case 2: return (<span className="text-blue-400">그렇다</span>)
                                              case 3: return (<span className="text-gray-500">보통</span>)
                                              case 4: return (<span className="text-red-400">아니다</span>)
                                              case 5: return (<span className="text-red-800">전혀 아니다</span>)
                                              default: null;
                                            }
                                          })(friend?.survey[v.value])}</span>
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                            :
                            <span className='my-4 text-lg h-full flex'>등록된 설문결과가 없어요!🤔</span>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : null}
        </>

      </div>
    </div>
  );
};

export default StyleModal;