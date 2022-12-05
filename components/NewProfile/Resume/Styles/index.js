import React from 'react';
import MyStyle from './MyStyle';

const index = () => {



  return (
    <div className='w-full flex flex-col'>
      {/* 뒤로가기 버튼 ==> 첫번째는 없고 두번째부터*/}
      <div className='py-8'>
        <div className='mx-auto text-left'>

          <h3 className='sm:text-[2.1rem] text-[1.8rem] text-gray-700 my-4 w-full'>
            🧬Style DNA</h3>
          {/* <p className='ml-2 my-4 text-gray-500 text-[1.2rem] leading-8'>나와 맞는 스타일의 팀지 확인할 수 있습니다.</p> */}
          <MyStyle />
        </div>
      </div>
    </div>
  );
};

export default index;