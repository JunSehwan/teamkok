import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { updateCategory } from 'firebaseConfig';
import { patchCategory, patchCategoryFalse } from 'slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from 'react-icons/io';
import CategorySmallBox from 'components/Common/CategorySmallBox';
import CategoryList from 'components/Common/CategoryList';
import toast from 'react-hot-toast';
import ProgressBar from '../LeftBar/ProgressBar';
import styled from 'styled-components';
import Image from 'next/image';
import profilePic from 'public/image/icon/happiness.png';
import { updatePurpose } from 'firebaseConfig';
import { updateUserPurpose, updatePurposeFalse } from 'slices/user';


const ImageWrapper = styled.div`
width: 100%;
border-radius: 8px;
justify-content: center;
margin: 0 auto;
min-height: 62px;
position: relative;

& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 62px !important;
  }
}
`

const index = () => {
  const dispatch = useDispatch();
  const onClickPurpose = useCallback(async (v) => {
    const res = await updatePurpose(
      parseInt(v)
    );
    dispatch(updateUserPurpose(res));
    notify();
    dispatch(updatePurposeFalse());
  }, [dispatch])
  const notify = () => toast("업데이트 성공");

  //hook
  const updatenotify = () => toast('업데이트 완료!');
  const { user, patchCategoryDone } = useSelector(state => state.user);
  // const [purpose, setPurpose] = useState();


  useEffect(() => {
    setTimeout(() => {
      if (patchCategoryDone) {
        updatenotify();
        dispatch(patchCategoryFalse())
      }
    }, [500])
  }, [dispatch, patchCategoryDone])

  const [category, setCategory] = useState(user?.category);
  const onChange = useCallback((e) => () => {
    setCategory(parseInt(e))


  }, [])

  useEffect(() => {
    if (user?.category !== category) {
      document.getElementById('ending').focus();
    }
  }, [category, user?.category])

  const onSubmit = useCallback(async () => {
    const res = await updateCategory(category);
    dispatch(patchCategory(res));
  }, [category, dispatch])

  // autoFocus 관련
  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <>
      <div className='pt-[var(--navbar-height)] pb-[70px] md:pb-auto' >
        <div className='py-4'>
          <div className='mx-auto text-left'>

            <div className="md:hidden block overflow-y-auto py-4 rounded ">
              <div className='space-y-4 md:space-y-6 mt-6'>

                <div className='px-2 sm:px-4'>
                  <ProgressBar />
                </div>
                <div id="profile" className="space-y-3 flex flex-col w-[62px] h-[118px] mx-auto">
                  <div className='w-[62px] h-[62px]'>
                    <ImageWrapper className='w-[62px] h-[62px]'>
                      <Image
                        className="object-cover rounded-[12px] mx-auto"
                        src={user?.avatar || profilePic}
                        // layout="fill"
                        width={62}
                        height={62}
                        unoptimized
                        alt="avatar">
                      </Image>
                    </ImageWrapper>
                  </div>
                  <div>
                    <h2
                      className="font-medium text-md md:text-lg text-center text-[#1890FF]"
                    >
                      {user?.username}
                    </h2>
                    <p className="text-sm md:text-md text-gray-500 text-center">{(() => {
                      switch (parseInt(user?.purpose)) {
                        case 1: return (<span className="">기업담당자</span>)
                        case 2: return (<span className="">구직자</span>)
                        case 3: return (<span className="">학습생</span>)
                        case 4: return (<span className="">관찰자</span>)
                        default: null;
                      }
                    })(parseInt(user?.purpose))}</p>
                  </div>

                </div>
                {user?.purpose !== 1 &&
                  <div className='space-y-2 mx-2'>
                    <div className='font-semibold flex flex-row text-sm buttongroup bg-[#efeff2] rounded-xl p-[4px] text-gray-600 shadow-[inset 0px 2px 3px rgb(0 0 0 / 12%)]'>
                      <button
                        className={`w-full hover:bg-gray-200 hover:text-black py-2 ${user?.purpose == 2 ? "disable text-white font-bold bg-[#1890FF] shadow-md" : "visible"} rounded-lg `}
                        onClick={() => onClickPurpose(2)}>
                        <span>구직자</span>
                        <p className={`text-xs text-cyan-500 ${user?.purpose == 2 ? "text-cyan-100" : ""}`}>구직중</p>
                      </button>
                      <button
                        className={`w-full hover:bg-gray-200 hover:text-black py-2 ${user?.purpose == 3 ? "disable text-white font-bold bg-[#1890FF] shadow-md" : "visible"} rounded-lg `}
                        onClick={() => onClickPurpose(3)}>
                        <span>학습생</span>
                        <p className={`text-xs text-cyan-500 ${user?.purpose == 3 ? "text-cyan-100" : ""}`}>향후 구직예정</p>
                      </button>
                      <button
                        className={`w-full hover:bg-gray-200 hover:text-black py-2 ${user?.purpose == 4 ? "disable text-white font-bold bg-[#1890FF] shadow-md" : "visible"} rounded-lg `}
                        onClick={() => onClickPurpose(4)}>
                        <span>관찰자</span>
                        <p className={`text-xs text-red-500 ${user?.purpose == 4 ? "text-red-100" : ""}`}>프로필 비공개</p>
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>

            <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 mt-6 w-full pl-2'>
              관심있는 분야는?</h3>
            <p className='ml-2 mt-2 mb-5 text-gray-500 text-[1.2rem] leading-8'>관심분야의 인재들을 확인하거나 팀 소식을 더 신속하게 접할 수 있습니다.</p>
            <ul className="grid gap-1 w-full sm:grid-cols-2 md:grid-cols-3 ">

              {CategoryList?.map((v) => (
                <button key={v?.key} onClick={onChange(v?.key)}>
                  <CategorySmallBox
                    keyNumber={v?.key}
                    title={v?.name}
                  />
                </button>
              ))}
            </ul>
          </div>
        </div>
        {user?.category !== category &&
          <div
            className='flex justify-end my-4'>
            <button
              ref={inputElement}
              id="ending"
              onClick={onSubmit}
              type="button"
              className="w-full px-6 min-w-[144px] text-md py-4 font-bold md:max-w-[320px] text-white bg-gray-900 hover:bg-black focus:outline-none focus:shadow-outline rounded-lg">
              변경완료
            </button>
          </div>
        }
        <div className='w-full justify-center flex flex-col items-center px-2'>
          {/* <button className='my-2 w-full text-md py-4 font-bold text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:shadow-outline rounded-lg' onClick={onSubmit}>시작하기</button> */}
        </div>
      </div>
    </>
  );
};

export default index;