import React, { useState, useEffect, useCallback, useMemo  } from 'react';
import SideBar from '../SideBar';
import SideButton from '../SideButton';
import BoardTabs from './BoardTabs';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { sideClose, categorySelect, categorySet } from 'slices/board';
import { expertSet, adminSet, setDone } from 'slices/user';

const index = () => {

  const [tabIndex, setTabIndex] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query;
  useEffect(()=>{
    if(pid?.cid){
      setTabIndex(2);
      dispatch(sideClose());
    }
  },[pid?.cid,dispatch])
  const { singleBoard, myBoards, selectedCategory, categorySetDone } = useSelector(state => state.board);
  const { user, setExpertState, setAdminState } = useSelector(state => state.user);
  const { myCareers } = useSelector(state => state.career);
  
  // 권한체크
  function checkCompanyName(element) {
    if (element.name === singleBoard?.name) {
      return true;
    }
  }
  const matchCompany = myCareers?.some(checkCompanyName);
  const matchCategory = user?.category === parseInt(pid?.category);
  const adminArr = [];
  myBoards?.map((v) => (
    v?.id === pid?.id && adminArr?.push(v?.id)
  ))

  useEffect(() => {
    if (!setExpertState && matchCompany && matchCategory) {
      dispatch(expertSet(true));
    }
    return;
  }, [dispatch, setExpertState, matchCategory, matchCompany])

  useEffect(() => {
    if (!setAdminState && adminArr?.length !== 0) {
      dispatch(adminSet(true));
    }
    return;
  }, [dispatch, adminArr?.length, setAdminState])


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

  return (
    <div className="w-full pt-[66px] min-h-screen h-auto bg-violet-50">
      <div className="h-full flex flex-col sm:flex-row">
        <SideBar />
        <SideButton />
        <BoardTabs
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />
      </div>
    </div>
  );
};

export default index;