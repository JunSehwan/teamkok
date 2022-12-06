import React, { useEffect } from 'react';
import News from 'components/News';
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setUser, resetUserState, userLoadingStart, userLoadingEnd, userLoadingEndwithNoone } from "slices/user";
import { loadEducations } from "slices/education";
import { loadCareers } from "slices/career";
import { loadSkills } from "slices/skill";
import { loadJoboffered, loadJoboffers } from "slices/joboffer";
import { loadCoccoced, loadCoccocs } from "slices/coccoc";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import {
  db, getEducationsByUserId, getCareersByUserId, getSkillsByUserId,
  getJoboffersByUserId, getJobofferedByUserId, getCoccocsByUserId, getCoccocedByUserId,
} from "firebaseConfig";
import { addCategory } from 'slices/category';
import LoadingPage from 'components/Common/Loading';
import CategoryList from 'components/Common/CategoryList';


const news = () => {
  const auth = getAuth();
  const { user, loading } = useSelector(state => state.user);
  const { singleBoard } = useSelector(state => state.board);
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query;

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
      };
      dispatch(setUser(currentUser));
      await getEducationsByUserId().then((result) => {
        dispatch(loadEducations(result));
      })
      await getCareersByUserId().then((result) => {
        dispatch(loadCareers(result));
      })
      await getSkillsByUserId().then((result) => {
        dispatch(loadSkills(result));
      })
      await getJoboffersByUserId(user?.uid).then((result) => {
        dispatch(loadJoboffers(result));
      })
      await getJobofferedByUserId(user?.uid).then((result) => {
        dispatch(loadJoboffered(result));
      })
      await getCoccocsByUserId(user?.uid).then((result) => {
        dispatch(loadCoccocs(result));
      })
      await getCoccocedByUserId(user?.uid).then((result) => {
        dispatch(loadCoccoced(result));
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
        <title>{`팀소식을 들어보세요!`}</title>

        <meta name="keywords" content={`teamz, 팀즈, 채용공고, 현업담당자와 대화, 업무문의, 채용문의, 팀기반 소통플랫폼`} />
        <meta name="description" content="원하는 기업에 입사하기 위해 팀별 현업담당자에게 적극적으로 나를 어필을 할 수 있습니다." />

        <meta name="application-name" content="TeamZ - 관심있는 기업보드에 참여 후 현업자담당자와 소통해보세요." />
        <meta name="msapplication-tooltip" content="TeamZ" />

        <meta property="og:type" content={`TeamZ - 기업보드`} />
        <meta property="og:title" content={`기업의 현직자, 채용담당자와 즐거운 커뮤니케이션을 통해 팀에 합류할 수 있습니다.`} />
        <meta property="og:description" content="기업보드에는 일대일 대화뿐만 아니라 채용공고(Small Intern)를 통해 채용이 이루어지고, 관련분야의 소식까지 확인할 수 있습니다.." />
        <meta property="og:image" content="https://jobcoc.com/logo/jobcoc.png" />
        <meta property="og:url" content={`https://jobcoc.com/news`} />

        <meta name="twitter:card" content={`TeamZ - 기업보드`} />
        <meta name="twitter:title" content={`기업의 현직자, 채용담당자와 즐거운 커뮤니케이션을 통해 팀에 합류할 수 있습니다.`} />
        <meta name="twitter:description" content="기업보드에는 일대일 대화뿐만 아니라 채용공고(Small Intern)를 통해 채용이 이루어지고, 관련분야의 소식까지 확인할 수 있습니다.." />
        <meta name="twitter:image" content="https://jobcoc.com/logo/jobcoc.png" />
        <meta name="twitter:domain" content={`https://jobcoc.com/news`} />
      </Head>

      {loading ?
        <LoadingPage /> :
        <News />
      }
    </>
  );
};

export default news;