import React, { useEffect, Suspense } from 'react';
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { setUser, resetUserState, userLoadingStart, userLoadingEnd, userLoadingEndwithNoone } from "slices/user";
import { loadEducations } from "slices/education";
import { loadCareers } from "slices/career";
import { loadAllBoards, loadBoards } from 'slices/board';
import { loadJoboffers, loadJoboffered, } from 'slices/joboffer';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import {
  db, getEducationsByUserId, getCareersByUserId,
  getAllBoards, getBoardsByUserId,
  getJobofferedByUserId, getJoboffersByUserId
} from "firebaseConfig";
import { wrapper } from 'store/index';
import LoadingPage from 'components/Common/Loading';
import Favorite from 'components/Favorite';

const index = () => {

  const auth = getAuth();
  const { user, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, async (user) => {
      dispatch(userLoadingStart());
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
      await getEducationsByUserId().then((result) => {
        dispatch(loadEducations(result));
      })
      await getCareersByUserId().then((result) => {
        dispatch(loadCareers(result));
      })
      await getAllBoards().then((result) => {
        dispatch(loadAllBoards(result));
      })
      await getBoardsByUserId().then((result) => {
        dispatch(loadBoards(result));
      })
      await getJobofferedByUserId(user?.userID).then((result) => {
        dispatch(loadJoboffered(result));
      })
      await getJoboffersByUserId(user?.userID).then((result) => {
        dispatch(loadJoboffers(result));
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
        <title>TeamZ - 팀기반 채용플랫폼</title>

        <meta name="keywords" content="teamz, 팀즈, 채용공고, 현업담당자와 대화, 업무문의, 채용문의, 팀기반 소통플랫폼" />
        <meta name="description" content="원하는 기업에 입사하기 위해 팀별 현업담당자에게 적극적으로 나를 어필을 할 수 있습니다." />

        <meta name="application-name" content="TeamZ - 관심있는 기업보드에 참여 후 현업자담당자와 소통해보세요." />
        <meta name="msapplication-tooltip" content="TeamZ" />

        <meta property="og:type" content="TeamZ - 제안받은 입사제의 건수, 관심기업보드, 내 기업보드 확인" />
        <meta property="og:title" content="TeamZ - 입사제의를 받은 내용을 확인하고 관심기업보드 또는 내가 만든 기업보드를 관리할 수 있습니다." />
        <meta property="og:description" content="궁금한 기업이 있다면 기업보드에 참여한 후, small intern을 통해 현업 과제를 수행한 후, 입사제안을 받아보세요" />
        <meta property="og:image" content="https://teamz.co.kr/logo/teamz.png" />
        <meta property="og:url" content="https://teamz.co.kr/favorite" />

        <meta name="twitter:card" content="TeamZ - 제안받은 입사제의 건수, 관심기업보드, 내 기업보드 확인" />
        <meta name="twitter:title" content="TeamZ - 입사제의를 받은 내용을 확인하고 관심기업보드 또는 내가 만든 기업보드를 관리할 수 있습니다." />
        <meta name="twitter:description" content="궁금한 기업이 있다면 기업보드에 참여한 후, small intern을 통해 현업 과제를 수행한 후, 입사제안을 받아보세요" />
        <meta name="twitter:image" content="https://teamz.co.kr/logo/teamz.png" />
        <meta name="twitter:domain" content="https://teamz.co.kr/favorite" />
      </Head>
      {loading ?
        <LoadingPage /> :
        <Favorite />}
    </>

  );
};

export default index;