import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { removeReply } from 'firebaseConfig';
import { deleteReply } from 'slices/section';

const Reply = ({ reply, comment }) => {
  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const onClickRemoveReply = useCallback(async () => {
    const result = await removeReply(user?.userID, comment?.docId, reply?.replyText, reply?.createdAt, user?.username);
    dispatch(deleteReply({
      commentId: comment?.docId,
      createdAt: reply?.createdAt
    }))
  }, [user?.userID, user?.username, comment?.docId, reply?.replyText, reply?.createdAt, dispatch]);


  return (
    <div className="media flex py-2 w-full">
      <div className="mr-3">
        {reply?.avatar ?
          <Image unoptimized width={30} height={30} alt="pic" className="object-cover rounded-xl max-w-none w-12 h-12" src={reply?.avatar} />
          :
          <Image unoptimized width={30} height={30} alt="pic" className="object-cover rounded-xl max-w-none w-12 h-12" src={profilePic} />
        }
      </div>
      <div className="media-body w-full">
        <div className='flex justify-between'>
          <div>
            <p className="inline-block text-sm font-medium text-slate-400 mr-2">
              {reply?.userName} &middot;
            </p>
            <span className="text-slate-400 text-sm">{dayjs(reply?.createdAt).fromNow()}</span>
          </div>
          {reply?.userId === user?.userID &&
            <button type="button" onClick={onClickRemoveReply} className="rounded-full hover:bg-gray-100 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-300 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>}
        </div>
        <p className="whitespace-pre-wrap leading-normal text-sm">
          {reply?.replyText}
        </p>
      </div>
    </div>
  );
};

Reply.propTypes = {
  reply: PropTypes.object,
  comment: PropTypes.object,
}
export default Reply;