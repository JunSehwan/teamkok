import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import EditCareer from './EditCareer';
import DeleteCareer from './DeleteCareer';
import Empty from 'components/Common/Empty';
import companyPic from 'public/image/company.png';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { addCareerOpen, deleteDonefalse } from 'slices/career';
import toast from 'react-hot-toast';

const CareerList = () => {
  const dispatch = useDispatch();
  const { myCareers, deleteDone } = useSelector(state => state.career);
  const deleteCarNotify = () => toast('경력정보 제거 완료!');
  const [addNewCareer, setAddNewCareer] = useState(false);
  const onAddCareer = useCallback(() => {
    setAddNewCareer(true);
    dispatch(addCareerOpen());
  }, [dispatch])
  useEffect(() => {
    if (deleteDone) {
      deleteCarNotify();
      dispatch(deleteDonefalse());
    }
  })
  return (
    <>
      <div className='w-full my-4'>
        <div className='w-full rounded-lg lg:rounded-l-none'>

          <ul className="flex flex-col">
            <li key="1" className="flex flex-row">
              <div className="w-max transition duration-500 ease-in-out transform select-none dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                <div className="flex items-center justify-between flex-1 pl-1">
                  <span className="font-bold dark:text-white text-gray-500 hover:text-gray-800">
                    내 경력리스트
                    {myCareers?.length > 0 ?
                      <span className="ml-2 text-gray-400 text-sm font-normal">
                        ({myCareers?.length}건)</span>
                      :
                      <span className="ml-2 text-gray-400 text-sm font-normal">
                        미등록
                      </span>}
                  </span>

                </div>
              </div>
            </li>
          </ul>

          <div className='mt-[6px] py-[6px] px-2 rounded-[12px] bg-slate-100 shadow-inner grid grid-cols-2 lg:grid-cols-4 gap-2'>

            {/* 추가 */}
            <button onClick={onAddCareer} key="add"
              className="border-solid border-[#1890FF] border-2 bg-white my-[6px] text-left hover:shadow-xl rounded-xl hover:bg-gray-50 p-4">
              <div className='text-[#1890FF] flex justify-center items-center flex-col w-full h-full'>
                <BsFileEarmarkPlus className='w-8 h-8' />
                <p className='mt-2 text-xl font-bold'>새 경력 추가</p>
              </div>
            </button>




            {myCareers?.map((v, index) => (
              <div key={index} className="bg-white my-[6px] text-left hover:shadow-xl border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50 p-4">
                {/* <!-- Badge --> */}


                <div className="flex flex-col justify-between h-full">
                  {/* <!-- Profile Picture --> */}
                  {/* <div>
                      <Image src={companyPic}
                        alt="company" width={60}
                        unoptimized
                        height={60} className="rounded-full" />
                    </div> */}
                  {/* <!-- Description --> */}
                  <div className="col-span-3 ml-2">
                    <div className='mb-1 flex items-center'>
                      {v?.ismain == true &&
                        <span className="bg-sky-500 mr-1 w-fit px-2 py-0.5 text-sm font-semibold text-white rounded-md">주경력</span>}
                      <span className="text-sky-500 font-semibold text-md ">
                        {v?.position}
                      </span>
                    </div>
                    <p className="text-gray-800 font-bold mb-[4px]">{v?.name}
                      <span className="text-gray-700 text-md">&nbsp;{v?.section}</span>
                    </p>
                    <span className="text-gray-600 text-[0.88rem]">
                      {parseInt(v?.type) &&
                        <span>{(() => {
                          switch (parseInt(v?.type)) {
                            case 1: return (<span className="">정규직</span>)
                            case 2: return (<span className="">계약직</span>)
                            case 3: return (<span className="">자영업/개인사업</span>)
                            case 4: return (<span className="">프리랜서</span>)
                            case 5: return (<span className="">인턴/수습</span>)
                            case 6: return (<span className="">아르바이트</span>)
                            case 99: return (<span className="">기타</span>)
                            default: null;
                          }
                        })(parseInt(v?.type))}</span>
                      }</span>
                    <div className="text-gray-600 text-[0.88rem] overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      {v?.job}
                    </div>
                    <div className='pt-2'>
                      {v?.finish ?
                        <p className="text-gray-400 text-[0.78rem]">{`${v?.start?.year}년 ${v?.start?.month}월 ~ ${v?.end?.year}년 ${v?.end?.month}월`}</p>
                        :
                        <p className="text-gray-400 text-[0.78rem]">{`${v?.start?.year}년 ${v?.start?.month}월 ~ 재직중`}</p>
                      }
                    </div>
                    {v?.description && 
                      <p className="pt-2 text-gray-600 text-[0.88rem] whitespace-pre-wrap leading-normal overflow-hidden">{v?.description}</p>}
                  </div>

                  <span className='flex justify-end mt-4 items-center'>
                    {/* 수정 */}
                    <div className='mr-2 '>
                      <EditCareer
                        career={v}
                      />
                    </div>

                    {/* 삭제 */}
                    <DeleteCareer
                      id={v?.id}
                    />
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default CareerList;