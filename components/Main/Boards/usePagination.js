import {
  getFirestore,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { loadAllBoards, setLoadBoardsEmpty } from 'slices/board';
import { useDispatch, useSelector } from 'react-redux';

// collectionName -> 컬렉션 이름,
// limitCount -> 총 몇개의 데이터를 끊어서 요청할건지, 
// target -> 교차 요소 (요소의 ref 전달) 
const usePagination = (collectionName, limitCount, target, setTarget, loadCount) => {
  const dispatch = useDispatch();
  const db = getFirestore();
  const [data, setData] = useState([]); // 불러온 문서들 상태
  const [boardLoading, setBoardLoading] = useState(false); // 로딩 상태 
  const [loadingMore, setLoadingMore] = useState(false); // 추가 요청시 로딩 상태
  const [key, setKey] = useState(null); // 마지막으로 불러온 스냅샷 상태
  const [noMore, setNoMore] = useState(false); // 추가로 요청할 데이터 없다는 flag
  const { boardSearchCategory, searchTerm } = useSelector(state => state.board);
  
  const getFirstPageWithFilter = useCallback(async () => {
    try {
      if (boardSearchCategory) {
        setNoMore(false);
        setData([]);
        setKey(null);
        dispatch(setLoadBoardsEmpty());
        const queryRef = query(
          collection(db, collectionName),
          where("category", "array-contains", boardSearchCategory),
          orderBy("createdAt", "desc"), // 최신 작성순으로 정렬
          limit(limitCount)
        );
        setBoardLoading(true);
        const snap = await getDocs(queryRef);
        const docsArray = snap?.docs?.map((doc) => ({
          id: doc?.id,
          ...doc?.data(),
        }));

        // 문서 저장
        setData(docsArray);

        // 커서로 사용할 마지막 문서 스냅샷 저장
        setKey(snap?.docs[snap?.docs?.length - 1]);

        dispatch(loadAllBoards(docsArray));

        // setNoMore(true);
      }
    } catch (err) {
      console.error(err);
    }
    setBoardLoading(false);
  }, [dispatch, db, collectionName, limitCount,boardSearchCategory]);


  const getFirstPageWithSearch = useCallback(async () => {
    try {
      if (searchTerm?.length !== 0) {
        setNoMore(false);
        setData([]);
        setKey(null);
        dispatch(setLoadBoardsEmpty());
        const queryRef = query(
          collection(db, collectionName),
          orderBy("name", "desc"), // 최신 작성순으로 정렬
          // where("name", ">=", searchTerm),
          // where("name", "<=", searchTerm + '\uf8ff'),
        );
        const snap = await getDocs(queryRef);
        const docsArray = snap?.docs?.map((doc) => ({
          id: doc?.id,
          ...doc?.data(),
        }));
        let res = docsArray?.filter(it => it.name.includes(searchTerm?.toLowerCase()));
        // 문서 저장
        setData(res);
        dispatch(loadAllBoards(res));
        setNoMore(true);
        // 커서로 사용할 마지막 문서 스냅샷 저장
        setKey(snap?.docs[snap?.docs?.length - 1]);


        // setNoMore(true);
      }
    } catch (err) {
      console.error(err);
    }
    setBoardLoading(false);
  }, [searchTerm, dispatch, db, collectionName]);



  // 첫번째 페이지 요청 함수
  const getFirstPage = useCallback(async () => {
    try {
      setNoMore(false);
      setData([]);
        setKey(null);
      const queryRef = query(
        collection(db, collectionName),
        orderBy("createdAt", "desc"), // 최신 작성순으로 정렬
        limit(limitCount)
      );
      setBoardLoading(true);
      const snap = await getDocs(queryRef);
      const docsArray = snap?.docs?.map((doc) => ({
        id: doc?.id,
        ...doc?.data(),
      }));
      // 문서 저장
      setData(docsArray);

      // 커서로 사용할 마지막 문서 스냅샷 저장
      setKey(snap?.docs[snap?.docs?.length - 1]);

      // dispatch(loadAllBoards(data));
    } catch (err) {
      console.error(err);
    }
    setBoardLoading(false);
  }, [collectionName, db, limitCount]);

  // 추가 요청 함수
  const loadMore = useCallback(
    async () => {
      try {
        if(!noMore){
          if (boardSearchCategory){
            const queryRef = query(
              collection(db, collectionName),
              where("category", "array-contains", boardSearchCategory),
              orderBy("createdAt", "desc"),
              startAfter(key || ""), // 마지막 커서 기준으로 추가 요청을 보내도록 쿼리 전송
              limit(loadCount)
            );
            const snap = await getDocs(queryRef);
            !!snap?.empty
              ? setNoMore(true) // 만약 스냅샷이 존재 하지 않는다면 더이상 불러올수 없다는 flag 설정
              : setKey(snap?.docs[snap?.docs?.length - 1]); // 존재한다면 처음과 마찬가지고 마지막 커서 저장
            const docsArray = snap?.docs?.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setData([...data, ...docsArray]); // 기존 데이터와 합쳐서 상태 저장
        // dispatch(loadAllBoards(data));
          } else{
          const queryRef = query(
            collection(db, collectionName),
            // where("category", "==", boardSearchCategory),
            orderBy("createdAt", "desc"),
            startAfter(key || ""), // 마지막 커서 기준으로 추가 요청을 보내도록 쿼리 전송
            limit(loadCount)
            );
            const snap = await getDocs(queryRef);
            !!snap?.empty
          ? setNoMore(true) // 만약 스냅샷이 존재 하지 않는다면 더이상 불러올수 없다는 flag 설정
          : setKey(snap?.docs[snap?.docs?.length - 1]); // 존재한다면 처음과 마찬가지고 마지막 커서 저장
        const docsArray = snap?.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData([...data, ...docsArray]); // 기존 데이터와 합쳐서 상태 저장
        // dispatch(loadAllBoards(data));
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    [db, loadCount, collectionName, boardSearchCategory, key, data,noMore]
  );


  useEffect(() => {
    if (boardSearchCategory !== null) {
      getFirstPageWithFilter();
    }
  }, [boardSearchCategory, getFirstPageWithFilter]);

  useEffect(() => {
    if (searchTerm?.length !== 0) {
      getFirstPageWithSearch();
    }
  }, [searchTerm, getFirstPageWithSearch]);

  

  // 처음 화면이 랜더링 되었을때 첫번째 페이지를 문서를 가져오도록 설정
  useEffect(() => {
    getFirstPage();
  }, [getFirstPage]);

  useEffect(() => {
    if (boardSearchCategory == null || searchTerm?.length === 0) {
      getFirstPage();
    }
  }, [boardSearchCategory, getFirstPage, searchTerm?.length]);
  // target 요소의 ref가 전달되었을때 해당 요소를 주시할수 있도록 observer 인스턴스 생성후 전달


  return { data, boardLoading, loadingMore, loadMore, noMore };
};

export default usePagination;
