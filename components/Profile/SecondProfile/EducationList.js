import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import EditEducation from './EditEducation';
import DeleteEducation from './DeleteEducation';

const EducationList = () => {
  const { myEducations } = useSelector(state => state.education);
  const [viewEdu, setViewEdu] = useState(false);
  const onViewEdu = useCallback(() => {
    setViewEdu(prev => !prev);
  }, [])

  // 수정
  const [onEdit, setOnEdit] = useState(false);
  const onClickModify = useCallback(() => {
    setOnEdit(true);
  }, []);
  const closeModify = useCallback(() => {
    setOnEdit(false);
  }, [])

  return (
    <>

      <div className='max-w-[32rem] mx-auto w-[100%] mt-[3.2rem]'>
        <div className='w-full rounded-lg lg:rounded-l-none'>

          <ul className="flex flex-col">
            <li className="border-gray-400 flex flex-row mb-2">
              <button onClick={onViewEdu} className="w-max transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-[rgba(0,0,0,0.04)] dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                <div className="flex items-center justify-between flex-1 pl-1">
                  <span className="font-bold dark:text-white text-gray-500 hover:text-gray-800">
                    학력
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
            <a onClick={onClickModify} className='transition-all ease-in duration-500'>
              {myEducations?.map((v, index) => (
                <>

                  {/* 수정 */}
                  {onEdit ?
                    <EditEducation
                      onOpen={onClickModify}
                      onEdit={onEdit}
                      education={v}
                      onClose={closeModify}
                    />
                    : null}


                  <div key={index} className="text-left hover:shadow-xl w-[100%] border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50">
                    {/* <!-- Badge --> */}

                    {v?.ismain == true &&
                      <p className="bg-sky-500 w-fit px-4 py-1 text-sm font-bold text-white rounded-tl-lg rounded-br-xl">최종학력</p>}
                    <div className="grid grid-cols-6 p-5 gap-y-2">
                      {/* <!-- Profile Picture --> */}
                      <div>
                        <Image src={`/image/school.png`} alt="school" width={60}
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

                        <p className="text-gray-400 text-[0.78rem]">{`${v?.start?.year}년 ${v?.start?.month}월 ~ ${v?.end?.year}년 ${v?.end?.month}월`}</p>
                      </div>

                      {/* 삭제 */}
                      <DeleteEducation
                        id={v?.id}
                      />
                    </div>
                  </div>
                </>
              ))}
            </a>
            :

            null}
        </div>
      </div>
    </>
  );
};

export default EducationList;