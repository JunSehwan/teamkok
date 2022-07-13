import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import logo from 'public/logo/teamkok.png';
import RegisterModal from '../Register/RegisterModal';
import Link from 'next/link';
import { auth } from 'firebaseConfig';
import { useSelector } from 'react-redux';
import AlertModal from 'components/Common/AlertModal';

const NavbarWithoutUser = () => {

  const me = auth.currentUser;
  const { signUpSuccess } = useSelector(state => state.user);
  console.log("signUpSuccess", signUpSuccess);


  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const closeConfirmModal = () => {
    setOpenConfirmModal(false);
  }
  const startConfirmModal = useCallback(() => {
    setOpenConfirmModal(true);
    console.log(openConfirmModal, "작동하나?");
  }, [openConfirmModal]);
  console.log(openConfirmModal, "openConfirmModal");

  useEffect(() => {
    if (signUpSuccess) {
      startConfirmModal();
    }

  })

  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const handleCancel = () => { setOpen(false); };
  const handleOpen = () => { setOpen(true); };

  const handleCancelModal = () => { setOpenModal(false); };
  const handleOpenModal = () => { setOpenModal(true); };

  const onClickLogin = useCallback(() => {
    setTabIndex(2);
    setOpenModal(true);
  }, [])

  const onClickSignup = useCallback(() => {
    setTabIndex(1);
    setOpenModal(true);
  }, [])




  return (
    <>
      <nav className="fixed z-10 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
      
              <Link href="/"><a>
                <span className="sr-only">TEAMKOK</span>
                <Image
                  src={logo}
                  width={32}
                  alt="logo"
                  height={32}
                />
              </a></Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <button type="button" onClick={handleOpen} className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                <span className="sr-only">Open menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <button
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                onClick={onClickLogin}
              >
                로그인
              </button>
              <button
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white
                    bg-purple-600
                    hover:bg-purple-700
                  focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-purple-800 active:shadow-lg"
                onClick={onClickSignup}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 화면 */}
        {open &&
          <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Image
                      src={logo}
                      width={32}
                      alt="TEAMKOK_LOGO"
                      height={32}
                    />
                  </div>
                  <div className="-mr-2">
                    <button type="button" onClick={handleCancel} className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
              <div className="py-6 px-5 space-y-6">

                <div>
                  <a href="#" className="
                  w-full flex items-center justify-center
                   px-4 py-2 border border-transparent 
                   rounded-md shadow-sm text-base
                    text-white
                    font-bold
                    bg-purple-600
                    hover:bg-purple-700
                  focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-purple-800 active:shadow-lg
                   "
                    onClick={onClickSignup}
                  > 회원가입 </a>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    {/* Existing customer? */}
                    <a href="#"
                      className="
                    text-purple-700 hover:text-purple-600"
                      onClick={onClickLogin}
                    > 로그인 </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      </nav>
      {openConfirmModal ?
        <AlertModal
          title="TEAMKOK 회원가입 성공!"
          contents="이제부터 다양한 팀의 활동내용을 찾아볼 수 있습니다."
          contents_second="프로필 > 기본정보와 스타일 정보를 입력하시면 현직자와의 1:1대화 및 채용제안을 받으실 수 있습니다."
          closeOutsideClick={true}
          openModal={true}
          closeModal={closeConfirmModal}
        /> : null
      }
      <RegisterModal
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleOpenModal={handleOpenModal}
        handleCancelModal={handleCancelModal} />
    </>
  );
};

export default NavbarWithoutUser;