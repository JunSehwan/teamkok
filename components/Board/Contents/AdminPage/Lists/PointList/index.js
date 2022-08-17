import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import profilePicture from 'public/image/icon/happiness.png';
import { useSelector,useDispatch } from 'react-redux';
import { cancelGivePoint } from 'firebaseConfig';
import { cancelPointGive } from 'slices/user';

const index = ({ content, target }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)
  const { singleSection, singleBoard } = useSelector(state => state.board)
  const isMe = content?.giverId === user?.userID;

  const onClickRemove = useCallback(async () => {
    const result = {
      userId: user?.userID,
      username: user?.username,
      avatar: user?.avatar,
      point: content?.point,
      description: content?.description,
      sectionId: singleSection?.id,
      targetId: target?.userID,
      targetName: target?.username,
      targetAvatar: target?.avatar,
      boardName: singleBoard?.name,
      createdAt: content?.createdAt,
    };
    const con = await cancelGivePoint(
      user?.userID, user?.username, user?.avatar, content?.point, content?.description, singleSection?.id, target?.userID, target?.username, target?.avatar, singleBoard?.name, content?.createdAt
    )
    if (con) {
      dispatch(cancelPointGive(
        result
        ))
      alert("포인트 부여내역이 삭제되었습니다.")
    } else {
      alert("포인트 부여내역 삭제가 실패하였습니다.");
    }
  }, [content, dispatch, singleBoard?.name, singleSection?.id, target?.avatar, target?.userID, target?.username, user?.avatar, user?.userID, user?.username])
  return (
    <div className="p-6 flex items-center space-x-6 rounded-lg cursor-pointer flex-col mb-2 bg-slate-100">
      <div className="w-full flex flex-col sm:flex-row">
        <div className="w-full flex flex-col sm:flex-row">
          <div className="flex flex-row">
            <Image
              className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
              src={content?.giverAvatar || profilePicture}
              width={40}
              height={40}
              alt="profilePicture"
            />
            <div className="ml-4 flex flex-row items-center justify-start">
              <h1 className="text-xl font-bold text-gray-700 mb-2 whitespace-nowrap">{content?.giverName}</h1>
              <p className="ml-2 text-gray-600 w-80 text-sm">부여포인트: {content?.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
          </div>
        </div>
        <div>
          {isMe &&
            <button className="p-2 ml-1 hover:bg-orange-100 text-orange-600 rounded-full " onClick={onClickRemove}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          }
        </div>
      </div>

      <div className="mt-3 w-full">
        <p className="text-gray-600 bg-gray-50 shadow-inner rounded-md p-4  w-full text-sm whitespace-pre-wrap leading-normal">
          {content?.description}</p>
      </div>
    </div>
  );
};

index.propTypes = {
  content: PropTypes.object,
  target: PropTypes.object,
};

export default index;