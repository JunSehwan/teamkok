import React, { useState, useEffect } from 'react';
import { getUserInformations } from 'firebaseConfig';

const index = ({
  userID,
  singleBoard,
  singleSection,
  category,
}) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    async function fetchAndSetUser() {
      setData([]);
      setLoading(true);
      const result = await getUserInformations(userID);
      setData(result);
      setLoading(false);
    }
    fetchAndSetUser();
  }, [userID]);

  return (
    <div>
      {data && data?.map(v => (
        <div className="text-gray-500 text-xs" key={v?.id}>{v?.name}&nbsp;{v?.section}&nbsp;{v?.position}</div>
      ))}
    </div>
  );
};

export default index;