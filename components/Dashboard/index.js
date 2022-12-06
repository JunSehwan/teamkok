import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import LeftBar from './LeftBar';
import Main from './Main';
import JobOffer from './JobOffer';
import Coccoc from './Coccoc';
import Advice from './Advice';
import Group from './Group';
import toast from 'react-hot-toast';
import { updateJobofferDoneFalse } from 'slices/joboffer';
import { updateCoccocDoneFalse } from 'slices/coccoc';

const index = () => {
  const router = useRouter();


  const dispatch = useDispatch();
  const { updateJobofferDone } = useSelector(state => state.joboffer);
  const { updateCoccocDone } = useSelector(state => state.coccoc);
  const updateNotify = () => toast('답변을 하였습니다.😀');
  useEffect(() => {
    if (updateJobofferDone) {
      updateNotify();
      dispatch(updateJobofferDoneFalse());
    }
  }, [dispatch, updateJobofferDone])
  const updateCoccocNotify = () => toast('답변을 하였습니다.😀');
  useEffect(() => {
    if (updateCoccocDone) {
      updateCoccocNotify();
      dispatch(updateCoccocDoneFalse());
    }
  }, [dispatch, updateCoccocDone])

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