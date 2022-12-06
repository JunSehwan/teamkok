import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import profilePic from 'public/image/icon/happiness.png';
import Image from 'next/image';
import CoccocAnswerModal from './CoccocAnswerModal';

const ImageWrapper = styled.div`
width: 100%;
border-radius: 8px;
justify-content: center;
margin: 0 auto;
min-height: 48px;
position: relative;

& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 48px !important;
  }
}
`

const index = ({ coccocCon }) => {

  const [coccocOn, setCoccocOn] = useState(false);
  const openCoccoc = useCallback(() => {
    setCoccocOn(true);
  }, [])
  const closeCoccoc = useCallback(() => {
    setCoccocOn(false);
  }, [])

  return (
    <>
      <CoccocAnswerModal
        coccocCon={coccocCon}
        coccocOn={coccocOn}
        openCoccoc={openCoccoc}
        closeCoccoc={closeCoccoc}
      />

      <div
        className="w-full rounded-lg bg-white shadow-md hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-slate-50"
      >
        <button
          className='p-4 flex flex-col gap-2 w-full text-left'
          onClick={openCoccoc}>

          <div>
            {coccocCon?.answer == 1 || coccocCon?.answer == 2 ?
              <div className='text-gray-400 w-full'>
                {coccocCon?.answer == 1 && <span className='text-blue-600 font-bold'>승낙</span>}
                {coccocCon?.answer == 2 && <span className='text-gray-600 font-bold'>거절</span>}
              </div>
              :
              <div className='text-md text-gray-700 w-full'>
                미응답
              </div>
            }
          </div>

          <div className='w-full flex justify-between items-center'>
            <div className='flex flex-row items-center gap-2'>
              <div className='w-[48px] h-[48px]'>
                <ImageWrapper className='w-[48px] h-[48px]'>
                  <Image
                    className="object-cover rounded-[12px] mx-auto"
                    src={coccocCon?.targetAvatar ||  profilePic}
                    // layout="fill"
                    width={48}
                    height={48}
                    unoptimized
                    alt="avatar">
                  </Image>
                </ImageWrapper>
              </div>
              <div className='flex flex-col'>
                <p className='text-lg font-bold'>{coccocCon?.targetName}</p>
                <p className='text-gray-500 text-sm'>{coccocCon?.section}</p>
                <p className='text-gray-500 text-sm'>{coccocCon?.job}</p>
              </div>
            </div>
            {/* <div className=''>
              <p className='text-sky-500 text-lg'>
                {coccocCon?.targetName}
              </p>

            </div> */}
          </div>

          {/* <div className='contents p-6 text-left'>
          <p className='text-gray-700 text-sm whitespace-pre-wrap leading-normal font-normal  overflow-hidden max-h-[63px] text-ellipsis'>
            {coccocCon?.description}</p>
        </div> */}

        </button>
      </div>
    </>
  );
};

index.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};



export default index;