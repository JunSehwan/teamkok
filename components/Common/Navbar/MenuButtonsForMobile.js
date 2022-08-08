import { useState } from 'react';
import AuthModalOpenButton from './AuthModalOpenButton';
import HamburgerMenuButton from './HamburgerMenuButton';
import Link from 'next/link';
import LogoButton from './LogoButton';

function MobileMenuDropdownWrapper({ children }) {
  return (
    <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
        {children}
      </div>
    </div>
  )
}

function MobileMenuHeader({ closeMenu }) {
  return (
    <div className="pt-4 pb-4 px-4">
      <div className="flex items-center justify-between">
        <div>
          <LogoButton />
        </div>
        <div className="-mr-2">
          <button
            type="button"
            onClick={closeMenu}
            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MenuButtonsForMobile({
  user,
  authModalHandler,
  logoutModalHandler
}) {
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  return (
    <>
      <HamburgerMenuButton
        onclick={() => setShowMobileDropdown(true)}
      />
      {showMobileDropdown && (
        <MobileMenuDropdownWrapper>
          <MobileMenuHeader closeMenu={() => setShowMobileDropdown(false)} />
          <div className="pb-6 pt-0 px-3 space-y-6">
            {!user ? (
              <>
                <AuthModalOpenButton
                  text="로그인"
                  onclick={() => {
                    setShowMobileDropdown(false)
                    authModalHandler(2)
                  }}
                  isMobile={true} />
                <AuthModalOpenButton
                  text="회원가입"
                  onclick={() => {
                    setShowMobileDropdown(false)
                    authModalHandler(1)
                  }}
                  isMobile={true} />
              </>
            ) : (
              <>
                <ul className="mt-2 mb-2 space-y-2 tracking-wide">
                  <li className="min-w-max">
                    <Link href="/profile">
                      <a
                        aria-label="dashboard"
                        className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            className="fill-current text-gray-600 group-hover:text-cyan-600"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                          />
                        </svg>
                        <span className="group-hover:text-gray-700">
                          내 프로필
                        </span>
                      </a>
                    </Link>
                  </li>
                  <li className="min-w-max">
                    <Link href="/favorite">
                      <a className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            className="fill-current text-gray-300 group-hover:text-cyan-300"
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                            clipRule="evenodd"
                          />
                          <path
                            className="fill-current text-gray-600 group-hover:text-cyan-600"
                            d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                          />
                        </svg>
                        <span className="group-hover:text-gray-700">
                          참여기업
                        </span>
                      </a>
                    </Link>
                  </li>
                  <li className="min-w-max">
                    <Link href="/board/add">
                      <a className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            className="fill-current text-gray-600 group-hover:text-cyan-600"
                            fillRule="evenodd"
                            d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                            clipRule="evenodd"
                          />
                          <path
                            className="fill-current text-gray-300 group-hover:text-cyan-300"
                            d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                          />
                        </svg>
                        <span className="group-hover:text-gray-700">
                          기업보드 개설
                        </span>
                      </a>
                    </Link>
                  </li>
                  <li className="min-w-max">
                    <Link href="/message">
                      <a className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            className="fill-current text-gray-300 group-hover:text-cyan-300"
                            d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                          />
                          <path
                            className="fill-current text-gray-600 group-hover:text-cyan-600"
                            fillRule="evenodd"
                            d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="group-hover:text-gray-700">메시지</span>
                      </a>
                    </Link>
                  </li>
                </ul>
                <div className="flex items-center justify-end md:flex-1 lg:w-0">
                  <Link href="/">
                    <a className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="hover:fill-gray-800 fill-gray-600 h-8 w-8"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </a>
                  </Link>
                  <button onClick={() => logoutModalHandler(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-[8px] fill-gray-600 stroke-gray-600 h-8 w-8"
                      viewBox="0 0 20 20"
                      fill="currentColor" >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="ml-[12px]"></div>
                </div>
              </>
            )}
          </div>
        </MobileMenuDropdownWrapper>
      )}
    </>
  )
}
