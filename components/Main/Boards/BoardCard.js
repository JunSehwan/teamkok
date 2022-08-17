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
    router.push("/profile");
  }, [router])

  const [expertConfirm, setExpertConfirm] = useState(false);

  const onCancelExpert = useCallback(() => {
    setExpertConfirm(false);
  }, [])

  const onClickFavorite = useCallback(() => {
    if(!user){
      return alert("로그인이 필요합니다.");
    }
    if (!!noInformation) {
      return setNoInformations(true);
    }
    if (isMyCareer?.length !== 0) {
      return setExpertConfirm(true);
    }
    return setOpenConfirm(true);
  }, [isMyCareer, user,noInformation])

  const onOk = useCallback(async () => {
    // 보드정보에 참석자 정보 array 추가
    // 유저정보에 fav 보드정보 추가
    const result = await favoriteBoard(user?.userID, user?.username, board?.id, board?.name, board?.logo,);
    dispatch(updateFavoriteBoard(result));
    dispatch(updateUserFavorites(result));
    router.push(`/board/${board?.id}`)
    setOpenConfirm(false);
  }, [user?.userID, user?.username, board?.id, board?.name, board?.logo, dispatch, router])

  const onCancel = useCallback(() => {
    setOpenConfirm(false);
  }, [])

  const onOkExpert = useCallback(async () => {
    // 보드정보에 참석자 정보 array 추가
    // 유저정보에 fav 보드정보 추가
    const exResult = await exportBoard(user?.userID, user?.username, board?.id, board?.name, board?.logo);

    dispatch(updateExpertBoard(exResult))
    dispatch(updateUserExperts(exResult))
    router.push(`/board/${board?.id}`)
    setExpertConfirm(false);
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
      <div className="m-2 rounded-lg shadow hover:shadow-lg hover:-translate-x-1 hover:-translate-y-1 overflow-hidden text-ellipsis whitespace-nowrap">
        <div className="w-full">
          <div className="w-full h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            {/* <div className='lg:h-48 md:h-36 w-full'> */}
            {user && !isNaN(surveyResult) ?
              <span className='border-2 border-solid border-white shadow-inner absolute rounded-tl-lg rounded-b-sm overflow-hidden bg-gradient-to-r to-green-800 from-green-500 z-10  text-white px-2 py-1  text-sm dark:text-white font-medium'>🧬매칭: {surveyResult.toFixed(1)}%</span>
              :
              !user?.survey ?
                <Link href="/profile">
                  <a className='shadow-inner absolute rounded-tl-lg rounded-b-sm overflow-hidden bg-gray-100 z-10  text-gray-600 px-2 py-1  text-sm dark:text-white font-medium'>내스타일 등록</a>
                </Link>
                :
                null

            }
            <ImageWrapper className=''>
              {board?.logo ?
                <Image
                  className="autoimage lg:h-24 md:h-14 w-full object-cover object-center"
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
                  className="autoimage opacity-40 lg:h-24 md:h-14 w-full object-cover object-center"
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
            <div className="m-4">
              <h2 className="text-sm font-medium text-gray-400 uppercase overflow-hidden text-ellipsis whitespace-nowrap">
                {board?.creatorName}</h2>
              <h1 className="title-font text-lg font-bold text-gray-800overflow-hidden text-ellipsis whitespace-nowrap">
                {board?.name}</h1>
              <h3 className="text-sm font-light text-gray-400 mb-3 overflow-hidden text-ellipsis whitespace-nowrap">
                {dayjs(board?.createdAt).fromNow()}</h3>
              <StyledContainer className='flex flex-wrap mb-2 overflow-hidden text-ellipsis whitespace-nowrap h-16 overflow-y-auto'>
                {board?.category?.map((v) => (
                  <span
                    key={v?.name}
                    className="h-fit mb-1 px-2 py-1 rounded-md bg-gray-100 text-xs mr-1 flex items-center justify-center"
                  >{v?.name}</span>
                ))}
              </StyledContainer>
              <div className="flex items-center flex-nowrap flex-row  w-full">
                {!!myFavorite && myFavorite?.length !== 0 || myBoard || myExBoard && myExBoard?.length !== 0 ?
                  <button onClick={onClickGoBoard} className="py-2 hover:bg-slate-200 bg-slate-100 rounded-md pr-2 pl-2 mr-4 text-blue-800 w-full text-left md:mb-2 lg:mb-0">
                    <p className="inline-flex items-center">바로가기
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </p></button>
                  :
                  <button onClick={onClickFavorite} className="flex flex-row flex-nowrap py-2 pr-2 pl-2 text-center mr-4 text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600 w-full md:mb-2 lg:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="ml-1 inline-flex items-center">관심기업 등록
                    </p>
                  </button>
                }

                <span className="mr-2 text-right text-gray-500 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm py-1 border-r-2 border-gray-200">

                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <span className="text-lg ml-1">{board?.experts?.length + 1 || 1}</span>
                </span>

                <span className="text-right  text-gray-500 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm py-1 border-r-2 border-gray-200">
                  {!!myFavorite && myFavorite?.length !== 0 ||
                    !!myBoard  && myBoard?.length !== 0 ||
                  !!myExBoard && myExBoard?.length !== 0 ?
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                      <span className="text-lg text-blue-500 ml-1">{board?.favorites?.length || 0}</span>
                      </>
                    :
                    <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  <span className="text-lg ml-1">{board?.favorites?.length || 0}</span>
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
  width: 80%;
  justify-content: center;
  margin: 0 auto;
  height: 191.39px;
  padding:12px;
  & > span {
    position: unset !important;
    & .autoimage {
      object-fit: contain !important;
      position: relative !important;
      height: 191.39px !important;
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