/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  formatDate,
  formatFileSize,
  splitLinkFromMessage,
} from "hooks/constants";
import { useSelector } from "react-redux";

import AvatarFromId from "../ChatView/AvatarFromId";
import ClickAwayListener from "components/Common/ClickAwayListener";
import { EMOJI_REGEX } from "hooks/constants";
import FileIcon from "../FileIcon";
import ImageView from "../ImageView";
import ReactionPopup from "./ReactionPopup";
import ReactionStatus from "./ReactionStatus";
import ReplyBadge from "./ReplyBadge";
import ReplyIcon from "components/Common/Icons/ReplyIcon";
import SpriteRenderer from "../SpriteRenderer";


const LeftMessage = ({ message, conversation, index, docs, setReplyInfo }) => {
  const [isSelectReactionOpened, setIsSelectReactionOpened] = useState(false);
  const { user } = useSelector(state => state.user)

  const [isImageViewOpened, setIsImageViewOpened] = useState(false);

  const formattedDate = formatDate(
    message?.createdAt.seconds ? message?.createdAt.seconds * 1000 : Date.now()
  );

  return (
    <div id={`message-${message?.id}`}>
      <div
        className={`${conversation?.users?.length === 2 ? "px-8" : "px-[70px]"
          } -mb-2 flex`}
      >
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
        className={`group relative flex items-stretch gap-2 px-4 ${Object.keys(message?.reactions || {}).length > 0 ? "mb-2" : ""
          }`}
      >
        {conversation?.users?.length > 2 && (
          <div onClick={(e) => e.stopPropagation()} className="h-full py-1">
            <div className="h-[30px] w-[30px]">
              {docs[index - 1]?.data()?.sender !== message?.sender && (
                <AvatarFromId uid={message?.sender} />
              )}
            </div>
          </div>
        )}

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
                className={`bg-slate-50 rounded-lg p-2 text-gray-700 ${conversation?.users?.length === 2
                  ? "after:border-amber-200 relative after:absolute after:right-full after:bottom-[6px] after:border-4 after:border-t-transparent after:border-l-transparent"
                  : ""
                  }`}
              >
                {splitLinkFromMessage(message?.content).map((item, index) => (
                  <Fragment key={index}>
                    {typeof item === "string" ? (
                      <span>{item}</span>
                    ) : (
                      <Link
                        href={item?.link}>
                        <a
                          className="mx-1 inline underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item?.link}
                        </a>
                      </Link>
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </>
        ) : message?.type === "image" ? (
          <>
            {/* // eslint-disable-next-line @next/next/no-img-element */}
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
            className="bg-emerald-200 flex items-center gap-2 overflow-hidden rounded-lg py-3 px-5"
          >
            <FileIcon
              className="h-4 w-4 object-cover"
              extension={message?.file?.name.split(".").slice(-1)[0]}
            />
            <div>
              <p className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                {message?.file?.name}
              </p>

              <p className="text-sm text-gray-400">
                {formatFileSize(message?.file?.size)}
              </p>
            </div>
            <Link
              href={message?.content}>
              <a
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </Link>
          </div>
        ) : message?.type === "sticker" ? (
          <SpriteRenderer
            onClick={(e) => e.stopPropagation()}
            title={formattedDate}
            src={message.content}
            size={130}
          />
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            title={formattedDate}
            className="border-x-amber-200 rounded-lg border p-3 text-gray-200 text-sm"
          >
            메시지가 삭제되었습니다.
          </div>
        )}

        {message?.type !== "removed" && (
          <>
            {/* <button
              onClick={() => setIsSelectReactionOpened(true)}
              className="text-lg text-gray-500 opacity-0 transition hover:text-gray-100 group-hover:opacity-100"
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
              className="text-gray-100 opacity-0 transition hover:text-gray-600 group-hover:opacity-100"
            >
              <ReplyIcon />
            </button>

            {isSelectReactionOpened && (
              <ClickAwayListener
                onClickAway={() => setIsSelectReactionOpened(false)}
              >
                {(ref) => (
                  <ReactionPopup
                    position={"left"}
                    forwardedRef={ref}
                    setIsOpened={setIsSelectReactionOpened}
                    messageId={message?.id}
                    currentReaction={
                      message?.reactions?.[user?.userID] || 0
                    }
                  />
                )}
              </ClickAwayListener>
            )}
          </>
        )}
        {Object.keys(message?.reactions || {}).length > 0 && (
          <ReactionStatus
            message={message}
            position={conversation?.users?.length > 2 ? "left-tab" : "left"}
          />
        )}
      </div>
    </div>
  );
};

LeftMessage.propTypes = {
  message: PropTypes.object,
  conversation: PropTypes.object,
  replyInfo: PropTypes.any,
  docs: PropTypes.any,
  setReplyInfo: PropTypes.any,
  // conversation: PropTypes.any,
};

export default LeftMessage;