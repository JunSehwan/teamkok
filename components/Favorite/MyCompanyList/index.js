import React from 'react';
import Image from 'next/image';
import Loading from 'components/Common/Loading';
import Empty from 'components/Common/Empty';
import { useSelector } from 'react-redux';
import companyPic from 'public/image/company.png';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import UpdateBoard from './UpdateBoard';

const index = () => {
  const router = useRouter();
  const { user } = useSelector(state => state.user);
  const { myBoards } = useSelector(state => state.board);


  return (
    <>
      <div>
        {/* <!-- Table --> */}
        <div className="mt-[2rem] w-[95%] mx-auto bg-violet-50 shadow rounded-lg border border-gray-200 p-4">
          <header className="px-4 py-4 border-b border-gray-100">
            <div className="font-semibold text-lg text-gray-800">내 기업보드</div>
          </header>

          <div className="p-3 flex flex-row w-full">
            <div className="w-full">

              <div className="text-sm flex flex-col flex-wrap">
                {myBoards?.length !== 0 ?
                  myBoards?.map((v) => (
                    <div key={v?.id} className="w-full flex flex-row items-center rounded-lg bg-violet-500 shadow mb-4 mr-4 py-2 px-2 justify-between">
                      <div className='flex flex-row items-center'>
                        <div className="w-8 sm:w-16">
                          <ImageWrapper className=''>
                            {v?.logo ?
                              <Image
                                className="autoimage bg-slate-200 shadow-inner rounded-lg w-full object-cover object-center"
                                loader={() => <Loading />}
                                src={v?.logo}
                                // width={120}
                                // height={120}
                                layout="fill"
                                unoptimized
                                alt="BoardLogo picture"
                              />
                              :
                              <Image
                                className="autoimage bg-slate-200 shadow-inner rounded-lg lg:h-24 md:h-14 w-full object-cover object-center"
                                loader={() => companyPic}
                                src={companyPic}
                                // width={120}
                                // height={120}
                                layout="fill"
                                unoptimized
                                alt="BoardLogo picture"
                              />
                            }
                          </ImageWrapper>
                        </div>
                        <div className="p-2">
                          <div className="max-w-[93px] sm:max-w-full text-sm sm:text-lg font-semibold text-white overflow-hidden text-ellipsis whitespace-nowrap ">
                            {v?.name || ""}
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="flex justify-center whitespace-nowrap">
                          <div className="relative flex w-[100%] justify-end">
                            <div className="relative shadow-inner bg-white rounded-full w-fit p-1 flex flex-row">
                              <UpdateBoard
                                board={v}
                              />
                              <button
                                onClick={() => { router.push(`/board/${v?.id}`) }}
                                className="p-2 ml-1 hover:bg-blue-100 text-blue-600 rounded-full " >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>

                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))
                  : <Empty title="아직 내가 만든 기업보드가 없습니다." />
                }
                {!myBoards && <Empty title="아직 내가 만든 기업보드가 없습니다." />}
              </div>
            </div>
          </div>

          {/* <!-- total amount --> */}
          <div className="flex justify-end font-bold space-x-2 text-lg border-t border-gray-100 px-5 py-4">
            <div>총</div>
            <div className="text-blue-600">{myBoards?.length || 0}<span x-text="total.toFixed(2)">건</span></div>
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