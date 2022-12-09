import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/Common/Loading';
import usePagination from './usePagination';
import PostCard from './PostCard';
import { nanoid } from "nanoid";
import Empty from 'components/Common/Empty';
import { loadPosts } from "slices/section";


const index = () => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const INITIAL_FETCH_COUNT = 5;
  const { mainPosts } = useSelector(state => state.section);
  const { loading } = useSelector(state => state.user);
  const { filterNumber } = useSelector(state => state.sectionSettings);
  const { data: posts, postLoading, loadingMore, noMore,
  } = usePagination("posts", INITIAL_FETCH_COUNT, target, setTarget);
  // .... 컨텐츠 (피드 목록) 생략

  useEffect(() => {
    dispatch(loadPosts(posts))
  }, [dispatch, posts])



  return (
    <>
      <>
        {loading ? <Loading /> :
          <>
            {mainPosts?.length > 0 ? (
              <div>
                <div
                // className="grid grid-cols-1 lg:grid-cols-1 gap-2"
                >
                  {mainPosts?.map((m, i) => (
                    <div key={i}>
                      <div ref={setTarget}>
                        <PostCard
                          post={m}
                          index={i}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full h-12 my-6 flex justify-center items-center">
                  {noMore && (
                    <div className="text-center text-gray-600">
                      더이상 불러올 피드가 없어요.
                    </div>
                  )}
                </div>
              </div>)
              :
              <div className="py-12 w-[100%]">
                <Empty
                  title="아직 해당 팀의 공지가 없습니다."
                  text="새로운 팀 이야기가 기다려집니다!"
                />
              </div>
            }
          </>}
      </>

      <div className="" ref={setTarget}>
        {loadingMore && <Loading />}
      </div>
      {postLoading && <div className="">loading</div>
      }
    </>
  );
};



export default index;