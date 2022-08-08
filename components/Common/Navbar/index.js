import React, { useEffect, useState } from 'react';
import AlertModal from 'components/Common/Modal/AlertModal';
import NavBarContent from './NavBarContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeSignupConfirmModal } from 'slices/user';

const Navbar = () => {
  const [showSignupAlertModal, setShowSignupAlertModal] = useState(false);
  const dispatch = useDispatch();
  const { signUpSuccess } = useSelector((state) => state.user);

  const closeConfirmModal = () => {
    setShowSignupAlertModal(false);
    dispatch(closeSignupConfirmModal());
  };

  useEffect(() => {
    if (signUpSuccess) {
      setShowSignupAlertModal(true);
    } else {
      setShowSignupAlertModal(false);
    }
  }, [showSignupAlertModal, signUpSuccess]);

  return (
    <>
      {showSignupAlertModal && (
        <AlertModal
          title="TEAMKOK 회원가입 성공!"
          contents="이제부터 다양한 팀의 활동내용을 찾아볼 수 있습니다."
          contents_second="프로필 > 기본정보와 스타일 정보를 입력하시면 현직자와의 1:1대화 및 채용제안을 받으실 수 있습니다."
          onConfirm={closeConfirmModal}
          closeOutsideClick={true}
          twobutton={false}
        />
      )}
      <NavBarContent />
    </>
  );
};

export default Navbar;
