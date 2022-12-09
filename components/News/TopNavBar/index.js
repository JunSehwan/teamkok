import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CategoryCapsule from '../Posts/CategoryCapsule';
import NoticeList from "components/Common/NoticeList";
import { categorySelect } from 'slices/sectionSettings';
import { nanoid } from 'nanoid'
import { motion } from "framer-motion";
import styled from "styled-components";
import { HiOutlineBookOpen } from "react-icons/hi";
import { MdUnfoldLess, MdUnfoldMore } from "react-icons/md";

const StyledContainer = styled.ul`
 ::-webkit-scrollbar {
    width: 14px;
    height: 10px;
    /* display:none; */
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(122,122,122);
    background: linear-gradient(180deg, rgba(122,122,122,1) 54%, rgba(166,166,166,1) 95%, rgba(255,255,255,0.5886729691876751) 100%);
    border-radius: 10px;
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


const index = ({ hide }) => {
  const dispatch = useDispatch();
  // 카테고리 검색
  const [category, setCategory] = useState(null);

  const onChangeCategory = useCallback((e) => {
    setCategory(e);
    dispatch(categorySelect(e));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch])


  const [wide, setWide] = useState(false);
  const toggleWide = useCallback(() => {
    setWide(prev => !prev);
  }, [])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`${hide && "hidden"} z-[5] transition-all w-full mt-[calc(var(--navbar-height)-3px)] fixed transition-[0.4s ease] top-0 left-0 block bg-gradient-to-t from-slate-50/60 to-slate-200/90 bg-opacity-90`}>
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
          <ul id="category" className={`${wide ? "flex-wrap" : "flex-nowrap"} flex flex-row w-[100%]`}>
            <li key="all" className="mr-[4px] border-gray-400 flex flex-row">
              <button onClick={() => onChangeCategory(null)}
                type='button'
                className={null === category ? `bg-blue-500 text-white text-center transition duration-500 shadow ease-in-out transform select-none cursor-pointer hover:bg-blue-600 click:active:checked:focus:bg-blue-600 dark:bg-gray-800 rounded-full flex flex-1 items-center p-1 h-fit mb-1`
                  : `text-center transition duration-500 shadow ease-in-out transform select-none cursor-pointer bg-white border-solid-0.5 border-gray-100 hover:bg-gray-600 click:active:checked:focus:bg-gray-700 dark:bg-gray-800 text-gray-700 hover:text-white rounded-full flex flex-1 items-center p-1 h-fit mb-1`
                }>
                <div className="flex-1 px-2 text-center ">
                  <div className="text-base leading-snug font-normal dark:text-white whitespace-nowrap">
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

        </StyledContainer>
      </div>
    </motion.div >
  );
};

export default index;