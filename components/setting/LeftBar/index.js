import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RiLockPasswordFill } from 'react-icons/ri';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AiFillSetting, AiOutlineUserDelete } from 'react-icons/ai';


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
  const router = useRouter();


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
                 ${router.pathname === "/setting" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0' href="/setting">
                    <a className={`w-full flex flex-row justify-center p-2 py-3 items-center ${router.pathname === "/setting" ? "text-gray-700" : "text-gray-500"}`}>
                      <AiFillSetting
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></AiFillSetting>
                      <span className="flex-1 ml-3 whitespace-nowrap">계정설정</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`flex items-center justify-between text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/setting/password" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0' href="/setting/password">
                    <a className={`pl-6 w-full flex flex-row justify-center p-2 py-3 items-center ${router.pathname === "/setting/password" ? "text-gray-700" : "text-gray-500"}`}>
                      <RiLockPasswordFill
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></RiLockPasswordFill>
                      <span className="flex-1 ml-3 whitespace-nowrap">비밀번호 변경</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`flex items-center justify-between text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/setting/withdraw" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0 ' href="/setting/withdraw">
                    <a className={`pl-6 w-full flex flex-row justify-center p-2 py-3 withdraw-center ${router.pathname === "/setting/withdraw" ? "text-gray-700" : "text-gray-500"}`}>
                      <AiOutlineUserDelete
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></AiOutlineUserDelete>
                      <span className="flex-1 ml-3 whitespace-nowrap">회원탈퇴</span>
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
                 ${router.pathname === "/setting" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0' href="/setting">
                    <a className={`w-full flex flex-col justify-center gap-2 items-center ${router.pathname === "/setting" ? "text-gray-700" : "text-gray-500"}`}>
                      <AiFillSetting
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></AiFillSetting>
                      <span className="flex-1 whitespace-nowrap">계정설정</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`flex items-center min-w-[68px] justify-between py-[4px] px-2 sm:px-6 rounded-lg my-1 text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/setting/password" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0' href="/setting/password">
                    <a className={`w-full flex flex-col justify-center gap-2 items-center ${router.pathname === "/setting/password" ? "text-gray-700" : "text-gray-500"}`}>
                      <RiLockPasswordFill
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></RiLockPasswordFill>
                      <span className="flex-1 whitespace-nowrap">비밀번호 변경</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`flex items-center min-w-[68px] justify-between py-[4px] px-2 sm:px-6 rounded-lg my-1 text-[14px] font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                 ${router.pathname === "/setting/withdraw" ? "bg-slate-200" : "bg-transparent"}`}>
                  <Link className='flex-shrink-0 ' href="/setting/withdraw">
                    <a className={`w-full flex flex-col justify-center gap-2 items-center ${router.pathname === "/setting/withdraw" ? "text-gray-700" : "text-gray-500"}`}>
                      <AiOutlineUserDelete
                        className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      ></AiOutlineUserDelete>
                      <span className="flex-1 whitespace-nowrap">회원탈퇴</span>
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