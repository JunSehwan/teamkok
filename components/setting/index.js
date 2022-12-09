import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import LeftBar from './LeftBar';
import Main from './Main';
import Withdraw from './Withdraw';
import PasswordChange from './PasswordChange';
import toast from 'react-hot-toast';


const index = () => {
  const router = useRouter();


  const dispatch = useDispatch();
  // const { updateJobofferDone } = useSelector(state => state.joboffer);
  // const { updateCoccocDone } = useSelector(state => state.coccoc);
  // const updateNotify = () => toast('답변을 하였습니다.😀');
  // useEffect(() => {
  //   if (updateJobofferDone) {
  //     updateNotify();
  //     dispatch(updateJobofferDoneFalse());
  //   }
  // }, [dispatch, updateJobofferDone])
  // const updateCoccocNotify = () => toast('답변을 하였습니다.😀');
  // useEffect(() => {
  //   if (updateCoccocDone) {
  //     updateCoccocNotify();
  //     dispatch(updateCoccocDoneFalse());
  //   }
  // }, [dispatch, updateCoccocDone])

  return (
    <>
      <div className='flex h-[100vh]'>
        <LeftBar

        />
        <div className='ml-0 md:ml-[289px] w-full max-w-[1200px]'>
          {router?.pathname === "/setting" ? <Main />
            : router?.pathname === "/setting/password" ? <PasswordChange />
            : router?.pathname === "/setting/withdraw" ? <Withdraw />
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