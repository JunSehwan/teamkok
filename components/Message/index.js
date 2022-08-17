import React from 'react';
import SideBarList from "./SideBarList";
// import Channels from "./Channels";
// import AddServer from "./AddServer";

const index = () => {
  return (
    <div className="flex pt-[66px] bg-slate-50">
      <SideBarList />
      <div className="w-full min-h-[calc(100vh-66px)] flex-grow flex-col items-center justify-center gap-3 flex text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <h2 className="text-center text-1xl flex flex-row flex-wrap justify-center items-center">
          <span>좌측 상단의&nbsp;</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>버튼을 눌러서</span>
        </h2>
        <h2 className="text-center text-1xl">
        대화리스트를 선택하세요.</h2>
      <div className="mt-4 p-2 sm:p-4 rounded-lg bg-purple-50 shadow-inner">
        <p className="my-2 text-md text-purple-700">궁금한 사항에 대해서 채용담당자 또는 현직자와 대화할 수 있습니다.</p>
        <p className="text-sm text-gray-500">1. 학습방법</p>
        <p className="text-sm text-gray-500">2. 채용정보</p>
        <p className="text-sm text-gray-500">3. 팀정보 문의</p>
        <p className="text-sm text-gray-500">4. 과제관련 문의</p>
        <p className="text-xs text-gray-400 mt-2">위에 해당하지 않거나 부적절한 대화시 제재조치를 받을 수 있습니다.</p>
      </div>
      </div>
    </div>
  );
};

export default index;