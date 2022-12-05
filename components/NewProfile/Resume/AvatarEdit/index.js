import React, { useCallback, useState, useEffect } from 'react';
import { setUserAvatarPreview, setUserAvatar, updateAvatarDoneFalse } from 'slices/user';
import { saveUserAvatarChanges, uploadAvatar } from 'firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import profilePic from 'public/image/icon/happiness.png';
import Spin from 'components/Common/Spin';
import Thumbnail from './Thumbnail';

const index = () => {

  const { user, avatarPreview, updateAvatarDone } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const notify = () => toast('프로필 사진 업데이트 완료');
  const emptyValue = "";

  const removeAvatar = useCallback(async () => {
    dispatch(setUserAvatarPreview(""));
    await saveUserAvatarChanges(emptyValue);
    dispatch(setUserAvatar(emptyValue));
  }, [dispatch])

  const [imageUploading, setImageUploading] = useState(false);
  async function changeAvatar(e) {
    if (!e.target.files || e.target.files?.length === 0) return;
    setImageUploading(true);
    const avatarImage = e.target.files[0];
    const avatarURL = await uploadAvatar(avatarImage, user?.userID);
    dispatch(setUserAvatarPreview(avatarURL));
    setImageUploading(false);
  }

  const onClickUpdate = useCallback(async () => {
    await saveUserAvatarChanges(avatarPreview);
    dispatch(setUserAvatar(avatarPreview));
  }, [avatarPreview, dispatch])


  useEffect(() => {
    if (updateAvatarDone) {
      notify();
      dispatch(updateAvatarDoneFalse());
    }
  }, [dispatch, updateAvatarDone])



  return (
    <>
      <div>
        <div className='py-4'>
          <div className='mx-auto px-2 text-left'>

            <h3 className='sm:text-[2.1rem] text-[1.8rem] text-gray-700 my-4 w-full'>
              🔅기본정보</h3>
            <p className='ml-2 my-1 text-gray-500 text-[1.2rem] leading-8'>🪄프로필 사진을 업로드해주세요.</p>



            <div className='relative flex justify-center w-[122px] mx-auto mt-4 border-white rounded-[12px] group'>
              <div className="w-[122px] h-[122px]">
                <ImageWrapper>
                  {imageUploading ?
                    <div className='w-[100px] h-[100px] flex justify-center items-center'>
                      <Spin />
                    </div>
                    :
                    // eslint-disable-next-line @next/next/no-img-element
                    <Image
                      className="absolute object-cover rounded-[12px] mx-auto w-[122px] h-[122px]"
                      src={avatarPreview || user?.avatar || profilePic}
                      width={122}
                      height={122}
                      unoptimized
                      alt="avatar">
                    </Image>
                  }
                </ImageWrapper>
              </div>

            </div>
            <label htmlFor="fileInput" className="flex flex-col items-center justify-center mt-6 h-46 w-full mx-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-3 pb-4">
                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">프로필 사진 업로드</span> </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, JPEG</p>
              </div>
              <input
                className='absolute hidden top-0 left-0 w-full h-full text-[0px] cursor-pointer pointer-events-auto rounded file:w-full file:h-full file:border-0'
                onChange={changeAvatar}
                type="file"
                accept=".svg, .png, .jpg, .jpeg"
                id="fileInput" />
            </label>

            <div className='mt-3 pb-3 border-b flex items-center justify-between flex-row'>
              <div className='w-fit flex justify-start'>
                <button
                  className='w-fit h-8 px-4 py-0.5 rounded-[24px] bg-white text-sm text-gray-500 font-medium rounded-middle underline'
                  onClick={removeAvatar}>
                  프로필사진 지우기
                </button>
              </div>
              <div className='flex items-center'>
                {!avatarPreview || avatarPreview === "" ? null :
                  <button className='my-2 px-6 text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg' onClick={onClickUpdate}>
                    프로필사진 저장
                  </button>
                }
              </div>
            </div>
          </div>
        </div>


        <Thumbnail />

      </div>

    </>

  );
};


const ImageWrapper = styled.div`
width: 100%;
border-radius: 8px;
justify-content: center;
margin: 0 auto;
min-height: 142px;

& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 142px !important;
  }
}
`



export default index;