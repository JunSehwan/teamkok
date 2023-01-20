import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CategoryCapsule from './CategoryCapsule';
import CategoryList from "components/Common/CategoryList";
import { changeCategoryFilter, setScrollPosition, setUsers } from 'slices/user';
import { nanoid } from 'nanoid'
import { motion } from "framer-motion";
import styled from "styled-components";
import { HiOutlineBookOpen } from "react-icons/hi";
import { MdUnfoldLess, MdUnfoldMore } from "react-icons/md";
import { getCategoryUsers, getFriends } from 'firebaseConfig';

const Container = styled.div`
transition: 0.4s ease;
`

const StyledContainer = styled.ul`
 ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    /* display:none; */
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(122,122,122);
    background: linear-gradient(180deg, rgba(122,122,122,1) 54%, rgba(166,166,166,1) 95%, rgba(255,255,255,0.5886729691876751) 100%);
    border-radius: 10px ;
    background-clip: padding-box;
    border: 1px solid transparent;
    opacity: 0.4;
    cursor: pointer;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
    cursor: pointer;
  }
`
const throttle = function (callback, waitTime) {
  let timerId = null;
  return (e) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, e);
      timerId = null;
    }, waitTime);
  };
};

const index = () => {
  const dispatch = useDispatch();
  // 카테고리 검색
  const [category, setCategory] = useState(null);
  const { categoryFilter } = useSelector(state => state.user);
  const onChangeCategory = useCallback(async (e) => {
    dispatch(setScrollPosition(0));
    setCategory(e);
    setWide(false);
    dispatch(changeCategoryFilter(e));
    window.scrollTo({ top: 0, behavior: "smooth" });

  }, [dispatch])

  useEffect(() => {
    async function fetchAndSetUser() {
      if (categoryFilter) {
        const result = await getCategoryUsers(categoryFilter);
        dispatch(setUsers(result));
      }
      if (categoryFilter === null) {
        const result = await getFriends();
        dispatch(setUsers(result));
      }
    }
    fetchAndSetUser();
  }, [categoryFilter, dispatch, category]);

  // 펼치기 접기
  const [wide, setWide] = useState(false);
  const toggleWide = useCallback(() => {
    setWide(prev => !prev);
  }, [])

  // 스크롤 내리면 메뉴바 안보이게
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
    documentRef?.current?.addEventListener('scroll', throttleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => documentRef?.current?.removeEventListener('scroll', throttleScroll);
  }, [pageY, throttleScroll]);



  return (
    <Container
      className={`${hide && "hidden"} transition-all ease-in-out delay-150 w-full mt-[var(--navbar-height)] fixed transition-[0.4s ease] top-0 left-0 block bg-gradient-to-t from-stone-400/60 to-stone-300/90 bg-opacity-90 z-[5]`}>
      <div className="mx-auto w-full flex justify-center shadow border-b-1">

        <StyledContainer className='overflow-x-auto flex items-center pb-3 pt-4 relative mx-2 w-full'>
          {wide ?
            <button
              className="text-gray-700 text-center transition duration-500 ease-in-out transform select-none cursor-pointer dark:bg-gray-800 flex flex-1 items-center h-fit whitespace-nowrap p-1 text-base leading-snug px-2 mr-1 mb-1 gap-1 font-semibold"
              onClick={toggleWide}><MdUnfoldLess /><span>접기</span>
            </button>

            :
            <button
              className="text-gray-700 text-center transition duration-500 ease-in-out transform select-none cursor-pointer dark:bg-gray-800 flex flex-1 items-center h-fit whitespace-nowrap p-1 text-base leading-snug px-2 mr-1 mb-1 gap-1 font-semibold"
              onClick={toggleWide}><MdUnfoldMore /><span>펼치기</span>
            </button>
          }
          <div className="h-full border-solid border-r-1 border-gray-200 mx-2"></div>
          <ul id="category" className={`${wide ? "flex-wrap" : "flex-nowrap"} flex flex-row w-[100%]`}>
            <li key="all" className="mr-[4px] border-gray-400 flex flex-row">
              <button onClick={() => onChangeCategory(null)}
                type='button'
                className={null === category ? `bg-blue-500 text-white text-center transition duration-500 shadow ease-in-out transform select-none cursor-pointer hover:bg-blue-600 click:active:checked:focus:bg-blue-600 dark:bg-gray-800 rounded-full flex flex-1 items-center p-1 h-fit mb-1`
                  : `text-center transition duration-500 shadow ease-in-out transform select-none cursor-pointer bg-gray-200 border-solid-0.5 border-gray-100 hover:bg-gray-600 click:active:checked:focus:bg-gray-700 dark:bg-gray-800 text-gray-700 hover:text-white rounded-full flex flex-1 items-center p-1 h-fit mb-1`
                }>
                <div className="flex-1 px-2 text-center ">
                  <div className="text-base leading-snug font-normal dark:text-white whitespace-nowrap">
                    전체보기
                  </div>

                </div>
              </button>
            </li>
            {CategoryList?.map((v, i) => (
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

        </StyledContainer>
      </div>
    </Container >
  );
};

export default index;