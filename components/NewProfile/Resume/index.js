import React from 'react';
import AvatarEdit from './AvatarEdit';
import BasicEdit from './BasicEdit';
import Careers from './Careers';
import Educations from './Educations';
import Skills from './Skills';
import Styles from './Styles';
import Additional from './Additional';

const index = (
  {
    element1,
    element2,
    element3,
    element4,
    element5,
    element6,
  }
) => {

 
  return (
    <div className='pt-[var(--navbar-height)] md:px-8 pb-[70px] md:pb-auto'>
      <div ref={element1}>
        <AvatarEdit />
        <BasicEdit />
      </div>
      <div ref={element2}>
        <Careers />
      </div>
      <div ref={element3}>
        <Educations />
      </div>
      <div ref={element4}>
        <Skills />
      </div>
      <div ref={element5}>
        <Styles />
      </div>
      <div ref={element6}>
        <Additional />
      </div>
    </div>
  );
};

export default index;