import React from 'react';
import SideBarList from "./SideBarList";
// import Channels from "./Channels";
// import AddServer from "./AddServer";

const index = () => {
  return (
    <div className="flex">
      <SideBarList />
      <div className="w-full flex-grow flex-col items-center justify-center gap-3 md:!flex text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>  
        <h2 className="text-center text-1xl">채용담당자 또는 현업담당자와 대화를 시작해보세요.</h2>
      </div>
    </div>
  );
};

export default index;