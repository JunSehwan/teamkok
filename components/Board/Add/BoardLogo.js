import React from 'react';
import Image from 'next/image';
import { setChangeLogoOpen, setBoardLogoPreview, setBoardLogo } from 'slices/board';
import { useDispatch, useSelector } from 'react-redux';
import { saveCompanyLogoChanges } from 'firebaseConfig';
import companyPic from 'public/image/company.png';

const BoardLogo = () => {

  const { user } = useSelector(state => state.user);
  const { logoPreview } = useSelector(state => state.board);
  const dispatch = useDispatch();


  function removeLogo() {
    // saveCompanyLogoChanges("");
    dispatch(setBoardLogoPreview(""));
  }


  return (
    <>
      <span className='banner bg-slate-500 h-15 rounded-t-lg' />
      <div className='relative flex justify-center border-[7px] border-white rounded-[12px] group'>
        <div className='absolute hidden w-[180px] h-full bg-black bg-opacity-50 rounded-[12px] z-10 group pointer-events-none group-hover:block'>
          <div className='absolute flex w-full justify-center h-full text-center items-center text-[14px] text-white font-bold'>
            <span className="text-center flex justify-center" >로고 변경</span>
          </div>
        </div>

        <Image
          className="object-contain rounded-[12px] cursor-pointer"
          onClick={() => dispatch(setChangeLogoOpen(true))}
          loader={() => board?.logo}
          src={logoPreview || companyPic}
          width={180}
          height={180}
          unoptimized
          alt="BoardLogo picture"
        />
      </div>

      <div className='mt-6 pb-6 border-b'>


        <div className='w-fit mx-auto'>
          <button className='w-fit h-8 px-4 py-0.5 rounded-[24px] bg-violet-500 text-white text-sm font-medium rounded-middle'
            onClick={() => dispatch(setChangeLogoOpen(true))}
          >
            로고변경
          </button>

          <button
            className='w-fit h-8 px-4 py-0.5 rounded-[24px] bg-white text-sm text-gray-500 font-medium rounded-middle'
            onClick={removeLogo}>
            로고제거
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardLogo;