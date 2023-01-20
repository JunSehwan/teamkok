import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
// import LeftBar from './LeftBar';
// import Main from './Main';

import dynamic from "next/dynamic";
// import Main from './Main'
const Main = dynamic(
  () => import('./Main'),
  { ssr: false }
)


const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { addDone } = useSelector(state => state.section);
  // const addNotify = () => toast('새로운 소식을 등록했습니다!😀');
  // useEffect(() => {
  //   if (addDone) {
  //     addNotify();
  //     dispatch(setAddDoneFalse());
  //   }
  // }, [dispatch, addDone])



  return (
    <>

      <div className='flex bg-[#F3F2EF] min-h-screen'>
        {/* 그룹추천 */}
        {/* <LeftBar
        /> */}
        {/* <div className='ml-0 md:ml-[289px] w-full max-w-[1200px]'> */}
        <div className='w-full max-w-[1200px] mx-auto'>
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