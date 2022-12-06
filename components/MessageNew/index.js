import React from 'react';
import SideBar from "./SideBar";
import Main from "./Main";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex h-[100vh] bg-[#F3F2EF]">
        <div className='pt-[var(--navbar-height)] flex xl:w-[1200px] lg:w-[960px] md:w-[720px] sm:w-[520px] w-full mx-auto'>
          <div className='mb-0 mt-[2.4rem] w-full'>
            <div className='min-h-[350px] rounded-t-lg mb-0 bg-white shadow relative w-full h-full'>
              <div className='flex h-full overflow-hidden w-full'>
                <SideBar />
                <Main />
              </div>
            </div>
          </div>
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