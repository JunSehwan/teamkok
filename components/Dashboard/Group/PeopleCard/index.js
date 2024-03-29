import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { AiFillStar, AiFillWechat } from 'react-icons/ai';
import profilePic from 'public/image/icon/happiness.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getOtherUser, createConversation } from 'firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addConversation } from 'slices/chat';
import { FaUserCircle } from 'react-icons/fa';
const ImageWrapper = styled.div`
width: 100%;
border-radius: 8px;
justify-content: center;
margin: 0 auto;
min-height: 48px;
position: relative;

& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 48px !important;
  }
}
`

const index = ({ friend }) => {
  const router = useRouter();
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const goProfile = useCallback(() => {
    router.push({
      pathname: `/friends/detail/${friend?.targetId}`,
    });
  }, [friend?.targetId, router])
  const goDialog = useCallback(async () => {

    const sorted = [friend?.targetId, user?.userID].sort();
    const result = await createConversation(sorted);
    if (result?.key !== "fail") {
      dispatch(addConversation(result));
      router.push(`/message/${result?.id}`);
    } else {
      router.push(`/message/${result?.value}`);
    }
  }, [dispatch, friend?.targetId, router, user?.userID])

  const [myUser, setMyUser] = useState();
  useEffect(() => {
    async function fetchAndSetUser() {
      const result = await getOtherUser(friend?.targetId).then((result) => {
        setMyUser(result);
      })
    }
    fetchAndSetUser();
  }, [dispatch, friend?.targetId]);

  const formatPhoneNumber = (input) => {
    const cleanInput = input?.replaceAll(/[^0-9]/g, "");
    let result = "";
    const length = cleanInput?.length;
    if (length === 8) {
      result = cleanInput?.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else if (cleanInput?.startsWith("02") && (length === 9 || length === 10)) {
      result = cleanInput?.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3');
    } else if (!cleanInput?.startsWith("02") && (length === 10 || length === 11)) {
      result = cleanInput?.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
    } else {
      result = undefined;
    }
    return result;
  }

  return (
    <>
      <div
        className="w-full rounded-lg bg-white shadow-md hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-slate-50"
      >
        <div
          className='p-4 flex flex-col gap-2 w-full text-left'
        >
          <div className='w-full flex justify-between items-center'>
            <div className='flex flex-row items-center gap-2'>
              <div className='w-[48px] h-[48px]'>

                <ImageWrapper className='w-[48px] h-[48px]'>
                  <Image
                    className="object-cover rounded-[12px] mx-auto"
                    src={friend?.targetAvatar || profilePic}
                    // layout="fill"
                    width={48}
                    height={48}
                    unoptimized
                    alt="avatar">
                  </Image>
                </ImageWrapper>
              </div>
              <div className='flex flex-col'>
                <>
                  <p className='text-lg font-bold'>{friend?.targetName}</p>
                  <p className='text-gray-500 text-sm'>{myUser?.email_using ? myUser?.email_using : myUser?.email}</p>
                  <p className='text-gray-500 text-sm'>{formatPhoneNumber(myUser?.phonenumber)}</p>
                  <div className='flex md:flex-row flex-col md:items-center'>
                    <p className='text-gray-500 text-sm'>{friend?.section}</p>
                    <p className='text-gray-500 text-sm'>{Math.round(friend?.salary)?.toLocaleString()}만원</p>
                  </div>
                </>
              </div>
            </div>
            <div>
              <div className='flex flex-row gap-2 items-center'>
                <button onClick={goProfile} className='flex hover:bg-slate-100 flex-col items-center justify-center rounded-xl bg-slate-50 p-2 shadow-inner'>
                  <FaUserCircle className='h-7 w-7 text-gray-500' />
                  <span className='text-sm text-gray-600 hidden md:inline'>상세보기</span>
                </button>
                <button onClick={goDialog} className='flex hover:bg-slate-100 flex-col items-center justify-center rounded-xl bg-slate-50 p-2 shadow-inner'>
                  <AiFillWechat className='h-7 w-7 text-gray-500' />
                  <span className='text-sm text-gray-600 hidden md:inline'>대화하기</span>
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

index.propTypes = {
  friend: PropTypes.object,
};



export default index;