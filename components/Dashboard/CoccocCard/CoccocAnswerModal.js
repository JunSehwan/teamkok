import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/Common/Modal/Modal';
import styled from 'styled-components';
import { modifyCoccoc } from 'firebaseConfig';
import { updateCoccoc } from 'slices/coccoc';
import Image from 'next/image';
import profilePic from 'public/image/icon/happiness.png';
import dayjs from 'dayjs';
import companyPic from 'public/image/company.png';
import LoadingPage from 'components/Common/Loading';
import { useRouter } from 'next/router';
import { addConversation } from 'slices/chat';
import { createConversation } from "firebaseConfig";

const index = ({ coccocCon, coccocOn, openCoccoc, closeCoccoc }) => {
  let calloutDay = dayjs(coccocCon?.timestamp).format('YYYY-MM-DD')
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const { updateCoccocDone } = useSelector(state => state.coccoc);
  useEffect(() => {
    if (updateCoccocDone && coccocOn) {
      closeCoccoc();
    }
  }, [dispatch, updateCoccocDone, closeCoccoc, coccocOn])


  const onYes = useCallback(async (e) => {
    e.preventDefault();
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }
    await modifyCoccoc(1, coccocCon?.id).then((result) => {
      dispatch(updateCoccoc(
        { id: coccocCon?.id, answer: 1, read: true, readtime: result }
      ));
    })
  }, [user?.userID, coccocCon?.id, dispatch])

  const onNo = useCallback(async (e) => {
    e.preventDefault();
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }
    await modifyCoccoc(1, coccocCon?.id).then((result) => {
      dispatch(updateCoccoc(
        { id: coccocCon?.id, answer: 2, read: true, readtime: result }
      ));
    })
  }, [user?.userID, coccocCon?.id, dispatch])

  const onLater = useCallback(async (e) => {
    e.preventDefault();
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }
    await modifyCoccoc(1, coccocCon?.id).then((result) => {
      dispatch(updateCoccoc(
        { id: coccocCon?.id, answer: 3, read: true, readtime: result }
      ));
    })
  }, [user?.userID, coccocCon?.id, dispatch])

  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const openDialog = useCallback(async () => {
    setIsCreating(true);

    const sorted = [coccocCon?.userId, user?.userID].sort();
    const result = await createConversation(sorted);

    if (result?.key !== "fail") {
      setIsCreating(false);
      dispatch(addConversation(result));
      router.push(`/message/${result?.id}`);
    } else {
      router.push(`/message/${result?.value}`);
      setIsCreating(false);
    }
  }, [dispatch, coccocCon?.userId, router, user?.userID])

  return (
    <Modal
      open={openCoccoc}
      onClose={closeCoccoc}
      title={`${coccocCon?.targetName}님에게 도착한 콕!콕!`}
      visible={coccocOn}
      widths="960px"
      onCancel={closeCoccoc}

    >
      {isCreating && (
        <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#000000af]">
          <LoadingPage />
        </div>
      )}
      <div className='p-3'>
        {coccocCon?.answer == 1 || coccocCon?.answer == 2 ?
          <h3 className='text-gray-400 text-[1.44rem] my-4 w-full'>
            {coccocCon?.answer == 1 && <span className='text-green-600'>수락함</span>}
            {coccocCon?.answer == 2 && <span className='text-gray-600'>거절함</span>}
          </h3>
          :
          <h3 className='sm:text-[2.0rem] text-[1.6rem] text-gray-700 my-4 w-full'>
            아직 답변을 하지 않았습니다.
          </h3>
        }
        <p className='text-gray-700 my-2 w-full'>
          제안받은 날: {calloutDay}
        </p>

        <div
          className="w-full pt-2 pb-2 mb-1 rounded mt-[.4rem]"
        >
          <div className="my-6">
            <div className='w-full flex flex-col'>
              <div className='flex flex-row items-center gap-3'>
                <div className='w-[72px] h-[72px]'>

                  {/* {diffDay}일
                  {diffHour}시간
                  {diffMin}분
                  {diffSec}초 */}
                  <ImageWrapper className='w-[72px] h-[72px]'>
                    <Image
                      className="object-cover rounded-[12px] mx-auto"
                      src={coccocCon?.companylogo || companyPic}
                      // layout="fill"
                      width={72}
                      height={72}
                      unoptimized
                      alt="avatar">
                    </Image>
                  </ImageWrapper>
                </div>
                <div className='flex flex-col'>
                  <h2 className='font-bold text-2xl'>{coccocCon?.company}</h2>
                </div>
              </div>

              <div className='flex flex-col gap-6 my-4 text-gray-700'>
                <p className='text-sky-600 text-xl'>
                  연봉: {coccocCon?.salary ? (Math.round(coccocCon?.salary))?.toLocaleString() + "만원" : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
                </p>
                <div>
                  <p className='label font-semibold'>근무부서</p>
                  <p className=''>{coccocCon?.section}</p>
                </div>
                <div>
                  <p className='label font-semibold'>주업무</p>
                  <p className=''>{coccocCon?.job}</p>
                </div>

                <div className='text-red-600'>
                  <p className='label font-semibold'>입사제안 예정일</p>
                  <p className=''>{coccocCon?.duedate?.year}년 {coccocCon?.duedate?.month}월</p>
                </div>
                <div>
                  <p className='label font-semibold'>채용유형</p>
                  {parseInt(coccocCon?.type) &&
                    <span>{(() => {
                      switch (parseInt(coccocCon?.type)) {
                        case 1: return (<span className="">정규직</span>)
                        case 2: return (<span className="">계약직</span>)
                        case 3: return (<span className="">자영업/개인사업</span>)
                        case 4: return (<span className="">프리랜서</span>)
                        case 5: return (<span className="">인턴/수습</span>)
                        case 6: return (<span className="">아르바이트</span>)
                        case 99: return (<span className="">기타</span>)
                        default: null;
                      }
                    })(parseInt(coccocCon?.type))}</span>}
                </div>
              </div>
              <p className='text-gray-600 whitespace-pre-wrap leading-normal font-normal overflow-hidden text-ellipsis'>
                {coccocCon?.description}</p>
              <div className='my-6 rounded-lg w-full flex flex-col items-end'>
                <h3 className='text-gray-900'>💌from</h3>
                <div className='w-full md:max-w-[320px] flex flex-col md:flex-row gap-5 items-center md:justify-end my-1 bg-white'>
                  <div>
                    <div className='w-[60px] h-[60px]'>
                      <ProfileWrapper className='w-[60px] h-[60px]'>
                        <Image
                          className="object-cover rounded-[12px] mx-auto"
                          src={coccocCon?.userAvatar || profilePic}
                          // layout="fill"
                          width={60}
                          height={60}
                          unoptimized
                          alt="avatar">
                        </Image>
                      </ProfileWrapper>
                    </div>
                  </div>
                  <div>
                    <div className='text-md flex flex-col gap-1 text-end'>
                      <div className='flex flex-row gap-2'>
                        <span className='text-gray-700'>{coccocCon?.mycompany}</span>
                        <span className='text-gray-700'>{coccocCon?.mysection}</span>
                      </div>
                      <span className='text-gray-700 font-bold'>{coccocCon?.username}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div >


        <div className="mb-10 text-right">
          {
            coccocCon?.answer == 1 || coccocCon?.answer == 2 ?
              <>
                <div className="flex w-full justify-end my-4">
                  <div className='text-gray-500'>답변을 완료하였습니다.</div>
                </div>
                <div className='flex flex-col md:flex-row w-full justify-end gap-2 items-center'>
                  <button
                    onClick={closeCoccoc}
                    type="button"
                    className="w-full px-6 min-w-[144px] text-md py-4 font-bold  text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:shadow-outline rounded-lg">
                    확인
                  </button>
                  <button
                    onClick={openDialog}
                    type="button"
                    className="w-full px-6 min-w-[144px] text-md py-4 font-bold  text-white bg-gray-900 hover:bg-black focus:outline-none focus:shadow-outline rounded-lg">
                    대화하기
                  </button>
                </div>
              </>
              :
              <>
                <div className="flex flex-col md:flex-row w-full justify-end gap-2 items-center">
                <button
                  onClick={openDialog}
                  type="button"
                  className="w-full md:max-w-[250px] px-6 min-w-[144px] text-md py-4 font-bold  text-white bg-gray-900 hover:bg-black focus:outline-none focus:shadow-outline rounded-lg">
                  대화하기
                </button>
                  <button
                    onClick={onLater}
                    type="button"
                    className="w-full md:max-w-[250px] px-6 min-w-[144px] text-md py-4 font-bold text-gray-600 bg-white hover:bg-gray-100 focus:outline-none focus:shadow-outline rounded-lg border-gray-300 border-solid border-0.5">
                    나중에
                  </button>
                  <button
                    onClick={onNo}
                    type="button"
                    className="w-full md:max-w-[250px] px-6 min-w-[144px] text-md py-4 font-bold text-gray-600 bg-white hover:bg-gray-100 focus:outline-none focus:shadow-outline rounded-lg border-gray-300 border-solid border-0.5">
                    거절합니다.
                  </button>
                  <button
                    onClick={onYes}
                    type="button"
                    className="w-full md:max-w-[250px] px-6 min-w-[144px] text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg">
                    좋습니다!
                  </button>

                </div>
              </>
          }
        </div>
      </div>
    </Modal >
  );
};

const ImageWrapper = styled.div`
width: 100%;
border-radius: 8px;
justify-content: center;
margin: 0 auto;
min-height: 72px;
position: relative;

& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 72px !important;
  }
}
`
const ProfileWrapper = styled.div`
width: 100%;
border-radius: 8px;
justify-content: center;
margin: 0 auto;
min-height: 60px;
position: relative;

& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 60px !important;
  }
}
`

index.propTypes = {
  coccocCon: PropTypes.object,
  coccocOn: PropTypes.bool,
  openCoccoc: PropTypes.func,
  closeCoccoc: PropTypes.func,
};


export default index;