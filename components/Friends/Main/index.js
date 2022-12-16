import React, { useEffect } from "react";
import Friend from "./Friend";
import Spin from 'components/Common/Spin';
import { useDispatch, useSelector } from "react-redux";
import { addLikeDoneFalse, addUnlikeDoneFalse, addAdviceDoneFalse, setUsers, setScrollPosition } from 'slices/user';
import { addJobofferDoneFalse } from 'slices/joboffer';
import { addCoccocDoneFalse } from 'slices/coccoc';
import toast from 'react-hot-toast';
import InfoModal from './InfoModal';
import { nanoid } from 'nanoid'
import BtnToTop from 'components/Common/BtnToTop';
import GoNext from './GoNext';
import TopNavBar from './TopNavBar';
import { getCategoryUsers, getFriends } from 'firebaseConfig';

const index = () => {

  const { users, scrolling } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { addAdviceDone, addLikeDone, addUnlikeDone, categoryFilter } = useSelector(state => state.user);
  const { addJobofferDone } = useSelector(state => state.joboffer);
  const { addCoccocDone } = useSelector(state => state.coccoc);
  const { scrollPosition } = useSelector(state => state.user);

  const likeNotify = () => toast('좋아요!');
  const unlikeNotify = () => toast('좋아요 취소');
  const adviceNotify = () => toast('조언해주기 성공!😍');
  const coccocNotify = () => toast('콕!하기 성공!😍');
  const jobofferNotify = () => toast('입사제안하기 성공!😍');

  useEffect(() => {
    async function fetchAndSetUser() {
      if (categoryFilter) {
        const result = await getCategoryUsers(categoryFilter);
        dispatch(setUsers(result));
      }
      if (!categoryFilter) {
        const result = await getFriends();
        dispatch(setUsers(result));
      }
    }
    fetchAndSetUser();
  }, [categoryFilter, dispatch]);


  useEffect(() => {
    if (addLikeDone) {
      likeNotify();
      dispatch(addLikeDoneFalse());

    }
  }, [addLikeDone, dispatch])
  useEffect(() => {
    if (addUnlikeDone) {
      unlikeNotify();
      dispatch(addUnlikeDoneFalse());

    }
  }, [addUnlikeDone, dispatch])

  useEffect(() => {
    if (addAdviceDone) {
      adviceNotify();
      dispatch(addAdviceDoneFalse());

    }
  }, [addAdviceDone, dispatch])

  useEffect(() => {
    if (addCoccocDone) {
      coccocNotify();
      dispatch(addCoccocDoneFalse());

    }
  }, [addCoccocDone, dispatch]
  )

  useEffect(() => {
    if (addJobofferDone) {
      jobofferNotify();
      dispatch(addJobofferDoneFalse());

    }
  }, [addJobofferDone, dispatch]
  )


  useEffect(() => {
    if (users && scrollPosition && scrolling) {
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition, left: 0, behavior: 'smooth'
        })
      }, [500])
      // dispatch(setScrollPosition(null))
    }
  }, [users, scrollPosition, dispatch, scrolling])



  return (
    <>
      <TopNavBar />
      {/* {!loading ? ( */}
      {users?.length !== 0 &&
        (<div className="scroll-smooth"
        >
          {users?.map((friend) => (
            // <StickScroll key={friend?.userID}>
            <section className="scroll-smooth"
              key={nanoid()}>
              <Friend
                friend={friend}
                id={friend?.userID}
              />
            </section>

          ))}
          <InfoModal />
        </div>)}
      {users?.length == 0 && !categoryFilter &&

        <div className="w-full h-[calc(100vh-var(--navbar-height))] flex justify-center items-center">
          <Spin />
        </div>
      }
      {users?.length == 0 && categoryFilter &&

        <div className="w-full h-[calc(100vh-var(--navbar-height))] flex justify-center items-center">
          <div>해당 카테고리내의 인물이 아직 없네요.</div>
        </div>
      }
      <BtnToTop moreDown={true} />
      <GoNext />
    </>
  );
};

export default index;