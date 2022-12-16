import React, { useState } from 'react';
import PropTypes from 'prop-types';

const First = ({ goNextStageFirst, goNews }) => {

  

  return (
    <div className='w-full h-[100vh] flex flex-col justify-between'>
      {/* 뒤로가기 버튼 ==> 첫번째는 없고 두번째부터*/}
      <div className='py-4 bg-[#ffffff51] z-10 backdrop-blur-md	'>
        <div className='mx-auto text-left'>

          <div className='my-6 px-4'>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 ">
              <div className="bg-sky-600 text-xs font-medium text-sky-100 text-center p-0.5 leading-none rounded-full w-[5%]">5%</div>
            </div>
          </div>
          <h3 className='sm:text-[2.6rem] text-[1.8rem] text-gray-700 my-6 w-full pl-2'>
            회원가입을 축하합니다!🤩</h3>

          <p className='ml-2 my-1 text-gray-500 text-[1.2rem] leading-8'>다음의 단계를 진행하면서 프로필을 만들어서
            최고의 팀에서 입사제안을 받아보세요!</p>
        </div>
      </div>
      
      <div className='w-full justify-center flex flex-col items-center px-2'>
        <button className="my-3 py-2 w-[12rem] text-gray-500 text-[14px] underline" onClick={goNews}>나중에 하기</button>
        <button className='my-2 w-full text-md py-6 font-bold text-white  bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg' onClick={goNextStageFirst}>시작하기</button>
      </div>
    </div>
  );
};

First.propTypes = {
  goNextStage: PropTypes.func,
  goNews: PropTypes.func,
};

export default First;