/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { GoVerified } from "react-icons/go";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Router, { useRouter } from "next/router";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import profilePic from '/public/image/icon/happiness.png';
import backgroundPicture from '/public/image/backgroundPicture.png';
import { BsFillHeartFill, BsHeart, BsStarFill } from 'react-icons/bs';
import { AiOutlineDingtalk } from 'react-icons/ai';
import { MdDoNotTouch } from 'react-icons/md';
import { FaFingerprint, FaRegHandPointUp, } from 'react-icons/fa';
import { Tooltip } from "flowbite-react";
import dynamic from "next/dynamic";
import Advice from './Advice';
import Coccoc from './Coccoc';
import Joboffer from './Joboffer';
import CategoryList from 'components/Common/CategoryList';
import { TbHandClick, TbListDetails } from "react-icons/tb";
import { nanoid } from 'nanoid'
import { setScrollPosition } from 'slices/user';
import styled, { keyframes } from 'styled-components';
import Like from './Like';

const TinderCard = dynamic(
  () => {
    return import("react-tinder-card");
  },
  { ssr: false }
);

const animate = keyframes`
 from {
    transform: translateX(0) rotate(0);
    opacity: 1;
  }
  to {
    transform: translateX(-50%) rotate(-45deg);
    opacity: 0;
  }
`
const scale = keyframes`
 from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
`
const Container = styled.div`
  #double {
    animation: ${scale} 1s infinite ease-in-out;
  }
  #slide {
    animation: ${animate} 2s infinite ease-in-out;
    }

@-ms-keyframes spin {
  from {
    -ms-transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(-45deg);
  }
}

@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(-45deg);
  }
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-45deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-45deg);
  }
}
`

const FriendCard = ({ friend, show, setShow }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(state => state.user);

  const [playing, setPlaying] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef(null);

  // const onSwipe = (direction) => {
  //   // if (direction === "right" || direction === "up") {
  //   //   onLike();
  //   //   console.log("like")
  //   // }
  //   // if (direction === "left" || direction === "bottom") {
  //   //   setShow(false);
  //   //   console.log("goaway")
  //   // }
  // }

  const onCardLeftScreen = () => {
    setShow(false);
  }
  const category = CategoryList?.filter(obj => obj?.key == friend?.category);

  let now = new Date();
  let nowYear = now.getFullYear();
  // 나이 구하기
  const myAge = (nowYear - parseInt(friend?.birthday?.year)) + 1;

  const [myCareer, setMyCareer] = useState();
  const [myEducation, setMyEducation] = useState();

  useEffect(() => {
    friend?.careers &&
      friend?.careers?.map((v) => (
        v?.ismain === true &&
        setMyCareer(v)
      ))
  }, [friend?.careers])

  useEffect(() => {
    friend?.educations &&
      friend?.educations?.map((v) => (
        v?.ismain === true &&
        setMyEducation(v)
      ))
  }, [friend?.educations])


  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };
  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);




  const [adviceOn, setAdviceOn] = useState(false);
  const openAdvice = useCallback(() => {
    setAdviceOn(true);
  }, [])
  const closeAdvice = useCallback(() => {
    setAdviceOn(false);
  }, [])

  const [coccocOn, setCoccocOn] = useState(false);
  const openCoccoc = useCallback(() => {
    setCoccocOn(true);
  }, [])
  const closeCoccoc = useCallback(() => {
    setCoccocOn(false);
  }, [])

  const [jobofferOn, setJobofferOn] = useState(false);
  const openJoboffer = useCallback(() => {
    setJobofferOn(true);
  }, [])
  const closeJoboffer = useCallback(() => {
    setJobofferOn(false);
  }, [])


  const handleChangeDetailsPage = useCallback(() => {
    if (user) {
      sessionStorage.setItem("scrollKey", `${window.scrollY}`)
      const scroll = parseInt(sessionStorage.getItem("scrollKey"), 10)
      dispatch(setScrollPosition(scroll));
      router.push({
        pathname: `/friends/detail/${friend?.userID}`,
      });
    } else {
      router.push("/signin");
    }
  }, [dispatch, friend?.userID, router, user])


  return (
    <div
      
      // initial={{ opacity: 0 }}
      // whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-row mb-6 relative"
    >
      <TinderCard
        // onSwipe={onSwipe}
        // flickOnSwipe={true}
        onCardLeftScreen={onCardLeftScreen}>
        <div
          onDoubleClick={handleChangeDetailsPage}
          className=""


        >
          <div
            className="w-[360px] min-w-[302px] overflow-hidden flex items-end gap-3 p-4 cursor-pointer font-semibold rounded-b-3xl 
        absolute z-10 text-white bottom-0 left-0 right-0 bg-stone-300/20
        ">
            <div className="w-full">
              <div className="flex w-full justify-between items-center mb-2 ">
                <div
                  className="w-14 h-14 rounded-3xl shadow-inner"
                >
                  <img
                    className="h-14 rounded-3xl w-14 object-cover"
                    src={friend?.avatar || profilePic?.src}
                    alt="user-profile"
                    layout="responsive"
                  />
                </div>

              </div>
              <div>
                {/* 프로필 기본정보 */}
                <div className="flex items-end gap-2 mb-2">
                  <p className="flex gap-2 items-center md:text-xl text-lg font-bold text-primary text-yellow-100">
                    {friend?.username}
                    {friend?.category && friend?.skills?.length !== 0 && myCareer?.length !== 0 && myEducation?.length !== 0 ?
                      <GoVerified className="text-blue-400 text-md" /> : null}
                  </p>
                  {category[0] &&
                    <p className="px-2 ml-2 py-1.5 rounded-lg bg-white/80 text-black/70 shadow-inner text-md">
                      {category[0]?.name}</p>}
                  {/* <p className="font-medium text-xs hidden md:block">
                    {friend?.email}
                  </p> */}
                </div>
                <div className="flex gap-2 mb-2 items-center">
                  <p className="font-normal text-md">{myAge || "나이미상"}</p>

                  <p className="font-normal text-md">{friend?.address_sido || "거주지미등록"}</p>
                  {friend?.gender ?
                    (() => {
                      switch (friend?.gender) {
                        case "male": return (<span className="font-normal text-md">남🙋‍♂️</span>)
                        case "female": return (<span className="font-normal text-md">여🙋‍♀️</span>)
                        default: null;
                      }
                    })(friend?.gender) : <span className="font-normal text-md">성별미등록</span>}
                </div>
                <div className="my-1.5">
                  {!!friend?.skills?.length !== 0 &&
                    <>
                      {friend?.skills?.slice(0, 3)?.map((v) => (
                        <span
                          className="px-2 py-1 rounded-full bg-gray-500 text-[0.77rem] mr-1"
                          key={v?.id}>{v?.name}</span>
                      ))
                      }
                      {friend?.skills?.length > 4 && <span className="text-gray-500 text-sm">...</span>}
                    </>
                  }
                  {friend?.skills?.length === 0 &&
                    <span className="text-gray-300/70 font-normal md:text-[0.88rem]">보유스킬 없음</span>}
                </div>



                <div className="my-1.5 text-yellow-200 font-normal md:text-[0.88rem]">
                  {myCareer ?
                    <div className="flex text-left">
                      <div>
                        <div className="flex flex-col">
                          <div>
                            <span
                              className="mr-1">{myCareer?.name}</span>
                            <span className="mr-1">{myCareer?.job}</span>
                            <span className="mr-1">{myCareer?.start?.year}~{myCareer?.end?.year == 9999 ? "현재" : myCareer?.end?.year}</span>
                          </div>
                        </div>

                      </div>
                    </div>
                    : <span className="text-gray-300/70">보유경력 없음</span>
                  }
                </div>

                <div className="my-1.5 text-yellow-200 font-normal md:text-[0.88rem]">
                  {myEducation ?
                    <div className="flex text-left">
                      <div>
                        <div className="flex flex-col">
                          <div>
                            <span
                              className="mr-1"
                            >{myEducation?.name}</span>
                            <span className="mr-1">{myEducation?.major}</span>
                            <span className="mr-1">{myEducation?.start?.year}~{myEducation?.end?.year == 9999 ? "현재" : myEducation?.end?.year}</span>
                          </div>
                        </div>


                      </div>
                    </div>
                    : <span className="text-gray-300/70">보유학력 없음</span>
                  }
                </div>

                {friend?.additionalMent?.length > 70 ? (
                  <p className="my-1.5 font-normal md:text-[0.88rem] text-xs max-h-[16px] overflow-hidden text-ellipsis">
                    {friend?.additionalMent.slice(0, 100)}
                    {"..."}
                  </p>
                ) : (
                  <p className="my-1.5 font-normal md:text-[0.88rem] text-xs">{friend?.additionalMent}</p>
                )}

                <div className="my-2 text-white font-normal md:text-md text-sm">
                  <div className=" grid grid-cols-3 gap-0.5">
                    {friend?.joboffered && friend?.joboffered?.length !== 0 ? friend?.joboffered?.slice(0, 3)?.map((v) => (
                      <Tooltip
                        key={nanoid()}
                        placement="bottom"
                        className="w-max"
                        content="제안받은 연봉"
                        trigger="hover">
                        <span className="px-3 w-full text-center flex bg-yellow-500/50 p-1 rounded-xl">
                          <span
                            className="">💰 {v?.salary}만원</span>
                        </span>
                      </Tooltip>
                    ))
                      : <span className="text-gray-200/50">정보없음</span>
                    }
                  </div>
                </div>

                {/* <div className="my-1 w-full text-gray-400 font-normal md:text-md text-sm">
                  {friend?.coccoced?.length && friend?.coccoced?.length !== 0 ? friend?.coccoced?.map((v) => (
                    <div key={v?.id} className="flex text-left my-1 bg-gray-100 p-2 rounded-xl">
                      <div>
                        <div className="flex flex-col">
                          <div>
                            <div className="font-bold ">
                              <span
                                className="mr-1">{v?.salary}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                    : <span>연봉정보없음</span>
                  }
                </div> */}

                <Container className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-1 gap-4 py-2.5">
                    {friend?.thumbvideo && (
                      <>
                        {playing ? (
                          <img
                            className="w-5 h-5 animate-spin"
                            src="https://cdn2.iconfinder.com/data/icons/digital-and-internet-marketing-3-1/50/109-512.png"
                            alt="image"
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                            />
                          </svg>
                        )}

                        {/* <p className="font-semibold text-sm">{songName}</p> */}
                      </>
                    )}

                  </div>
                  <TbHandClick
                    id="double"
                    className='w-5 h-5 text-sky-200/60' />
                  <span className="text-sky-200/50 text-xs ml-1">Double</span>
                </Container>

              </div>
            </div>
          </div>
        </div>


        <div className="flex gap-4 relative">
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="rounded-3xl"
          >

            <div className="bg-black rounded-3xl shadow-2xl">
              {friend?.thumbvideo && (
                <>
                  <video
                    onClick={onVideoPress}
                    onPointerDown={onVideoPress}
                    autoPlay={false}
                    loop
                    muted={true}
                    controls={false}
                    ref={videoRef}
                    src={friend?.thumbvideo}
                    className="w-[360px] min-w-[302px] h-[600px] rounded-3xl cursor-pointer opacity-70"
                  ></video>


                  {/* 재생버튼, 음소거버튼 */}
                  {isHover && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="absolute top-0 cursor-pointer min-w-[302px] w-[360px]
                    p-3 left-0 flex justify-between flex-row 
                    bg-image-[linear-gradient(180deg,rgba(0,0,0,0.4),transparent)]
                    ">
                      {playing ? (
                        <button
                          className="rounded-full p-2 hover:bg-gray-500"
                          onClick={onVideoPress}>
                          <BsFillPauseFill className="text-white text-xl lg:text-2xl" />
                        </button>
                      ) : (
                        <button
                          className="rounded-full p-2 hover:bg-gray-500"
                          onClick={onVideoPress}>
                          <BsFillPlayFill className="text-white text-xl lg:text-2xl" />
                        </button>
                      )}
                      {isVideoMuted ? (
                        <button
                          className="rounded-full p-2 hover:bg-gray-500"
                          onClick={() => setIsVideoMuted(false)}>
                          <HiVolumeOff className="text-white text-xl lg:text-2xl" />
                        </button>
                      ) : (
                        <button
                          className="rounded-full p-2 hover:bg-gray-500"
                          onClick={() => setIsVideoMuted(true)}>
                          <HiVolumeUp className="text-white text-xl lg:text-2xl" />
                        </button>
                      )}
                    </motion.div>
                  )}
                </>
              )}
              {!friend?.thumbvideo && friend?.thumbimage && (
                <>
                  <img
                    src={friend?.thumbimage[0]?.src || backgroundPicture?.src}
                    className="w-[360px] min-w-[302px] h-[600px] rounded-3xl cursor-pointer object-cover opacity-90"
                  ></img>

                </>)}
              {!friend?.thumbvideo && !friend?.thumbimage && (
                <>
                  <div
                    className="bg-gradient-to-r from-gray-600 to-gray-800 w-[360px] blur-[1.32px] shadow-2xl text-white/50 min-w-[302px] h-[600px] rounded-3xl object-cover text-center flex items-center justify-center"
                  >
                    <span className="">No Image</span>

                  </div>
                  {/* <img
                    src={backgroundPicture?.src || ""}
                    className="w-[360px] blur-sm min-w-[302px] h-[600px] rounded-3xl cursor-pointer object-cover opacity-80"
                  ></img> */}

                </>)}
            </div>

          </div>


        </div>
      </TinderCard>

      {/* 버튼 */}
      {user && user?.mycompany && friend?.userID !== user?.userID &&
        <div className="ml-3 flex-col flex justify-center absolute right-[16px] sm:right-0 sm:top-0 top-[76px] sm:relative">
          <div className="flex flex-col items-center justify-center gap-3">
            <Tooltip
              placement="left"
              className="w-max"
              content="관심없음"
              trigger="hover"
            >
              <button className="
                  rounded-full p-3 hover:bg-white bg-gray-300/60 border-solid border-gray-600 flex items-center justify-center"
                onClick={onCardLeftScreen}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MdDoNotTouch className="w-6 h-6 text-gray-600" />
                </motion.div>
              </button>
            </Tooltip>

            <Like 
            friend={friend}
            />

            <Tooltip
              placement="left"
              className="w-max"
              content="조언해주기!"
              trigger="hover"
            >
              <button className="
                  rounded-full p-3 hover:bg-white bg-blue-300/60 border-solid border-blue-600 flex items-center justify-center"
                onClick={openAdvice}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AiOutlineDingtalk className="w-6 h-6 text-blue-600" />
                </motion.div>
              </button>
            </Tooltip>
            <Advice
              adviceOn={adviceOn}
              openAdvice={openAdvice}
              closeAdvice={closeAdvice}
              friendname={friend?.username}
              friend={friend}
              detail={false}
            />
            <Tooltip
              placement="left"
              className="w-max"
              content="콕! 찍어두기"
              trigger="hover"
            >
              <button className="
                  rounded-full p-3 hover:bg-white bg-purple-300/60 border-solid border-purple-600 flex items-center justify-center"
                onClick={openCoccoc}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaRegHandPointUp className="w-6 h-6 text-purple-600" />
                </motion.div>
              </button>
            </Tooltip>
            <Coccoc
              coccocOn={coccocOn}
              openCoccoc={openCoccoc}
              closeCoccoc={closeCoccoc}
              friendname={friend?.username}
              friend={friend}
              detail={false}
            />
            <Tooltip
              placement="left"
              className="w-max"
              content="입사 제안하기"
              trigger="hover"
            >
              <div className="flex flex-col items-center justify-center">
                <button className="
                  rounded-full p-3 hover:bg-white bg-emerald-200/90 border-solid border-emerald-600"
                  onClick={openJoboffer}
                >
                  <motion.div
                    className=" flex items-center justify-center flex-row text-emerald-800"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <BsStarFill className="w-6 h-6 " />
                  </motion.div>
                </button>
                <span className="text-emerald-700 text-xs">입사제안</span>
              </div>
            </Tooltip>
            <Joboffer
              jobofferOn={jobofferOn}
              openJoboffer={openJoboffer}
              closeJoboffer={closeJoboffer}
              friendname={friend?.username}
              friend={friend}
              detail={false}
            />
            <Tooltip
              placement="left"
              className="w-max"
              content="상세보기"
              trigger="hover"
            >
              <button className="
                  rounded-full p-3 hover:bg-white bg-amber-300/60 border-solid border-amber-600 flex items-center justify-center"
                onClick={handleChangeDetailsPage}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFingerprint className="w-6 h-6 text-amber-600" />
                </motion.div>
              </button>
            </Tooltip>
          </div>
        </div>
      }
    </div>
  );
};

FriendCard.propTypes = {
  friend: PropTypes.object,
  setShow: PropTypes.func,
  show: PropTypes.bool,
}


export default FriendCard;