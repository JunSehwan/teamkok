import React, { useEffect } from 'react';
import Main from 'components/Main';
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { loadEducations } from "slices/education";
import { loadCareers } from "slices/career";
import { setUser, userLoadingStart, userLoadingEnd, userLoadingEndwithNoone } from "slices/user";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, getEducationsByUserId, getCareersByUserId } from "firebaseConfig";
import LoadingPage from 'components/Common/Loading';

const index = () => {

  const auth = getAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector(state => state.user);

  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, async (user) => {
      dispatch(userLoadingStart());
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
    });
    return () => {
      authStateListener();
    };
  }, [auth, dispatch, user?.uid, user?.userID]);

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

      <meta property="og:type" content="TeamZ 기업리스트" />
      <meta property="og:title" content="TeamZ - 팀기반 채용플랫폼" />
      <meta property="og:description" content="원하는 기업보드를 선택하면 각 분야의 현업담당자와 소통할 수 있습니다." />
      <meta property="og:image" content="https://teamz.co.kr/logo/teamz.png" />
      <meta property="og:url" content="https://teamz.co.kr" />

      <meta name="twitter:card" content="TeamZ에 오신걸 환영합니다." />
      <meta name="twitter:title" content="TeamZ - 팀기반 채용플랫폼" />
      <meta name="twitter:description" content="원하는 기업보드를 선택하면 각 분야의 현업담당자와 소통할 수 있습니다." />
      <meta name="twitter:image" content="https://teamz.co.kr/logo/teamz.png" />
      <meta name="twitter:domain" content="https://teamz.co.kr" />
      </Head>
      {loading ?
        <LoadingPage />
        :
        <Main />
      }
    </>

  );
};

export default index;