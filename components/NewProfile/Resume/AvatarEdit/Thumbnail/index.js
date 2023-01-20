/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from 'react';
import { TbVideoPlus } from 'react-icons/tb';
import { BiImageAdd } from 'react-icons/bi';
import VideoCreate from './VideoCreate';
import { useDispatch, useSelector } from 'react-redux';
import ImageCreate from './ImageCreate';
import { FcStackOfPhotos, FcVideoCall } from 'react-icons/fc';
import { updateCliptype } from 'firebaseConfig';
import { updateUserCliptype } from 'slices/user';

const index = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
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

  const onChangeBasicTypetoVideo = useCallback(async () => {
    const result = await updateCliptype("video");
    if (result) {
      dispatch(updateUserCliptype(result));
    }
  }, [dispatch])

  const onChangeBasicTypetoImage = useCallback(async (e) => {
    const result = await updateCliptype("image");
    if (result) {
      dispatch(updateUserCliptype(result));
    }
  }, [dispatch])

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
                  className="rounded-xl h-[383px] w-full md:w-[245px] bg-black"
                  controls
                  loop
                  src={user?.thumbvideo || ""}
                />
              ) : (
                <div onClick={openVideoModal} className='bg-slate-100 rounded-xl h-[383px] w-full md:w-[245px] flex flex-col justify-center items-center'>
                  <FcVideoCall className='w-10 h-10 ' />
                  <span className='font-bold text-md text-gray-400'>Empty</span>
                </div>
              )}
            </div>
            <div className='w-full my-4 flex justify-center relative'>
              {user?.thumbimage && user?.thumbimage?.length !== 0 ? (
                <>
                  <img
                    className="rounded-xl h-[383px] w-full md:w-[245px] bg-black object-cover"
                    alt="thumbimg"
                    src={user?.thumbimage[0] || ""}
                  />
                  {user?.thumbimage?.length > 1 &&
                    <div className='absolute bottom-0 left-0 right-0 w-full p-2 rounded-t-lg bg-white opacity-70 text-sm text-center'>외 {user?.thumbimage?.length - 1}장</div>}
                </>
              ) : (
                <div onClick={openImageModal} className='bg-slate-100 rounded-xl h-[383px] w-full md:w-[245px] flex flex-col justify-center items-center'>
                  <FcStackOfPhotos className='w-10 h-10 ' />
                  <span className='font-bold text-md text-gray-400'>Empty</span>
                </div>
              )}
            </div>
          </div>


          <div className='flex flex-row w-full'>

            <button type="button" onClick={openVideoModal}
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
          {user?.thumbimage && user?.thumbvideo ?
            <div className='w-full my-2'>
              <p className='my-1 text-gray-700 text-[1.2rem] leading-8 font-bold'>📌썸네일유형 선택</p>
              <p className='my-1 text-gray-600 leading-8'>내 프로필에 보여지는 Clip을 선택해주세요.</p>
              <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                <input
                  defaultChecked={user?.cliptype === "video"}
                  onClick={onChangeBasicTypetoVideo}
                  id="bordered-radio-1" type="radio" value="video_first" name="bordered-radio" className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="bordered-radio-1" className="py-4 ml-2 w-full text-md font-medium text-gray-900 dark:text-gray-300">비디오</label>
              </div>
              <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                <input
                  defaultChecked={user?.cliptype === "image"}
                  onClick={onChangeBasicTypetoImage}
                  id="bordered-radio-2" type="radio" value="image_first" name="bordered-radio" className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="bordered-radio-2" className="py-4 ml-2 w-full text-md font-medium text-gray-900 dark:text-gray-300">이미지</label>
              </div>
            </div>
            : null}

        </div>
      </div>
    </div>
  );
};

export default index;