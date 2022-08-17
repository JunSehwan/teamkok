import React from 'react';

const Header = () => {
  return (
    <>
      <div className="flex space-x-2 dark:text-white text-violet-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="lg:text-xl text-lg lg:leading-6 leading-5 font-medium">참여자 리스트</p>
      </div>
      <div className="h-[1px] w-[100%] bg-gray-200 mx-auto mt-3 my-8 " />
    </>
  );
};

export default Header;