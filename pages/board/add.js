import React, { useEffect, Suspense } from 'react';
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { setUser, resetUserState, userLoadingStart, userLoadingEnd, userLoadingEndwithNoone } from "slices/user";
import { loadEducations } from "slices/education";
import { loadCareers } from "slices/career";
import { loadAllBoards, loadBoards } from 'slices/board';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import {
  db, getEducationsByUserId, getCareersByUserId,
  getAllBoards, getBoardsByUserId
} from "firebaseConfig";
import LoadingPage from 'components/Common/Loading';
import AddBoard from 'components/Board/Add';

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
        <title>TeamZ - 기업보드 생성</title>

        <meta name="keywords" content="teamz, 팀즈, 채용공고, 현업담당자와 대화, 업무문의, 채용문의, 팀기반 소통플랫폼" />
        <meta name="description" content="원하는 기업에 입사하기 위해 팀별 현업담당자에게 적극적으로 나를 어필을 할 수 있습니다." />

        <meta name="application-name" content="TeamZ - 관심있는 기업보드에 참여 후 현업자담당자와 소통해보세요." />
        <meta name="msapplication-tooltip" content="TeamZ" />

        <meta property="og:type" content="TeamZ - 기업보드 제작페이지" />
        <meta property="og:title" content="TeamZ - 내가 현재 재직중인 회사에 대한 기업보드를 생성할 수 있습니다.(채용관리자)" />
        <meta property="og:description" content="기업보드를 제작하여 많은 입사희망자들을 끌어 모아보세요." />
        <meta property="og:image" content="https://teamz.co.kr/logo/teamz.png" />
        <meta property="og:url" content="https://teamz.co.kr/board/add" />

        <meta name="twitter:card" content="TeamZ - 기업보드 제작페이지" />
        <meta name="twitter:title" content="TeamZ - 내가 현재 재직중인 회사에 대한 기업보드를 생성할 수 있습니다.(채용관리자)" />
        <meta name="twitter:description" content="기업보드를 제작하여 많은 입사희망자들을 끌어 모아보세요." />
        <meta name="twitter:image" content="https://teamz.co.kr/logo/teamz.png" />
        <meta name="twitter:domain" content="https://teamz.co.kr/board/add" />
      </Head>
      {loading ?
        <LoadingPage /> :
        <AddBoard />}
    </>

  );
};


export default index;