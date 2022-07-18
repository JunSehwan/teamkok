import React, { useEffect, Suspense } from 'react';
import Profile from 'components/Profile';
import Head from 'next/head'
import NavbarWithoutUser from 'components/Common/NavbarWithoutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setUser, resetUserState, userLoadingStart, userLoadingEnd, userLoadingEndwithNoone } from "slices/user";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "firebaseConfig";
import { wrapper } from 'store/index';
import { addCategory } from 'slices/category';
import LoadingPage from 'components/Common/Loading';
import CategoryList from 'components/Common/CatgegoryList';
const index = () => {

  const auth = getAuth();
  const { user, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, async (user) => {
      if (!user) return redirect();
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      // const result = setCategoryList(CategoryList);
      // console.log(result, "keke");


      if (!docSnap.exists()) return redirect();

      const docData = docSnap.data();

      const currentUser = {
        userID: user.uid,
        username: docData.username,
        email: docData.email,
        birthday: docData.birthday,
        gender: docData.gender,
        avatar: docData.avatar,
        phonenumber: docData.phonenumber,
        category: docData.category,
        tag: docData.tag,
        about: docData.about,
        banner: docData.banner,
      };

      dispatch(setUser(currentUser));
      dispatch(userLoadingEnd());
    });
    return () => {
      authStateListener();
    };
  }, [auth, dispatch]);


  useEffect(() => {
    // dispatch(userLoadingStart());
    if (!user?.userID) return;

    const unsubscribe = onSnapshot(doc(db, "users", user.userID), (doc) => {
      if (!doc?.exists()) return;

      const docData = doc?.data();

      const currentUser = {
        userID: user.uid,
        username: docData.username,
        email: docData.email,
        birthday: docData.birthday,
        gender: docData.gender,
        avatar: docData.avatar,
        phonenumber: docData.phonenumber,
        category: docData.category,
        tag: docData.tag,
        about: docData.about,
        banner: docData.banner,
      };
      dispatch(setUser(currentUser));
      dispatch(userLoadingEnd());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   if (!server.serverID || !user.userID) return;

  //   const docRef = doc(db, "servers", server.serverID, "members", user.userID);

  //   const unsubscribe = onSnapshot(docRef, (doc) => {
  //     const docData = doc.data();

  //     const roles = {
  //       userID: doc.id,
  //       serverOwner: docData?.serverOwner,
  //       roles: docData?.roles,
  //       // permissions: docData?.permissions,
  //     };
  //     dispatch(setUser({ ...user, roles }));
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [server]);

  // function redirect() {
  //   dispatch(rere());

  //   router.push("/login");
  // }
  function redirect() {
    dispatch(resetUserState());

    router.push("/");
  }

  // 만약 로그아웃시 메인화면으로 이동
  // useEffect(() => {
  //   if (!(me && me.id)) {
  //     router.push('/');
  //   }
  // }, [me && me.id]);

  return (
    <>
      <title>현업전문가와의 소통기반 채용플랫폼 - TEAMKOK</title>
      <meta name="description" content="현업전문가와의 소통기반 채용플랫폼 - TEAMKOK " />

      {/* <meta name="keywords" content="키워드1, 키워드2, 키워드3" />
      <meta name="description" content="페이지 설명" />

      <meta name="application-name" content="어플에서 아이콘뺄때 나올 이름" />
      <meta name="msapplication-tooltip" content="ms 작업표시줄" />
      <meta name="description" content="페이지 설명" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="페이지 제목" />
      <meta property="og:description" content="페이지 설명" />
      <meta property="og:image" content="http://www.mysite.com/myimage.jpg" />
      <meta property="og:url" content="http://www.mysite.com" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="페이지 제목" />
      <meta name="twitter:description" content="페이지 설명" />
      <meta name="twitter:image" content="http://www.mysite.com/article/article1.html" />
      <meta name="twitter:domain" content="사이트 명" /> */}
      <NavbarWithoutUser />
      {loading ?
        <LoadingPage /> :
        <Profile />}
    </>

  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(userLoadingStart());
    store.dispatch(addCategory(CategoryList));
    // const auth = getAuth();
    // if (!auth.currentUser) {
    //   return {
    //     redirect: {
    //       destination: "/",
    //       permanent: false,
    //     },
    //   };
    // }
    // return {
    //   props: {},
    // };
  }
);

export default index;