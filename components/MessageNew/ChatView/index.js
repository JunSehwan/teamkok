import { Fragment, useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  limitToLast,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import PropTypes from 'prop-types';
import TopBar from './TopBar'
import AvatarFromId from "./AvatarFromId";
import Spin from "components/Common/Spin";
import InfiniteScroll from "react-infinite-scroll-component";

import LeftMessage from "components/Board/Chat/ChatContents/Message/LeftMessage";
import RightMessage from "components/Board/Chat/ChatContents/Message/RightMessage";
import { db, getMessages } from "firebaseConfig";

import { useCollectionQuery } from "hooks/useCollectionQuery";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import styled from 'styled-components';


const ChatView = ({ conversation, inputSectionOffset, replyInfo, setReplyInfo }) => {
  const router = useRouter();
  const pid = router.query;
  const conversationId = pid?.cid;
  const { user } = useSelector(state => state.user);
  const scrollBottomRef = useRef(null);

  const [limitCount, setLimitCount] = useState(30);

  // const { data, loading, error } = useCollectionQuery(
  //   `conversation-data-${conversationId}-${limitCount}`,
  //   query(
  //     collection(db, "conversations", conversationId, "messages"),
  //     orderBy("createdAt"),
  //     limitToLast(limitCount)
  //   )
  // );
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (user && conversationId) {
      setLoading(true);
      async function fetchAndSetUser() {
        try {
          await getMessages(conversationId, limitCount).then((result) => {
            setData(result);
          })
        } catch (e) {
          setData(null)
          console.error(e)
          setError(true);
        }
      }
      fetchAndSetUser();
      setLoading(false);
    }
  }, [conversationId, limitCount, user, data]);


  const dataRef = useRef(data);
  const conversationIdRef = useRef(conversationId);
  const isWindowFocus = useRef(true);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  useEffect(() => {
    conversationIdRef.current = conversationId;
  }, [conversationId]);
  useEffect(() => {
    if (isWindowFocus?.current) updateSeenStatus();

    scrollBottomRef?.current?.scrollIntoView();

    setTimeout(() => {
      scrollBottomRef?.current?.scrollIntoView();
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.docs?.slice(-1)?.[0]?.id || ""]);

  const updateSeenStatus = async () => {
    if (dataRef.current?.empty) return;
    const lastDoc = dataRef.current?.docs?.slice(-1)?.[0];
    if (!lastDoc) return;

    await updateDoc(doc(db, "conversations", conversationIdRef.current), {
      [`seen.${user?.userID}`]: lastDoc?.id,
      lastSeener: user?.userID
    });
  };

  useEffect(() => {
    const focusHandler = () => {
      isWindowFocus.current = true;
      updateSeenStatus();
    };

    const blurHandler = () => {
      isWindowFocus.current = false;
    };

    addEventListener("focus", focusHandler);
    addEventListener("blur", blurHandler);

    return () => {
      removeEventListener("focus", focusHandler);
      removeEventListener("blur", blurHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className="flex flex-grow items-center justify-center">
        <Spin />
      </div>
    );

  if (error)
    return (
      <div className="flex-grow">
        <TopBar />
        <p className="mt-4 text-center text-gray-400">Something went wrong</p>
      </div>
    );

  if (data?.empty)
    return (
      <>
        <div className="flex w-full">
          <TopBar />
        </div>
        <div className="flex-grow w-full flex justify-center items-center bg-[#9bbbd4] h-full">
          <p className="mt-4 text-center text-white">
            아직 메시지가 없습니다. 채팅을 시작해보세요!
          </p>
        </div>
      </>
    );
  return (
    <div
      id="scrollableDiv"
      height="calc(100vh - var(--navbar-height) - 2.4rem)"
      width="100%"
      style={{
        height: 'calc(100vh - var(--navbar-height) - 2.4rem)',
        overflow: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        backgroundColor: '#9bbbd4',
        overflowY: 'hidden',
      }}>
      <StyledContainer
        className="z-1 w-full mx-auto"
        dataLength={data?.size || 0}
        next={() => setLimitCount((prev) => prev + 10)}
        inverse
        hasMore={(data?.size) >= limitCount}
        scrollableTarget="scrollableDiv"
        loader={
          <div className="flex justify-center py-3 ">
            <Spin />
          </div>
        }
        style={{ display: "flex", flexDirection: "column-reverse", height: "calc(81.5vh)" }}
        height={`calc(100vh - ${inputSectionOffset}px)`}
      >
        <div className="flex flex-col items-stretch gap-3 pt-10 pb-1">
          {data?.docs
            ?.map((doc) => ({ id: doc?.id, ...doc?.data() }))
            ?.map((item, index) => (
              <Fragment key={item?.id}>
                {item?.sender === user?.userID ? (
                  <RightMessage
                    replyInfo={replyInfo}
                    setReplyInfo={setReplyInfo}
                    message={item}
                  />
                ) : (
                  <LeftMessage
                    replyInfo={replyInfo}
                    setReplyInfo={setReplyInfo}
                    message={item}
                    index={index}
                    docs={data?.docs}
                    conversation={conversation}
                  />
                )}
                {conversation?.seen ?
                  Object?.entries(conversation?.seen)?.filter(
                    ([key, value]) => key !== user?.userID && value === item.id
                  )?.length > 0 && (
                    <div className="flex justify-end gap-[1px] px-8">
                      {Object.entries(conversation?.seen)
                        ?.filter(
                          ([key, value]) =>
                            key !== user?.userID && value === item.id
                        )
                        ?.map(([key, value]) => (
                          // <AvatarFromId key={key} uid={key} size={14} />
                          <div key={key}></div>
                        ))}
                    </div>
                  )
                  : null}
              </Fragment>
            ))}
          <div ref={scrollBottomRef}></div>
        </div>
      </StyledContainer>
      <TopBar />
    </div >
  );
};

ChatView.propTypes = {
  conversation: PropTypes.object,
  inputSectionOffset: PropTypes.number,
  replyInfo: PropTypes.object,
  setReplyInfo: PropTypes.func,
  // conversation: PropTypes.any,
};


const StyledContainer = styled(InfiniteScroll)`

 ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.16);
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`

export default ChatView;