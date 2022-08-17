import React from 'react';
import Header from './Header';
import Contents from './Contents';

const index = () => {
  return (
    <div className='max-w-[38rem] mx-auto w-[100%] mt-[3.2rem]'>
      <Header />
      <Contents />
    </div>
  );
};

export default index;