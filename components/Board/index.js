import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import SideButton from './SideButton';
import Home from './Home';
import { expertSet, adminSet, setDone } from 'slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const index = () => {

  // 권한체크
  const { user, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query;
  const { singleBoard } = useSelector(state => state.board);
  const { setExpertState, isAdmin, isExpert } = useSelector(state => state.user);
  let iamExpert = singleBoard?.experts?.some(it => it?.userId === user?.userID);
  let categoryMatch = parseInt(user?.category) === parseInt(pid.category);
  let iamFavorites = singleBoard?.favorites?.some(it => it?.userId === user?.userID);
  const [state, setState] = useState(false);
  useEffect(() => {
    dispatch(expertSet(false));
    dispatch(adminSet(false));
    if (iamExpert && categoryMatch) {
      dispatch(expertSet(true));
    }
    if (!!user?.userID && !!singleBoard?.creatorId && user?.userID === singleBoard?.creatorId) {
      dispatch(adminSet(true));
    }
    setState(true);
  }, [dispatch, setExpertState, iamExpert, categoryMatch, user?.userID, singleBoard?.creatorId, iamFavorites, isAdmin])

  const [second, setSecond] = useState(false);
  useEffect(() => {
    if (state === true && singleBoard) {
      setSecond(true);
      if (second === true) {
        if (!iamExpert && !iamFavorites && !isAdmin) {
          router.push("/")
          alert("참여기업이 아닙니다.")
        }
      }
    }
  }, [second, iamExpert, iamFavorites, isAdmin, singleBoard, state, user, router])

  // 이건 라우팅 하지 말자.
  // useEffect(() => {
  //   if (!isFavorites || !isExpert || user?.userID !== singleBoard?.creatorId) {
  //     router.push("/");
  //     alert("관심기업 등록 후 조회할 수 있습니다.");
  //   }
  // })



  return (
    <div className="w-full h-screen pt-[60.0px] ">
      <div className="h-full flex flex-col sm:flex-row">
        <SideBar />
        <SideButton />
        <Home />
      </div>
    </div>
  );
};

export default index;