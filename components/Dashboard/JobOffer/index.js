import { nanoid } from 'nanoid';
import React from 'react';
import { useSelector } from 'react-redux';
import JobofferCard from '../JobofferCard';

const index = () => {
  const { mainJoboffered } = useSelector(state => state.joboffer);

  return (
    <div className='pt-[var(--navbar-height)] md:px-8 pb-[70px] md:pb-auto'>

      <div className='pt-5'>


        <div className='py-6'>
          <div className='mx-auto text-left'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                🪪입사제안을 받은 기업
              </p>


            </div>
            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-3 w-full pl-2'>
              {mainJoboffered && mainJoboffered?.length !== 0 ? (mainJoboffered?.length + "건") : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
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