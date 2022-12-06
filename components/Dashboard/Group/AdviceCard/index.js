import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import profilePic from 'public/image/icon/happiness.png';
import Image from 'next/image';
import AdviceDetailModal from './AdviceDetailModal';

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

  const [adviceOn, setAdviceOn] = useState(false);
  const openAdvice = useCallback(() => {
    setAdviceOn(true);
  }, [])
  const closeAdvice = useCallback(() => {
    setAdviceOn(false);
  }, [])


  return (
    <>
      <AdviceDetailModal
        adviceCon={adviceCon}
        adviceOn={adviceOn}
        openAdvice={openAdvice}
        closeAdvice={closeAdvice}
      />
      <div
        className="w-full rounded-lg bg-white shadow-md hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-slate-50"
      >
        <button
          className='p-4 flex flex-col gap-2 w-full text-left'
          onClick={openAdvice}
        >
          <div className='w-full flex justify-between items-center'>
            <div className='flex flex-row items-center gap-2'>
              <div className='w-[48px] h-[48px]'>

                <ImageWrapper className='w-[48px] h-[48px]'>
                  <Image
                    className="object-cover rounded-[12px] mx-auto"
                    src={adviceCon?.targetAvatar || profilePic}
                    // layout="fill"
                    width={48}
                    height={48}
                    unoptimized
                    alt="avatar">
                  </Image>
                </ImageWrapper>
              </div>
              <div className='flex flex-col'>
                <>
                  <p className='text-lg font-bold'>{adviceCon?.targetName}</p>
                </>
              </div>
            </div>
            <div className=''>
              <Stars className="star-rating w-full mx-auto flex justify-center"
                id="rating"
              >
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <div
                      key={index}
                      className={index <= (adviceCon?.rating) ? "on" : "off"}
                    >
                      <span >
                        <AiFillStar
                          className="star w-7 h-7"
                        />
                      </span>
                    </div>
                  );
                })}
              </Stars>
            </div>
          </div>

          <div className='contents p-6 text-left'>
            <p className='text-gray-700 text-sm whitespace-pre-wrap leading-normal font-normal  overflow-hidden max-h-[63px] text-ellipsis'>{adviceCon?.description}</p>
          </div>

        </button>
      </div>
    </>
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