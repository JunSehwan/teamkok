import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import EditEducation from './EditEducation';
import DeleteEducation from './DeleteEducation';
import Empty from '../../Common/Empty';

const EducationList = () => {
  const dispatch = useDispatch();
  const { myEducations, updateDone, setUpdateDoneFalse } = useSelector(state => state.education);
  const [viewEdu, setViewEdu] = useState(false);
  const onViewEdu = useCallback(() => {
    setViewEdu(prev => !prev);
  }, [])
  // useEffect(() => {
  //   if (updateDone) {
  //     setViewEdu(false);
  //   }
  // }, [updateDone, dispatch, setUpdateDoneFalse])


  return (
    <>
      <div className='max-w-[38rem] mx-auto w-[100%] mt-[1.2rem]'>
        <div className='w-full rounded-lg lg:rounded-l-none'>

          <ul className="flex flex-col">
            <li key="1" className="border-gray-400 flex flex-row">
              <button onClick={onViewEdu} className="w-max transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-[rgba(0,0,0,0.04)] dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                <div className="flex items-center justify-between flex-1 pl-1">
                  <span className="font-bold dark:text-white text-gray-500 hover:text-gray-800">
                    내 학력리스트
                    {myEducations?.length > 0 ?
                      <span className="ml-2 text-gray-400 text-sm font-normal">
                        ({myEducations?.length}건 등록)</span>
                      :
                      <span className="ml-2 text-gray-400 text-sm font-normal">
                        미등록
                      </span>}
                  </span>
                  <span className="text-right flex justify-end focus:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" fill="currentColor" height="24" className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </button>
            </li>
          </ul>
          {viewEdu ?
            <div className='mt-[6px] py-[6px] rounded-[12px] bg-slate-100 shadow-inner transition-all ease-in duration-500'>
              {myEducations?.length !== 0 ?
                myEducations?.map((v, index) => (
                  <div key={index} className="bg-white mx-[6px] my-[6px] text-left hover:shadow-xl border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50">
                    {/* <!-- Badge --> */}

                    {v?.ismain == true &&
                      <p className="bg-sky-500 w-fit px-4 py-1 text-sm font-bold text-white rounded-tl-lg rounded-br-xl">주학력</p>}
                    <div className="grid grid-cols-6 p-5 gap-y-2">
                      {/* <!-- Profile Picture --> */}
                      <div>
                        <Image 
                        unoptimized
                        src={`/image/school.png`} alt="school" width={60}
                          height={60} className="max-w-16 max-h-16 rounded-full" />
                      </div>
                      {/* <!-- Description --> */}
                      <div className="col-span-5 md:col-span-4 ml-4">
                        <p className="text-sky-500 font-bold text-xs mb-[4px]">
                          {(() => {
                            switch (parseInt(v?.category)) {
                              case 9: return ("박사")
                              case 7: return ("석사")
                              case 5: return ("학사")
                              case 4: return ("전문학사")
                              case 2: return ("고등학교")
                              case 99: return ("기타")

                              default: null;
                            }
                          })(v?.zip)}

                        </p>
                        <p className="text-gray-700 font-bold mb-[4px]">{v?.name}
                          <span className="text-gray-500 text-[0.88rem]">&nbsp;{v?.major}</span>
                        </p>
                        {v?.finish ?
                          <p className="text-gray-400 text-[0.78rem]">{`${v?.start?.year}년 ${v?.start?.month}월 ~ ${v?.end?.year}년 ${v?.end?.month}월`}</p>
                          :
                          <p className="text-gray-400 text-[0.78rem]">{`${v?.start?.year}년 ${v?.start?.month}월 ~ 재학중`}</p>
                        }
                      </div>

                      <span className='flex justify-center'>
                        {/* 수정 */}
                        <EditEducation
                          setViewEdu={setViewEdu}
                          education={v}
                        />

                        {/* 삭제 */}
                        <DeleteEducation
                          id={v?.id}
                        />
                      </span>
                    </div>
                  </div>
                ))
                :
                <Empty
                  title="학력정보 없음"
                  text="학력정보를 등록해주세요."
                />}
            </div>
            :
            null}

        </div>
      </div>
    </>
  );
};

export default EducationList;