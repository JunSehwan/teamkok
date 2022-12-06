import { nanoid } from 'nanoid';
import React from 'react';
import { useSelector } from 'react-redux';
import AdviceCard from '../AdviceCard';

const index = () => {
  const { user } = useSelector(state => state.user);

  var ratingArr = user?.adviced?.map(a => a?.rating);

  const average = arr => arr?.reduce((p, c) => p + c, 0) / arr?.length;
  const averageValue = Math.round(average(ratingArr) * 100) / 100;


  return (
    <div className='pt-[var(--navbar-height)] md:px-8 pb-[70px] md:pb-auto'>

      <div className='pt-5'>


        <div className='py-6'>
          <div className='mx-auto pl-2 text-left'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                💡내가 받은 조언
              </p>
              <p className='text-blue-700 mr-1'>평균 {averageValue}점 / 5점</p>

            </div>
            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-3 w-full pl-2'>
              {user?.adviced && user?.adviced?.length !== 0 ? (user?.adviced?.length + "건") : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-2 my-4'>
              {user?.adviced?.map?.((v) => (
                <AdviceCard
                  key={nanoid()}
                  adviceCon={v}
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