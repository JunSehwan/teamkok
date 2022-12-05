import React, { useEffect, useRef, useState } from "react";
import Friend from "./Friend";
import Spin from 'components/Common/Spin';
import { useDispatch, useSelector } from "react-redux";
import { addLikeDoneFalse, addUnlikeDoneFalse, addAdviceDoneFalse, setScrollPositionDone } from 'slices/user';
import { addJobofferDoneFalse } from 'slices/joboffer';
import { addCoccocDoneFalse } from 'slices/coccoc';
import toast from 'react-hot-toast';
import InfoModal from './InfoModal';
import { nanoid } from 'nanoid'

const index = () => {

  const [friendcards, setFriendCards] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { user, users, scrolling } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { addAdviceDone, addLikeDone, addUnlikeDone } = useSelector(state => state.user);
  const { addJobofferDone } = useSelector(state => state.joboffer);
  const { addCoccocDone } = useSelector(state => state.coccoc);
  const { scrollPosition } = useSelector(state => state.user);

  const likeNotify = () => toast('좋아요!');
  const unlikeNotify = () => toast('좋아요 취소');
  const adviceNotify = () => toast('조언해주기 성공!😍');
  const coccocNotify = () => toast('콕!하기 성공!😍');
  const jobofferNotify = () => toast('입사제안하기 성공!😍');
  // let aElSection = useRef();
  // let aElSection = document.querySelectorAll("section");
  // let curSIdx = 0;
  // let wheelTimer;
  // window.addEventListener("wheel", function (e) {
  //   clearTimeout(wheelTimer);
  //   wheelTimer =
  //     function () {
  //       setTimeout(() => {
  //         if (e?.deltaY < 0) doScroll(--curSIdx);
  //         else doScroll(++curSIdx);
  //       }, [500])
  //     }
  // })

  // function doScroll(sidx) {
  //   sidx = sidx < 0 ? 0 : sidx;
  //   sidx = sidx > aElSection?.length - 1 ? aElSection?.length - 1 : sidx;
  //   curSIdx = sidx;
  //   aElSection[curSIdx]?.scrollIntoView(
  //     {
  //       block: "center", inline: "center",
  //       behavior: "smooth"
  //     }
  //   );
  // }

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

  // useEffect(() => {
  //   if (users) {
  //   setFriendCards(users)
  //   setLoading(false);

  //   }
  // }, [users]
  // );



  useEffect(() => {
    if (users && scrollPosition && scrolling) {
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition, left: 0, behavior: 'smooth'
        })
      }, [1000])
      dispatch(setScrollPositionDone());
    }
  }, [users, scrollPosition, dispatch, scrolling])



  return (
    <>
      {/* {!loading ? ( */}
      {users?.length !== 0 ?
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
      </div>)
        : ( 
      <div className="w-full h-[calc(100vh-var(--navbar-height))] flex justify-center items-center">
        <Spin />
      </div>
       )}
    </>
  );
};

export default index;