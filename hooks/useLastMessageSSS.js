import {
  collection,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { db } from "firebaseConfig";

let cache = {};

const useLastMessage = (conversationId) => {

  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)

  const [data, setData] = useState(cache[conversationId] || null);


  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "conversations", conversationId, "messages"),
        orderBy("createdAt"),
        limitToLast(1)
      ),
      (snapshot) => {
        if (snapshot.empty) {
          setData({
            lastMessageId: null,
            message: "No message recently",
          });
          setLoading(false);
          return;
        }
        const type = snapshot.docs?.[0]?.data()?.type;
        let response =
          type === "image"
            ? "An image"
            : type === "file"
              ? `File: ${snapshot.docs[0]?.data()?.file?.name.split(".").slice(-1)[0]
              }`
              : type === "sticker"
                ? "A sticker"
                : type === "removed"
                  ? "Message removed"
                  : (snapshot.docs[0].data().content);

        const seconds = snapshot.docs[0]?.data()?.createdAt;
        const formattedDate = dayjs(seconds).fromNow();

        response =
          response.length > 30 - formattedDate.length
            ? `${response.slice(0, 30 - formattedDate.length)}...`
            : response;

        const result = `${response} • ${formattedDate}`;
        setData({
          lastMessageId: snapshot.docs?.[0]?.id,
          message: result,
        });
        cache[conversationId] = {
          lastMessageId: snapshot.docs?.[0]?.id,
          message: result,
        };
      },
      (err) => {
        console.log(err);
        setData(null);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [conversationId]);

  return data
};

export default useLastMessage;