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

const index = ({ adviceCon }) => {

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
                  src={adviceCon?.companylogo || adviceCon?.userAvatar || profilePic}
                  // layout="fill"
                  width={48}
                  height={48}
                  unoptimized
                  alt="avatar">
                </Image>
              </ImageWrapper>
            </div>
            <div className='flex flex-col'>
              <p>{adviceCon?.mycompany}</p>
              <p className='text-gray-500'>{adviceCon?.username}</p>
            </div>
          </div>
          <div className=''>
            <Stars className="star-rating w-full mx-auto flex justify-center"
              id="rating"
            >
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= (adviceCon?.rating) ? "on" : "off"}
                  >
                    <span >
                      <AiFillStar
                        className="star w-7 h-7"
                      />
                    </span>
                  </button>
                );
              })}
            </Stars>
          </div>
        </div>

        <div className='contents p-6 text-left'>
          <p className='text-gray-700 text-sm whitespace-pre-wrap leading-normal font-normal  overflow-hidden max-h-[63px] text-ellipsis'>{adviceCon?.description}</p>
        </div>

      </div>
    </motion.div>
  );
};

index.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

const Stars = styled.div`
  .on {
    color: #3274e8;
  }
  .off {
    color: rgba(0,0,0,0.33);
  }
`

export default index;