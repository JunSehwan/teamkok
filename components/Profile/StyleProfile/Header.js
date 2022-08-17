import React from 'react';

const Header = () => {
  return (
    <div className="m-auto pt-[2.4rem] mb-[1.6rem]">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-700 sm:text-4xl">
        <span className="block mb-[0.88rem]">내 업무스타일은?</span>
        <span className="text-base block font-normal text-gray-500">
          해당 내용은 관심기업 등록시<br/> 관심기업의 채용담당자와 현업전문가만 볼 수 있습니다.</span>
        <span className="text-base block font-normal text-gray-500">
          또한, 나와 스타일이 맞는 팀인지 확인할 수 있습니다.</span>

      </h2>
    </div>
  );
};

export default Header;