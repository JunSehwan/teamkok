/* eslint-disable react-hooks/exhaustive-deps */
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
import Image from "next/image";
import Expert from '/public/image/icon/expertise.png';

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


  const onVideoPress = useCallback(() => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  }, [playing])

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


  const onSingleTap = useCallback(() => {
    onVideoPress()
  }, [onVideoPress])

  var DELTA_TIME_THRESHOLD_MS = 700;
  var timer = null;
  var target;

  const tap = useCallback((
    e,
    { onSingleTap, handleChangeDetailsPage }
  ) => {

    if (timer == null) {
      // First tap
      onSingleTap?.();
      timer = setTimeout(() => {
        timer = null;
      }, DELTA_TIME_THRESHOLD_MS);
    } else {
      // Second tap
      if (e.target === target) {
        handleChangeDetailsPage?.();
      }

      clearTimeout(timer);
      timer = null;
    }
    target = e.target;
  }, [])

  const isTeamMember = user && user?.mycompany && user?.userID !== friend?.userID && (user?.purpose === 1 || user?.purpose === 5)
  const isNormalMember = user && (user?.purpose !== 1 && user?.purpose !== 5)

  return (
    <div
      onClick={onVideoPress}
      onDoubleClick={handleChangeDetailsPage}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}

      // initial={{ opacity: 0 }}
      // whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-row mb-6 relative cursor-pointer"
    >
      {/* <TinderCard */}
      <div

        className=""
      // onSwipe={onSwipe}
      // flickOnSwipe={true}
      // onCardLeftScreen={onCardLeftScreen}
      >
        <div
          // onDoubleClick={handleChangeDetailsPage}
          className=""
          onClick={(e) => tap(e, { onSingleTap, handleChangeDetailsPage })}
        >
          <div
            className="w-[360px] min-w-[302px] overflow-hidden flex items-end gap-3 p-4 cursor-pointer font-semibold rounded-b-3xl z-1 
         text-white absolute bottom-0 left-0 right-0 bg-slate-600/40
        ">
            <div className="w-full">
              <div className="flex w-full justify-start gap-3 items-center mb-2 ">
                <div
                  className="w-14 h-14 rounded-2xl shadow-inner"
                >
                  <img
                    className="h-14 rounded-2xl w-14 object-cover"
                    src={friend?.avatar || profilePic?.src}
                    alt="user-profile"
                    layout="responsive"
                  />
                </div>
                {category[0] &&
                  <p className="px-2 ml-1 py-1 rounded-full bg-white/50 text-black/70 shadow text-sm">
                    {category[0]?.name}</p>}
              </div>
              <div>
                {/* 프로필 기본정보 */}
                <div className="flex items-end gap-2">
                  <div className="flex gap-1 items-center md:text-lg text-sm font-bold text-lime-100 flex-row">
                    {/* {isTeamMember ? friend?.username : friend?.username?.slice(0, 1) + "○○"} */}
                    <span>{friend?.username}</span>
                    {friend?.companycomplete && (
                      <Tooltip
                        placement="bottom"
                        className="w-max"
                        content="전문가인증"
                        trigger="hover"
                      >
                        <Image
                          alt="expert"
                          className="avatar rounded-md object-cover"
                          width={29} height={29}
                          unoptimized
                          src={Expert} />
                      </Tooltip>
                    )}
                    {friend?.category && friend?.skills?.length !== 0 && myCareer?.length !== 0 && myEducation?.length !== 0 ?
                      <Tooltip
                        placement="bottom"
                        className="w-max"
                        content="JOBCOC 인증"
                        trigger="hover">
                        <GoVerified className="text-blue-400 text-lg" />
                      </Tooltip>
                      : null}
                  </div>

                  {/* <p className="font-medium text-xs hidden md:block">
                    {friend?.email}
                  </p> */}
                </div>
                <div className="flex gap-2 mb-2 items-center">
                  {myAge !== null && <p className="font-normal text-sm">{myAge || "나이미상"}</p>}
                  <p className="font-normal text-sm">{friend?.address_sido || "거주지미등록"}</p>
                  {friend?.gender ?
                    (() => {
                      switch (friend?.gender) {
                        case "male": return (<span className="font-normal text-sm">남🙋‍♂️</span>)
                        case "female": return (<span className="font-normal text-sm">여🙋‍♀️</span>)
                        default: null;
                      }
                    })(friend?.gender) : <span className="font-normal text-sm">성별미등록</span>}
                </div>
                <div className="my-1.5 flex flex-wrap w-full gap-1">
                  {!!friend?.skills?.length !== 0 &&
                    <>
                      {friend?.skills?.slice(0, 4)?.map((v) => (
                        <span
                          className="px-2 py-1 rounded-full bg-gray-500/70 text-sm font-normal"
                          key={v?.id}>{v?.name}</span>
                      ))
                      }
                      {friend?.skills?.length > 5 && <span className="text-gray-500 text-sm">...</span>}
                    </>
                  }
                  {friend?.skills?.length === 0 &&
                    null}
                </div>



                <div className="text-yellow-200 font-normal text-sm md:text-[0.88rem]">
                  {myCareer ?
                    <div className="flex text-left">
                      <div>
                        <div className="flex flex-col">
                          <div>
                            <span
                              className="mr-1">{myCareer?.name}</span>
                            <span className="mr-1">{myCareer?.start?.year}~{myCareer?.end?.year == 9999 ? "현재" : myCareer?.end?.year}</span>
                            <span className="mr-1">(총 {friend?.careers?.length}개)</span>
                            {/* <p className="mr-1">{myCareer?.job}</p> */}
                          </div>
                        </div>

                      </div>
                    </div>
                    :
                    <>
                      <span className="text-gray-300/70">주경력 없음</span>
                      <span className="text-gray-300/70 ml-1">(총 {friend?.careers?.length}개)</span>
                    </>
                  }
                </div>

                <div className="text-yellow-200 font-normal text-sm md:text-[0.88rem]">
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
                            <span className="mr-1">(총 {friend?.educations?.length}개)</span>
                          </div>
                        </div>


                      </div>
                    </div>
                    :
                    <>
                      <span className="text-gray-300/70">주학력 없음</span>
                      <span className="text-gray-300/70 ml-1">(총 {friend?.educations?.length}개)</span>
                    </>
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
                  <div className=" flex flex-row gap-1">
                    {friend?.joboffered && friend?.joboffered?.length !== 0 ? friend?.joboffered?.slice(0, 3)?.map((v) => (
                      <Tooltip
                        key={nanoid()}
                        placement="bottom"
                        className="w-max"
                        content="제안받은 연봉"
                        trigger="hover">
                        <span className="px-3 w-full text-center flex bg-amber-600/80 py-1 rounded-xl">
                          <span
                            className="text-amber-100">💰{v?.salary}만원</span>
                        </span>
                      </Tooltip>
                    ))
                      : null
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

                <Container className="flex flex-row items-center justify-end w-full"
                  onDoubleClick={handleChangeDetailsPage}
                >

                  <TbHandClick
                    id="double"
                    className='w-5 h-5 text-sky-200/70' />
                  <span className="text-sky-200/70 text-xs ml-1">Double</ span>

                </Container>

              </div>
            </div>
          </div>
        </div>


        <div className="flex gap-4 relative z-[-1]">
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="rounded-3xl"
          >

            <div className="bg-black rounded-3xl shadow-2xl">
              {(friend?.cliptype == "video" && friend?.thumbvideo) || (!friend?.cliptype && friend?.thumbvideo) ||
                (friend?.thumbvideo && !friend?.thumbimage) ? (
                <>
                  <video
                    // onProgress={}
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
              ) : null}
              {(friend?.cliptype == "image" && friend?.thumbimage) ||
                (!friend?.cliptype && !friend?.thumbvideo && friend?.thumbimage) ? (
                <>
                  <img
                    onClick={(e) => tap(e, { onSingleTap, handleChangeDetailsPage })}
                    src={friend?.thumbimage[0] || backgroundPicture?.src}
                    className="w-[360px] min-w-[302px] h-[600px] rounded-3xl cursor-pointer object-cover opacity-90"
                  ></img>

                </>) : null}
              {!friend?.thumbvideo && !friend?.thumbimage && (
                <>
                  <div
                    onClick={(e) => tap(e, { onSingleTap, handleChangeDetailsPage })}
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
      </div>

      {/* 버튼 */}

      {isNormalMember &&
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="ml-3 flex-col flex justify-center absolute right-[16px] sm:right-0 sm:top-0 top-[200px] sm:relative z-[4]">
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
              content="상세보기"
              trigger="hover"
            >
              <div className="flex flex-col items-center justify-center">
                <button className="
                  rounded-full p-3 hover:bg-white bg-amber-300/30 border-solid border-amber-600 flex items-center justify-center "
                  onClick={handleChangeDetailsPage}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaFingerprint className="w-6 h-6 text-amber-600" />
                  </motion.div>
                </button>
                <span className="text-amber-200 text-xs">상세보기</span>
              </div>
            </Tooltip>
          </div>
        </motion.div>
      }

      {isTeamMember &&
        // {user?.userID !== friend?.userID &&
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="ml-3 flex-col flex justify-center absolute right-[16px] sm:right-0 sm:top-0 top-[76px] sm:relative">
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
                <span className="text-emerald-200 text-xs">입사제안</span>
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
              <div className="flex flex-col items-center justify-center">
                <button className="
                  rounded-full p-3 hover:bg-white bg-amber-300/30 border-solid border-amber-600 flex items-center justify-center "
                  onClick={handleChangeDetailsPage}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaFingerprint className="w-6 h-6 text-amber-600" />
                  </motion.div>
                </button>
                <span className="text-amber-200 text-xs">상세보기</span>
              </div>
            </Tooltip>
          </div>
        </motion.div>
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