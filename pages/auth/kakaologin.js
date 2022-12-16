/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LoadingPage from 'components/Common/Loading';
import { getFunctions, httpsCallable } from "firebase/functions";
import { signInWithCustomToken } from "firebase/auth";
import { app, auth, getUser, db } from 'firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from 'slices/user';

import dayjs from "dayjs";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  getDoc,
  FieldValue,
  DocumentData,
  DocumentReference,
  deleteField,
  serverTimestamp, limit, arrayUnion, arrayRemove,
  query, where, getDocs, orderBy,
  deleteDoc, startAfter, increment, limitToLast
} from "firebase/firestore";

export default function KakaoLogin() {
  const router = useRouter();
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const { signUpSuccess } = useSelector(state => state.user);

  useEffect(() => {
    if (signUpSuccess && user && user?.firstmake === true) {
      router.push("/onboarding")
    }
    if (signUpSuccess && user && user?.firstmake !== true) {
      if (user?.purpose === 1) {
        router.push("/friends")
      } else {
        router.push("/news")
      }
    }
  }, [router, signUpSuccess, user])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    if (!code) return router.push('/signin');

    const functions = getFunctions(app, 'asia-northeast3');
    const kakaoLogin = httpsCallable(functions, 'kakaoLogin');
    kakaoLogin({ code })
      .then((res) => {
        const firebaseToken = res.data;
        signInWithCustomToken(auth, firebaseToken)
          .then(async (userCredential) => {
            if (!userCredential?.user) { return alert("존재하지 않는 계정입니다.") }
            const userDB = userCredential?.user;

            if (userDB?.uid?.length !== 0) {

              const userRef = collection(db, "users");
              const q = query(userRef, where("id", "==", userDB?.uid));
              //결과 검색
              const querySnapshot = await getDocs(q);
              const result = querySnapshot?.docs?.map((doc) => (
                {
                  ...doc.data(),
                  id: doc.id,
                }
              ))
              if (result?.length === 0) {
                console.log(result, "result1")
                setDoc(doc(db, "users", userDB.uid), {
                  id: userDB?.uid,
                  username: userDB?.displayName,
                  avatar: userDB?.photoURL || "",
                  email: userDB?.email,
                  timestamp: time,
                })
                dispatch(signUp({
                  email: userDB?.email,
                  username: userDB?.displayName,
                  id: userDB?.uid,
                  avatar: userDB?.photoURL
                }));
              }
              if (result?.length !== 0) {
                console.log(result, "result2")
                const gettingInfo = await getUser(userDB.uid);
                dispatch(signUp(
                  gettingInfo
                ));
              }
            }
            return userCredential?.user

            // if (userCredential) {
            //   const gettingInfo = await getUser(userCredential?.user?.uid);
            //   dispatch(signUp(
            //     gettingInfo
            //   ));
            // }
          })
      });
  }, []);

  return (
    <>
      <Head>
        <title>카카오 로그인</title>
      </Head>
      <LoadingPage />
    </>
  );
}