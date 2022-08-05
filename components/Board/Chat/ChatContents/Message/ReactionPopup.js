import { doc, updateDoc } from "firebase/firestore";

import { REACTIONS_UI } from "hooks/constants";
import { db } from "firebaseConfig";
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import Image from "next/image";


const ReactionPopup = ({
  position,
  forwardedRef,
  setIsOpened,
  messageId,
  currentReaction,
}) => {
  const router = useRouter();
  const pid = router.query;
  const conversationId = pid?.cid;
  const { user } = useSelector((state) => state.user);

  const updateReaction = (value) => {
    updateDoc(
      doc(db, "conversations", conversationId, "messages", messageId),
      {
        [`reactions.${user?.userID}`]: value,
      }
    );
  };

  return (
    <div
      ref={forwardedRef}
      className={`bg-dark-lighten animate-fade-in absolute bottom-[calc(100%+5px)] z-[1] flex gap-1 rounded-full p-[6px] shadow ${position === "left" ? "left-8" : "right-8"
        }`}
    >
      {Object?.entries(REACTIONS_UI)?.map(([key, value], index) => (
        <div
          key={key}
          className={`${index + 1 === currentReaction
              ? "after:bg-white relative after:absolute after:left-1/2 after:top-full after:h-[5px] after:w-[5px] after:-translate-x-1/2 after:rounded-full"
              : ""
            }`}
        >
          <Image
            onClick={() => {
              if (index + 1 === currentReaction) updateReaction(0);
              else updateReaction(index + 1);
              setIsOpened(false);
            }}
            width={40}
            height={40}
            title={key}
            className={`h-7 w-7 origin-bottom cursor-pointer transition duration-300 hover:scale-[115%]`}
            src={value?.gif}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

ReactionPopup.propTypes = {
  position: PropTypes.string,
  forwardedRef: PropTypes.any,
  setIsOpen: PropTypes.func,
  messageId: PropTypes.string,
  currentReaction: PropTypes.number,
  // conversation: PropTypes.any,
};

export default ReactionPopup;