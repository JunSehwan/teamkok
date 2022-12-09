/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [status, setStatus] = useState(true);
  const menuItems = [
    { name: 'NEXTPUS?', path: '/about', current: router.pathname === "/about" ? true : false },
    { name: '이용약관', path: '/about/Service', current: router.pathname === "/about/Service" ? true : false },
    { name: '개인정보방침', path: '/about/Privacy', current: router.pathname === "/about/Privacy" ? true : false },
  ]
  const changeCurrentStatus = (name) => {
    for (let i = 0; i < menuItems.length; i += 1) {
      if (menuItems[i].name === name) {
        menuItems[i].current = true;
      } else {
        menuItems[i].current = false;
      }
    }
    setStatus(!status);
    setMobileMenu(false);
  };

  return (
    <header
      className={`flex flex-row z-10 bg-[rgb(1 42 74/1)] px-4 py-4 ${mobileMenu ? 'h-screen' : 'h-fit'} fixed top-0 w-full shadow-lg md:flex-row md:justify-between md:px-12 md:h-fit items-center sm:justify-between flex-row`}
    >
      <nav className='flex flex-row justify-between items-center w-full'>
        <Link href="/about">
          <a className="text-xl">
            <img className='object-contain w-[52px] h-[52px]' src="/logo/jobcoc_logo_white.png" alt="" />
          </a>
        </Link>
        {/* 모바일 */}
        <div className="text-gray-300 md:hidden mobile-btns">
          <button
            type="button"
            className={classNames(!mobileMenu ? 'block' : 'hidden')}
            onClick={() => setMobileMenu(true)}
          >
            <BiMenuAltRight className="h-8 mr-2" />
          </button>
          <button type="button" className={classNames(mobileMenu ? 'block' : 'hidden')} onClick={() => setMobileMenu(false)}>
            <AiOutlineClose className="h-8 mr-2" />
          </button>
        </div>


        {/* 데스크탑 */}
        <div className={classNames(mobileMenu ? 'block' : 'hidden', 'md:block')}>
          <ul className="flex flex-col gap-8 items-center md:flex-row">
            {
              menuItems?.map((item) => (
                <li key={item?.name}>
                  <Link href={item?.path}>
                    <a
                      onClick={() => changeCurrentStatus(item?.name)}
                      href={item?.path}
                      className={classNames(
                        item?.current
                          ? 'border-b-2 border-gray-300 text-gray-300 pb-1'
                          : 'text-sky-400',
                        'text-lg hover:text-gray-300',
                      )}
                      aria-current={item?.current ? 'page' : undefined}
                    >
                      {item?.name}
                    </a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </nav>

    </header>
  );
};

export default Header;