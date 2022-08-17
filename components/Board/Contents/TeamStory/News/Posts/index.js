import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/Common/Loading';
import usePagination from './usePagination';
import PostCard from './PostCard';
import CategoryCapsule from './CategoryCapsule';
import NoticeList from "components/Common/NoticeList";
import Empty from 'components/Common/Empty';
import { categorySelect } from 'slices/sectionSettings';
import { nanoid } from 'nanoid'
const index = () => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const INITIAL_FETCH_COUNT = 10;
  const { mainPosts, addDone } = useSelector(state => state.section);
  const { loading } = useSelector(state => state.user);

  const { data: posts, postLoading, loadingMore, noMore,
  } = usePagination("posts", INITIAL_FETCH_COUNT, target, setTarget);
  // .... 컨텐츠 (피드 목록) 생략

  // 카테고리 검색
  const [category, setCategory] = useState(null);
  const onChangeCategory = useCallback((e) => {
    setCategory(e);
    dispatch(categorySelect(e));
  }, [dispatch])
  return (
    <>
      <>
        {loading ? <Loading /> :
          <>
            <ul id="category" className="mt-2 flex flex-row flex-wrap w-[100%] my-4 p-[1rem]">
              <li key="all" className="mr-[6px] border-gray-400 flex flex-row mb-1 mt-1">
                <button onClick={() => onChangeCategory(null)}
                  type='button'
                  className={null === category ? `bg-violet-500 text-white text-center transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer hover:bg-violet-600 click:active:checked:focus:bg-violet-600 dark:bg-gray-800 rounded-full flex flex-1 items-center p-1`
                    : `text-center transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-gray-400 hover:bg-gray-600 click:active:checked:focus:bg-gray-700 dark:bg-gray-800 text-white rounded-full flex flex-1 items-center p-1`
                  }>
                  <div className="flex-1 px-2 text-center ">
                    <div className="text-base leading-snug font-normal dark:text-white">
                      전체보기
                    </div>

                  </div>
                </button>
              </li>
              {NoticeList?.map((v, i) => (
                <React.Fragment key={nanoid()}>
                  <CategoryCapsule
                    name={v?.name}
                    number={v?.key}
                    category={category}
                    setCategory={setCategory}
                    onChangeCategory={onChangeCategory}
                    index={i}
                  />
                </React.Fragment>
              ))}
            </ul>

            {mainPosts?.length > 0 ? (
              <div>
                <div
                // className="grid grid-cols-1 lg:grid-cols-1 gap-2"
                >
                  {mainPosts?.map((m, i) => (
                    <div key={m?.id}>
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
                    <div className="text-center text-violet-600">
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
      {postLoading && <div className="" ref={setTarget}>loading</div>
      }
    </>
  );
};

export default index;