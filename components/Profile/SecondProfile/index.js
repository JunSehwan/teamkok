import React from 'react';
import Education from './Education';
import Career from './Career';
import EducationList from './EducationList';
import CareerList from './CareerList';

const index = () => {
  return (
    <>
      <div>
        
        <Education />
        <Career />
      </div>
      <EducationList />
      <CareerList />
    </>
  );
};

export default index;