/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from 'react';
import { TbVideoPlus } from 'react-icons/tb';
import { BiImageAdd } from 'react-icons/bi';
import VideoCreate from './VideoCreate';
import { useSelector } from 'react-redux';
import ImageCreate from './ImageCreate';
import { FcAbout } from 'react-icons/fc';

const index = () => {
  const { user } = useSelector(state => state.user);

  const [videoModalOpened, setVideoModalOpened] = useState(false);
  const openVideoModal = useCallback(() => {
    setVideoModalOpened(true);
  }, [])
  const closeVideoModal = useCallback(() => {
    setVideoModalOpened(false);
  }, [])
  const [imageModalOpened, setImageModalOpened] = useState(false);
  const openImageModal = useCallback(() => {
    setImageModalOpened(true);
  }, [])
  const closeImageModal = useCallback(() => {
    setImageModalOpened(false);
  }, [])


  return (
    <div>
      <div className='pb-4'>
        <div className='mx-auto px-2 text-left'>
          <p className='my-1 text-gray-700 text-[1.2rem] leading-8 font-bold'>
            🎨CoverClip 등록
          </p>
          <p className='my-1 text-gray-600 leading-8'>
            프로필 배경에 매력적인 소개 영상이나 포트폴리오를 올려서 본인을 어필해주세요!
          </p>
          <div className='flex flex-row flex-row-2 gap-2'>
            <div className='w-full my-4 flex justify-center'>
              {user?.thumbvideo ? (
                <video
                  className="rounded-xl h-[383px] w-[245px] bg-black"
                  controls
                  loop
                  src={user?.thumbvideo}
                />
              ) : (
                <div onClick={openVideoModal} className='bg-slate-100 rounded-xl h-[383px] w-[245px] flex flex-col justify-center items-center'>
                  <FcAbout className='w-10 h-10 ' />
                  <span className='font-bold text-md text-gray-400'>Empty</span>
                </div>
              )}
            </div>
            <div className='w-full my-4 flex justify-center'>
              {user?.thumbimage?.length !== 0 ? (
                <>
                  <img
                    className="rounded-xl h-[383px] w-[245px] bg-black object-cover"
                    alt="thumbimg"
                    src={user?.thumbimage[0]}
                  />
                  {user?.thumbimage?.length > 1 &&
                    <div className='absolute p-2 rounded-t-lg bg-white opacity-70 text-sm text-center w-[245px]'>외 {user?.thumbimage?.length - 1}장</div>}
                </>
              ) : (
                <div onClick={openVideoModal} className='bg-slate-100 rounded-xl h-[383px] w-[245px] flex flex-col justify-center items-center'>
                  <FcAbout className='w-10 h-10 ' />
                  <span className='font-bold text-md text-gray-400'>Empty</span>
                </div>
              )}
            </div>
          </div>


          <div className='flex flex-row w-full'>

            <button type="button" onClick={openImageModal}
              className="border-dashed border-2 border-gray-300 w-full flex flex-col text-gray-500 bg-gray-100 hover:bg-gray-200 font-medium rounded-xl px-4 py-2 text-center items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
              <TbVideoPlus className='w-8 h-8' />
              {/* <span className="px-2 py-4 text-md text-gray-100 border-l-2 border-gray-100 font-mono">
              </span> */}
              <div className='mt-2 text-sm'>
                영상
              </div>
            </button>
            <button type="button" onClick={openImageModal}
              className="border-dashed border-2 border-gray-300 w-full flex flex-col text-gray-500 bg-gray-100 hover:bg-gray-200 font-medium rounded-xl  px-4 py-2 text-center items-center dark:focus:ring-[#3b5998]/55 mb-2">
              <BiImageAdd className='w-8 h-8' />
              {/* <span className="px-2 py-4 text-md text-gray-100 border-l-2 border-gray-100 font-mono">
              </span> */}
              {user?.thumbimage?.length > 1 ?
                <div className='mt-2 text-sm'>
                  새로운 사진으로 변경
                </div> :
                <div className='mt-2 text-sm'>
                  사진
                </div>}
            </button>
            <VideoCreate
              videoModalOpened={videoModalOpened}
              closeVideoModal={closeVideoModal}
            />
            <ImageCreate
              imageModalOpened={imageModalOpened}
              closeImageModal={closeImageModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;