import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/Common/Modal/Modal';
import styled from 'styled-components';
import Image from 'next/image';
import profilePic from 'public/image/icon/happiness.png';

import companyPic from 'public/image/company.png';
import { AiFillStar } from 'react-icons/ai';
import { useRouter } from 'next/router';

const index = ({ adviceCon, adviceOn, openAdvice, closeAdvice }) => {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const goProfile = useCallback(() => {
    router.push({
      pathname: `/friends/detail/${adviceCon?.targetId}`,
    });
  }, [adviceCon?.targetId, router])

  return (
    <Modal
      open={openAdvice}
      onClose={closeAdvice}
      title={`커리어 조언`}
      visible={adviceOn}
      widths="720px"
      onCancel={closeAdvice}

    >
      <div className='p-3'>



        <div
          className="w-full pt-2 pb-2 mb-1 rounded mt-[.4rem]"
        >

          <div className='flex items-center justify-center gap-2'>
            <Stars className="star-rating flex justify-center"
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
            <span className='text-blue-700 text-md '>{adviceCon?.rating}점</span>
          </div>

          <div className="my-6">
            <div className='w-full flex flex-col'>


              <button onClick={goProfile} className='flex flex-row items-center gap-3'>
                <div className='w-[72px] h-[72px]'>

                  <ImageWrapper className='w-[72px] h-[72px]'>
                    <Image
                      className="object-cover rounded-[12px] mx-auto"
                      src={adviceCon?.targetAvatar || profilePic}
                      // layout="fill"
                      width={72}
                      height={72}
                      unoptimized
                      alt="avatar">
                    </Image>
                  </ImageWrapper>
                </div>
                <div className='flex flex-col'>
                  <h2 className='font-bold text-2xl'>{adviceCon?.targetName}</h2>
                </div>
              </button>

             

              <div className='rounded-lg w-full p-3 bg-slate-100 shadow-inner my-10'>
                <p className='text-gray-900 text-lg whitespace-pre-wrap leading-normal font-normal overflow-hidden text-ellipsis'>
                  {adviceCon?.description}
                </p>
              </div>
              
            </div>
          </div>

        </div >


        <div className="mb-10 text-right">
          
          <div className='mb-10 text-right'>
            <button
              onClick={closeAdvice}
              type="button"
              className="w-full px-6 min-w-[144px] text-md py-4 font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:shadow-outline rounded-lg">
              확인
            </button>
          </div>

        </div>
      </div>
    </Modal >
  );
};

const ImageWrapper = styled.div`
width: 100%;
border-radius: 8px;
justify-content: center;
margin: 0 auto;
min-height: 72px;
position: relative;

& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 72px !important;
  }
}
`
const ProfileWrapper = styled.div`
width: 100%;
border-radius: 8px;
justify-content: center;
margin: 0 auto;
min-height: 60px;
position: relative;

& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 60px !important;
  }
}
`

const Stars = styled.div`
  .on {
    color: #3274e8;
  }
  .off {
    color: rgba(0,0,0,0.33);
  }
`

index.propTypes = {
  adviceCon: PropTypes.object,
  adviceOn: PropTypes.bool,
  openAdvice: PropTypes.func,
  closeAdvice: PropTypes.func,
};


export default index;