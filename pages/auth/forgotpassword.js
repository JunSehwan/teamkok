import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import PasswordRemake from 'components/Auth/PasswordRemake'
import { setUser, resetUserState,  userLoadingEnd } from "slices/user";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import {
  db, 
} from "firebaseConfig";
import LoadingPage from 'components/Common/Loading';

function ForgotPassword() {
  const auth = getAuth();
  const { user, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch(resetUserState());
        return
      }
      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        dispatch(resetUserState());
      }
      const docData = docSnap.data();

      const currentUser = {
        userID: user.uid,
        username: docData.username,
        email: docData.email,
        email_using: docData.email_using,
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
        favorites: docData.favorites,
        favLikes: docData.favLikes,
        experts: docData.experts,
        expertNum: docData.expertNum,
        point: docData.point,
        points: docData.points,
        givePoint: docData.givePoint,
        infoseen: docData.infoseen,
      };
      dispatch(setUser(currentUser));
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
        email_using: docData.email_using,
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
        favorites: docData.favorites,
        favLikes: docData.favLikes,
        experts: docData.experts,
        expertNum: docData.expertNum,
        point: docData.point,
        points: docData.points,
        givePoint: docData.givePoint,
        infoseen: docData.infoseen,
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
      <Head>
        <title>비밀번호를 잃어버리셨나요? - JOBCOC</title>

        <meta name="keywords" content="jobcoc, 채용사이트, 채용공고, 현업담당자와 대화, 업무문의, 채용문의, 소통플랫폼" />
        <meta name="description" content="1분 자기소개 영상이나 포트폴리오 이미지로 나의 이력을 어필할 수 있습니다. 또한, 채용담당자가 제안하는 동료들의 실질적인 연봉 수준을 확인할 수 있습니다." />

        <meta name="application-name" content="JOBCOC - 개성있는 프로필로 빠르게 취업하기" />
        <meta name="msapplication-tooltip" content="JOBCOC" />

        <meta property="og:type" content="비밀번호 변경하기, JOBCOC" />
        <meta property="og:title" content="JOBCOC - 개성있는 프로필로 빠르게 취업하기" />
        <meta property="og:description" content="1분 자기소개 영상이나 포트폴리오 이미지로 나의 이력을 어필할 수 있습니다. 또한, 채용담당자가 제안하는 동료들의 실질적인 연봉 수준을 확인할 수 있습니다." />
        <meta property="og:image" content="https://jobcoc.com/logo/jobcoc.png" />
        <meta property="og:url" content="https://jobcoc.com" />

        <meta name="twitter:card" content="JOBCOC에서 원하는 팀에 합류하세요!" />
        <meta name="twitter:title" content="JOBCOC - 개성있는 프로필로 빠르게 취업하기" />
        <meta name="twitter:description" content="1분 자기소개 영상이나 포트폴리오 이미지로 나의 이력을 어필할 수 있습니다. 또한, 채용담당자가 제안하는 동료들의 실질적인 연봉 수준을 확인할 수 있습니다." />
        <meta name="twitter:image" content="https://jobcoc.com/logo/jobcoc.png" />
        <meta name="twitter:domain" content="https://jobcoc.com" />
      </Head>
      {loading ?
        <LoadingPage /> :
        // <div/>
        <PasswordRemake />
        }
    </>
  );
}

export default ForgotPassword;