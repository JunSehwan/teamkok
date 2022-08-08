import { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import LogoButton from './LogoButton';
import AlertModal from 'components/Common/Modal/AlertModal';
import AuthModal from 'components/Auth/AuthModal';
import NavBarLayout from './NavBarLayout';
import MenuButtonsForDesktop from './MenuButtonsForDesktop';
import MenuButtonsForMobile from './MenuButtonsForMobile';
import {logOut} from 'firebaseConfig';
import {signOut} from 'slices/user';

export default function NavBarContent() {
  // 로그인 : 2, 회원가입 : 1
  const [tabIndex, setTabIndex] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

  async function logoutConfirm() {
    const res = await logOut();
    console.log(res);
    dispatch(signOut({}));
    setShowLogoutModal(false);
  };

  function authModalHandler(authModalTabIndex) {
    setTabIndex(authModalTabIndex);
    setShowAuthModal(true);
  };

  return (
    <>
      {showLogoutModal &&
        <AlertModal
          title="로그아웃"
          contents="정말 로그아웃을 하시겠습니까?"
          onConfirm={logoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
          twobutton={true}
          closeOutsideClick={false}
        />}
      {showAuthModal &&
        <AuthModal
          setShow={setShowAuthModal}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />}
      <NavBarLayout>
        <LogoButton />
        <MenuButtonsForDesktop
          user={user}
          authModalHandler={authModalHandler}
          logoutModalHandler={()=>setShowLogoutModal(true)}
        />
        <MenuButtonsForMobile
          user={user}
          authModalHandler={authModalHandler}
          logoutModalHandler={()=>setShowLogoutModal(true)}
        />
      </NavBarLayout>
    </>
  );
}

