import React, { useState } from 'react';
import Explain from './Explain';
import Search from './Search';
import Boards from './Boards';
import Footer from './Footer';

const index = () => {

  return (
    <div className="bg-slate-50 min-h-[100vh] flex flex-col justify-between">
      <div>
      <Explain />
      <Search />
      <Boards/>
      </div>
      <Footer/>
    </div>

  );

};

export default index;