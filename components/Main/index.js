import React, { useState } from 'react';
import Explain from './Explain';
import Search from './Search';
import Category from './Category';
import Boards from './Boards';

const index = () => {

  return (
    <>
      <Explain />
      <Search />
      <Category />
      <Boards/>
    </>

  );

};

export default index;