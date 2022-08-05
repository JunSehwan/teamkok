import { useEffect, useState } from "react";
import {
  CollectionReference,
  DocumentData,
  Query,
  QuerySnapshot,
  onSnapshot,
} from "firebase/firestore";
import PropTypes from 'prop-types';

let cache = {};

export const useCollectionQuery = (key, collection) => {
  const [data, setData] = useState(
    cache[key] || null
  );

  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection,
      (snapshot) => {
        setData(snapshot);
        setLoading(false);
        setError(false);
        cache[key] = snapshot;
      },
      (err) => {
        console.log(err);
        setData(null);
        setLoading(false);
        setError(true);
      }
    );
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [key]);
  return { loading, error, data };
};

useCollectionQuery.propTypes = {
    key: PropTypes.string,
    collection: PropTypes.any,
  };