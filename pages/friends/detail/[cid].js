import React, { useEffect } from 'react';
import Detail from 'components/Friends/Detail';
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  setUser, setOtherUser, resetUserState,
  userLoadingStart, userLoadingEnd
} from "slices/user";
import { loadEducations } from "slices/education";
import { loadCareers } from "slices/career";
import { loadSkills } from "slices/skill";
import { loadJoboffered } from "slices/joboffer";
import { loadCoccoced } from "slices/coccoc";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, getOtherUser, getEducationsByOtherId, getCareersByOtherId, getSkillsByOtherId, getJobofferedByUserId, getCoccocedByUserId } from "firebaseConfig";
import { addCategory } from 'slices/category';
import LoadingPage from 'components/Common/Loading';
import CategoryList from 'components/Common/CategoryList';

const index = () => {

  const auth = getAuth();
  const { user, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query;
  const otherid = pid.cid;
  const { friend } = useSelector(state => state.user);
  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, async (user) => {
      dispatch(userLoadingStart());
      dispatch(addCategory(CategoryList));
      if (!user) {
        dispatch(resetUserState());
        return router.push("/");
      }
      const docRef = doc(db, "users", user?.uid);
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
        address: docData.address,
        address_sido: docData.address_sido,
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
        mycompany: docData.mycompany,
        myposition: docData.myposition,
        mysection: docData.mysection,
        mytype: docData.mytype,
        companyemail: docData.companyemail,
        companylogo: docData.companylogo,
        companyfield: docData.companyfield,
        companyurl: docData.companyurl,
        companyaddress: docData.companyaddress,
        companycomplete: docData.companycomplete,
        staffnumber: docData.staffnumber,
        companyadditional: docData.companyadditional,
        additionalMent: docData.additionalMent,
        links: docData.links,
        purpose: docData.purpose,
        thumbvideo: docData.thumbvideo,
        thumbimage: docData.thumbimage,
        likes: docData.likes,
        liked: docData.liked,
        advices: docData.advices,
        adviced: docData.adviced,
        cliptype: docData.cliptype,

      };
      dispatch(setUser(currentUser));
      dispatch(userLoadingEnd());


      if (otherid) {
        await getOtherUser(otherid).then((result) => {
          dispatch(setOtherUser(result));
        })
        await getEducationsByOtherId(otherid).then((result) => {
          dispatch(loadEducations(result));
        })
        await getCareersByOtherId(otherid).then((result) => {
          dispatch(loadCareers(result));
        })
        await getSkillsByOtherId(otherid).then((result) => {
          dispatch(loadSkills(result));
        })
        await getJobofferedByUserId(otherid).then((result) => {
          dispatch(loadJoboffered(result));
        })
        await getCoccocedByUserId(otherid).then((result) => {
          dispatch(loadCoccoced(result));
        })
      }

    });
    return () => {
      authStateListener();
    };
  }, [auth, dispatch, otherid, router]);


  useEffect(() => {
    if (!user?.userID) return;

    const unsubscribe = onSnapshot(doc(db, "users", user?.userID), (user) => {
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
        address: docData.address,
        address_sido: docData.address_sido,
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
        mycompany: docData.mycompany,
        myposition: docData.myposition,
        mysection: docData.mysection,
        mytype: docData.mytype,
        companyemail: docData.companyemail,
        companylogo: docData.companylogo,
        companyfield: docData.companyfield,
        companyurl: docData.companyurl,
        companyaddress: docData.companyaddress,
        companycomplete: docData.companycomplete,
        staffnumber: docData.staffnumber,
        companyadditional: docData.companyadditional,
        additionalMent: docData.additionalMent,
        links: docData.links,
        purpose: docData.purpose,
        thumbvideo: docData.thumbvideo,
        thumbimage: docData.thumbimage,
        likes: docData.likes,
        liked: docData.liked,
        advices: docData.advices,
        adviced: docData.adviced,
        cliptype: docData.cliptype,

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
        <title>{friend?.username}님을 탐색중 - JOBCOC</title>

        <meta name="keywords" content="jobcoc, 채용사이트, 채용공고, 현업담당자와 대화, 업무문의, 채용문의, 소통플랫폼" />
        <meta name="description" content="1분 자기소개 영상이나 포트폴리오 이미지로 나의 이력을 어필할 수 있습니다. 또한, 채용담당자가 제안하는 동료들의 실질적인 연봉 수준을 확인할 수 있습니다." />

        <meta name="application-name" content="JOBCOC - 개성있는 프로필로 빠르게 취업하기" />
        <meta name="msapplication-tooltip" content="JOBCOC" />

        <meta property="og:type" content={`${friend?.username}님을 탐색중!, JOBCOC`} />
        <meta property="og:title" content={`${friend?.username}님을 탐색중!, JOBCOC`} />
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
        <Detail />
      }
    </>

  );
};


export default index;