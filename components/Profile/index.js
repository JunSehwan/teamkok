import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Tab from './Tab';

const index = () => {

  const [tabIndex, setTabIndex] = useState(1);
  const { user } = useSelector(state => state.user);
  return (
    <>
      <section className="pt-24 pb-12 w-[100%]">
        <div className="flex flex-col mx-auto space-y-12 max-w-7xl xl:px-12">
          <div className="relative">
            <h2 className="w-full text-1xl font-bold text-center sm:text-2xl md:text-3xl">
              {user?.username}님의 프로필
            </h2>
          </div>
        </div>
      </section>
      <section className="pt-12 pb-12 w-[100%]">
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