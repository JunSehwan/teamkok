import React, { useState } from 'react';
import SideBar from '../SideBar';
import SideButton from '../SideButton';
import BoardTabs from './BoardTabs';

const index = () => {

  const [tabIndex, setTabIndex] = useState(1);

  return (
    <div className="w-full pt-[66px] h-screen">
      <div className="h-full flex flex-col sm:flex-row">
        <SideBar />
        <SideButton />
        <BoardTabs
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />
      </div>
    </div>
  );
};

export default index;