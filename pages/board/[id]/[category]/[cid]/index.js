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

  getConversations, getUsers, getConversation
} from "firebaseConfig";
import LoadingPage from 'components/Common/Loading';
import Chat from 'components/Board/Chat';
import { loadConversationList, loadSingleConversation } from 'slices/chat';
import { useDocumentQuery } from "hooks/useDocumentQuery";
import InputSection from 'components/Board/Chat/ChatContents/Input/InputSection';

const board = () => {
  const auth = getAuth();
  const { user, loading } = useSelector(state => state.user);

  const { singleBoard } = useSelector(state => state.board);
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query;

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
      const docData = docSnap?.data();
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
      await getBoard(pid.id).then((result) => {
        dispatch(loadBoard(result));
      })
      await getSection(pid.id, pid.category).then((result) => {
        dispatch(loadSection(result));
      })
      // await getPosts(singleSection?.id).then((result) => {
      //   dispatch(loadPosts(result));
      // })

      ////////////////// 채팅관련
      await getConversations().then((result) => {
        dispatch(loadConversationList(result));
      })
      await getConversation(pid.cid).then((result) => {
        dispatch(loadSingleConversation(result));
      })
      await getUsers().then((result) => {
        dispatch(setUsers(result));
      })
      // dispatch(loadSingleConversation(data?.data()));
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

        <meta name="keywords" content={`teamz, ${singleBoard?.name || ""} 팀즈, 채용공고, 현업담당자와 대화, 업무문의, 채용문의, 팀기반 소통플랫폼`} />
        <meta name="description" content="원하는 기업에 입사하기 위해 팀별 현업담당자에게 적극적으로 나를 어필을 할 수 있습니다." />

        <meta name="application-name" content="TeamZ - 관심있는 기업보드에 참여 후 현업자담당자와 소통해보세요." />
        <meta name="msapplication-tooltip" content="TeamZ" />

        <meta property="og:type" content={`TeamZ - ${singleBoard?.name || ""} 기업보드`} />
        <meta property="og:title" content={`${singleBoard?.name || ""} 기업의 현직자, 채용담당자와 즐거운 커뮤니케이션을 통해 팀에 합류할 수 있습니다.`} />
        <meta property="og:description" content="기업보드에는 일대일 대화뿐만 아니라 채용공고(Small Intern)를 통해 채용이 이루어지고, 관련분야의 소식까지 확인할 수 있습니다.." />
        <meta property="og:image" content="https://teamz.co.kr/logo/teamz.png" />
        <meta property="og:url" content={`https://teamz.co.kr/board/${pid?.id}/${pid?.category}/${pid?.cid}`} />

        <meta name="twitter:card" content={`TeamZ - ${singleBoard?.name || ""} 기업보드`} />
        <meta name="twitter:title" content={`${singleBoard?.name || ""} 기업의 현직자, 채용담당자와 즐거운 커뮤니케이션을 통해 팀에 합류할 수 있습니다.`} />
        <meta name="twitter:description" content="기업보드에는 일대일 대화뿐만 아니라 채용공고(Small Intern)를 통해 채용이 이루어지고, 관련분야의 소식까지 확인할 수 있습니다.." />
        <meta name="twitter:image" content="https://teamz.co.kr/logo/teamz.png" />
        <meta name="twitter:domain" content={`https://teamz.co.kr/board/${pid?.id}/${pid?.category}/${pid?.cid}`} />
      </Head>
      {loading ?
        <LoadingPage /> :
        (
          <Chat />
        )
      }
    </>
  );
};


export default board;