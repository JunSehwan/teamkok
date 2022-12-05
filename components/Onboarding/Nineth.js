import React from 'react';
import PropTypes from 'prop-types';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Fourteen = ({ goProfile, goPrevStage, goCertStage, goNews }) => {


  return (
    <div className='w-full h-[100vh] flex flex-col justify-between'>
      {/* 뒤로가기 버튼 ==> 첫번째는 없고 두번째부터*/}
      <div className='py-4 bg-[#ffffff51] z-10 backdrop-blur-md	'>
        <div className='mx-auto pl-2 text-left'>
          <div className='w-full flex justify-start items-center'>
            <div className='w-max'>
              <div className='flex justify-start items-center'>
                <button className="text-gray-600 p-3 rounded-full hover:bg-gray-100"
                  onClick={() => goCertStage(8)}
                >
                  <IoMdArrowRoundBack className='w-6 h-6' />
                </button>
              </div>
            </div>
            <div className='my-6 px-4 w-full'>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 ">
                <div className="bg-sky-800 text-xs font-medium text-sky-100 text-center p-0.5 leading-none rounded-full w-[100%]">100%</div>
              </div>
            </div>
          </div>
          <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 my-6 w-full pl-2'>
            고생하셨습니다!👍</h3>

          <p className='ml-2 my-1 text-gray-500 text-[1.2rem] leading-8'>정보가 성공적으로 등록되었습니다.
            이제 다양한 팀에서 입사제의를 받을 수 있습니다.</p>
        </div>
      </div>

      <div className='w-full justify-center flex flex-col items-center px-2'>
        <button className="my-3 py-2 w-[12rem] text-gray-500 text-[14px] underline" onClick={goProfile}>프로필 정보 수정하기</button>
        <button className='my-2 w-full text-md py-6 font-bold text-white  bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg' onClick={goNews}>다양한 팀소식 보러가기</button>
      </div>
    </div>
  );
};

Fourteen.propTypes = {
  goNextStage: PropTypes.func,
  goCertStage: PropTypes.func,
  goProfile: PropTypes.func,
  goNews: PropTypes.func,
};

export default Fourteen;