import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadAvatarPreview } from 'firebaseConfig';
import { setChangeAvatarOpen } from 'slices/userSettings';
import { setUserAvatar, setUserAvatarPreview } from 'slices/user';

const ChangeAvatar = () => {

  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  function closeWindow() {
    dispatch(setChangeAvatarOpen(false));
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  async function changeAvatar(e) {
    if (!e.target.files) return;

    const avatarImage = e.target.files[0];
    const avatarURL = await uploadAvatarPreview(avatarImage, user.userID);

    closeWindow();

    dispatch(setUserAvatar(avatarURL));
    dispatch(setUserAvatarPreview(avatarImage));
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full items-center justify-center bg-black bg-opacity-[0.50] z-20'
      onClick={closeWindow}>
      <div className='fixed shadow-2xl flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-110 bg-white rounded-md'
        onClick={stopPropagation}>
        <div className='p-4 pl-5 flex items-center justify-between'>
          <h3 className='w-full text-1xl font-bold'>이미지 선택</h3>

          <button className='top-4 right-4 p-1' onClick={closeWindow}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className='flex justify-center pr-2 pb-4 pl-4'>
          <div className='relative flex flex-col cursor-pointer items-center w-[192px] h-[196px] p-4 bg-gray-200 rounded pointer-events-none'>
            <div className='w-32 h-32 cursor-pointer bg-green-500 rounded-full z-20' />

            <label className='mt-4 text-sm text-gray-600 font-semibold z-20' htmlFor="fileInput">
              Upload File
            </label>

            <input
              className='absolute top-0 left-0 w-full h-full text-[0px] cursor-pointer pointer-events-auto rounded file:w-full file:h-full file:border-0'
              onChange={changeAvatar}
              type="file"
              accept=".svg, .png, .jpg, .jpeg"
              id="fileInput"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatar;