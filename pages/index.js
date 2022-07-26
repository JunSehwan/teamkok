import React, { useEffect, useState } from 'react';
import Main from 'components/Main';
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setUser, userLoadingStart, userLoadingEnd, userLoadingEndwithNoone } from "slices/user";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { wrapper } from 'store/index';
import LoadingPage from 'components/Common/Loading';

const index = ({ me }) => {

  const auth = getAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector(state => state.user);

  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, async (user) => {
      if (!user) return dispatch(userLoadingEndwithNoone());

      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists())
        return dispatch(userLoadingEndwithNoone());

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
    });
    return () => {
      authStateListener();
    };
  }, [auth, dispatch]);

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
      {loading ?
        <LoadingPage />
        :
        <>
          <Main me={me} />
        </>
      }
    </>

  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(userLoadingStart());
  }
);

export default index;