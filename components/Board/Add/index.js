import React from 'react';

import BoardInfo from './BoardInfo'

const index = () => {

  

  return (
    <>
      <section className="pb-[1rem] sm:pb-[1rem] md:pb-[1rem] sm:pt-[9rem] pt-[8rem] w-[100%]">
        <div className="flex flex-col mx-auto space-y-12 max-w-7xl xl:px-12">
          <div className="relative">
            <h1 className="w-full text-2xl font-bold text-center sm:text-3xl md:text-4xl">
              우리회사 기업보드 만들기
            </h1>
          </div>
        </div>
      </section>
      <section className="pt-6 pb-12 w-[100%]">
        <div className="flex flex-col mx-auto space-y-12 max-w-7xl px-4 xl:px-12">
          <div className="relative">
            <div className='max-w-[32rem] mx-auto w-[100%] mt-[2.4rem]'>

              <BoardInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;