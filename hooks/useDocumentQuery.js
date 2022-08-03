import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

let cache = {};

export const useDocumentQuery = (
  key,
  document
) => {
  const [data, setData] = useState(
    cache[key] || null
  );
  const [docuLoading, setDocuLoading] = useState(!Boolean(data));
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      document,
      (snapshot) => {
        setData(snapshot);
        setDocuLoading(false);
      },
      (err) => {
        console.log(err);
        setData(null);
        setDocuLoading(false);
        setError(true);
      }
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [key]);

  return { docuLoading, error, data };
};