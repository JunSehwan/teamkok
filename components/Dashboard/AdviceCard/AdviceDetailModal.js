import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/Common/Modal/Modal';
import styled from 'styled-components';
import Image from 'next/image';
import profilePic from 'public/image/icon/happiness.png';

import companyPic from 'public/image/company.png';
import { AiFillStar } from 'react-icons/ai';

const index = ({ adviceCon, adviceOn, openAdvice, closeAdvice }) => {

  return (
    <Modal
      open={openAdvice}
      onClose={closeAdvice}
      title={`내 커리어에 대한 조언`}
      visible={adviceOn}
      widths="720px"
      onCancel={closeAdvice}

    >
      <div className='p-3'>



        <div
          className="w-full pt-2 pb-2 mb-1 rounded mt-[.4rem]"
        >

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

          <div className="my-6">
            <div className='w-full flex flex-col'>

              {adviceCon?.mycompany && adviceCon?.annoymous &&
                <div className='flex flex-row items-center gap-3'>
                  <div className='w-[72px] h-[72px]'>

                    <ImageWrapper className='w-[72px] h-[72px]'>
                      <Image
                        className="object-cover rounded-[12px] mx-auto"
                        src={companyPic || ""}
                        // layout="fill"
                        width={72}
                        height={72}
                        unoptimized
                        alt="avatar">
                      </Image>
                    </ImageWrapper>
                  </div>
                  <div className='flex flex-col'>
                    <h2 className='font-bold'>기업명 비공개</h2>
                  </div>
                </div>
              }
              {adviceCon?.mycompany && !adviceCon?.annoymous &&
                <div className='flex flex-row items-center gap-3'>
                  <div className='w-[72px] h-[72px]'>

                    <ImageWrapper className='w-[72px] h-[72px]'>
                      <Image
                        className="object-cover rounded-[12px] mx-auto"
                        src={adviceCon?.companylogo || companyPic}
                        // layout="fill"
                        width={72}
                        height={72}
                        unoptimized
                        alt="avatar">
                      </Image>
                    </ImageWrapper>
                  </div>
                  <div className='flex flex-col'>
                    <h2 className='font-bold text-2xl'>{adviceCon?.mycompany}</h2>
                  </div>
                </div>
              }
              {!adviceCon?.mycompany &&
                <div className='flex flex-row items-center gap-3'>
                  <div className='w-[72px] h-[72px]'>

                    <ImageWrapper className='w-[72px] h-[72px]'>
                      <Image
                        className="object-cover rounded-[12px] mx-auto"
                        src={adviceCon?.userAvatar || profilePic}
                        // layout="fill"
                        width={72}
                        height={72}
                        unoptimized
                        alt="avatar">
                      </Image>
                    </ImageWrapper>
                  </div>
                  <div className='flex flex-col'>
                    <h2 className='font-bold text-2xl'>{adviceCon?.username}</h2>
                  </div>
                </div>
              }

              <div className='rounded-lg w-full p-3 bg-slate-100 shadow-inner my-10'>
                <p className='text-gray-900 text-lg whitespace-pre-wrap leading-normal font-normal overflow-hidden text-ellipsis'>
                  {adviceCon?.description}
                </p>
              </div>
              <div className='my-2 rounded-lg w-full flex flex-col items-end'>
                <h3 className='text-gray-900'>💌from</h3>
                {adviceCon?.annoymous ?
                  <div className='w-full md:max-w-[320px] flex flex-col md:flex-row gap-3 items-center md:justify-between my-1 bg-white p-3'>
                    <div>
                      <div className='w-[60px] h-[60px]'>
                        <ProfileWrapper className='w-[60px] h-[60px]'>
                          <Image
                            className="object-cover rounded-[12px] mx-auto"
                            src={profilePic || ""}
                            // layout="fill"
                            width={60}
                            height={60}
                            unoptimized
                            alt="avatar">
                          </Image>
                        </ProfileWrapper>
                      </div>
                    </div>
                    <div>
                      <div className='text-md flex flex-row gap-2 text-end'>
                        <span className='text-gray-500'>기업, 부서명 비공개</span>
                      </div>
                      <p className='text-gray-800 text-lg text-center md:text-right'>이름 비공개</p>
                    </div>
                  </div>
                  :
                  <div className='w-full md:max-w-[320px] flex flex-col md:flex-row gap-3 items-center md:justify-between my-1 bg-white p-3'>
                    <div>
                      <div className='w-[60px] h-[60px]'>
                        <ProfileWrapper className='w-[60px] h-[60px]'>
                          <Image
                            className="object-cover rounded-[12px] mx-auto"
                            src={adviceCon?.userAvatar || profilePic}
                            // layout="fill"
                            width={60}
                            height={60}
                            unoptimized
                            alt="avatar">
                          </Image>
                        </ProfileWrapper>
                      </div>
                    </div>
                    <div>
                      <div className='text-md flex flex-row gap-2 text-end'>
                        {adviceCon?.mycompany && <span className='text-gray-700'>{adviceCon?.mycompany}</span>}
                        {adviceCon?.mysection && <span className='text-gray-700'>{adviceCon?.mysection}</span>}
                      </div>
                      <p className='text-gray-800 text-lg text-center md:text-right'>{adviceCon?.username}님이 조언해주셨습니다.</p>
                    </div>
                  </div>
                }

              </div>
            </div>
          </div>

        </div >


        <div className="mb-10 text-right">
          {adviceCon?.annoymous ?
            <div className="flex w-full justify-end my-4">
              <div className='text-gray-500'>조언을 제공한 전문가가 익명으로 조언하였습니다.</div>
            </div>
            :
            null}
          <div className='mb-10 text-right'>
            <button
              onClick={closeAdvice}
              type="button"
              className="w-full px-6 min-w-[144px] text-md py-4 font-bold  text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:shadow-outline rounded-lg">
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