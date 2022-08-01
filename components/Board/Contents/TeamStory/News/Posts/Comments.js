import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import PropTypes from 'prop-types';
import profilePic from 'public/image/icon/happiness.png';
import dayjs from 'dayjs';
import { addReplyDoneFalse, addReply,deleteComment } from 'slices/section';
import { createReply, removeComment } from 'firebaseConfig';
import Reply from './Reply';

const Comments = ({ comment,post }) => {
  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { addReplyDone } = useSelector(state => state.section);
  // Reply 댓글
  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState("");

  const onToggleReply = useCallback(async () => {
    setReplyOpen((prev) => !prev);
  }, []);

  const onClickRemoveComment = useCallback(async () => {
    if (comment?.reply?.length > 0) return (alert("대댓글이 존재하는 코멘트는 제거할 수 없습니다."))
    if (!user) return (alert("로그인이 필요합니다."));
    const result = await removeComment(comment?.docId, post?.id);
    dispatch(deleteComment({
      commentId: comment?.docId,
      postId: post?.id,
    }))
  }, [comment?.reply?.length, comment?.docId, user, dispatch, post?.id]);


  useEffect(() => {
    if (!replyOpen) {
      return setReply("");
    }
  }, [replyOpen])

  const onChangeReply = useCallback((e) => {
    setReply(e.currentTarget.value);
  }, [])

  const onSubmitReply = useCallback(async (e) => {
    e.preventDefault();
    if (reply?.length === 0) {
      return alert("글을 입력해주세요.");
    }
    const createResult = await createReply(
      user?.username, user?.userID, comment?.docId, user?.avatar, reply
    );
    
    dispatch(addReply({result:createResult, commentId: comment?.docId}));
  }, [reply, user?.username, user?.userID, user?.avatar, comment?.docId, dispatch])

  useEffect(() => {
    if (addReplyDone) {
      setReply("");
      dispatch(addReplyDoneFalse());
    }
  }, [addReplyDone, dispatch])




  return (
    <div className="media flex pb-4 w-full">
      <div className="mr-4">
        {comment?.avatar ?
          <Image width={38} height={38} alt="pic" className="object-cover rounded-xl max-w-none w-12 h-12" src={comment?.avatar} />
          :
          <Image width={38} height={38} alt="pic" className="object-cover rounded-xl max-w-none w-12 h-12" src={profilePic} />
        }
      </div>
      <div className="media-body w-full">
        <div className="rounded-xl bg-gray-100 p-2 mb-2">
        <div className='flex justify-between'>
          <div>
            <p className="inline-block text-base font-medium text-slate-500 mr-2">
              {comment?.userName} &middot;
            </p>
            <span className="text-slate-500 text-base">{dayjs(comment?.createdAt).fromNow()}</span>
          </div>
          {comment?.userId === user?.userID &&
            <button type="button" onClick={onClickRemoveComment} className="rounded-full hover:bg-gray-100 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-300 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>}
        </div>

          <p className="whitespace-pre-wrap leading-normal">
            {comment?.commentText}
          </p>
        </div>
        <div className="">
          {comment?.reply?.map((v) => (
            <div key={v?.createdAt}>
              <Reply
                comment={comment}
                reply={v}
              /></div>
          ))}
        </div>
        <div className="mt-1 flex items-center w-full">
          {replyOpen ?
            <>
              <form onSubmit={onSubmitReply} className="relative w-full">
                <textarea
                  className="pt-2 pb-2 pl-3 w-full h-10 bg-gray-50 rounded-lg placeholder:text-slate-600 font-medium pr-20"
                  type="text" placeholder="Write a reply"
                  onChange={onChangeReply}
                  value={reply}
                />
                <span className="flex absolute right-2 top-2/4 -mt-5 items-center">
                  <button
                    type="submit"
                    className='rounded-lg px-2 py-2 text-gray-500 w-auto focus:outline-gray-800 hover:text-gray-700'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </span>
              </form>
              <button
                className="py-2 px-2 font-medium hover:bg-slate-50 rounded-lg"
                type="button"
                onClick={onToggleReply}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
            :
            <button
              className="py-2 px-2 font-medium hover:bg-slate-50 rounded-lg"
              type="button"
              onClick={onToggleReply}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-300 rotate-180 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
          }
        </div>
      </div>
    </div>
  );
};

Comments.propTypes = {
  comment: PropTypes.object,
  post: PropTypes.object,
}

export default Comments;