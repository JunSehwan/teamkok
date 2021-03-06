import React, { useEffect, Suspense } from 'react';
import Profile from 'components/Profile';
import Head from 'next/head'
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
import CategoryList from 'components/Common/CategoryList';

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
        dispatch(loadCareers(result));
      })
    });
    return () => {
      authStateListener();
    };
  }, [auth, dispatch, router]);


  useEffect(() => {
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
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch, user?.uid, user?.userID]);

  
  return (
    <>
      <title>????????????????????? ???????????? ??????????????? - TEAMKOK</title>
      <meta name="description" content="????????????????????? ???????????? ??????????????? - TEAMKOK " />

      {/* <meta name="keywords" content="?????????1, ?????????2, ?????????3" />
      <meta name="description" content="????????? ??????" />

      <meta name="application-name" content="???????????? ??????????????? ?????? ??????" />
      <meta name="msapplication-tooltip" content="ms ???????????????" />
      <meta name="description" content="????????? ??????" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="????????? ??????" />
      <meta property="og:description" content="????????? ??????" />
      <meta property="og:image" content="http://www.mysite.com/myimage.jpg" />
      <meta property="og:url" content="http://www.mysite.com" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="????????? ??????" />
      <meta name="twitter:description" content="????????? ??????" />
      <meta name="twitter:image" content="http://www.mysite.com/article/article1.html" />
      <meta name="twitter:domain" content="????????? ???" /> */}
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