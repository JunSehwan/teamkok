import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { BiArrowBack } from 'react-icons/bi';

const TopBar = () => {
  const router = useRouter();
  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <button
      onClick={goBack}
      className='fixed top-[var(--navbar-height)] md:top-[calc(var(--navbar-height)+2.4rem)] ml-4 mt-4 p-2 bg-slate-500/40 rounded-full flex flex-row gap-2 justify-center items-center z-5 hover:text-gray-600  text-white'>
      <BiArrowBack className='w-6 h-6' />
    </button>
  );
};

export default TopBar;