import React, { useEffect } from 'react';
import SideBar from "./SideBar";
import Main from "./Main";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
// import LeftBar from './LeftBar';
// import Main from './Main';
import { setAddDoneFalse, setAddSingoDoneFalse } from 'slices/section';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { addSingoDone } = useSelector(state => state.section);
  const addSingoNotify = () => toast('신고가 완료되었습니다. 해당 인물과의 대화에 대한 검토 후 적절한 처리가 이루어질 예정입니다.');
  useEffect(() => {
    if (addSingoDone) {
      addSingoNotify();
      dispatch(setAddSingoDoneFalse());
    }
  }, [dispatch, addSingoDone])
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