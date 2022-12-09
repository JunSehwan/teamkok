import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import profilePic from 'public/image/icon/happiness.png';
import { BiTransfer } from 'react-icons/bi';
import styled from 'styled-components';
import { updatePurpose } from 'firebaseConfig';
import { updateUserPurpose, updatePurposeFalse } from 'slices/user';
import { MdDocumentScanner } from 'react-icons/md';
import { FaAngleDown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import ProgressBar from './ProgressBar';
import { useRouter } from 'next/router';
import IntroModal from './IntroModal';

const ImageWrapper = styled.div`
width: 100%;
border-radius: 8px;
justify-content: center;
margin: 0 auto;
min-height: 62px;
position: relative;

& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 62px !important;
  }
}
`

const SideBar = styled.aside`
  background: linear-gradient(90deg, rgb(250, 250, 250) 0%, rgb(250, 250, 250) 97.4%, rgb(237, 237, 237) 100%, rgb(237, 237, 237) 100%, rgb(237, 237, 237) 100%);
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

const BottomBar = styled.div`
  /* background: white; */
  background: linear-gradient(180deg, rgb(250, 250, 250) 0%, rgb(250, 250, 250) 97.4%, rgb(237, 237, 237) 100%, rgb(237, 237, 237) 100%, rgb(237, 237, 237) 100%);
  box-shadow: 9px 23px 25px 13px rgb(0 0 0 / 10%), 16px 8px 10px 12px rgb(0 0 0 / 10%);
`

const index = (
  {
    onMoveToElement1,
    onMoveToElement2,
    onMoveToElement3,
    onMoveToElement4,
    onMoveToElement5,
    onMoveToElement6,
  }
  // { moveToResume }
) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [resumeOpen, setResumeOpen] = useState(true);
  const onClickPurpose = useCallback(async (v) => {
    const res = await updatePurpose(
      parseInt(v)
    );
    dispatch(updateUserPurpose(res));
    notify();
    dispatch(updatePurposeFalse());
  }, [dispatch])
  const notify = () => toast("업데이트 성공");

  const [introModalOpened, setIntroModalOpen] = useState(false);
  const openIntroModal = useCallback(() => {
    setIntroModalOpen(true);
  }, [])
  const closeIntroModal = useCallback(() => {
    setIntroModalOpen(false);
  }, [])

  const goGroup = useCallback(() => {
    router.push('/profile/group')
  }, [router])

  const isGroupPage = router?.pathname !== "/profile/group/";

  return (
    <>
      {/* // 사이드바 */}
      <SideBar aria-label="Sidebar"
        className='hidden sidebar md:block pt-[var(--navbar-height)] h-screen
      w-[290px] md:w-[290px] lg:w-[290px] overflow-x-hidden transition-transform 
      duration-300 ease-in-out z-5 bg-gray-50 dark:bg-gray-800
      fixed left-0 top-0 shadow-inner
      '>
        <div className="overflow-y-auto py-4 rounded ">
          <div className='space-y-4 md:space-y-6 mt-6'>
            <div className='px-2 sm:px-4'>
              <ProgressBar />
            </div>
            <div id="profile" className="space-y-3 flex flex-col w-[62px] h-[118px] mx-auto">
              <div className='w-[62px] h-[62px]'>
                <ImageWrapper className='w-[62px] h-[62px]'>
                  <Image
                    className="object-cover rounded-[12px] mx-auto"
                    src={user?.avatar || profilePic}
                    // layout="fill"
                    width={62}
                    height={62}
                    unoptimized
                    alt="avatar">
                  </Image>
                </ImageWrapper>
              </div>
              <div>
                <h2
                  className="font-medium text-md md:text-lg text-center text-[#1890FF]"
                >
                  {user?.username}
                </h2>
                <p className="text-sm md:text-md text-gray-500 text-center">{(() => {
                  switch (parseInt(user?.purpose)) {
                    case 1: return (<span className="">기업담당자</span>)
                    case 2: return (<span className="">구직자</span>)
                    case 3: return (<span className="">예비구직자</span>)
                    case 4: return (<span className="">관찰자</span>)
                    default: null;
                  }
                })(parseInt(user?.purpose))}</p>
              </div>

            </div>
            {user?.purpose !== 1 &&
              <div className='space-y-2 mx-2'>
                <div className='font-semibold flex flex-row text-sm buttongroup bg-[#efeff2] rounded-xl p-[4px] text-gray-600 shadow-[inset 0px 2px 3px rgb(0 0 0 / 12%)]'>
                  <button
                    className={`w-full hover:bg-gray-200 hover:text-black py-2 ${user?.purpose == 2 ? "disable text-white font-bold bg-[#1890FF] shadow-md" : "visible"} rounded-lg `}
                    onClick={() => onClickPurpose(2)}>
                    <span>구직자</span>
                    <p className={`text-xs text-cyan-500 ${user?.purpose == 2 ? "text-cyan-100" : ""}`}>구직중</p>
                  </button>
                  <button
                    className={`w-full hover:bg-gray-200 hover:text-black py-2 ${user?.purpose == 3 ? "disable text-white font-bold bg-[#1890FF] shadow-md" : "visible"} rounded-lg `}
                    onClick={() => onClickPurpose(3)}>
                    <span>학습생</span>
                    <p className={`text-xs text-cyan-500 ${user?.purpose == 3 ? "text-cyan-100" : ""}`}>향후 구직예정</p>
                  </button>
                  <button
                    className={`w-full hover:bg-gray-200 hover:text-black py-2 ${user?.purpose == 4 ? "disable text-white font-bold bg-[#1890FF] shadow-md" : "visible"} rounded-lg `}
                    onClick={() => onClickPurpose(4)}>
                    <span>관찰자</span>
                    <p className={`text-xs text-red-500 ${user?.purpose == 4 ? "text-red-100" : ""}`}>프로필 비공개</p>
                  </button>
                </div>
              </div>
            }
            <ul className="space-y-2">

              <li>
                <div className={`flex items-center justify-between p-2 py-3 text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/profile" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0' href="/profile">
                    <a className={`w-full flex flex-row justify-center items-center ${router.pathname === "/profile" ? "text-gray-700" : "text-gray-500"}`}>
                      <svg aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">대시보드(카테고리)</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`flex items-center justify-between p-2 text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/profile/resume" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0 ' href="/profile/resume">
                    <a className={`w-full flex flex-row justify-center items-center ${router.pathname === "/profile/resume" ? "text-gray-700" : "text-gray-500"}`}>
                      <MdDocumentScanner
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></MdDocumentScanner>
                      <span className="flex-1 ml-3 whitespace-nowrap">이력서</span>
                    </a>
                  </Link>
                  <button onClick={() => setResumeOpen(prev => !prev)} className="w-8 h-8 inline-flex justify-center z-1 hover:bg-gray-300 p-2 rounded-full items-center text-md font-medium text-gray-400 dark:bg-gray-700 dark:text-gray-300">
                    <FaAngleDown className='w-4 h-4' />
                  </button>
                </div>
              </li>
              {resumeOpen && router?.pathname === "/profile/resume" &&
                <div
                  enter-active-class="transition ease-out duration-100"
                  enter-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                  className='duration-300 ease-in-out transition-all
              '>
                  <li >
                    <button
                      onClick={onMoveToElement1}
                      className="w-full text-left flex items-center pl-4 py-3 text-[14px] font-normal text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="ml-3">기본정보</span>
                    </button>
                  </li>
                  <li >
                    <button
                      onClick={onMoveToElement2}
                      className="w-full text-left flex items-center pl-4 py-3 text-[14px] font-normal text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="flex-1 ml-3 whitespace-nowrap">경력정보</span>
                      {/* <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                    </button>
                  </li>
                  <li >
                    <button
                      onClick={onMoveToElement3}
                      className="w-full text-left flex items-center pl-4 py-3 text-[14px] font-normal text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="flex-1 ml-3 whitespace-nowrap">학력정보</span>
                      {/* <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span> */}
                    </button>
                  </li>
                  <li >
                    <button
                      onClick={onMoveToElement4}
                      className="w-full text-left flex items-center pl-4 py-3 text-[14px] font-normal text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="flex-1 ml-3 whitespace-nowrap">스킬정보</span>
                      {/* <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span> */}
                    </button>
                  </li>
                  <li >
                    <button
                      onClick={onMoveToElement5}
                      className="w-full text-left flex items-center pl-4 py-3 text-[14px] font-normal text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="flex-1 ml-3 whitespace-nowrap">업무스타일</span>
                    </button>
                  </li>
                  <li >
                    <button
                      onClick={onMoveToElement6}
                      className="w-full text-left flex items-center pl-4 py-3 text-[14px] font-normal text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="flex-1 ml-3 whitespace-nowrap">부가정보</span>
                    </button>
                  </li>
                </div>
              }
            </ul>


            {!user?.companycomplete ?
              <div className='w-full my-1 text-gray-500 text-base'>
                <button
                  onClick={openIntroModal}
                  className='flex flex-row px-6 py-2 border-gray-400 border-[1px] border-solid rounded-full hover:bg-gray-100 mx-auto items-center'
                ><BiTransfer className='mr-0.5' />그룹회원으로 변경</button>
              </div>
              :
              <div className='w-full my-1 text-gray-500 text-base'>
                <button
                  onClick={goGroup}
                  className='flex flex-row px-6 py-2 border-gray-400 border-[1px] border-solid rounded-full hover:bg-gray-100 mx-auto items-center'
                ><BiTransfer className='mr-0.5' />그룹페이지</button>
              </div>
            }
          </div>
        </div>
      </SideBar>



      {/* // Bottom Bar */}
      <BottomBar aria-label="Bottombar"
        className='block md:hidden w-full overflow-y-hidden transition-transform 
      duration-300 ease-in-out z-10 bg-gray-50 dark:bg-gray-800
      fixed left-0 bottom-0 right-0 drop-shadow-xl
      '>
        <div className="overflow-y-auto rounded ">
          <div className=''>

            <ul className="flex flex-row items-center justify-between">

              <li>
                <div className={`flex items-center justify-between py-[4px] px-6 rounded-lg my-1 text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/profile" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0' href="/profile">
                    <a className={`w-full flex flex-col justify-center items-center ${router.pathname === "/profile" ? "text-gray-700" : "text-gray-500"}`}>
                      <svg aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                      <span className="flex-1 whitespace-nowrap">대시보드</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`flex items-center justify-between py-[4px] px-6 rounded-lg my-1 text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/profile/resume" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0 ' href="/profile/resume">
                    <a className={`w-full flex flex-col justify-center items-center ${router.pathname === "/profile/resume" ? "text-gray-700" : "text-gray-500"}`}>
                      <MdDocumentScanner
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></MdDocumentScanner>
                      <span className="flex-1 whitespace-nowrap">이력서</span>
                    </a>
                  </Link>
                </div>
              </li>
              {/* {resumeOpen && router?.pathname === "/profile/resume" &&
                <div
                  enter-active-class="transition ease-out duration-100"
                  enter-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                  className='duration-300 ease-in-out transition-all
              '>
                  <li >
                    <button
                      onClick={onMoveToElement1}
                      className="w-full text-left flex items-center pl-4 py-3 text-[14px] font-normal text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="ml-3">기본정보</span>
                    </button>
                  </li>
                  <li >
                    <button
                      onClick={onMoveToElement2}
                      className="w-full text-left flex items-center pl-4 py-3 text-[14px] font-normal text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="flex-1 ml-3 whitespace-nowrap">경력정보</span>
                    </button>
                  </li>
                  <li >
                    <button
                      onClick={onMoveToElement3}
                      className="w-full text-left flex items-center pl-4 py-3 text-[14px] font-normal text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="flex-1 ml-3 whitespace-nowrap">학력정보</span>
                    </button>
                  </li>
                  <li >
                    <button
                      onClick={onMoveToElement4}
                      className="w-full text-left flex items-center pl-4 py-3 text-[14px] font-normal text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="flex-1 ml-3 whitespace-nowrap">스킬정보</span>
                    </button>
                  </li>
                  <li >
                    <button
                      onClick={onMoveToElement5}
                      className="w-full text-left flex items-center pl-4 py-3 text-[14px] font-normal text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="flex-1 ml-3 whitespace-nowrap">업무스타일</span>
                    </button>
                  </li>
                  <li >
                    <button
                      onClick={onMoveToElement6}
                      className="w-full text-left flex items-center pl-4 py-3 text-[14px] font-normal text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="flex-1 ml-3 whitespace-nowrap">부가정보</span>
                    </button>
                  </li>
                </div>
              } */}


              {!user?.companycomplete ?
                <div className='w-full my-1 text-gray-500 text-base'>
                  <button
                    onClick={openIntroModal}
                    className='flex flex-row px-6 py-2 border-gray-400 border-[1px] border-solid rounded-full hover:bg-gray-100 mx-auto items-center'
                  ><BiTransfer className='mr-0.5' />그룹회원으로 변경</button>
                </div>
                :
                <div className='w-full my-1 text-gray-500 text-base'>
                  <button
                    onClick={goGroup}
                    className='flex flex-row px-6 py-2 border-gray-400 border-[1px] border-solid rounded-full hover:bg-gray-100 mx-auto items-center'
                  ><BiTransfer className='mr-0.5' />그룹페이지</button>
                </div>
              }
            </ul>
          </div>
        </div>
      </BottomBar>

      <IntroModal
        introModalOpened={introModalOpened}
        closeIntroModal={closeIntroModal}
      />
    </>
  );
};



export default index;