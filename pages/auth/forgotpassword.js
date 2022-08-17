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
        <title>TeamZ - Password Reset</title>
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