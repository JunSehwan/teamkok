import React, { useCallback } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import companypic from 'public/image/company.png';
import { useRouter } from 'next/router';
import { sideClose } from 'slices/board';
import AddSection from './AddSection';
import Footer from './Footer';
import styled from 'styled-components';

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query;
  const { singleBoard, sidebarIn } = useSelector(state => state.board);
  const onClickCategory = useCallback((category) => {
    router.push(`/board/${singleBoard?.id}/${category}`);
    dispatch(sideClose());

  }, [router, singleBoard,dispatch])
  const onClickHome = useCallback(() => {
    router.push(`/board/${singleBoard?.id}`);
    dispatch(sideClose());
  }, [router,singleBoard, dispatch])
  const sideBarClose = useCallback(() => {
    dispatch(sideClose());
  }, [dispatch])

  return (<>
    {sidebarIn === true ?

      <StyledContainer className="left-0 fixed overflow-y-scroll h-full z-8 shadow-md w-screen sm:w-[20rem] bg-gray-100 border-r px-6 pt-[12px] flex flex-col justify-between z-10">
        <button
          className="mr-[-12px] flex justify-end text-gray-500 mb-[1.2rem] p-[0.57rem] rounded-xl w-[fit-content] ml-auto hover:text-gray-800 hover:bg-gray-200"
          onClick={sideBarClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </button>
        <div className="h-full mb-4 ">
          <div className="flex flex-col justify-center items-center mb-4">
            <h1 className="block font-bold text-md md:text-2xl text-center">
              {singleBoard?.name}
            </h1>
            <span className="text-md text-violet-600 textl-md dark:text-gray-300 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline pr-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>(참여자 {singleBoard?.favorites?.length || 0}명)</span>
            </span>
            <div className="flex flex-row items-center mt-1">
              <p className="text-base text-gray-400 text-center"> by {singleBoard?.creatorName}</p>
            </div>
          </div>
          <div id="profile" className="space-y-3 w-[100%] flex flex-col items-center">
            {singleBoard?.logo ?
              <ImageWrapper className=''>
                <Image
                  // width={62}
                  layout="fill"
                  // height={62}
                  src={singleBoard?.logo}
                  unoptimized
                  alt="CompanyLogo"
                  className="rounded-lg mx-auto autoimage lg:h-14 md:h-14 w-full object-cover object-center"
                />
              </ImageWrapper>
              :
              <ImageWrapper className=''>
                <Image
                  // width={62}
                  layout="fill"
                  // height={62}
                  unoptimized
                  src={companypic}
                  alt="CompanyLogo"
                  className="rounded-lg mx-auto autoimage lg:h-14 md:h-14 w-full object-cover object-center"
                />
              </ImageWrapper>}
          </div>

          <p className="text-base font-medium text-gray-500 mt-9 mb-4">서비스안내</p>

          {/* <!-- menu-item --> */}
          <button
            className={!pid?.category ? "pl-[6px] w-[100%] my-2 py-2 text-lg font-semibold text-violet-600 bg-violet-200 rounded-xl hover:text-violet-700 group cursor-pointer flex items-center"
              : "pl-[6px] w-[100%] my-1 py-2 text-lg font-semibold text-slate-600 hover:text-violet-500 group cursor-pointer flex items-center"
            }
            onClick={onClickHome}
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-5 stroke-slate-500 mr-2 group-hover:stroke-violet-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            홈
          </button>

          <p className="text-base font-medium text-gray-500 mt-9 mb-4">분야별 섹션</p>
          {singleBoard?.category?.map((v) => (
            <button
              key={v?.key}
              type="button"
              onClick={() => onClickCategory(v?.key)}
              className=
              {parseInt(pid?.category) === parseInt(v?.key) ? "pl-[6px] w-[100%] my-2 py-2 text-lg font-semibold text-violet-600 bg-violet-200 rounded-xl hover:text-violet-700 group cursor-pointer flex items-center"
                : "pl-[6px] w-[100%] my-2 py-2 text-lg font-semibold text-slate-600 hover:text-violet-500 group cursor-pointer flex items-center"
              }
            >
              {v?.name}
            </button>
          ))}
          <AddSection />
          <Footer />
        </div>

      </StyledContainer>
      : null}

  </>
  );
};


const ImageWrapper = styled.div`
  width: 80%;
  justify-content: center;
  margin: 0 auto;
  height: 121.39px;
  padding:12px;
  & > span {
    position: unset !important;
    & .autoimage {
      object-fit: contain !important;
      position: relative !important;
      height: 121.39px !important;
    }
  }
`

const StyledContainer = styled.aside`
 ::-webkit-scrollbar {
    width: 12px;
    /* display:none; */
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.16);
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`

export default index;