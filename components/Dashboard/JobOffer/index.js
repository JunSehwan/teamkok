import { nanoid } from 'nanoid';
import { Router, useRouter } from 'next/router';
import { array } from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
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
                🪪입사제안을 받은 기업
              </p>

            
            </div>
            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-3 w-full pl-2'>
              {mainJoboffered && mainJoboffered?.length !== 0 ? (mainJoboffered?.length + "개") : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-2 my-4'>
              {mainJoboffered?.map?.((v) => (
                <JobofferCard
                  key={nanoid()}
                  jobofferCon={v}
                />
              ))}
            </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default index;