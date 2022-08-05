/* eslint-disable @next/next/no-img-element */
import { Fragment, useState,useCallback } from "react";
import PropTypes from 'prop-types';
import { doc, updateDoc } from "firebase/firestore";
import {
  formatDate,
  formatFileSize,
  splitLinkFromMessage,
} from "hooks/constants";
import ClickAwayListener from "components/Common/ClickAwayListener";
import { EMOJI_REGEX } from "hooks/constants";
import FileIcon from "../FileIcon";
import ImageView from "../ImageView";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import ReactionPopup from "./ReactionPopup";
import ReactionStatus from "./ReactionStatus";
import ReplyBadge from "./ReplyBadge";
import ReplyIcon from "components/Common/Icons/ReplyIcon";
import SpriteRenderer from "../SpriteRenderer";
import { db } from "firebaseConfig";

const RightMessage = ({ message, setReplyInfo }) => {
  
  const [isSelectReactionOpened, setIsSelectReactionOpened] = useState(false);
  const { user } = useSelector(state => state.user)

  const router = useRouter();
  const pid = router.query;
  const conversationId = pid?.cid;
  const [isImageViewOpened, setIsImageViewOpened] = useState(false);

  const removeMessage = (messageId) => {
    updateDoc(
      doc(db, "conversations", conversationId, "messages", messageId),
      {
        type: "removed",
        file: null,
        content: "",
        reactions: [],
      }
    );
  };


  const downloadFile = useCallback((url) => {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = message?.content;
    link.click();
    link.remove();
  }, [message?.content]);


  const formattedDate = formatDate(
    message?.createdAt?.seconds ? message?.createdAt?.seconds * 1000 : Date.now()
  );

  return (
    <div id={`message-${message?.id}`}>
      <div className="-mb-2 flex justify-end px-8">
        {!!message?.replyTo && (
          <ReplyBadge messageId={message?.replyTo} />
        )}
      </div>
      <div
        onClick={(e) => {
          if (e.detail === 2 && message?.type !== "removed") {
            setReplyInfo(message);
          }
        }}
        className={`group relative flex flex-row-reverse items-stretch gap-2 px-8 ${Object.keys(message?.reactions || {}).length > 0 ? "mb-2" : ""
          }`}
      >
        {message?.type === "text" ? (
          <>
            {EMOJI_REGEX.test(message?.content) ? (
              <div
                onClick={(e) => e.stopPropagation()}
                title={formattedDate}
                className="text-4xl"
              >
                {message?.content}
              </div>
            ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                title={formattedDate}
                className={`bg-sky-400 after:border-sky-400 relative rounded-lg p-2 px-3 text-white after:absolute after:left-full after:bottom-[6px] after:border-8 after:border-t-transparent after:border-r-transparent`}
              >
                {splitLinkFromMessage(message?.content).map((item, index) => (
                  <Fragment key={index}>
                    {typeof item === "string" ? (
                      <span>{item}</span>
                    ) : (
                      <a
                        className="mx-1 inline underline"
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.link}
                      </a>
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </>
        ) : message?.type === "image" ? (
          <>
            <img
              onClick={(e) => {
                setIsImageViewOpened(true);
                e.stopPropagation();
              }}
              title={formattedDate}
              className="max-w-[60%] cursor-pointer transition duration-300 hover:brightness-[85%]"
              src={message?.content}
              alt=""
            />
            <ImageView
              src={message?.content}
              isOpened={isImageViewOpened}
              setIsOpened={setIsImageViewOpened}
            />
          </>
        ) : message?.type === "file" ? (
          <div
            onClick={(e) => e.stopPropagation()}
            title={formattedDate}
            className="bg-sky-600 flex items-center gap-2 overflow-hidden rounded-lg text-white -lg py-3 px-5"
          >
            <FileIcon
              className="h-4 w-4 object-cover text-white"
              extension={message?.file?.name?.split(".").slice(-1)[0]}
            />
            <div>
              <p className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                {message?.file?.name}
              </p>

              <p className="text-sm text-gray-300">
                {formatFileSize(message?.file?.size)}
              </p>
            </div>

            {/* <a
              href={message?.content}
              download
              target="_blank"
              rel="noopener noreferrer"
            > */}

                <button onClick={() => downloadFile()} >
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-2xl text-white ml-1 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  </button>
            {/* </a> */}
          </div>
        ) : message?.type === "sticker" ? (
          <SpriteRenderer
            onClick={(e) => e.stopPropagation()}
            title={formattedDate}
            src={message?.content}
            size={130}
          />
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            title={formattedDate}
            className="border-violet-400 rounded-lg border p-3 text-gray-400"
          >
            Message has been removed
          </div>
        )}

        {message?.type !== "removed" && (
          <>
          {/* //리액션인데 기능 못함 */}
            {/* <button
              onClick={() => setIsSelectReactionOpened(true)}
              className="text-lg text-gray-400 opacity-0 transition hover:text-gray-600 group-hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button> */}

            <button
              onClick={(e) => {
                setReplyInfo(message);
                e.stopPropagation();
              }}
              className="text-gray-400 opacity-0 transition hover:text-gray-600 group-hover:opacity-100"
            >
              <ReplyIcon />
            </button>

            <button
              onClick={(e) => {
                removeMessage(message?.id);
                e.stopPropagation();
              }}
              className="text-lg text-gray-400 opacity-0 transition hover:text-gray-600 group-hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            {/* {isSelectReactionOpened && (
              <ClickAwayListener
                onClickAway={() => setIsSelectReactionOpened(false)}
              >
              
                {(ref) => (
                  <ReactionPopup
                    position="right"
                    forwardedRef={ref}
                    setIsOpened={setIsSelectReactionOpened}
                    messageId={message?.id}
                    currentReaction={
                      message?.reactions?.[user?.userID?.uid] || 0
                    }
                  />
                )}
              </ClickAwayListener>
            )} */}

            {Object.keys(message?.reactions || {})?.length > 0 && (
              <ReactionStatus message={message} position="right" />
            )}
          </>
        )}
      </div>
    </div>
  );
};

RightMessage.propTypes = {
  message: PropTypes.object,
  replyInfo: PropTypes.any,
  setReplyInfo: PropTypes.func,
};

export default RightMessage;