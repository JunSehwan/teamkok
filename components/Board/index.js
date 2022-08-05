import React from 'react';
import SideBar from './SideBar';
import SideButton from './SideButton';
import Home from './Home';

const index = () => {

  return (
    <div className="w-full h-screen pt-[66px] bg-white">
      <div className="h-full flex flex-col sm:flex-row">
        <SideBar />
        <SideButton/>
        <Home />
      </div>
    </div>
  );
};

export default index;