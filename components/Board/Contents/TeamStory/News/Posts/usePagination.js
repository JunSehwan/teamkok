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
import { loadPosts, setLoadPostEmpty } from 'slices/section';
import { useDispatch, useSelector } from 'react-redux';

// collectionName -> 컬렉션 이름,
// limitCount -> 총 몇개의 데이터를 끊어서 요청할건지, 
// target -> 교차 요소 (요소의 ref 전달) 
const usePagination = (collectionName, limitCount, target, setTarget) => {
  const dispatch = useDispatch();
  const { addDone, deleteDone } = useSelector((state) => state.section);
  const { singleSection } = useSelector((state) => state.board);
  const db = getFirestore();
  const [data, setData] = useState([]); // 불러온 문서들 상태
  const [postLoading, setPostLoading] = useState(false); // 로딩 상태 
  const [loadingMore, setLoadingMore] = useState(false); // 추가 요청시 로딩 상태
  const [key, setKey] = useState(null); // 마지막으로 불러온 스냅샷 상태
  const [noMore, setNoMore] = useState(false); // 추가로 요청할 데이터 없다는 flag
  const { filterNumber } = useSelector(state => state.sectionSettings);


  // useEffect(() => {
  //   if (filterNumber) {
  //     getFirstPageWithCategory();
  //   }
  // }, [getFirstPageWithCategory, filterNumber]);
  // const getFirstPageWithCategory = useCallback(async () => {
  //   try {
  //     if (filterNumber) {
  //       setData([]);
  //       setKey(null);
  //       dispatch(setLoadPostEmpty());
  //       const queryRef = query(
  //         collection(db, collectionName),
  //         where("sectionId", "==", singleSection?.id),
  //         where("category", "==", filterNumber),
  //         orderBy("createdAt", "desc"), // 최신 작성순으로 정렬
  //         limit(limitCount)
  //       );
  //       setPostLoading(true);
  //       const snap = await getDocs(queryRef);
  //       const docsArray = snap?.docs?.map((doc) => ({
  //         id: doc?.id,
  //         ...doc?.data(),
  //       }));

  //       // 문서 저장
  //       setData(docsArray);

  //       // 커서로 사용할 마지막 문서 스냅샷 저장
  //       setKey(snap?.docs[snap?.docs?.length - 1]);

  //       dispatch(loadPosts(docsArray));
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   setPostLoading(false);
  // }, [addDone, dispatch, db, collectionName, deleteDone, singleSection?.id, limitCount]);

 
  const getFirstPageWithFilter = useCallback(async () => {
    try {
      if (filterNumber) {
        setData([]);
        setKey(null);
        dispatch(setLoadPostEmpty());
        const queryRef = query(
          collection(db, collectionName),
          where("sectionId", "==", singleSection?.id),
          where("category", "==", filterNumber),
          orderBy("createdAt", "desc"), // 최신 작성순으로 정렬
          // limit(limitCount)
        );
        setPostLoading(true);
        const snap = await getDocs(queryRef);
        const docsArray = snap?.docs?.map((doc) => ({
          id: doc?.id,
          ...doc?.data(),
        }));

        // 문서 저장
        setData(docsArray);

        // 커서로 사용할 마지막 문서 스냅샷 저장
        setKey(snap?.docs[snap?.docs?.length - 1]);

        dispatch(loadPosts(docsArray));

        // setNoMore(true);
      }
    } catch (err) {
      console.error(err);
    }
    setPostLoading(false);
  }, [dispatch, db, collectionName, singleSection?.id, filterNumber]);

  const getFirstPageWithAdd = useCallback(async () => {
    try {
      if (addDone || deleteDone) {
        setData([]);
        setKey(null);
        dispatch(setLoadPostEmpty());
        const queryRef = query(
          collection(db, collectionName),
          where("sectionId", "==", singleSection?.id),
          // where("category", "==", filterNumber),
          orderBy("createdAt", "desc"), // 최신 작성순으로 정렬
          limit(limitCount)
        );
        setPostLoading(true);
        const snap = await getDocs(queryRef);
        const docsArray = snap?.docs?.map((doc) => ({
          id: doc?.id,
          ...doc?.data(),
        }));

        // 문서 저장
        setData(docsArray);

        // 커서로 사용할 마지막 문서 스냅샷 저장
        setKey(snap?.docs[snap?.docs?.length - 1]);

        dispatch(loadPosts(docsArray));
      }
    } catch (err) {
      console.error(err);
    }
    setPostLoading(false);
  }, [addDone, deleteDone, dispatch, db, collectionName, singleSection?.id, limitCount]);

  // 첫번째 페이지 요청 함수
  const getFirstPage = useCallback(async () => {
    try {
      const queryRef = query(
        collection(db, collectionName),
        where("sectionId", "==", singleSection?.id),
        orderBy("createdAt", "desc"), // 최신 작성순으로 정렬
        limit(limitCount)
      );
      setPostLoading(true);
      const snap = await getDocs(queryRef);
      const docsArray = snap?.docs?.map((doc) => ({
        id: doc?.id,
        ...doc?.data(),
      }));

      // 문서 저장
      setData(docsArray);

      // 커서로 사용할 마지막 문서 스냅샷 저장
      setKey(snap?.docs[snap?.docs?.length - 1]);

      dispatch(loadPosts(docsArray));
    } catch (err) {
      console.error(err);
    }
    setPostLoading(false);
  }, [collectionName, db, limitCount, singleSection?.id, dispatch,]);

  // 추가 요청 함수
  const loadMore = useCallback(
    async (loadCount) => {
      try {
        const queryRef = query(
          collection(db, collectionName),
          where("sectionId", "==", singleSection?.id),
          // where("category", "==", filterNumber),
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
        dispatch(loadPosts(data));

      } catch (err) {
        console.error(err);
      }
    },
    [db, collectionName, singleSection?.id, key, data, dispatch]
  );

  // 지정된 요소가 화면에 보일때 실행할 콜백함수
  const onIntersect = useCallback(
    async ([entry], observer) => {
      // 만약에 지정한 요소가 화면에 보이거나 현재 데이터를 더 불러오는 상황이 아닐경우,
      // 기존 요소의 주시를 해체하고 추가로 3개의 문서를 더 불러오도록 설정
      if (entry.isIntersecting && !loadingMore) {
        observer.unobserve(entry.target);
        setLoadingMore(true);
        setTimeout(async()=>{
          await loadMore(5);
        },[500])
        setLoadingMore(false);
      }
    },
    [loadMore, loadingMore]
  );


   useEffect(() => {
    if (filterNumber) {
      getFirstPageWithAdd();
    }
  }, [getFirstPageWithAdd, filterNumber])

  useEffect(() => {
    if (addDone || deleteDone) {
      getFirstPageWithAdd();
    }
  }, [getFirstPageWithAdd, addDone, deleteDone]);
  useEffect(() => {
    if (filterNumber !== null) {
      getFirstPageWithFilter();
    }
  }, [getFirstPageWithAdd, addDone, deleteDone, filterNumber, getFirstPageWithFilter]);


  // 처음 화면이 랜더링 되었을때 첫번째 페이지를 문서를 가져오도록 설정
  useEffect(() => {
    getFirstPage();
  }, [getFirstPage]);
  useEffect(() => {
    if (filterNumber == null) {
      getFirstPage();
    }
  }, [filterNumber, getFirstPage]);
  // target 요소의 ref가 전달되었을때 해당 요소를 주시할수 있도록 observer 인스턴스 생성후 전달
  useEffect(() => {
    let observer;
    // setTimeout(()=>{
    if (target && !noMore) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0,
      });
      observer.observe(target);
    }
    // },[1000])
    // 메모리 해제 작업
    return () => {
      setPostLoading(false);
      setLoadingMore(false);
      observer && observer.disconnect();
      { postLoading && <div ref={setTarget}>loading</div> }
    };
  }, [target, onIntersect, noMore, postLoading, setTarget]);

  return { data, postLoading, loadingMore, noMore };
};

export default usePagination;
