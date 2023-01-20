import React from 'react';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import dynamic from "next/dynamic";
// import Main from './Main'
const Main = dynamic(
  () => import('./Main'),
  { ssr: false }
)
const index = () => {

  return (
    <>
      <div className='pt-[var(--navbar-height)] md:pb-auto' >
        <div className='mx-auto w-fit text-left pt-[5.4rem]'>
          <Main />
        </div>
      </div>
      <Toaster
        position='bottom-center'
        toastOptions={{
          //   className: '',
          style: {
            // border: '1px solid #713200',
            // padding: '16px',
            color: 'white',
            background: 'rgba(0,0,0,0.76)'
          },
        }}
      />
    </>
  );
};


export default index;