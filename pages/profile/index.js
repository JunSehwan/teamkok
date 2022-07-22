import React, { useEffect, Suspense } from 'react';
import Profile from 'components/Profile';
import Head from 'next/head'
import Navbar from 'components/Common/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setUser, resetUserState, userLoadingStart, userLoadingEnd, userLoadingEndwithNoone } from "slices/user";
import { loadEducations } from "slices/education";
import { loadCareers } from "slices/career";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, getEducationsByUserId, getCareersByUserId } from "firebaseConfig";
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
      if (!user) {
        dispatch(resetUserState());
        return router.push("/");
      }
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        dispatch(resetUserState());
        return router.push("/");
      }
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
        url_one: docData.url_one,
        url_two: docData.url_two,
        url_three: docData.url_three,
        about: docData.about,
        address: docData.address,
        style: docData.style,
        survey: docData.survey,
      };
      dispatch(setUser(currentUser));
      dispatch(userLoadingEnd());
      await getEducationsByUserId().then((result) => {
        dispatch(loadEducations(result));
      })
      await getCareersByUserId().then((result) => {
        console.log("이거보자", result)
        dispatch(loadCareers(result));
      })
    });
    return () => {
      authStateListener();
    };
  }, [auth, dispatch, router]);


  useEffect(() => {
    // dispatch(userLoadingStart());
    if (!user?.userID) return;

    const unsubscribe = onSnapshot(doc(db, "users", user.userID), (user) => {
      if (!user?.exists()) return;
      const docData = user?.data();

      const currentUser = {
        userID: user.id,
        username: docData.username,
        email: docData.email,
        birthday: docData.birthday,
        gender: docData.gender,
        avatar: docData.avatar,
        phonenumber: docData.phonenumber,
        category: docData.category,
        url_one: docData.url_one,
        url_two: docData.url_two,
        url_three: docData.url_three,
        about: docData.about,
        address: docData.address,
        style: docData.style,
        survey: docData.survey,
      };
      dispatch(setUser(currentUser));
      dispatch(userLoadingEnd());
      // const educations = getEducationsByUserId();
      // dispatch(loadEducations(educations));
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch, user?.uid, user?.userID]);

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
      <Navbar />
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