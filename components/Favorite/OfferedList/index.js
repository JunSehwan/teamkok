import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Loading from 'components/Common/Loading';
import Empty from 'components/Common/Empty';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import profilePic from 'public/image/icon/happiness.png';
import DetailInfoModal from './DetailInfoModal';

import dayjs from 'dayjs';
const index = () => {
  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)

  const router = useRouter();
  const { user } = useSelector(state => state.user);
  const { mainJoboffered } = useSelector(state => state.joboffer);

  const [detailOpen, setDetailOpen] = useState(false);
  const onOpenDetail = useCallback(() => {
    document.body.style.overflow =  "hidden";
    setDetailOpen(true);
  }, [])
  const onCloseDetail = useCallback(() => {
    document.body.style.overflow =  "unset";
    setDetailOpen(false);
  }, [])

  return (
    <>
      <div>
        {/* <!-- Table --> */}
        <div className="mt-[2rem] w-[95%] mx-auto bg-blue-50 shadow rounded-lg border border-gray-200 p-4">
          <header className="px-4 py-4 border-b border-gray-100">
            <div className="font-semibold text-lg text-gray-800">채용제안 받은 건</div>
          </header>

          <div className="p-3 flex flex-row w-full">
            <div className="w-full">

              <div className="text-sm flex flex-col flex-wrap">
                {mainJoboffered?.length !== 0 ?
                  mainJoboffered?.map((v) => (
                    <div key={v?.id}
                      className={`${v?.answer === "yes" || v?.answer === "no" ?
                        "w-full flex flex-row items-center rounded-lg bg-gray-500 shadow mb-4 mr-4 py-2 px-2 justify-between"
                        :
                        "w-full flex flex-row items-center rounded-lg bg-blue-500 shadow mb-4 mr-4 py-2 px-2 justify-between"
                        }
                          `}
                    >
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
                          <div className="max-w-[93px] sm:max-w-full text-sm sm:text-lg font-semibold text-white overflow-hidden text-ellipsis whitespace-nowrap ">
                            from. {v?.username || ""}
                          </div>
                          <p className='text-white'>
                            {dayjs(v?.timestamp).fromNow()}
                          </p>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="flex justify-center whitespace-nowrap">
                          <div className="relative flex w-[100%] justify-end">
                            <div className="items-center relative shadow-inner bg-white rounded-full w-fit p-1 flex flex-row">
                              <DetailInfoModal
                                offer={v}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  : <Empty title="제안받은 입사제안 건수가 없습니다." />
                }
                {!mainJoboffered && <Empty title="제안받은 입사제안 건수가 없습니다." />}
              </div>
            </div>
          </div>

          {/* <!-- total amount --> */}
          <div className="flex justify-end font-bold space-x-2 text-lg border-t border-gray-100 px-5 py-4">
            <div>총</div>
            <div className="text-blue-600">{mainJoboffered?.length || 0}<span x-text="total.toFixed(2)">건</span></div>
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