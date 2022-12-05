import React from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import LeftBar from './LeftBar';
import Main from './Main';
import JobOffer from './JobOffer';
import Coccoc from './Coccoc';
import Advice from './Advice';
import Group from './Group';


const index = () => {
  const router = useRouter();


  return (
    <>
      <div className='flex h-[100vh]'>
        <LeftBar

        />
        <div className='ml-0 md:ml-[289px] w-full max-w-[1200px]'>
          {router?.pathname === "/dashboard" ? <Main />
            : router?.pathname === "/dashboard/joboffer" ? <JobOffer />
            : router?.pathname === "/dashboard/coccoc" ? <Coccoc />
            : router?.pathname === "/dashboard/advice" ? <Advice />
            : router?.pathname === "/dashboard/group" ? <Group />
              : null
          }
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