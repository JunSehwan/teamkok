import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { uploadLogoPreviewOnboard, saveCompanyLogoChangesOnboard } from 'firebaseConfig';
import {
  patchCompanylogoPreview,
  patchCompanylogo,
  patchCompanylogoFalse,
} from 'slices/user';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import companyPic from 'public/image/company.png';


const Logo = () => {
  const { user, companylogoPreview, patchCompanylogoDone } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const notify = () => toast('업데이트 완료');
  function removeLogo() {
    dispatch(patchCompanylogoPreview(""));
  }

  async function changeLogo(e) {
    if (!e.target.files || e.target.files?.length === 0) return;
    const logoImage = e.target.files[0];
    const logoPreviewURL = await uploadLogoPreviewOnboard(logoImage, user?.userID);
    dispatch(patchCompanylogoPreview(logoPreviewURL));
  }

  const onClickUpdate = useCallback(async () => {

    await saveCompanyLogoChangesOnboard(companylogoPreview, user?.userID);
    dispatch(patchCompanylogo(companylogoPreview))
  }, [companylogoPreview, dispatch, user?.userID])


  useEffect(() => {
    if (patchCompanylogoDone) {
      notify();
      dispatch(patchCompanylogoFalse());
    }
  }, [dispatch, patchCompanylogoDone])

  return (
    <>
      <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 my-4 w-full pl-2'>
        팀의 이미지</h3>
      <p className='ml-2 my-1 text-gray-500 text-[1.2rem] leading-8'>팀을 대표할 수 있는 이미지 또는 로고를 업로드해주세요.</p>

      <div className='relative flex justify-center w-[162px] mx-auto mt-4 border-white rounded-[12px] group'>
        <div className="w-[162px] h-[162px]">
          <ImageWrapper>
            <Image
              className="absolute object-contain rounded-[12px] mx-auto cursor-pointer w-[162px] h-[162px]"
              src={companylogoPreview || user?.companylogo || companyPic}
              width={180}
              height={180}
              unoptimized
              alt="BoardLogo picture">
            </Image>

          </ImageWrapper>
        </div>

      </div>

      <label htmlFor="fileInput" className="flex flex-col items-center justify-center mt-6 h-46 w-full mx-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-3 pb-4">
          <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, JPEG</p>
        </div>
        <input
          className='absolute hidden top-0 left-0 w-full h-full text-[0px] cursor-pointer pointer-events-auto rounded file:w-full file:h-full file:border-0'
          onChange={changeLogo}
          type="file"
          accept=".svg, .png, .jpg, .jpeg"
          id="fileInput" />
      </label>
      <div className='mt-3 pb-3 border-b flex items-center justify-between flex-row'>
        <div className='w-max flex justify-start'>
          <button
            className='w-max px-4 py-0.5 rounded-[24px] bg-white text-sm text-gray-500 font-medium rounded-middle underline'
            onClick={removeLogo}>
            로고제거
          </button>
        </div>

        <div className="w-full justify-end flex items-center">
          <button onClick={onClickUpdate}
            className="my-2 px-6 text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg">
            로고 업데이트</button>
        </div>
      </div>
    </>
  );
};

const ImageWrapper = styled.div`
width: 100%;
border-radius: 8px;
justify-content: center;
margin: 0 auto;
min-height: 162px;

& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 162px !important;
  }
}
`

export default Logo;