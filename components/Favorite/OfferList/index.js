import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Loading from 'components/Common/Loading';
import Empty from 'components/Common/Empty';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import profilePic from 'public/image/icon/happiness.png';
import UnOffer from './UnOffer';
import DetailInfoModal from './DetailInfoModal';

import dayjs from 'dayjs';
const index = () => {
  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)

  const { mainJoboffers } = useSelector(state => state.joboffer);

  return (
    <>
      <div>
        {/* <!-- Table --> */}
        <div className="mt-[2rem] w-[95%] mx-auto bg-blue-50 shadow rounded-lg border border-gray-200 p-4">
          <header className="px-4 py-4 border-b border-gray-100">
            <div className="font-semibold text-lg text-gray-800">입사제안 리스트</div>
          </header>

          <div className="p-3 flex flex-row w-full">
            <div className="w-full">

              <div className="text-sm flex flex-col flex-wrap">
                {mainJoboffers?.length !== 0 ?
                  mainJoboffers?.map((v) => (
                    <div key={v?.id} className={`flex flex-nowrap bg-gray-500 w-full flex-row items-center rounded-lg 
                    ${v?.answer == "yes" && "bg-blue-400"}
                    ${v?.answer == "no" && "bg-rose-400"}
                    md:basis-1 shadow mb-2 py-2 px-2 justify-between`}>
                      <div className='flex flex-row items-center'>
                        <div className="w-8 sm:w-16">

                          <ImageWrapper className=''>
                            {v?.targetAvatar ?
                              <Image
                                className="autoimage bg-white shadow-inner rounded-lg w-full object-cover object-center"
                                loader={() => <Loading />}
                                src={v?.targetAvatar}
                                // width={120}
                                // height={120}
                                layout="fill"
                                unoptimized
                                alt="avatar picture"
                              />
                              :
                              <Image
                                className="autoimage bg-white shadow-inner rounded-lg lg:h-24 md:h-14 w-full object-cover object-center"
                                loader={() => profilePic}
                                src={profilePic}
                                // width={120}
                                // height={120}
                                layout="fill"
                                unoptimized
                                alt="avatar picture"
                              />
                            }
                          </ImageWrapper>
                        </div>
                        <div className="p-2">
                          {v?.answer === "yes" && <span className='text-white font-sm '>상대방이 승낙의 의사표시를 하였습니다.</span>}
                          {v?.answer === "no" && <span className='text-white font-sm '>상대방이 거절의 의사표시를 하였습니다.</span>}
                          {v?.answer !== "no" && v?.answer !== "yes" && v?.read === true && <span className='text-white font-sm'>상대방이 메시지를 읽었습니다.</span>}
                          <div className="max-w-[93px] sm:max-w-full text-sm sm:text-lg font-semibold text-white overflow-hidden text-ellipsis whitespace-nowrap ">
                            to. {v?.targetName || ""}
                          </div>
                          <p className='text-white'>
                            {dayjs(v?.timestamp).fromNow()}
                          </p>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="flex justify-center whitespace-nowrap">
                          <div className="relative flex w-[100%] justify-end">
                            <div className="relative shadow-inner bg-white rounded-full w-fit p-1 flex flex-row">
                              <UnOffer
                                id={v?.id}
                              />
                              <DetailInfoModal
                                offer={v}

                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  : <Empty title="내가 제안한 입사제안 건수가 없습니다." />
                }
                {!mainJoboffers && <Empty title="내가 제안한 입사제안 건수가 없습니다." />}
              </div>
            </div>
          </div>

          {/* <!-- total amount --> */}
          <div className="flex justify-end font-bold space-x-2 text-lg border-t border-gray-100 px-5 py-4">
            <div>총</div>
            <div className="text-blue-600">{mainJoboffers?.length || 0}<span x-text="total.toFixed(2)">건</span></div>
          </div>

          <div className="flex justify-end">
            {/* <!-- send this data to backend (note: use class 'hidden' to hide this input) --> */}
            <input type="hidden" className="border border-black bg-gray-50" x-model="selected" />
          </div>
        </div>
      </div>



    </>
  );
};


const ImageWrapper = styled.div`
width: 100%;
border-radius: 8px;
justify-content: center;
margin: 0 auto;
min-height: 64px;

& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 64px !important;
  }
}
`

export default index;