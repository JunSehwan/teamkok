import React from 'react';
import PostCard from './PostCard';
import { db } from "firebaseConfig";
import {
  collection,
  getDocs, where,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from "slices/section";
import Empty from 'components/Common/Empty';

const index = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.section);
  // const db = getFirestore()
  let lastVisible = undefined
  const [posts, setPosts] = useState([])
  const { filterNumber } = useSelector(state => state.sectionSettings);

  useEffect(() => {
    async function fetchData() {
      if (filterNumber) {
        if (filterNumber == "all") {

          setPosts([]);
          await getNextPostsReFull();
        } else {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          lastVisible = -1
          setPosts([]);
          let q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), where("category", "==", filterNumber))
          await getDocs(q).then((snapshot) => {
            setPosts((posts) => {
              const arr = []
              snapshot.forEach((doc) => {
                arr.push({
                  id: doc?.id,
                  ...doc?.data(),
                })
              })
              return arr
            })
            //   if (snapshot.docs.length === 0) {
            //     // eslint-disable-next-line react-hooks/exhaustive-deps
            //     
            //   } else {
            //     lastVisible = snapshot.docs[snapshot.docs.length - 1]
            //   }
          })
        }
      }
    }
    fetchData();
  }, [filterNumber])

  const getNextPostsReFull = useCallback(async () => {
    let q

    q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(4))

    await getDocs(q).then((snapshot) => {
      setPosts((posts) => {
        const arr = [...posts]
        snapshot.forEach((doc) => {
          arr.push({
            id: doc?.id,
            ...doc?.data(),
          })
        })
        return arr
      })
      if (snapshot.docs.length === 0) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        lastVisible = -1
      } else {
        lastVisible = snapshot.docs[snapshot.docs.length - 1]
      }
    })

  }, [])


  const getNextPosts = useCallback(async () => {
    let q

    if (lastVisible === -1) {
      return
    } else if (lastVisible) {
      q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(2), startAfter(lastVisible))
    } else if (!lastVisible) {
      q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(4))
    }

    await getDocs(q).then((snapshot) => {
      setPosts((posts) => {
        const arr = [...posts]
        snapshot.forEach((doc) => {
          arr.push({
            id: doc?.id,
            ...doc?.data(),
          })
        })
        return arr
      })
      if (snapshot.docs.length === 0) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        lastVisible = -1
      } else {
        lastVisible = snapshot.docs[snapshot.docs.length - 1]
      }
    })

  }, [])

  useEffect(() => {
    getNextPosts()
  }, [getNextPosts])

  useEffect(() => {
    dispatch(loadPosts(posts))
  }, [dispatch, posts])

  useBottomScrollListener(getNextPosts, 0, 200, undefined, true)

  const [morePosts, setMorePosts] = useState(true);


  return (
    <div className="">
      <div className="">
        {mainPosts?.length !== 0 ?
          mainPosts?.map((m, i) => (
            <div key={i}>
              <div>
                <PostCard
                  post={m}
                  index={i}
                />
              </div>
            </div>
          ))
          :
          <div className="py-12 w-[100%]">
            <Empty
              title="아직 팀 소식이 없습니다."
              text="새로운 팀 이야기가 기다려집니다!"
            />
          </div>
        }
      </div>
    </div>
  )

};

export default index;