import React from 'react';
import Image from 'next/image';
import { setUserAvatarPreview, setUserAvatar } from 'slices/user';
import { setChangeAvatarOpen } from 'slices/userSettings';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserAvatarChanges } from 'firebaseConfig';
import profilePic from 'public/image/icon/happiness.png';

const Avatar = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  function removeAvatar() {
    saveUserAvatarChanges("");
    dispatch(setUserAvatar("")
    );
    dispatch(setUserAvatarPreview(null));
  }

  return (
    <>
      <span className='banner bg-slate-500 h-15 rounded-t-lg' />
      <h5 className='block mb-1 text-sm font-bold text-gray-700'>
        AVATAR</h5>
      <div className='relative flex justify-center border-[7px] border-white rounded-2xl group mt-4'>
        <div className='absolute hidden w-[80px] h-full bg-black bg-opacity-50 rounded-2xl z-10 group pointer-events-none group-hover:block'>
          <div className='absolute flex w-full justify-center h-full text-center items-center text-[10px] text-white font-bold'>
            <span className="text-center flex justify-center" >사진 변경</span>
          </div>
        </div>

        <Image
          className="object-cover rounded-2xl cursor-pointer shadow-inner "
          onClick={() => dispatch(setChangeAvatarOpen(true))}
          loader={() => user?.avatar}
          src={user?.avatar || profilePic}
          width={80}
          height={80}
          unoptimized
          alt="Profile picture"
        />
      </div>

      <div className='mt-6 pb-6 border-b'>
        <div className='w-fit mx-auto'>
          <button className='w-fit h-8 px-4 py-0.5 rounded-[24px] bg-indigo-500 text-white text-sm font-medium'
            onClick={() => dispatch(setChangeAvatarOpen(true))}
          >
            사진 변경
          </button>

          <button
            className='w-fit h-8 px-4 py-0.5 rounded-[24px] bg-white text-sm text-gray-500 font-medium'
            onClick={removeAvatar}>
            사진 제거
          </button>
        </div>
      </div>
    </>
  );
};

export default Avatar;