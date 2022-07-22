import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Tab from './Tab';

const index = () => {

  const [tabIndex, setTabIndex] = useState(1);
  const { user } = useSelector(state => state.user);
  return (
    <>
      <section className="pb-[1rem] sm:pb-[1rem] md:pb-[1rem] sm:pt-[9rem] pt-[8rem] w-[100%]">
        <div className="flex flex-col mx-auto space-y-12 max-w-7xl xl:px-12">
          <div className="relative">
            <h1 className="w-full text-2xl font-bold text-center sm:text-3xl md:text-4xl">
              {user?.username}님의 프로필
            </h1>
          </div>
        </div>
      </section>
      <section className="pt-6 pb-12 w-[100%]">
        <div className="flex flex-col mx-auto space-y-12 max-w-7xl xl:px-12">
          <div className="relative">
            <Tab
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default index;