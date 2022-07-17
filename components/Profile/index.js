import React, { useState } from 'react';
import Tab from './Tab';

const index = () => {

  const [tabIndex, setTabIndex] = useState(1);

  return (
    <>
      <section className="pt-24 pb-12 w-[100%]">
        <div className="flex flex-col mx-auto space-y-12 max-w-7xl xl:px-12">
          <div className="relative">
            <h2 className="w-full text-1xl font-bold text-center sm:text-2xl md:text-3xl">
              프로필 편집
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