import { useState } from "react";
import PropTypes from 'prop-types';

import Alert from "components/Common/Alert";
import { db } from "firebaseConfig";
import { doc } from "firebase/firestore";
import { useDocumentQuery } from "hooks/useDocumentQuery";
import { useRouter } from 'next/router';


const ReplyBadge = ({ messageId }) => {
  const router = useRouter();
  const pid = router.query;
  const conversationId = pid?.cid;
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const { data, loading, error } = useDocumentQuery(
    `message-${messageId}`,
    doc(db, "conversations", conversationId, "messages", messageId)
  );

  if (loading || error)
    return <div className="h-10 w-20 rounded-lg bg-gray-200"></div>;

  return (
    <>
      <div
        onClick={() => {
          const el = document.querySelector(`#message-${messageId}`);
          if (el) el.scrollIntoView({ behavior: "smooth" });
          else setIsAlertOpened(true);
        }}
        className="cursor-pointer rounded-lg bg-gray-200 p-3"
      >
        {data?.data()?.type === "text" ? (
          <p>{data?.data()?.content}</p>
        ) : data?.data()?.type === "image" ? (
          "An image"
        ) : data?.data()?.type === "file" ? (
          "A file"
        ) : data?.data()?.type === "sticker" ? (
          "A sticker"
        ) : (
          "메시지가 삭제되었습니다."
        )}
      </div>
      <Alert
        isOpened={isAlertOpened}
        setIsOpened={setIsAlertOpened}
        text="메시지를 찾을 수 없습니다. 좀 더 스크롤을 확장해주세요."
      />
    </>
  );
};

ReplyBadge.propTypes = {
  messageId: PropTypes.string,
};

export default ReplyBadge;