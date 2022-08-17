import React, { useEffect } from 'react';
import Header from './Header';
import Detail from './Detail';
import Lists from './Lists';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const index = () => {

  const { isExpert, isAdmin } = useSelector(state => state.user);

  return (
    <div className='bg-white max-w-full px-2 min-h-[calc(100vh-154px)] mt-4 mx-auto bg-transparent'>
      <Header />
      <Detail />
      <Lists />
    </div>
  );
};

export default index;