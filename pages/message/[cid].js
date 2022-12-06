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
import Talking from 'components/MessageNew/Talking';
import { loadConversationList } from 'slices/chat';
import { useDocumentQuery } from "hooks/useDocumentQuery";
import InputSection from 'components/Board/Chat/ChatContents/Input/InputSection';

const index = () => {
  const auth = getAuth();
  const { user, loading } = useSelector(state => state.user);
  const { mainConversations } = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query;
  // const { data, docuLoading, error } = useDocumentQuery(
  //   `conversation-${pid?.cid}`,
  //   doc(db, "conversations", pid?.cid)
  // );
  // const conversation = data?.data();
  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady, pid])

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
        <title>JOBCOC - 메시지</title>

        <meta name="keywords" content="teamz, 팀즈, 채용공고, 현업담당자와 대화, 업무문의, 채용문의, 팀기반 소통플랫폼" />
        <meta name="description" content="원하는 기업에 입사하기 위해 팀별 현업담당자에게 적극적으로 나를 어필을 할 수 있습니다." />

        <meta name="application-name" content="TeamZ - 관심있는 기업보드에 참여 후 현업자담당자와 소통해보세요." />
        <meta name="msapplication-tooltip" content="TeamZ" />

        <meta property="og:type" content="TeamZ - 일대일 메시지" />
        <meta property="og:title" content="TeamZ - 현업전문가 또는 채용담당자와 일대일 대화를 통해 채용과 관련한 더 많은 정보를 얻어가세요." />
        <meta property="og:description" content="원하는 기업보드를 선택하면 각 분야의 현업담당자와 소통할 수 있습니다." />
        <meta property="og:image" content="https://teamz.co.kr/logo/teamz.png" />
        <meta property="og:url" content={`https://teamz.co.kr/message/${pid?.cid}`} />

        <meta name="twitter:card" content="TeamZ - 일대일 메시지" />
        <meta name="twitter:title" content="TeamZ - 현업전문가 또는 채용담당자와 일대일 대화를 통해 채용과 관련한 더 많은 정보를 얻어가세요." />
        <meta name="twitter:description" content="원하는 기업보드를 선택하면 각 분야의 현업담당자와 소통할 수 있습니다." />
        <meta name="twitter:image" content="https://teamz.co.kr/logo/teamz.png" />
        <meta name="twitter:domain" content={`https://teamz.co.kr/message/${pid?.cid}`} />
      </Head>

      {loading ?
        <LoadingPage /> :
        // !mainConversations || mainConversations?.length === 0
        //   ? (
        //     <div className="flex h-full w-full flex-col items-center justify-center">
        //       <p className="text-center text-lg pt-[200px]">Conversation does not exists</p>
        //     </div>
        //   ) :
        (
          <Talking />
        )
      }
    </>
  );
};


export default index;