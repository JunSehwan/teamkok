import { nanoid } from 'nanoid';
import { Router, useRouter } from 'next/router';
import { array } from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MdOutlineExpandMore } from 'react-icons/md';
import { useSelector } from 'react-redux';
// import Careers from './Careers';
import AdviceCard from './AdviceCard'
import CoccocCard from './CoccocCard';
import JobofferCard from './JobofferCard';
import PeopleCard from './PeopleCard';

const index = () => {
  const { user } = useSelector(state => state.user);
  const { mainJoboffers } = useSelector(state => state.joboffer);
  const { mainCoccocs } = useSelector(state => state.coccoc);
  const router = useRouter();
  const [moreAdvice, setMoreAdvice] = useState(4);
  const [moreCoccoc, setMoreCoccoc] = useState(4);
  const [moreJoboffer, setMoreJoboffer] = useState(4);
  const offerArr = [];
  mainJoboffers?.map(v => (
    v?.answer == 1 && offerArr?.push(v)
  ))
  const coccocArr = [];
  mainCoccocs?.map(v => (
    v?.answer == 1 && coccocArr?.push(v)
  ))
  var plusedArr = coccocArr?.concat(offerArr);

  const uniqueArr = plusedArr?.filter((element, index) => {
    return plusedArr.indexOf(element) === index;
  });

  return (
    <div className='pt-[var(--navbar-height)] md:px-8 pb-[70px] md:pb-auto'>

      <div className='pt-5'>

        <div className='py-6'>
          <div className='mx-auto text-left'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                👩‍👦입사에 승낙한 인재리스트
              </p>
            </div>
            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-2 w-full pl-2'>
              {uniqueArr && uniqueArr?.length !== 0 ? (uniqueArr?.length + "명") : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-2 my-4'>
              {uniqueArr?.map?.((v) => (
                <PeopleCard
                  key={nanoid()}
                  friend={v}
                />
              ))}
            </div>

          </div>
        </div>

        <div className='py-6'>
          <div className='mx-auto text-left'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                🪪입사제안
              </p>


            </div>
            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-2 w-full pl-2'>
              {mainJoboffers && mainJoboffers?.length !== 0 ? (mainJoboffers?.length + "건") : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-2 my-4'>
              {mainJoboffers?.slice(0, moreJoboffer)?.map?.((v) => (
                <JobofferCard
                  key={nanoid()}
                  jobofferCon={v}
                />
              ))}
            </div>
            {mainJoboffers?.length > moreJoboffer &&
              <button
                className='flex justify-center w-full text-gray-600 text px-8 py-1 flex-row items-center'
                onClick={() => setMoreJoboffer(prev => prev + 6)}
              >
                <MdOutlineExpandMore />
                <span className='hover:text-gray-800 ml-1'>더보기</span>
              </button>
            }
          </div>
        </div>



        <div className='py-6'>
          <div className='mx-auto text-left'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                📌콕!콕!
              </p>


            </div>
            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-2 w-full pl-2'>
              {mainCoccocs && mainCoccocs?.length !== 0 ? (mainCoccocs?.length + "건") : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-2 my-4'>
              {mainCoccocs?.slice(0, moreCoccoc)?.map?.((v) => (
                <CoccocCard
                  key={nanoid()}
                  coccocCon={v}
                />
              ))}
            </div>
            {mainCoccocs?.length > moreCoccoc &&
              <button
                className='flex justify-center w-full text-gray-600 text px-8 py-1 flex-row items-center'
                onClick={() => setMoreCoccoc(prev => prev + 6)}
              >
                <MdOutlineExpandMore />
                <span className='hover:text-gray-800 ml-1'>더보기</span>
              </button>
            }
          </div>
        </div>

        <div className='py-6'>
          <div className='mx-auto text-left flex-col flex'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                💡내가 보낸 조언
              </p>


            </div>
            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-2 w-full pl-2'>
              {user?.advices && user?.advices?.length !== 0 ? (user?.advices?.length + "건") : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-2 my-4'>
              {user?.advices?.slice(0, moreAdvice)?.map?.((v) => (
                <AdviceCard
                  key={nanoid()}
                  adviceCon={v}
                />
              ))}
            </div>
            {user?.advices?.length > moreAdvice &&
              <button
                className='flex justify-center w-full text-gray-600 text px-8 py-1 flex-row items-center'
                onClick={() => setMoreAdvice(prev => prev + 6)}
              >
                <MdOutlineExpandMore />
                <span className='hover:text-gray-800 ml-1'>더보기</span>
              </button>
            }
          </div>
        </div>

        <div className='py-6'>
          <div className='mx-auto text-left'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                💖우리팀 좋아요 개수
              </p>
            </div>
            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-2 w-full pl-2'>
              {user?.liked && user?.liked?.length !== 0 ? (user?.liked?.length + "건") : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
            </h3>
          </div>
        </div>
      </div>
    </div >
  );
};

export default index;