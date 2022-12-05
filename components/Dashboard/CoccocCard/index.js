import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import profilePic from 'public/image/icon/happiness.png';
import Image from 'next/image';

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full rounded-lg bg-white shadow-md"
    >
      <div className='p-4 flex flex-col gap-4'>
        <div className='w-full flex justify-between items-center'>
          <div className='flex flex-row items-center gap-2'>
            <div className='w-[48px] h-[48px]'>
              <ImageWrapper className='w-[48px] h-[48px]'>
                <Image
                  className="object-cover rounded-[12px] mx-auto"
                  src={coccocCon?.companylogo || coccocCon?.userAvatar || profilePic}
                  // layout="fill"
                  width={48}
                  height={48}
                  unoptimized
                  alt="avatar">
                </Image>
              </ImageWrapper>
            </div>
            <div className='flex flex-col'>
              <p className='text-lg font-bold'>{coccocCon?.company}</p>
              <p className='text-gray-500 text-sm'>{coccocCon?.section}</p>
              <p className='text-gray-500 text-sm'>{coccocCon?.job}</p>
            </div>
          </div>
          <div className=''>
            <p className='text-sky-500 text-lg'>
              {coccocCon?.salary ? (Math.round(coccocCon?.salary))?.toLocaleString() + "만원" : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
            </p>

          </div>
        </div>

        <div className='contents p-6 text-left'>
          <p className='text-gray-700 text-sm whitespace-pre-wrap leading-normal font-normal  overflow-hidden max-h-[63px] text-ellipsis'>
            {coccocCon?.description}</p>
        </div>

      </div>
    </motion.div>
  );
};

index.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};



export default index;