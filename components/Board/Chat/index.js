import React, { useState, useEffect, useCallback, useMemo } from 'react';
import SideBar from '../SideBar';
import SideButton from '../SideButton';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { sideClose, categorySelect, categorySet } from 'slices/board';
import { expertSet, adminSet, setDone } from 'slices/user';
import ChatTabs from './ChatTabs';

const index = () => {
  const { sidebarIn } = useSelector((state) => state.board);
  const [tabIndex, setTabIndex] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query;
  useEffect(() => {
    if (pid?.cid) {
      setTabIndex(2);
      dispatch(sideClose());
    }
  }, [pid?.cid, dispatch])
  
  const { singleBoard, categorySetDone } = useSelector(state => state.board);
  const { user, setExpertState, setAdminState } = useSelector(state => state.user);
  
  // 카테고리 미리 설정
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selcategoryArr = [];
  singleBoard?.category?.map((v) => (
    v?.key == parseInt(pid?.category) &&
    selcategoryArr?.push({ key: v?.key, name: v?.name })
  ))
  useEffect(() => {
    if (!categorySetDone && selcategoryArr?.length !== 0) {
      dispatch(categorySelect(selcategoryArr[0]));
      dispatch(categorySet());
    }
    return;
  }, [dispatch, selcategoryArr, categorySetDone])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // 권한체크
  const { isAdmin, isExpert } = useSelector(state => state.user);
  let iamExpert = singleBoard?.experts?.some(it => it?.userId === user?.userID);
  let categoryMatch = parseInt(user?.category) === parseInt(pid.category);
  let iamFavorites = singleBoard?.favorites?.some(it => it?.userId === user?.userID);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (iamExpert && categoryMatch) {
      dispatch(expertSet(true));
    }
    if (user?.userID === singleBoard?.creatorId) {
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


  return (
    <div className={`w-full  ${!sidebarIn ? `sm:pl-[0px]` : `sm:pl-[20rem]`} pt-[66px] min-h-screen h-auto `}>
      <div className="h-full flex flex-col sm:flex-row">
        <SideBar />
        <SideButton />
        <ChatTabs
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />
      </div>
    </div>
  );
};

export default index;