import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/Common/Modal/Modal';
import { AiFillStar } from 'react-icons/ai';
import styled from 'styled-components';
import { modifyJoboffer } from 'firebaseConfig';
import { addAdvice, addDetailAdvice } from 'slices/user';
import Image from 'next/image';
import profilePic from 'public/image/icon/happiness.png';
import dayjs from "dayjs";


const index = ({ jobofferCon, jobofferOn, openJoboffer, closeJoboffer }) => {

  let today = dayjs();
  let expired_at = dayjs(jobofferCon?.timestamp);
  let result = expired_at.diff(today, "month", true);
  let d_day = Math.floor(result);
  console.log(d_day)
  const dispatch = useDispatch();
  // 수정

  const { user } = useSelector(state => state.user);
  // const { addAdviceDone } = useSelector(state => state.user);
  const onYes = useCallback(() => {
    setYesConfirm(true);
  }, [])
  const onNo = useCallback(() => {
    setNoConfirm(true);
  }, [])
  // useEffect(() => {
  //   if (addAdviceDone || !adviceOn) {
  //     setDescriptionError(false);
  //     setRatingError(false);
  //     setRating(0);
  //     setDescription("");
  //     closeAdvice();
  //   }
  // }, [addAdviceDone, dispatch, closeAdvice, adviceOn])


  //직장명
  const [answer, setAnswer] = useState(0);
  const [answerError, setAnswerError] = useState(false);
  const onChangeAnswer = useCallback((e) => {
    setAnswer(e);
    setAnswerError(false);
  }, [])


  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }
    await modifyJoboffer("yes", offer?.id).then((result) => {
      dispatch(updateJoboffer(
        { id: offer?.id, answer: answer, read: true, readtime: result }
      ));
    })
    //   if (rating == '' || rating == 0) {
    //     document.getElementById('rating').focus();
    //     return setRatingError(true);
    //   }
    //   if (!description || description?.length === 0) {
    //     document.getElementById('description').focus();
    //     return setDescriptionError(true);
    //   }



  }, [user?.userID, dispatch, answer])


  return (
    <Modal
      open={openJoboffer}
      onClose={closeJoboffer}
      title={`입사제의 상세내용`}
      visible={jobofferOn}
      widths="1200px"
      onCancel={closeJoboffer}
      onSubmit={onSubmit}

    >
      <div className='p-3'>

        <h3 className='sm:text-[2.1rem] text-[1.8rem] text-gray-700 my-4 w-full'>
          {jobofferCon?.targetName} 님에게 보냅니다.</h3>
        <p className='ml-2 my-1 text-gray-700 text-[1.2rem] leading-6'>
          2일내에 답변을 기다리고 있습니다.
        </p>
        <p className='text-gray-500 text-md mt-2'></p>

        <form
          className="w-full pt-2 pb-2 mb-1 rounded mt-[1.4rem]"
          onSubmit={onSubmit}
        >
          <div className="mb-7">
            <div className='w-full flex flex-col items-center'>
              <div className='flex flex-row items-center gap-2'>
                <div className='w-[60px] h-[60px]'>
                  <ImageWrapper className='w-[60px] h-[60px]'>
                    <Image
                      className="object-cover rounded-[12px] mx-auto"
                      src={jobofferCon?.companylogo || jobofferCon?.userAvatar || profilePic}
                      // layout="fill"
                      width={60}
                      height={60}
                      unoptimized
                      alt="avatar">
                    </Image>
                  </ImageWrapper>
                </div>
                <div className='flex flex-col'>
                  <p className='text-lg font-bold'>{jobofferCon?.company}</p>
                  <p className='text-gray-500 text-sm'>{jobofferCon?.section}</p>
                  <p className='text-gray-500 text-sm'>{jobofferCon?.job}</p>
                </div>
              </div>
              <div className=''>
                <p className='text-sky-500 text-lg'>
                  {jobofferCon?.salary ? (Math.round(jobofferCon?.salary))?.toLocaleString() + "만원" : <span className="text-gray-300 text-2lg">아직 없어요..</span>}
                </p>

              </div>
            </div>

          </div>


          <div className="mb-2 text-right">
            <div className="flex w-full justify-end">
              <button type="submit" className=" px-8 min-w-[144px] text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg">의견등록</button>
            </div>
          </div>
        </form>
      </div>
    </Modal >
  );
};

const ImageWrapper = styled.div`
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
  jobofferCon: PropTypes.object,
  jobofferOn: PropTypes.bool,
  openJoboffer: PropTypes.func,
  closeJoboffer: PropTypes.func,
};


export default index;