import React, { useEffect, Suspense } from 'react';
import Head from 'next/head'

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { setUser, setUsers, resetUserState, userLoadingStart, userLoadingEnd, userLoadingEndwithNoone } from "slices/user";
import { loadEducations } from "slices/education";
import { loadCareers } from "slices/career";
import { loadAllBoards, loadBoards, loadBoard, loadSection } from 'slices/board';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import {
  db, getEducationsByUserId, getCareersByUserId,
  getAllBoards, getBoardsByUserId, getBoard, getSection, getPosts,

  getConversations, getUsers
} from "firebaseConfig";
import { wrapper } from 'store/index';
import LoadingPage from 'components/Common/Loading';
import Contents from 'components/Board/Contents';
import { loadConversationList } from 'slices/chat';

const board = () => {
  const auth = getAuth();
  const { user, loading } = useSelector(state => state.user);
  const { singleSection } = useSelector(state => state.board);
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query;
  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady, pid])
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
      await getBoard(pid?.id).then((result) => {
        dispatch(loadBoard(result));
      })
      await getSection(pid?.id, pid?.category).then((result) => {
        dispatch(loadSection(result));
      })
      // await getPosts(singleSection?.id).then((result) => {
      //   dispatch(loadPosts(result));
      // })

      ////////////////// 채팅관련
      await getConversations().then((result) => {
        dispatch(loadConversationList(result));
      })
      await getUsers().then((result) => {
        dispatch(setUsers(result));
      })

      dispatch(userLoadingEnd());
    });
    return () => {
      authStateListener();
    };
  }, [auth, dispatch, pid, router]);


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
      <Head>
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
      </Head>
      {loading ?
        <LoadingPage /> :
        <Contents />
      }
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(userLoadingStart());
  }
);

export default board;