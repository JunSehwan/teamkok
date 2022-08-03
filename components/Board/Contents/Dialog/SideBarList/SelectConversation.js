
// import { Link, useParams } from "react-router-dom";
import PropTypes from 'prop-types';

import Skeleton from "components/Common/Skeleton";
import useLastMessage from "hooks/useLastMessage";
import useUsersInfo from "hooks/useUsersInfo";
import { useSelector } from 'react-redux';
import profilePic from 'public/image/icon/happiness.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SelectConversation = ({ conversation, conversationId }) => {

  const router = useRouter();
  const pid = router.query;
  const { data: users, loading } = useUsersInfo(conversation?.users);
  const { user } = useSelector(state => state.user);
  const filtered = users?.filter((user) => user.id !== user?.userID);
  // const { id } = useParams();
  const {
    data: lastMessage,
    loading: lastMessageLoading,
    error: lastMessageError,
  } = useLastMessage(conversationId);
console.log(pid.cid, conversationId, "비교")
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

  if (conversation.users.length === 2)
    return (
      <Link
        href={`/board/${pid?.id}/${pid?.category}/${conversationId}`}
      >
        <div className={`ml-[2px] hover:bg-slate-200 cursor-pointer relative flex items-stretch gap-2 py-2 px-5 transition duration-300 
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
            <p className="max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
              {filtered?.[0].data()?.username}
            </p>
            {lastMessageLoading ? (
              <Skeleton className="w-2/3 flex-grow" />
            ) : (
              <p className="max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-400">
                {lastMessage?.message}
              </p>
            )}
          </div>
          {!lastMessageLoading && (
            <>
              {lastMessage?.lastMessageId !== null &&
                lastMessage?.lastMessageId !==
                conversation.seen[user?.userID] && (
                  <div className="bg-primary absolute top-1/2 right-4 h-[10px] w-[10px] -translate-y-1/2 rounded-full"></div>
                )}
            </>
          )}
        </div>
        </div>
      </Link>
    );

  return (
    <Link
      href={`/board/${pid?.id}/${pid?.category}/${conversationId}`}
    >
      <div className={`ml-[2px] hover:bg-slate-200 cursor-pointer relative flex items-stretch gap-2 py-2 px-5 transition duration-300 ${conversationId === pid?.cid ? "!bg-sky-200 font-bold rounded-md" : ""
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
          <div className="relative flex max-w-[62px] flex-row">
            <Image
              className="absolute top-0 right-0 h-10 w-10 flex-shrink-0 rounded-full object-cover"
              width={40}
              height={40}
              src={filtered?.[0]?.data()?.avatar|| profilePic}
              alt=""
            />
            <Image
              className={`border-dark group-hover:border-dark-lighten absolute top-0 left-10 h-10 w-10 flex-shrink-0 rounded-full border-[3px] object-cover transition duration-300
             ${conversationId === pid?.cid ? "!border-[#252F3C]" : ""
                }`}
              width={40}
              height={40}
              src={filtered?.[1]?.data()?.avatar|| profilePic}
              alt=""
            />
          </div>
        )}
        <div className="flex flex-grow flex-col ml-2 items-start gap-1 py-1">
          <p className="max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
            {conversation?.group?.groupName ||
              filtered
                ?.map((user) => user.data()?.username)
                .slice(0, 3)
                .join(", ")}
          </p>
          {lastMessageLoading ? (
            <Skeleton className="w-2/3 flex-grow" />
          ) : (
            <p className="max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-400">
              {lastMessage?.message}
            </p>
          )}
        </div>
        {!lastMessageLoading && (
          <>
            {lastMessage?.lastMessageId !== null &&
              lastMessage?.lastMessageId !==
              conversation.seen[user?.userID] && (
                <div className="bg-primary absolute top-1/2 right-4 h-[10px] w-[10px] -translate-y-1/2 rounded-full"></div>
              )}
          </>
        )}
      </div>
      </div>
    </Link>
  );
};

SelectConversation.propTypes = {
  conversation: PropTypes.object,
  conversationId: PropTypes.string,
};


export default SelectConversation;

