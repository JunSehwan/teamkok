import React from 'react';
import PersonalInfo from './PersonalInfo';
import Avatar from './Avatar';
import ChangeAvatar from './ChangeAvatar';
import { useSelector } from 'react-redux';

const index = () => {
  const { changeAvatarOpen } = useSelector(state => state.userSettings);


  return (
    <div className='max-w-[24rem] mx-auto w-[100%] mt-[3.2rem]'>
      <Avatar />
      {changeAvatarOpen && <ChangeAvatar />}
      <PersonalInfo />

    </div>
  );
};

export default index;