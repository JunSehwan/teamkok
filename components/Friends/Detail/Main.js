/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import { nanoid } from 'nanoid'
import {  BsFillPlayFill,} from "react-icons/bs";
import styled from "styled-components";
import { GoVerified } from "react-icons/go";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineDingtalk } from "react-icons/ai";
import { FaRegHandPointUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import profilePic from '/public/image/icon/happiness.png';
import backgroundPicture from '/public/image/backgroundPicture.jpg';
import { BsFillHeartFill, BsHeart, BsStarFill } from 'react-icons/bs';
import { likeUser, unlikeUser } from 'firebaseConfig';
import { likeToDetailUser, unlikeToDetailUser } from 'slices/user';
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import CategoryList from 'components/Common/CategoryList';
import Joboffer from '../Main/Friend/Joboffer'
import Coccoc from '../Main/Friend/Coccoc'
import Advice from '../Main/Friend/Advice'
import StyleModal from "./StyleModal";
import { addAdviceDoneFalse } from 'slices/user';
import { addJobofferDoneFalse } from 'slices/joboffer';
import { addCoccocDoneFalse } from 'slices/coccoc';
import Slider from './Slider';
import { FcPlus } from "react-icons/fc";

const Main = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { myCareers } = useSelector(state => state.career);
  const { myEducations } = useSelector(state => state.education);
  const { mySkills } = useSelector(state => state.skill);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef(null);
  const { user, friend } = useSelector(state => state.user);
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const category = CategoryList?.filter(obj => obj.key == parseInt(friend?.category));
  const { addAdviceDone } = useSelector(state => state.user);
  const { addJobofferDone, mainJoboffered } = useSelector(state => state.joboffer);
  const { addCoccocDone, mainCoccoced } = useSelector(state => state.coccoc);

  const adviceNotify = () => toast('조언해주기 성공!😍');
  const coccocNotify = () => toast('콕!하기 성공!😍');
  const jobofferNotify = () => toast('입사제안하기 성공!😍');

  useEffect(() => {
    if (addAdviceDone) {
      adviceNotify();
      dispatch(addAdviceDoneFalse());

    }
  }, [addAdviceDone, dispatch])

  useEffect(() => {
    if (addCoccocDone) {
      coccocNotify();
      dispatch(addCoccocDoneFalse());

    }
  }, [addCoccocDone, dispatch]
  )

  useEffect(() => {
    if (addJobofferDone) {
      jobofferNotify();
      dispatch(addJobofferDoneFalse());

    }
  }, [addJobofferDone, dispatch]
  )

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = (e) => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(e.target.baseURI)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let now = new Date();
  let nowYear = now.getFullYear();
  // 나이 구하기
  const myAge = (nowYear - parseInt(friend?.birthday?.year)) + 1;

  const [myCareer, setMyCareer] = useState();
  const [myEducation, setMyEducation] = useState();

  useEffect(() => {
    myCareers &&
      myCareers?.map((v) => (
        v?.ismain === true &&
        setMyCareer(v)
      ))
  }, [myCareers])

  useEffect(() => {
    myEducations &&
      myEducations?.map((v) => (
        v?.ismain === true &&
        setMyEducation(v)
      ))
  }, [myEducations])

  const onLike = useCallback(async () => {
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }
    const likeResult = await likeUser(friend?.userID, friend?.username, friend?.avatar)
    dispatch(likeToDetailUser({
      targetId: friend?.userID,
      targetName: friend?.username,
      targetAvatar: friend?.avatar,
      userId: user?.userID,
      username: user?.username,
      userAvatar: user?.avatar,
    }));
  }, [dispatch, friend?.avatar, friend?.userID, friend?.username, user?.avatar, user?.userID, user?.username]);

  const onUnlike = useCallback(async () => {
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }
    await unlikeUser(friend?.userID, friend?.username, friend?.avatar)
    dispatch(unlikeToDetailUser({
      targetId: friend?.userID,
      userId: user?.userID
    }))
  }, [user?.userID, friend?.userID, friend?.username, friend?.avatar, dispatch]);

  const liked = friend?.liked?.find((v) => v?.userId === user?.userID);

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

  // 사진이미지 클릭시 케러셀
  const [sliderOn, setSliderOn] = useState(false);
  const onClickSlider = useCallback(() => {
    setSliderOn(true);
  }, [])
  const sliderClose = useCallback(() => {
    setSliderOn(false);
  }, [])

  // const goBack = () => {
  //   Router.push({
  //     pathname: '/friends',
  //     query: {  }
  //   })
  // }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex w-full bg-white flex-wrap lg:flex-nowrap"
    >
      <Toaster />
      <div className="relative flex-2 w-full lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center bg-gradient-to-r from-gray-900 to-gray-700">
        <div className="opacity-90 absolute top-6 right-4 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer " onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[45px] hover:opacity-90" />
          </p>
        </div>

        <div className="relative">
          <div className="lg:h-[calc(100vh-var(--navbar-height))] h-[60vh]">
            {friend?.thumbvideo && (
              <>
                <video
                  autoPlay={true}
                  ref={videoRef}
                  onClick={onVideoClick}
                  loop
                  src={friend?.thumbvideo}
                  className=" h-full cursor-pointer"
                ></video>

                <div className="absolute top-[45%] left-[40%] cursor-pointer">
                  {!isPlaying && (
                    <button onClick={onVideoClick}>
                      <BsFillPlayFill className="text-white text-6xl lg:text-8xl rounded-full p-4 bg-slate-300/50" />
                    </button>
                  )}
                </div>
                <div className="absolute bottom-3 lg:bottom-5 right-3 lg:right-5  cursor-pointer">
                  {isVideoMuted ? (
                    <button onClick={() => setIsVideoMuted(false)}>
                      <HiVolumeOff className="text-white text-3xl lg:text-4xl" />
                    </button>
                  ) : (
                    <button onClick={() => setIsVideoMuted(true)}>
                      <HiVolumeUp className="text-white text-3xl lg:text-4xl" />
                    </button>
                  )}
                </div>
              </>
            )}

            {!friend?.thumbvideo &&
              friend?.thumbimage &&
              friend?.thumbimage?.length === 1 ?
              <>
                <img
                  src={friend?.thumbimage[0] || backgroundPicture?.src}
                  className="lg:h-[calc(100vh-var(--navbar-height))] h-[60vh] rounded-xl cursor-pointer object-cover opacity-90"
                ></img>
              </>
              : !friend?.thumbvideo &&
                friend?.thumbimage && friend?.thumbimage?.length >= 2 ?
                <button
                  className="flex justify-between flex-col gap-2 hover:opacity-90 relative"
                  onClick={onClickSlider}
                >
                  <img
                    src={friend?.thumbimage[0] || backgroundPicture?.src}
                    className="lg:h-[calc(100vh-var(--navbar-height))] h-[60vh] rounded-xl cursor-pointer object-cover opacity-90"
                  ></img>
                  <div className="z-100 gap-2 flex items-center absolute text-2xl text-white/80 bottom-4 right-4">
                    <FcPlus />
                    <span>클릭하여 {friend?.thumbimage?.length - 1}장 더보기</span>
                  </div>
                </button>
                : null
            }


            {/* 이미지X 영상X */}
            {!friend?.thumbvideo && !friend?.thumbimage && (
              <>
                <img
                  src={backgroundPicture?.src || ""}
                  className=" blur-md lg:h-[calc(100vh-var(--navbar-height))] h-[60vh] rounded-3xl cursor-pointer object-cover opacity-80"
                ></img>
              </>)}
          </div>
        </div>

      </div>
      <div className="relative w-full md:w-full lg:w-[700px] md:h-[calc(100vh-var(--navbar-height))]">
        <Container className="md:h-[calc(100vh-var(--navbar-height))] lg:overflow-y-scroll">
          <div
            className="flex gap-4 mb-4 bg-white w-full pl-3 pt-6"
          /*    onClick={handleChangePage} */
          >
            <div className="flex flex-col gap-4">
              <img
                className="h-14 rounded-3xl w-14 object-cover"
                src={friend?.avatar || profilePic?.src}
                alt="user-profile"
                layout="responsive"
              />
              <StyleModal />
            </div>


            <div className="w-full">
              <div className="text-xl font-bold flex gap-2 items-center justify-between flex-row">
                <div className="flex flex-row items-center gap-2">
                  <p>{friend?.username} </p>
                  {friend?.category && friend?.skills?.length !== 0 && myCareer?.length !== 0 && myEducation?.length !== 0 ?
                    <GoVerified className="text-blue-400 text-xl" /> : null}
                  <div className="flex md:flex-row flex-col">
                    <p className="font-normal text-sm">{myAge || "나이미상"}</p>
                  </div>
                </div>
                <p className="text-sm pr-3">{category[0]?.name}</p>
              </div>
              <p className="font-normal text-xs text-gray-500">{friend?.email_using || friend?.email}</p>
              <div className="flex gap-2 items-start flex-col text-left w-full">
                <div className="flex flex-row gap-3 pt-2">
                  {friend?.gender ?
                    (() => {
                      switch (friend?.gender) {
                        case "male": return (<span className="font-normal text-md">남🙋‍♂️</span>)
                        case "female": return (<span className="font-normal text-md">여🙋‍♀️</span>)
                        default: null;
                      }
                    })(friend?.gender) : <span className="font-normal text-md">성별미등록</span>}
                  <span className="font-normal text-md">{friend?.address_sido || "거주지미등록"}</span>
                  <span className="text-sm text-gray-500">{(() => {
                    switch (parseInt(user?.purpose)) {
                      case 1: return (<span className="">기업담당자</span>)
                      case 2: return (<span className="">구직자</span>)
                      case 3: return (<span className="">예비구직자(학습생)</span>)
                      case 4: return (<span className="">관찰자</span>)
                      default: null;
                    }
                  })(parseInt(user?.purpose))}</span>
                </div>


                <div className="my-1 w-full text-gray-600 font-normal md:text-md text-sm">
                  <div className="text-sm text-gray-500">제안받은 연봉 </div>
                  {mainJoboffered && mainJoboffered?.length !== 0 ? mainJoboffered?.map((v) => (
                    <div key={nanoid()} className="text-left w-fit mr-2 inline-flex my-1 bg-lime-100 p-2 rounded-xl">
                      <div>
                        <div className="flex flex-col">
                          <div>
                            <div className="font-bold ">
                              <span
                                className="mr-1">💰 {v?.salary}만원</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                    : <span>연봉정보없음</span>
                  }
                </div>

                <div className="my-1 w-full text-gray-400 font-normal md:text-md text-sm">
                  {mainCoccoced && mainCoccoced?.length !== 0 ? mainCoccoced?.map((v) => (
                    <div key={nanoid()} className="text-left w-fit mr-2 inline-flex my-1 bg-gray-100 p-2 rounded-xl">
                      <div>
                        <div className="flex flex-col">
                          <div>
                            <div className="font-bold ">
                              <span
                                className="mr-1">💰 {v?.salary}만원</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                    : <span>연봉정보없음</span>
                  }
                </div>

                <div className="my-1 w-full text-gray-600 font-normal md:text-md text-sm">
                  {myCareers?.length !== 0 ? myCareers?.map((v) => (
                    <div key={nanoid()} className="flex text-left my-1 bg-slate-100 p-2 rounded-xl">
                      <div>
                        <div className="flex flex-col">
                          <div>
                            <div className="font-bold ">
                              <span
                                className="mr-1">{v?.name}</span>
                              <span className="mr-1">{v?.section}</span>
                              <span className="mr-1">{v?.position}</span>
                            </div>
                            <div className="font-normal text-sm text-gray-500">
                              <span className="mr-1">{v?.job}</span>
                              <span className="mr-1">{v?.start?.year}~{v?.end?.year == 9999 ? "현재" : v?.end?.year}</span>
                            </div>
                            {v?.description &&
                              <div className="font-normal text-sm text-gray-500 overflow-hidden text-ellipsis">
                                <span className="mr-1 overflow-hidden text-ellipsis whitespace-pre-wrap leading-normal">{v?.description}</span>
                              </div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                    : <span>보유경력 없음</span>
                  }
                </div>

                <div className="my-1 w-full text-gray-600 font-normal md:text-md text-sm">
                  {myEducations?.length !== 0 ? myEducations?.map((v) => (
                    <div key={v?.id} className="flex text-left my-1 bg-amber-50 p-2 rounded-xl">
                      <div>
                        <div className="flex flex-col">
                          <div>
                            <div className="font-bold ">
                              <span
                                className="mr-1">{v?.name}</span>
                              <span className="mr-1">{v?.major}</span>
                              <span className="mr-1">{v?.secondmajor}</span>
                            </div>
                            <div className="font-normal text-sm text-gray-500">
                              {parseInt(v?.category) &&
                                <span>{(() => {
                                  switch (parseInt(v?.category)) {
                                    case 9: return (<span className="">박사</span>)
                                    case 7: return (<span className="">석사</span>)
                                    case 5: return (<span className="">학사</span>)
                                    case 4: return (<span className="">전문학사</span>)
                                    case 2: return (<span className="">고등학교</span>)
                                    case 99: return (<span className="">기타</span>)
                                    default: null;
                                  }
                                })(parseInt(v?.category))}</span>}
                              <span className="mr-1">{v?.start?.year}~{v?.end?.year == 9999 ? "현재" : v?.end?.year}</span>
                            </div>
                            {v?.description &&
                              <div className="font-normal text-sm text-gray-500 overflow-hidden text-ellipsis">
                                <span className="mr-1 overflow-hidden text-ellipsis whitespace-pre-wrap leading-normal">{v?.description}</span>
                              </div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                    : <span>보유학력 없음</span>
                  }
                </div>

                <div className="my-1 w-full">
                  {!!mySkills?.length !== 0 &&
                    <>
                      {mySkills?.map((v) => (
                        <span
                          className="px-3 py-1.5 rounded-full bg-gray-500 text-white text-sm mr-1"
                          key={v?.id}>{v?.name}</span>
                      ))
                      }
                    </>
                  }
                  {mySkills?.length === 0 && <span className="text-gray-600 font-normal md:text-md text-sm">보유스킬 없음</span>}
                </div>

                <div className="my-1 w-full">
                  {!!friend?.links?.length !== 0 &&
                    <>
                      {friend?.links?.map((v) => (
                        <Link key={v} href={v}>
                          <a
                            className="w-fit px-3 py-1.5 rounded-full bg-blue-500 text-white text-[0.77rem] mr-1 flex flex-col mt-1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {v}
                          </a>
                        </Link>
                      ))
                      }
                    </>
                  }
                  {friend?.links?.length === 0 && <span className="text-gray-600 font-normal md:text-md text-sm">보유링크 없음</span>}
                </div>

                {friend?.additionalMent?.length !== 0 ? (
                  <p className="w-full my-0.5 font-normal md:text-md text-sm whitespace-pre-wrap leading-normal overflow-hidden">
                    {friend?.additionalMent}

                  </p>
                ) : null}


              </div>
            </div>
          </div>

          <div className="px-10">
          </div>
          <div className="px-10 py-2.5 flex gap-4">
            {friend?.thumbvideo && (
              <>
                {isPlaying ? (
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
                )}</>
            )}
          </div>
          <div className="my-5 px-10">
            {user && user?.mycompany
              && user?.userID !== friend?.id
              && (
                <div className="items-center mt-8 flex justify-center w-full md:justify-start gap-2 lg:gap-0">
                  <div className="mb-4 flex items-center gap-3">
                    {!liked ?
                      (<Tooltip
                        placement="bottom"
                        className="w-max"
                        content="좋아요!"
                        trigger="hover"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <button className="
                      rounded-full p-3 hover:bg-white bg-red-300/60 border-solid border-red-600 flex items-center justify-center flex-col"
                            onClick={onLike}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <BsFillHeartFill className="w-6 h-6 text-red-600" />
                            </motion.div>
                            <span className="text-red-800 text-sm">{friend?.liked?.length}</span>
                          </button>
                        </div>
                      </Tooltip>)
                      :
                      (<Tooltip
                        placement="bottom"
                        className="w-max"
                        content="좋아요 취소"
                        trigger="hover"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <button className="
                      rounded-full p-3 hover:bg-white bg-red-300/60 border-solid border-red-600 flex items-center justify-center flex-col"
                            onClick={onUnlike}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <BsHeart className="w-6 h-6 text-red-600" />
                            </motion.div>
                            <span className="text-red-800 text-sm">{friend?.liked?.length}</span>
                          </button>
                        </div>
                      </Tooltip>)
                    }
                    <Tooltip
                      placement="bottom"
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
                      detail={true}
                    />
                    <Tooltip
                      placement="bottom"
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
                      detail={true}
                    />
                    <Tooltip
                      placement="bottom"
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
                        {/* <span className="text-emerald-800 text-xs">입사제안</span> */}
                      </div>
                    </Tooltip>
                    <Joboffer
                      jobofferOn={jobofferOn}
                      openJoboffer={openJoboffer}
                      closeJoboffer={closeJoboffer}
                      friendname={friend?.username}
                      friend={friend}
                      detail={true}
                    />
                  </div>


                  {/* <div className="flex justify-end gap-1 items-center">
                  <div className="mb-4 flex items-center justify-end cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-gray-700 rounded-full px-2 py-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-white text-center"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                        />
                      </svg>
                    </motion.div>
                  </div>
                  <div className="mb-4 flex items-center justify-end cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-pink-500 rounded-full px-2 py-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-white -rotate-45"
                      >
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                      </svg>
                    </motion.div>
                  </div>
                  <div className="mb-4 flex items-center justify-end cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-green-500 rounded-full px-2 py-2"
                    >
                      <RiWhatsappLine className="text-white text-[18px]" />
                    </motion.div>
                  </div>
                  <div className="mb-4 flex items-center justify-end cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-blue-500 rounded-full px-2 py-2"
                    >
                      <GrFacebookOption className="text-white text-[18px]" />
                    </motion.div>
                  </div>
                  <div className="mb-4 flex items-center justify-end cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-[#1DA1F2] rounded-full px-2 py-2"
                    >
                      <AiOutlineTwitter className="text-white text-[18px]" />
                    </motion.div>
                  </div>
                  <div
                    className="mb-4 flex items-center justify-end cursor-pointer"
                    onMouseEnter={() => setIsOpenDrop(true)}
                    onMouseLeave={() => setIsOpenDrop(false)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-transparent hover:bg-gray-300 rounded-full px-2 py-2"
                    >
                      <IoIosShareAlt className="text-black text-[18px]" />
                    </motion.div>
                  </div>
                </div> */}
                </div>
              )}
            {/* {isOpenDrop && (
              <div
                className="flex justify-end"
                onMouseEnter={() => setIsOpenDrop(true)}
                onMouseLeave={() => setIsOpenDrop(false)}
              >
                <div className="z-10 absolute w-auto bg-white rounded divide-y divide-gray-100 shadow top-[260px] lg:top-[300px]">
                  <ul
                    className="pb-2 text-sm text-gray-700"
                    aria-labelledby="dropdownDefault"
                  >
                    {dropDwonMenuItems.map((menu, index) => (
                      <li key={index}>
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          className="flex justify-start items-center gap-4 px-4 text-black font-medium cursor-pointer"
                        >
                          <div
                            className={`${menu.color} rounded-full px-1.5 py-1.5`}
                          >
                            {menu.icon}
                          </div>
                          {menu.name}
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )} */}

            <div className="bg-gray-100 px-2 py-2.5 rounded-md mt-4 flex">
              <input
                type="text"
                readOnly
                value={router?.asPath ? `https://jobcoc.com/${router?.asPath}` : null}
                className="w-full bg-transparent outline-none border-none cursor-pointer text-gray-500 text-sm"
              />
              {isCopied ? (
                <button className="text-xs text-center font-bold w-28 cursor-not-allowed">
                  복사성공!
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-xs text-center cursor-pointer font-bold w-28"
                  onClick={handleCopyClick}
                >
                  Copy Link
                </motion.button>
              )}
            </div>
          </div>
          {sliderOn ?
            <Slider
              sliderOn={sliderOn}
              photo={friend?.thumbimage}
              setSliderOn={setSliderOn}
              sliderClose={sliderClose}
            />
            : null}
        </Container>
      </div>
    </motion.div>
  );
};

const Container = styled.div`

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

export default Main;