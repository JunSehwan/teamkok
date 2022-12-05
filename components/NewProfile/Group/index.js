import React from 'react';
import Logo from './Logo';
import styled, { css, keyframes } from 'styled-components';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/router';
import GroupBasicInfo from './GroupBasicInfo';
import GroupAdditionalInfo from './GroupAdditionalInfo';
import { Toaster } from 'react-hot-toast';
const index = () => {
  const router = useRouter();

  const handleCloseMadal = () => {
    //새로 추가 (하나 전으로 돌아가기)
    router.back();
  }


  return (
    <>
      <Page className='pt-[var(--navbar-height)] pb-[70px] md:pb-auto' >
        <div className='py-4 md:px-4'>
          <div className='mx-auto text-left max-w-[1200px]'>
            <div className='w-max'>
              <div className='flex justify-start items-center'>
                <button className="text-gray-600 p-3 rounded-full hover:bg-gray-100"
                  onClick={handleCloseMadal}
                >
                  <IoMdArrowRoundBack className='w-6 h-6' />
                </button>
              </div>
            </div>

            <Logo />
            <GroupBasicInfo />
            <GroupAdditionalInfo />

          </div>
        </div>
      </Page>
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


const Page = styled.div`

`;

export default index;