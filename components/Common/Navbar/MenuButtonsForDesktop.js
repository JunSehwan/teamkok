import { useState, createRef, useEffect } from 'react';
import AvartarButton from './Buttons/AvartarButton';
import DropdownMenu from './DropdownMenu';
import Link from 'next/link';
import AuthModalOpenButton from "./AuthModalOpenButton"

function DesktopMenuWrapper({ children }) {
  return (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 mt-[12px]">
      {children}
    </div>)
}

export default function MenuButtonsForDesktop({
  user,
  authModalHandler,
  logoutModalHandler
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const modalRef = createRef();
  const handleClickOutside = (e) => {
    if (
      showDropdown === true
      && !modalRef?.current?.contains(e.target)
    ) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  return (
    <DesktopMenuWrapper>
      {user ? (
        <>
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
          <Link href="/message">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-[8px] hover:fill-gray-800 fill-gray-600 h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
          </Link>
          <AvartarButton
            avartar={user.avartar}
            isDropdown={showDropdown}
            onclick={() => setShowDropdown(!showDropdown)} />
          {showDropdown &&
            <DropdownMenu
              user={user}
              modalRef={modalRef}
              showLogoutModal={logoutModalHandler} />}
        </>
      ) : (
        <>
          <AuthModalOpenButton
            text="로그인" onclick={() => authModalHandler(2)} />
          <AuthModalOpenButton
            text="회원가입" onclick={() => authModalHandler(1)} />
        </>
      )}
    </DesktopMenuWrapper>
  )
}
