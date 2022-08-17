import React, { useEffect, useState, useCallback, createRef } from 'react';
import Image from 'next/image';
import logo from '/public/logo/teamz.png';
import AuthModal from 'components/Auth/AuthModal';
import Link from 'next/link';
import { auth, logOut } from 'firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from 'components/Common/Modal/AlertModal';
import { closeSignupConfirmModal } from 'slices/user';
import { signOut } from 'slices/user';
import profilePic from '/public/image/icon/happiness.png';
import { useRouter } from 'next/router';
import { getJobofferedByUserId } from 'firebaseConfig';
import InformationModal from 'components/Common/Modal/InformationModal';

const Navbar = () => {
  const router = useRouter();
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    if (router?.pathname === "/about") {
      setDisplay(true);
    }
  }, [router?.pathname])
  const modalEl = createRef();
  const handleClickOutside = (event) => {
    if (toggle === true && !modalEl?.current?.contains(event.target))
      setToggle(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const dispatch = useDispatch();
  const { user, signUpSuccess } = useSelector(state => state.user);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const closeConfirmModal = () => {
    setOpenConfirmModal(false);
    dispatch(closeSignupConfirmModal());
  }

  const startConfirmModal = useCallback(() => {
    setOpenConfirmModal(true);
  }, []);

  useEffect(() => {
    if (signUpSuccess) {
      startConfirmModal();
    } else {
      setOpenConfirmModal(false);
    }

  }, [setOpenConfirmModal, signUpSuccess, startConfirmModal])

  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const handleCancel = () => { setOpen(false); };
  const handleOpen = () => { setOpen(true); };

  const handleCancelModal = () => { setOpenModal(false); };
  const handleOpenModal = () => { setOpenModal(true); };

  const [toggle, setToggle] = useState(false);
  const toggleDropdown = () => { setToggle(prev => !prev); };

  const onClickLogin = useCallback(() => {
    setTabIndex(2);
    setOpenModal(true);
  }, [])

  const [logoutConfirmModal, setLogoutConfirmModal] = useState(false);
  const openLogoutConformModal = () => { setLogoutConfirmModal(true) };
  const closeLogoutConformModal = () => { setLogoutConfirmModal(false) };
  const onClickLogout = useCallback(() => {
    setLogoutConfirmModal(true);
    setToggle(false);
    setOpen(false);
  }, [])

  const logoutConfirm = useCallback(async () => {
    const res = await logOut();
    dispatch(signOut({
    }));
    setLogoutConfirmModal(false);
  }, [dispatch])

  const onClickSignup = useCallback(() => {
    setTabIndex(1);
    setOpenModal(true);
  }, [])

  const onClickProfile = useCallback(() => {
    router.push("/profile");
    setToggle(false);
    setOpen(false);
  }, [router])

  const onClickAddBoard = useCallback(() => {
    router.push("/board/add");
    setToggle(false);
    setOpen(false);
  }, [router])

  const onClickFavorite = useCallback(() => {
    router.push("/favorite");
    setToggle(false);
    setOpen(false);
  }, [router])

  const onClickMessage = useCallback(() => {
    router.push("/message");
    setToggle(false);
    setOpen(false);
  }, [router])

  const [data, setData] = useState();
  useEffect(() => {
    async function fetchAndSetUser() {
      try {
        setData([]);
        const result = await getJobofferedByUserId(user?.userID);
        setData(result);
      } catch (e) {
        console.error(e);
      }
    }
    fetchAndSetUser();
  }, [user?.userID]);
  var findNotRead = data?.filter(obj => obj.read !== true);

  const [infoConfirm, setInfoConfirm] = useState(false);
  const closeInfoConfirm = useCallback(() => {
    setInfoConfirm(false);
  }, [])
  const openInfoConfirm = useCallback(() => {
    setInfoConfirm(true);
    setOpen(false);
  }, [])

  return (
    <>
      <AlertModal
        title="로그아웃"
        contents="정말 로그아웃을 하시겠습니까?"
        closeOutsideClick={false}
        openModal={logoutConfirmModal}
        closeModal={logoutConfirm}
        cancelFunc={closeLogoutConformModal}
        twobutton={true}
      />

      <nav className={`${display === "none" && "hidden"} fixed z-20 bg-white w-full shadow-sm`}>
        <div className="mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">

              <Link href="/"><a>
                <span className="sr-only">TEAMZ</span>
                <Image
                  src={logo}
                  width={76.48}
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

            {!user ?
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 mt-[12px]">
                <button
                  className="whitespace-nowrap px-4 py-2 border border-transparent rounded-md text-[0.88rem] font-medium text-gray-500 hover:text-gray-900
                hover:bg-gray-100
                focus:bg-gray-100 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-gray-200 active:shadow-lg
                "
                  onClick={onClickLogin}
                >
                  로그인
                </button>
                <button
                  className="ml-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-[0.88rem] font-medium text-white
                    bg-purple-600
                    hover:bg-purple-700
                  focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-purple-800 active:shadow-lg"
                  onClick={onClickSignup}
                >
                  회원가입
                </button>
              </div>
              :
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                {findNotRead && findNotRead?.length !== 0 && 
                <button onClick={onClickFavorite} className='p-0.5 text-white bg-red-500 flex mr-[-41px] mt-[-20px] z-10 text-center font-xs rounded-full w-[18px] h-[18px] items-center justify-center'>
                  {findNotRead?.length}</button>}

                <button className="mr-2" onClick={onClickFavorite}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-[8px] h-8 w-8 active:hover:fill-violet-600 fill-violet-200 stroke-violet-500 active:hover:stroke-violet-600 " viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </button>
                <button className="" onClick={openInfoConfirm}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 active:hover:text-violet-600 text-gray-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button onClick={onClickMessage}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-[8px] active:hover:fill-violet-600 fill-gray-600 h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </button>


                <button className="ml-[12px]"
                  onClick={toggleDropdown}
                >
                  {user?.avatar ? (
                    <Image
                      alt="avatar_user"
                      className="avatar w-7 h-8 rounded-md object-cover"
                      width={32} height={32}
                      unoptimized
                      src={user?.avatar} />
                  ) : (
                    <Image
                      alt="avatar_user"
                      className="shadow-inner avatar w-7 h-8 rounded-md object-cover"
                      src={profilePic}
                        unoptimized
                      width={32} height={32}
                    />
                  )}
                </button>

                {/* <!-- Dropdown menu --> */}
                {toggle &&
                  <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center ">
                    <div className="w-[100%] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                      <div ref={modalEl} className="absolute top-[60px] right-[2vw] z-20 w-72 py-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
                        <button onClick={onClickProfile} className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white text-left w-full">
                          {user?.avatar ?
                            <Image
                              className="flex-shrink-0 object-cover mx-1 mr-3 rounded-lg w-9 h-9 shadow-inner "
                              src={user?.avatar}
                              loader={() => user?.avatar || profilePic}
                              unoptimized
                              alt="avatar" width={40} height={40} />
                            :
                            <Image
                              className="flex-shrink-0 object-cover mx-1 mr-3 rounded-lg w-9 h-9"
                              src={profilePic}
                              alt="avatar" width={40} height={40} />
                          }
                          <div className="mx-1 w-full ml-3">
                            <h1 className="text-sm w-full whitespace-nowrap overflow-hidden overflow-ellipsis break-all font-semibold text-gray-700 dark:text-gray-200">{user?.username}</h1>
                            <p className="text-sm w-full whitespace-nowrap	overflow-hidden overflow-ellipsis break-all text-gray-500 dark:text-gray-400">{user?.email}</p>
                          </div>
                        </button>

                        <hr className="border-gray-200 dark:border-gray-700 " />
                        <button
                          onClick={onClickProfile}
                          className="text-left w-full font-bold block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                          👀 내 프로필
                        </button>
                        {/* <hr className="border-gray-200 dark:border-gray-700 " /> */}

                        {/* <button className="text-left w-full font-bold block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                          onClick={onClickFavorite}
                          >
                            💗 참여기업
                          </button> */}
                        <button
                          onClick={onClickAddBoard}
                          className="text-left w-full font-bold block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                          📝 기업보드 개설
                        </button>
                        <hr className="border-gray-200 dark:border-gray-700 " />
                        <Link href="/about">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-left w-full font-bold block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                            🔎 ABOUT
                          </a>
                        </Link>
                        <button onClick={onClickLogout} className="flex w-[100%] text-left px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white items-center flex-row">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 fill-gray-600 stroke-gray-600 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                          </svg>
                          <span>로그아웃</span>
                        </button>
                      </div>
                    </div>
                  </div>
                }

              </div>
            }


          </div>
        </div>

        {/* 모바일 화면 */}
        {open &&
          <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-4 pb-4 px-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Image
                      src={logo}
                      width={76.48}
                      alt="TEAMZ_LOGO"
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

              <div className="pb-6 pt-0 px-3 space-y-6">
                {!user ?
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
                    <div className="mt-3 text-center text-base font-medium text-gray-500 w-full">
                      {/* Existing customer? */}
                      <button
                        className="py-2 bg-purple-50 rounded-md
                      text-purple-700 hover:text-purple-600 w-full"
                        onClick={onClickLogin}
                      > 로그인 </button>
                    </div>
                  </div>
                  :
                  <div>
                    <ul className="mt-2 mb-2 space-y-2 tracking-wide">
                      <li className="min-w-max" key="profile">
                        <button onClick={onClickProfile} aria-label="dashboard" className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600 w-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path className="fill-current text-gray-600 group-hover:text-cyan-600" fillRule="evenodd" clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" />
                          </svg>
                          <span className="group-hover:text-gray-700">내 프로필</span>
                        </button>
                      </li>
                      <li className="min-w-max" key="favorite">
                        <button onClick={onClickFavorite} className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600 w-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path className="fill-current text-gray-300 group-hover:text-cyan-300" fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                            <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                          </svg>
                          <span className="group-hover:text-gray-700">참여기업</span>
                        </button>
                      </li>
                      <li className="min-w-max" key="board_add">
                        <button onClick={onClickAddBoard} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 w-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path className="fill-current text-gray-600 group-hover:text-cyan-600" fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                            <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                          </svg>
                          <span className="group-hover:text-gray-700">기업보드 개설</span>
                        </button>
                      </li>
                      <li className="min-w-max" key="message">
                        <button onClick={onClickMessage} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 w-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path className="fill-current text-gray-600 group-hover:text-cyan-600" fillRule="evenodd" d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" clipRule="evenodd" />
                          </svg>
                          <span className="group-hover:text-gray-700">메시지</span>
                        </button>
                      </li>
                    </ul>
                    <div className="flex items-center justify-end md:flex-1 lg:w-0">
                      <button className="" onClick={openInfoConfirm}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:text-violet-600 text-gray-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <Link href="/about">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="">
                          <svg xmlns="http://www.w3.org/2000/svg" className="ml-[8px] stroke-gray-600 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </a>
                      </Link>
                      <button onClick={onClickLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-[8px] fill-gray-600 stroke-gray-600 h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div className="ml-[12px]">

                      </div>
                    </div>
                  </div>
                }


              </div>
            </div>
          </div>
        }
      </nav>

      {display === false && <InformationModal
        infoConfirm={infoConfirm}
        closeInfoConfirm={closeInfoConfirm}
      />
      }
      {openConfirmModal ?
        <AlertModal
          title="TEAMZ 회원가입 성공!"
          contents="이제부터 다양한 팀의 활동내용을 찾아볼 수 있습니다."
          contents_second="프로필 > 기본정보와 스타일 정보를 입력하시면 현직자와의 1:1대화 및 채용제안을 받으실 수 있습니다."
          closeOutsideClick={true}
          openModal={true}
          twobutton={false}
          closeModal={closeConfirmModal}
        /> : null
      }
      <AuthModal
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleOpenModal={handleOpenModal}
        handleCancelModal={handleCancelModal} />
    </>
  );
};

export default Navbar;