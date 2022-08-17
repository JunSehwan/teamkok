import React from 'react';
import Survey from 'components/Common/Survey';
import PropTypes from 'prop-types';
import Image from 'next/image';

const CareerContainer = ({ careers }) => {
  return (
    <div className="flex flex-col w-full">
      {careers?.length !== 0 &&
        careers?.map((v, i) => (
          v?.position ? (
            <div
              key={i}
              className='flex flex-col w-[100%] mx-auto rounded text-left mb-2'>
              <div className='flex w-[100%]'>
                <div className="flex flex-col bg-gradient-to-r from-white to-slate-100 w-full justify-start items-start rounded-md border-1 border-slate-100 shadow transition-all transform-all hover:scale-101 relative text-gray-700" >
                  {v?.ismain == true &&
                    <p className="bg-sky-500 w-fit px-4 py-1 text-sm font-bold text-white rounded-tl-lg rounded-br-xl">주경력</p>
                  }
                  <div className="text-left w-full p-4 col-span-5 ">
                    <div>
                      <Image src={`/image/company.png`} alt="company" width={60}
                        height={60} className="max-w-16 max-h-16 rounded-lg" />
                    </div>
                    <div >
                      <span className='text-xl text-violet-700'>{v?.name}</span>
                      <span className="font-mono text-md text-gray-500 font-normal ml-1">
                        {v?.position}</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <div className="font-mono font-medium text-md mt-2">{v?.section}</div>
                      <div className='flex flex-col text-left justify-start items-left sm:flex-row sm:items-center mb-2'>
                        <div className="font-mono font-medium text-md">{v?.job}</div>
                        <div className="font-mono font-medium text-sm text-gray-400">
                          {parseInt(v?.type) &&
                            <span>{(() => {
                              switch (parseInt(v?.type)) {
                                case 1: return (<span className="">(정규직)</span>)
                                case 2: return (<span className="">(계약직)</span>)
                                case 3: return (<span className="">(자영업/개인사업)</span>)
                                case 4: return (<span className="">(프리랜서)</span>)
                                case 5: return (<span className="">(인턴/수습)</span>)
                                case 6: return (<span className="">(아르바이트)</span>)
                                case 99: return (<span className="">(기타)</span>)
                                default: null;
                              }
                            })(parseInt(v?.type))}</span>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-medium text-sm">
                      {v?.finish ?
                        <p className="text-gray-500">{`${v?.start?.year}년 ${v?.start?.month}월 ~ ${v?.end?.year}년 ${v?.end?.month}월`}</p>
                        :
                        <p className="text-gray-500">{`${v?.start?.year}년 ${v?.start?.month}월 ~ 재직중`}</p>
                      }
                    </div>
                    <div className="p-3 mt-3 bg-white shadow-inner w-full">
                      <div className="mt-2 font-normal text-sm whitespace-pre-wrap leading-normal">
                        {v?.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
              <div
                key={i}
                className='flex flex-col w-[100%] mx-auto rounded text-left mb-2'>
                <div className='flex w-[100%]'>
                  <div className="flex flex-col bg-gradient-to-r from-white to-violet-50 w-full justify-start items-start rounded-md border-1 border-slate-100 shadow transition-all transform-all hover:scale-101 relative text-gray-700" >
                    {v?.ismain == true &&
                      <p className="bg-green-500 w-fit px-4 py-1 text-sm font-bold text-white rounded-tl-lg rounded-br-xl">주학력</p>
                    }
                    <div className="text-left w-full p-4 col-span-5 ">
                      <div>
                        <Image src={`/image/school.png`} alt="school" width={60}
                          height={60} className="max-w-16 max-h-16 rounded-lg" />
                      </div>
                      <div >
                        <span className='text-xl text-violet-700'>{v?.name}</span>
                        <span className="font-mono text-md text-gray-500 font-normal ml-1">
                          {v?.major}</span>
                        <span className="font-mono text-md text-gray-500 font-normal ml-1">
                          {v?.secondmajor}</span>
                      </div>
                      <div className="flex flex-col col-span-2">
                        <div className='flex flex-col text-left justify-start items-left sm:flex-row sm:items-center mb-2'>
                          <div className="font-mono font-medium text-sm text-gray-400">
                            {parseInt(v?.category) &&
                              <span>{(() => {
                                switch (parseInt(v?.category)) {
                                  case 2: return (<span className="">박사</span>)
                                  case 4: return (<span className="">석사</span>)
                                  case 5: return (<span className="">학사</span>)
                                  case 7: return (<span className="">전문학사</span>)
                                  case 9: return (<span className="">고등학교</span>)
                                  case 99: return (<span className="">기타</span>)
                                  default: null;
                                }
                              })(parseInt(v?.category))}</span>
                            }
                          </div>
                        </div>
                      </div>
                      <div className="font-mono font-medium text-sm">
                        {v?.finish ?
                          <p className="text-gray-500">{`${v?.start?.year}년 ${v?.start?.month}월 ~ ${v?.end?.year}년 ${v?.end?.month}월`}</p>
                          :
                          <p className="text-gray-500">{`${v?.start?.year}년 ${v?.start?.month}월 ~ 재학중`}</p>
                        }
                      </div>
                      <div className="p-3 mt-3 bg-white shadow-inner w-full">
                        <div className="mt-2 font-normal text-sm whitespace-pre-wrap leading-normal">
                          {v?.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )

        ))
      }
    </div>
  );
};

CareerContainer.propTypes = {
  careers: PropTypes.array,
};


export default CareerContainer;