import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from "flowbite-react";
import { likeUser, unlikeUser } from 'firebaseConfig';
import { likeToUser, unlikeToUser } from 'slices/user';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';
import { motion } from "framer-motion";

const index = ({ friend }) => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const onLike = useCallback(async () => {
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }
    const likeResult = await likeUser(friend?.userID, friend?.username, friend?.avatar)
    dispatch(likeToUser({
      targetId: friend?.userID,
      targetName: friend?.username,
      targetAvatar: friend?.avatar,
      userId: user?.userID,
      username: user?.username,
      userAvatar: user?.avatar,
    }));
  }, [dispatch, friend?.avatar, friend?.userID, friend?.username, user?.avatar, user?.userID, user?.username]);

  const onUnlike = useCallback(async () => {
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }
    await unlikeUser(friend?.userID, friend?.username, friend?.avatar)
    dispatch(unlikeToUser({
      targetId: friend?.userID,
      userId: user?.userID
    }))
  }, [dispatch, friend?.avatar, friend?.userID, friend?.username, user?.userID]);

  const liked = friend?.liked?.find((v) => v?.userId === user?.userID);

  return (
    <>
      {!liked ?
        (<Tooltip
          placement="left"
          className="w-max"
          content="좋아요!"
          trigger="hover"
        >
          <div className="flex flex-col items-center justify-center">
            <button className="
                      rounded-full p-3 hover:bg-white bg-red-300/60 border-solid border-red-600 flex items-center justify-center flex-col"
              onClick={onLike}
              type="button"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <BsFillHeartFill className="w-6 h-6 text-red-600" />
              </motion.div>
              <span className="text-red-800 text-sm">{friend?.liked?.length}</span>
            </button>
          </div>
        </Tooltip>)
        :
        (<Tooltip
          placement="left"
          className="w-max"
          content="좋아요 취소"
          trigger="hover"
        >
          <div className="flex flex-col items-center justify-center">
            <button className="
                      rounded-full p-3 hover:bg-white bg-red-300/60 border-solid border-red-600 flex items-center justify-center flex-col"
              type="button"
              onClick={onUnlike}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <BsHeart className="w-6 h-6 text-red-600" />
              </motion.div>
              <span className="text-red-800 text-sm">{friend?.liked?.length}</span>
            </button>
          </div>
        </Tooltip>)
      }
    </>
  );
};



index.propTypes = {
  friend: PropTypes.object,
};


export default index;