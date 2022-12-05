import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import companyPic from 'public/image/company.png';
import styled from 'styled-components';
import FavoriteModal from './FavoriteModal';
import Loading from 'components/Common/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { favoriteBoard, exportBoard, getSection } from 'firebaseConfig';
import { useRouter } from 'next/router';
import { updateFavoriteBoard, updateExpertBoard } from 'slices/board';
import { updateUserFavorites, updateUserExperts } from 'slices/user';
import dayjs from 'dayjs';
import AlertModal from 'components/Common/Modal/AlertModal';
import SurveyMatching from 'components/Common/SurveyMatching';
import Link from 'next/link'
const BoardCard = ({ board }) => {
  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [openConfirm, setOpenConfirm] = useState(false);



  const onClickGoBoard = useCallback(() => {
    router.push(`/board/${board?.id}`)
  }, [board, router])

  const myFavorite = board?.favorites?.filter(it => it.userId?.includes(user?.userID));
  const myBoard = board?.creatorId === user?.userID;
  const myExBoard = board?.experts?.filter(it => it.userId?.includes(user?.userID));
  const { myCareers } = useSelector(state => state.career);
  const { myEducations } = useSelector(state => state.education);
  const [noInformations, setNoInformations] = useState(false);
  const noInformation =
    !user?.gender || !user?.avatar || !user?.phonenumber
  !user?.category || myCareers?.length === 0 || myEducations?.length === 0;
  // user가 경력, 스타일 작성했는지 확인
  // 일단 참여 불가 --> profile페이지로 이동
  // 안내창에 스타일까지 입력시 더 눈여겨 볼 확률 높아진다고 씀
  const isMyCareer = myCareers?.filter(it => it?.name == board?.name && it?.finish === false);
  // user가 현직자인지 확인
  // 다른 안내창을 띄우고 다른로직

  const onGoProfile = useCallback(() => {
    document.body.style.overflow = "unset";
    router.push("/profile");
  }, [router])

  const [expertConfirm, setExpertConfirm] = useState(false);

  const onCancelExpert = useCallback(() => {
    document.body.style.overflow = "unset";
    setExpertConfirm(false);
  }, [])

  const onClickFavorite = useCallback(() => {
    document.body.style.overflow = "hidden";
    if (!user) {
      return alert("로그인이 필요합니다.");
    }
    if (!!noInformation) {
      return setNoInformations(true);
    }
    if (isMyCareer?.length !== 0) {
      return setExpertConfirm(true);
    }
    return setOpenConfirm(true);
  }, [isMyCareer, user, noInformation])

  const onOk = useCallback(async () => {
    // 보드정보에 참석자 정보 array 추가
    // 유저정보에 fav 보드정보 추가
    const result = await favoriteBoard(user?.userID, user?.username, board?.id, board?.name, board?.logo,);
    dispatch(updateFavoriteBoard(result));
    dispatch(updateUserFavorites(result));
    router.push(`/board/${board?.id}`)
    setOpenConfirm(false);
    document.body.style.overflow = "unset";
  }, [user?.userID, user?.username, board?.id, board?.name, board?.logo, dispatch, router])

  const onCancel = useCallback(() => {
    setOpenConfirm(false);
    document.body.style.overflow =  "unset";
  }, [])

  const onOkExpert = useCallback(async () => {
    // 보드정보에 참석자 정보 array 추가
    // 유저정보에 fav 보드정보 추가
    const exResult = await exportBoard(user?.userID, user?.username, board?.id, board?.name, board?.logo);
    dispatch(updateExpertBoard(exResult))
    dispatch(updateUserExperts(exResult))
    router.push(`/board/${board?.id}`)
    setExpertConfirm(false);
    document.body.style.overflow = "unset";
  }, [board?.id, board?.logo, router, board?.name, dispatch, user?.userID, user?.username])

  const [data, setData] = useState();
  useEffect(() => {
    async function fetchAndSetUser() {
      setData([]);
      const result = await getSection(board?.id, user?.category);
      setData(result);
    }
    fetchAndSetUser();
  }, [board?.id, user?.category]);

  const surveyResult = SurveyMatching({
    users: user?.survey,
    sections: data?.survey,
  });

  return (
    <>
      <div className="m-2 rounded-lg shadow-lg overflow-hidden text-ellipsis whitespace-nowrap bg-white">
        <div className="w-full">
          <div className="w-full h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            {/* <div className='lg:h-48 md:h-36 w-full'> */}
            {user && !isNaN(surveyResult) ?
              <span className='border-2 border-solid border-white shadow-inner absolute rounded-tl-lg rounded-b-sm overflow-hidden bg-gradient-to-r to-green-800 from-green-500 z-[5]  text-white px-2 py-1  text-sm dark:text-white font-medium'>🧬매칭: {surveyResult.toFixed(1)}%</span>
              :
              !user?.survey && user ?
                <Link href="/profile" className="z-[5]">
                  <a className='shadow-inner absolute rounded-tl-lg rounded-b-sm overflow-hidden bg-slate-100 border-gray-300 border-1 text-gray-400 px-2 py-1 z-[5] text-xs dark:text-white font-medium'>내스타일 등록</a>
                </Link>
                :
                null

            }
            <ImageWrapper className=''>
              {board?.logo ?
                <Image
                  className="autoimage lg:h-18 md:h-10 w-full object-cover object-center z-0"
                  loader={() => <Loading />}
                  src={board?.logo}
                  // width={120}
                  // height={120}
                  layout="fill"
                  unoptimized
                  alt="BoardLogo picture"
                />
                :
                <Image
                  className="autoimage opacity-40 lg:h-18 md:h-10 w-full object-cover object-center"
                  loader={() => companyPic}
                  src={companyPic}
                  // width={120}
                  // height={120}
                  layout="fill"
                  unoptimized
                  alt="BoardLogo picture"
                />
              }
            </ImageWrapper>
            {/* </div> */}
            <div className="m-[12px]">
              <h2 className="text-xs font-medium text-gray-400 uppercase overflow-hidden text-ellipsis whitespace-nowrap">
                {board?.creatorName}</h2>
              <h1 className="title-font text-base font-semibold text-gray-800overflow-hidden text-ellipsis whitespace-nowrap">
                {board?.name}</h1>
              <h3 className="text-xs font-light text-gray-400 mb-3 overflow-hidden text-ellipsis whitespace-nowrap">
                {dayjs(board?.createdAt).fromNow()}</h3>
              <StyledContainer className='flex flex-wrap mb-2 overflow-hidden text-ellipsis whitespace-nowrap h-8 overflow-y-auto'>
                {board?.category?.map((v) => (
                  <span
                    key={v?.name}
                    className="h-fit mb-1 px-2 py-1 rounded-md bg-gray-100 text-xs mr-1 flex items-center justify-center"
                  >{v?.name}</span>
                ))}
              </StyledContainer>
              <div className="flex items-center flex-nowrap flex-row  w-full">
                {!!myFavorite && myFavorite?.length !== 0 || myBoard || myExBoard && myExBoard?.length !== 0 ?
                  <button onClick={onClickGoBoard} className="hover:bg-gray-700 bg-gray-500 rounded py-1.5 pr-1.5 pl-1.5 mr-2 text-white w-full font-semibold text-left md:mb-2 lg:mb-0">
                    <p className="inline-flex items-center text-[0.88rem] ">바로가기
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </p></button>
                  :
                  <button onClick={onClickFavorite} className="text-[0.88rem] flex flex-row flex-nowrap py-1.5 pr-1.5 pl-1.5 text-center mr-2 text-white font-semibold rounded bg-blue-500 hover:bg-blue-600 w-full md:mb-2 lg:mb-0 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M6 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H6zM15.75 3a3 3 0 00-3 3v2.25a3 3 0 003 3H18a3 3 0 003-3V6a3 3 0 00-3-3h-2.25zM6 12.75a3 3 0 00-3 3V18a3 3 0 003 3h2.25a3 3 0 003-3v-2.25a3 3 0 00-3-3H6zM17.625 13.5a.75.75 0 00-1.5 0v2.625H13.5a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0v-2.625h2.625a.75.75 0 000-1.5h-2.625V13.5z" />
                    </svg>
                    <p className="ml-1 inline-flex items-center">관심기업 등록
                    </p>
                  </button>
                }

                <span className="mr-2 text-right text-gray-500 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm py-1 border-r-2 border-gray-200">

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z" clipRule="evenodd" />
                  </svg>

                  <span className="text-md ml-0.5">{board?.experts?.length + 1 || 1}</span>
                </span>

                <span className="text-right  text-gray-500 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm py-1 border-r-2 border-gray-200">
                  {!!myFavorite && myFavorite?.length !== 0 ||
                    !!myBoard && myBoard?.length !== 0 ||
                    !!myExBoard && myExBoard?.length !== 0 ?
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                      </svg>


                      <span className="text-md text-blue-500 ml-0.5 font-semibold">{board?.favorites?.length || 0}</span>
                    </>
                    :
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                      </svg>


                      <span className="text-md ml-0.5">{board?.favorites?.length || 0}</span>
                    </>
                  }
                </span>
              </div>


            </div>
          </div>
        </div>
      </div>
      {openConfirm &&
        <FavoriteModal
          title="관심기업으로 등록하시겠습니까?"
          contents="관심기업으로 등록시 아래의 혜택을 받을 수 있습니다."
          closeOutsideClick={true}
          openModal={openConfirm}
          closeModal={onOk}
          cancelFunc={onCancel}
          twobutton={true}
        />
      }
      {noInformations &&
        <AlertModal
          title="내 정보 등록 필요"
          contents_second="금방 작성하실 수 있습니다!😊"
          contents={`기본정보(프로필사진 포함)와 학력/경력정보 등록 후, 참여가 가능합니다.`}
          closeOutsideClick={true}
          openModal={noInformations}
          closeModal={onGoProfile}
          twobutton={false}
        />
      }
      {expertConfirm &&
        <FavoriteModal
          title="현업 전문가로서 등록하시겠습니까?"
          contents="본인의 카테고리 분야에 대한 섹션관리 권한을 가질 수 있습니다."
          closeOutsideClick={true}
          openModal={expertConfirm}
          closeModal={onOkExpert}
          cancelFunc={onCancelExpert}
          twobutton={true}
        />
      }
    </>
  );
};


const ImageWrapper = styled.div`
  width: 50%;
  justify-content: center;
  margin: 0 auto;
  height: 141.39px;
  padding:12px;
  & > span {
    position: unset !important;
    & .autoimage {
      object-fit: contain !important;
      position: relative !important;
      height: 141.39px !important;
    }
  }
`

const StyledContainer = styled.div`

 ::-webkit-scrollbar {
    width: 12px;
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

BoardCard.propTypes = {
  board: PropTypes.object,
};

export default BoardCard;