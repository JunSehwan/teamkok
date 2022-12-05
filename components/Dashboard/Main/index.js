import { nanoid } from 'nanoid';
import { Router, useRouter } from 'next/router';
import { array } from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
// import Careers from './Careers';
import AdviceCard from '../AdviceCard';
import CoccocCard from '../CoccocCard';
import JobofferCard from '../JobofferCard';

const index = () => {
  const { user } = useSelector(state => state.user);
  const { mainJoboffers, mainJoboffered } = useSelector(state => state.joboffer);
  const { mainCoccocs, mainCoccoced } = useSelector(state => state.coccoc);
  const router = useRouter();
  const goJoboffer = useCallback(() => {
    router.push("/dashboard/joboffer");
  }, [router])
  const goCoccoc = useCallback(() => {
    router.push("/dashboard/coccoc");
  }, [router])
  const goAdvice = useCallback(() => {
    router.push("/dashboard/advice");
  }, [router])

  var coccocedSalary = mainCoccoced?.map(a => a?.salary);
  var jobofferedSalary = mainJoboffered?.map(a => a?.salary);

  var plusedArr = coccocedSalary?.concat(jobofferedSalary);
  const average = arr => arr?.reduce((p, c) => p + c, 0) / arr?.length;
  const averageValue = average(plusedArr);

  return (
    <div className='pt-[var(--navbar-height)] md:px-8 pb-[70px] md:pb-auto'>

      <div className='pt-5'>

        <div className='py-6'>
          <div className='mx-auto pl-2 text-left'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                💰평균 제안받은 연봉수준
              </p>

              <button
                className='text-gray-400 text-sm px-2 py-1 w-fit flex flex-row items-center'
                onClick={goJoboffer}
              >
                <IoIosArrowBack />
                <span className='ml-1 hover:text-gray-800'>더보기</span>
              </button>
            </div>
            <div className='flex flex-row items-end justify-start w-full mt-2 gap-2'>
              <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 pl-2'>
                {averageValue ? (Math.round(averageValue))?.toLocaleString() + "만원" : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
              </h3>
              {averageValue && <p className='mb-1'>(총 {plusedArr?.length}건)</p>}
            </div>
          </div>
        </div>

        <div className='py-6'>
          <div className='mx-auto pl-2 text-left'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                🪪입사제안을 받은 기업
              </p>

              <button
                className='text-gray-400 text-sm px-2 py-1 w-fit flex flex-row items-center'
                onClick={goJoboffer}
              >
                <IoIosArrowBack />
                <span className='ml-1 hover:text-gray-800'>더보기</span>
              </button>
            </div>
            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-2 w-full pl-2'>
              {mainJoboffered && mainJoboffered?.length !== 0 ? (mainJoboffered?.length + "개") : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-2 my-4'>
              {mainJoboffered?.slice(0, 2)?.map?.((v) => (
                <JobofferCard
                  key={nanoid()}
                  jobofferCon={v}
                />
              ))}
            </div>
          </div>
        </div>



        <div className='py-6'>
          <div className='mx-auto pl-2 text-left'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                📌나를 콕! 찍은 기업
              </p>

              <button
                className='text-gray-400 text-sm px-2 py-1 w-fit flex flex-row items-center'
                onClick={goCoccoc}
              >
                <IoIosArrowBack />
                <span className='ml-1'>더보기</span>
              </button>
            </div>
            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-2 w-full pl-2'>
              {mainCoccoced && mainCoccoced?.length !== 0 ? (mainCoccoced?.length + "개") : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-2 my-4'>
              {mainCoccoced?.slice(0, 2)?.map?.((v) => (
                <CoccocCard
                  key={nanoid()}
                  coccocCon={v}
                />
              ))}
            </div>
          </div>
        </div>

        <div className='py-6'>
          <div className='mx-auto pl-2 text-left flex-col flex'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                💡전문가에게 받은 조언
              </p>

              <button
                className='text-gray-400 text-sm px-2 py-1 w-fit flex flex-row items-center'
                onClick={goAdvice}
              >
                <IoIosArrowBack />
                <span className='ml-1'>더보기</span>
              </button>
            </div>
            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-2 w-full pl-2'>
              {user?.adviced && user?.adviced?.length !== 0 ? (user?.adviced?.length + "개") : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-2 my-4'>
              {user?.adviced?.slice(0, 2)?.map?.((v) => (
                <AdviceCard
                  key={nanoid()}
                  adviceCon={v}
                />
              ))}
            </div>
          </div>

        </div>
        <div className='py-6'>
          <div className='mx-auto pl-2 text-left'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                💖내 프로필 좋아요 개수
              </p>
            </div>
            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-2 w-full pl-2'>
              {user?.liked && user?.liked?.length !== 0 ? (user?.liked?.length + "개") : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;