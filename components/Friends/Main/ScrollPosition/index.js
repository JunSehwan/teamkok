import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const index = () => {

  const { users, scrolling, scrollPosition } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { addLikeDone, addUnlikeDone, categoryFilter } = useSelector(state => state.user);


  useEffect(() => {
    if (scrollPosition && scrolling) {
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition, left: 0, behavior: 'smooth'
        })
        // dispatch(setScrollPosition(null))
      }, [500])
    }
  }, [scrollPosition, dispatch, scrolling, addLikeDone, addUnlikeDone])



  return (
    <div>

    </div>
  );
};

export default index;