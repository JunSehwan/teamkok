import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MdDocumentScanner, MdSpaceDashboard } from 'react-icons/md';
import { FaAngleDown, FaBuilding } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineComment } from 'react-icons/ai';
import { TbHandFinger } from 'react-icons/tb';
import { BsFillPersonBadgeFill } from 'react-icons/bs';


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
) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const notify = () => toast("업데이트 성공");


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
          <div className='space-y-4 md:space-y-6'>

            <ul className="space-y-0.5">

              <li>
                <div className={`flex items-center justify-between text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/dashboard" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0' href="/dashboard">
                    <a className={`w-full flex flex-row justify-center p-2 py-3 items-center ${router.pathname === "/dashboard" ? "text-gray-700" : "text-gray-500"}`}>
                      <MdSpaceDashboard
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></MdSpaceDashboard>
                      <span className="flex-1 ml-3 whitespace-nowrap">대시보드</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`flex items-center justify-between text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/dashboard/joboffer" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0 ' href="/dashboard/joboffer">
                    <a className={`pl-6 w-full flex flex-row justify-center p-2 py-3 items-center ${router.pathname === "/dashboard/joboffer" ? "text-gray-700" : "text-gray-500"}`}>
                      <BsFillPersonBadgeFill
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></BsFillPersonBadgeFill>
                      <span className="flex-1 ml-3 whitespace-nowrap">입사제안</span>
                    </a>
                  </Link>
                  {/* <button onClick={() => setResumeOpen(prev => !prev)} className="w-8 h-8 inline-flex justify-center z-1 hover:bg-gray-300 p-2 rounded-full items-center text-md font-medium text-gray-400 dark:bg-gray-700 dark:text-gray-300">
                    <FaAngleDown className='w-4 h-4' />
                  </button> */}
                </div>
              </li>
              <li>
                <div className={`flex items-center justify-between text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/dashboard/coccoc" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0 ' href="/dashboard/coccoc">
                    <a className={`pl-6 w-full flex flex-row justify-center p-2 py-3 items-center ${router.pathname === "/dashboard/coccoc" ? "text-gray-700" : "text-gray-500"}`}>
                      <TbHandFinger
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></TbHandFinger>
                      <span className="flex-1 ml-3 whitespace-nowrap">콕!콕!</span>
                    </a>
                  </Link>
                  {/* <button onClick={() => setResumeOpen(prev => !prev)} className="w-8 h-8 inline-flex justify-center z-1 hover:bg-gray-300 p-2 rounded-full items-center text-md font-medium text-gray-400 dark:bg-gray-700 dark:text-gray-300">
                    <FaAngleDown className='w-4 h-4' />
                  </button> */}
                </div>
              </li>
              <li>
                <div className={`flex items-center justify-between text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/dashboard/advice" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0 ' href="/dashboard/advice">
                    <a className={`pl-6 w-full flex flex-row justify-center p-2 py-3 items-center ${router.pathname === "/dashboard/advice" ? "text-gray-700" : "text-gray-500"}`}>
                      <AiOutlineComment
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></AiOutlineComment>
                      <span className="flex-1 ml-3 whitespace-nowrap">SPEC조언</span>
                    </a>
                  </Link>
                  {/* <button onClick={() => setResumeOpen(prev => !prev)} className="w-8 h-8 inline-flex justify-center z-1 hover:bg-gray-300 p-2 rounded-full items-center text-md font-medium text-gray-400 dark:bg-gray-700 dark:text-gray-300">
                    <FaAngleDown className='w-4 h-4' />
                  </button> */}
                </div>
              </li>
              {user?.purpose === 4 && (<></>)}
              <li>
                <div className={`flex items-center justify-between text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/dashboard/group" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0 ' href="/dashboard/group">
                    <a className={`pl-6 w-full flex flex-row justify-center p-2 py-3 items-center ${router.pathname === "/dashboard/group" ? "text-gray-700" : "text-gray-500"}`}>
                      <FaBuilding
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></FaBuilding>
                      <span className="flex-1 ml-3 whitespace-nowrap">그룹페이지</span>
                    </a>
                  </Link>
                  {/* <button onClick={() => setResumeOpen(prev => !prev)} className="w-8 h-8 inline-flex justify-center z-1 hover:bg-gray-300 p-2 rounded-full items-center text-md font-medium text-gray-400 dark:bg-gray-700 dark:text-gray-300">
                    <FaAngleDown className='w-4 h-4' />
                  </button> */}
                </div>
              </li>
            </ul>
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

            <ul className="flex flex-row items-center justify-around">

              <li>
                <div className={`flex items-center min-w-[68px] justify-between py-[4px] px-2 sm:px-6 rounded-lg my-1 text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/dashboard" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0' href="/dashboard">
                    <a className={`w-full flex flex-col justify-center gap-2 items-center ${router.pathname === "/dashboard" ? "text-gray-700" : "text-gray-500"}`}>
                      <MdSpaceDashboard
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></MdSpaceDashboard>
                      <span className="flex-1 whitespace-nowrap">대시보드</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`flex items-center min-w-[68px] justify-between py-[4px] px-2 sm:px-6 rounded-lg my-1 text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/dashboard/joboffer" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0 ' href="/dashboard/joboffer">
                    <a className={`w-full flex flex-col justify-center gap-2 items-center ${router.pathname === "/dashboard/joboffer" ? "text-gray-700" : "text-gray-500"}`}>
                      <BsFillPersonBadgeFill
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></BsFillPersonBadgeFill>
                      <span className="flex-1 whitespace-nowrap">입사제안</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`flex items-center min-w-[68px] justify-between py-[4px] px-2 sm:px-6 rounded-lg my-1 text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/dashboard/coccoc" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0 ' href="/dashboard/coccoc">
                    <a className={`w-full flex flex-col justify-center gap-2 items-center ${router.pathname === "/dashboard/coccoc" ? "text-gray-700" : "text-gray-500"}`}>
                      <TbHandFinger
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></TbHandFinger>
                      <span className="flex-1 whitespace-nowrap">콕!콕!</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`flex items-center min-w-[68px] justify-between py-[4px] px-2 sm:px-6 rounded-lg my-1 text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/dashboard/advice" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0 ' href="/dashboard/advice">
                    <a className={`w-full flex flex-col justify-center gap-2 items-center ${router.pathname === "/dashboard/advice" ? "text-gray-700" : "text-gray-500"}`}>
                      <AiOutlineComment
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></AiOutlineComment>
                      <span className="flex-1 whitespace-nowrap">SPEC조언</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`flex items-center min-w-[68px] justify-between py-[4px] px-2 sm:px-6 rounded-lg my-1 text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/dashboard/group" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0 ' href="/dashboard/group">
                    <a className={`w-full flex flex-col justify-center gap-2 items-center ${router.pathname === "/dashboard/group" ? "text-gray-700" : "text-gray-500"}`}>
                      <FaBuilding
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></FaBuilding>
                      <span className="flex-1 whitespace-nowrap">그룹페이지</span>
                    </a>
                  </Link>
                </div>
              </li>


            </ul>
          </div>
        </div>
      </BottomBar>


    </>
  );
};



export default index;