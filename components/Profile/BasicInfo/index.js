import React from 'react';
import PersonalInfo from './PersonalInfo';
import Avatar from './Avatar';
import ChangeAvatar from './ChangeAvatar';
import Withdrawal from './Withdrawal';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const index = ({ setTabIndex }) => {
  const { changeAvatarOpen } = useSelector(state => state.userSettings);


  return (
    <div className='max-w-[38rem] mx-auto w-[100%] mt-[3.2rem]'>
      <Avatar />
      {changeAvatarOpen && <ChangeAvatar />}
      <PersonalInfo setTabIndex={setTabIndex} />
      <Withdrawal/>
    </div>
  );
};

index.propTypes = {
  setTabIndex: PropTypes.func,
};


export default index;