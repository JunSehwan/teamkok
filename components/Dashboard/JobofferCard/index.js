import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import profilePic from 'public/image/icon/happiness.png';
import Image from 'next/image';
import JobOfferAnswerModal from './JobOfferAnswerModal';

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


const index = ({ jobofferCon }) => {
  const [jobofferOn, setJobofferOn] = useState(false);
  const openJoboffer = useCallback(() => {
    setJobofferOn(true);
  }, [])
  const closeJoboffer = useCallback(() => {
    setJobofferOn(false);
  }, [])

  return (
    <>
      <JobOfferAnswerModal
        jobofferCon={jobofferCon}
        jobofferOn={jobofferOn}
        openJoboffer={openJoboffer}
        closeJoboffer={closeJoboffer}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full rounded-lg bg-white shadow-md"
      >
        <button
          className='p-4 flex flex-col gap-4'
          onClick={openJoboffer}
        >
          <div className='w-full flex justify-between items-center'>
            <div className='flex flex-row items-center gap-2'>
              <div className='w-[48px] h-[48px]'>
                <ImageWrapper className='w-[48px] h-[48px]'>
                  <Image
                    className="object-cover rounded-[12px] mx-auto"
                    src={jobofferCon?.companylogo || jobofferCon?.userAvatar || profilePic}
                    // layout="fill"
                    width={48}
                    height={48}
                    unoptimized
                    alt="avatar">
                  </Image>
                </ImageWrapper>
              </div>
              <div className='flex flex-col'>
                <p className='text-lg font-bold'>{jobofferCon?.company}</p>
                <p className='text-gray-500 text-sm'>{jobofferCon?.section}</p>
                <p className='text-gray-500 text-sm'>{jobofferCon?.job}</p>
              </div>
            </div>
            <div className=''>
              <p className='text-sky-500 text-lg'>
                {jobofferCon?.salary ? (Math.round(jobofferCon?.salary))?.toLocaleString() + "만원" : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
              </p>

            </div>
          </div>

          <div className='contents p-6 text-left'>
            <p className='text-gray-700 text-sm whitespace-pre-wrap leading-normal font-normal  overflow-hidden max-h-[63px] text-ellipsis'>
              {jobofferCon?.description}</p>
          </div>

        </button>
      </motion.div>
    </>
  );
};

index.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};



export default index;