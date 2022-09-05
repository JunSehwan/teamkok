import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Empty from 'components/Common/Empty';
import Loading from 'components/Common/Loading';
import Spin from 'components/Common/Spin';
import BoardCard from './BoardCard';
import CategoryList from 'components/Common/CategoryList';
import Category from './Category';
import usePagination from './usePagination';
import { loadAllBoards, setBoardSearchCategory, setSearchTerm } from 'slices/board';
const index = () => {
  const { boardSearchCategory, searchTerm } = useSelector(state => state.board);
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const INITIAL_FETCH_COUNT = 12;
  // const loadCount= 4;
  const [loadCount, setLoadCount] = useState(8);
  const { AllBoards } = useSelector((state) => state.board);
  const { loading } = useSelector(state => state.user);

  // 추후: 유저 카테고리를 category 기초값으로

  const { data: boards, boardLoading, loadingMore, loadMore, noMore,
  } = usePagination("boards", INITIAL_FETCH_COUNT, target, setTarget, loadCount);
  // .... 컨텐츠 (피드 목록) 생략
  const [category, setCategory] = useState(null);
  const onChangeCategory = useCallback((e) => {
    setCategory(e);
    dispatch(setSearchTerm(""))
  }, [dispatch])

  // const newCate = null;
  useEffect(() => {
    CategoryList?.map((v) => (
      v?.key === category &&
      setCategory({ key: category, name: v?.name })
    ))
    dispatch(setBoardSearchCategory(category));
  }, [category, dispatch]);

  useEffect(() => {
    if (searchTerm?.length === 0) {
      dispatch(loadAllBoards(boards));
    }
  }, [dispatch, boards, searchTerm?.length])

  return (
    <>
      {loading ? <Loading /> :
        <>
          <div className='w-full'>
            <ul id="category" className="flex flex-row flex-wrap w-[95%] sm:w-[90%] mt-12 mb-4 mx-auto">
              <li key="all" className="">
                <button onClick={() => onChangeCategory(null)}
                  type='button'
                  className={null === category ? `px-3 py-2 rounded-lg ml-1 bg-amber-50 text-amber-700 hover:bg-amber-500 hover:text-white mb-1 shadow`
                    : `px-3 py-2 rounded-lg ml-1 bg-amber-50 text-amber-600 hover:bg-amber-700 hover:text-white mb-1 shadow`
                  }>
                  <div className="flex-1 px-2 text-center ">
                    <div className="text-base leading-snug font-normal dark:text-white">
                      🔎전체보기
                    </div>

                  </div>
                </button>
              </li>
              {CategoryList?.map((v, i) => (
                <React.Fragment key={v?.key}>
                  <Category
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
          </div>

          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto w-[95%] sm:w-[95%]">
              <h2 className="w-full my-6">보드리스트</h2>
              {AllBoards?.length > 0 ? (
                <div className='w-full'>
                  <div
                    className="flex flex-wrap justify-left w-full"
                  >
                    {AllBoards?.map((m, i) => (
                      <div className="w-full sm:max-w-[22rem]" key={m?.id}>
                        <BoardCard
                          board={m}
                          index={i}
                        />
                      </div>
                    ))}
                  </div>
                  {!noMore &&
                    <div className="w-full flex justify-center mb-4 mt-12">
                      <button
                        className='px-[30%] py-3 rounded-xl bg-white border border-solid border-violet-300 text-violet-700 hover:translate-y-0.5 hover:shadow-none shadow'
                        onClick={() => loadMore()} type="button">더보기</button>
                    </div>
                  }
                  <div className="w-full h-12 my-16 flex justify-center items-center">
                    {noMore && (
                      <div className="text-center text-gray-600">
                        더이상 불러올 내용이 없어요.
                      </div>
                    )}
                  </div>
                </div>)
                :
                <div className="py-12 w-[100%]">
                  <Empty
                    title="아직 등록된 보드가 없습니다."
                  />
                </div>
              }

            </div>
          </section>
        </>}

      <div className="">
        {loadingMore && <Loading />}</div>
      {
        boardLoading && <div className="flex justify-center"><Spin /></div>
      }
    </>
  );
};

export default index;