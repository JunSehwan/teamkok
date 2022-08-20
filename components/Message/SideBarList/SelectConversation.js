import React, { useCallback } from 'react';
// import { Link, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import Skeleton from "components/Common/Skeleton";
import useLastMessage from "hooks/useLastMessage";
import useUsersInfo from "hooks/useUsersInfo";
import { useSelector, useDispatch } from 'react-redux';
import profilePic from 'public/image/icon/happiness.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CategoryList from 'components/Common/CategoryList';
import {hideConversationBar} from 'slices/chat';

const SelectConversation = ({ conversation, conversationId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query;
  const { data: users, loading } = useUsersInfo(conversation?.users);
  const { user } = useSelector(state => state.user);
  const filtered = users?.filter((it) => it.id !== user?.userID);
  // const { id } = useParams();
  const {
    data: lastMessage,
    loading: lastMessageLoading,
    error: lastMessageError,
  } = useLastMessage(conversationId);
  const category = CategoryList?.filter(obj => obj.key == filtered?.[0]?.data().category);


  const onClickDialog = useCallback(() => {
    router.push(`/message/${conversationId}`)
    dispatch(hideConversationBar());
  }, [conversationId, router, dispatch])


  if (loading)
    return (
      <div className="flex items-stretch gap-2 py-2 px-5">
        <Skeleton className="h-14 w-14 flex-shrink-0 rounded-full" />
        <div className="flex flex-grow flex-col items-start gap-2 py-2">
          <Skeleton className="w-1/2 flex-grow" />
          <Skeleton className="w-2/3 flex-grow" />
        </div>
      </div>
    );
  if (conversation?.users?.length === 2)
    return (
      <a
        onClick={onClickDialog}
      >
        <div className={`ml-[2px] text-black hover:bg-slate-200 cursor-pointer relative flex items-stretch gap-2 py-2 px-5 transition duration-300 
        ${conversationId === pid?.cid ? "!bg-sky-200 font-bold rounded-md" : ""
          }`}>
          <div className='flex flex-row items-center my-1'>
            <Image
              width={40}
              height={40}
              className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
              src={filtered?.[0]?.data()?.avatar || profilePic}
              alt=""
            />
            <div className="flex flex-grow flex-col ml-2 items-start gap-1 py-1">
              {category?.length !== 0 && <span className="ml-1 px-3 py-0.5 bg-sky-600 rounded-full text-white text-xs" >{category[0]?.name}</span>}
              <p className="max-w-[180px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                {filtered?.[0].data()?.username}
              </p>
              {lastMessageLoading ? (
                <Skeleton className="w-2/3 flex-grow" />
              ) : (
                <p className="max-w-[180px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-400">
                  {lastMessage?.message}
                </p>
              )}
            </div>
            {!lastMessageLoading && (
              <>
                {lastMessage?.lastMessageId !== null &&
                  lastMessage?.lastMessageId !==
                  conversation.seen[user?.userID] && (
                    <div className="bg-red-500 absolute top-1/2 right-4 h-[10px] w-[10px] -translate-y-1/2 rounded-full"></div>
                  )}
              </>
            )}
          </div>
        </div>
      </a>
    );

  return (
    <a
      onClick={onClickDialog}
    >
      <div className={`ml-[2px] text-black hover:bg-slate-200 cursor-pointer relative flex items-stretch gap-2 py-2 px-5 transition duration-300 ${conversationId === pid?.cid ? "!bg-sky-200 font-bold rounded-md" : ""
        }`}>
        <div className='flex flex-row items-center my-1'>
          {conversation?.group?.groupImage ? (
            <Image
              className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
              width={40}
              height={40}
              src={conversation.group.groupImage || profilePic}
              alt=""
            />
          ) : (
            <div className="relative flex min-w-[40px] max-w-[62px] flex-row">
              <Image
                className="absolute top-0 right-0 h-10 w-10 flex-shrink-0 rounded-full object-cover"
                width={40}
                height={40}
                src={filtered?.[0]?.data()?.avatar || profilePic}
                alt=""
              />
              <Image
                className={`border-slate-400 group-hover:border-slate-400 absolute top-0 left-10 h-10 w-10 flex-shrink-0 rounded-full border-[3px] object-cover transition duration-300
             ${conversationId === pid?.cid ? "!border-[#252F3C]" : ""
                  }`}
                width={40}
                height={40}
                src={filtered?.[1]?.data()?.avatar || profilePic}
                alt=""
              />
            </div>
          )}
          <div className="flex flex-grow flex-col ml-2 items-start gap-1 py-1">
            <p className="max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
              {conversation?.group?.groupName ||
                filtered
                  ?.map((user) => user.data()?.username)
                  .slice(0, 3)
                  .join(", ")}
            </p>
            {lastMessageLoading ? (
              <Skeleton className="w-2/3 flex-grow" />
            ) : (
              <p className="max-w-[180px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-400">
                {lastMessage?.message}
              </p>
            )}
          </div>
          {!lastMessageLoading && (
            <>
              {lastMessage?.lastMessageId !== null &&
                lastMessage?.lastMessageId !==
                conversation.seen[user?.userID] && (
                  <div className="bg-red-400 absolute top-1/2 right-4 h-[10px] w-[10px] -translate-y-1/2 rounded-full"></div>
                )}
            </>
          )}
        </div>
      </div>
    </a>
  );
};

SelectConversation.propTypes = {
  conversation: PropTypes.object,
  conversationId: PropTypes.string,
};


export default SelectConversation;

