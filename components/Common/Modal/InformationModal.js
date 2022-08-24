import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  patchServiceInfoSeen
} from 'slices/user';
import { updateServiceInfoSeen } from 'firebaseConfig';
import styled from 'styled-components';
import Image from 'next/image';

const index = ({ infoConfirm, closeInfoConfirm }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [tab, setTab] = useState(1);
  // 제출
  const onClose = useCallback(async (e) => {
    e.preventDefault();
    await updateServiceInfoSeen("done").then((result) => {
      dispatch(patchServiceInfoSeen(result));
    })
    closeInfoConfirm();
  }, [dispatch, closeInfoConfirm])

  const [isView, setIsView] = useState(false)
  useEffect(() => {
    setIsView(infoConfirm || user && user?.infoseen !== "done")
    if(isView){document.body.style.overflow =  "hidden";}
    if(!isView){document.body.style.overflow =  "unset";}
  }, [infoConfirm, user?.infoseen, user, isView])

  return (
    <>
      {isView
        ?
        <div className="relative z-30" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity"></div>
          <div className="fixed w-[100%] z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full text-center sm:p-0">
              <div className="border-solid border-t-8 border-violet-400 relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 max-h-[87vh] max-w-4xl w-[90%]">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                  <div className="relative bg-white rounded border">
                    <div className="w-full flex justify-between text-violet-600 mb-3">
                      <div className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-violet-600 text-xl ml-1 font-bold tracking-normal leading-tight">
                          서비스 소개
                        </h2>
                      </div>
                      <button onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <StyledContainer className='w-full flex flex-col mb-2 overflow-hidden text-ellipsis h-[65vh] overflow-y-auto'>
                      <div className="mx-4 mb-6 text-md leading-relaxed">
                        <div className='flex flex-row w-full justify-center items-center gap-4 mt-4 mb-8'>
                          <button className={`${tab === 1 && "font-bold text-blue-600"} flex flex-col items-center rounded-lg bg-blue-50 hover:bg-blue-200 p-3`}
                            onClick={() => { setTab(1) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                            <span className="ml-1 text-blue-600">취업희망자</span>
                          </button>
                          <button className={`${tab === 1 && "font-bold text-red-600"} flex flex-col items-center rounded-lg bg-red-50 hover:bg-red-200 p-3`}
                            onClick={() => { setTab(2) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="ml-1 text-red-600">채용담당자</span>
                          </button>
                        </div>
                        {tab === 1 ?
                          <div className=''>
                            <h3 className="flex flex-row items-center font-bold leading-6 text-gray600 dark:text-white text-lg">
                              <span className="ml-1 text-2xl text-gray-700">관심기업 등록(취업희망자)</span>
                            </h3>
                            <div className="rounded-lg bg-purple-100 p-4 my-14 w-full flex md:flex-row flex-col text-lg items-center justify-between">
                              <div className="text-gray-700 text-md my-2 font-semibold basis-2/3">
                                시작 전, <br /> 프로필페이지에서<br />
                                <p className="text-purple-600 font-bold text-lg ">기본정보, 이력 및 학력정보</p>
                                를 등록해주세요. ✏️
                                <br />
                                <span className="text-gray-600 text-sm font-normal">(재직중인 기업만 기업보드 개설가능)</span>
                              </div>
                              <ImageWrapper className="max-w-[420px] basis-1/3">
                                <Image
                                unoptimized
                                  className="autoimage"
                                  src="/image/screenshot/profile.png"
                                  alt="communication" loading="lazy"
                                  layout="fill"
                                />
                              </ImageWrapper>
                            </div>
                            <div className="my-14 w-full flex md:flex-row-reverse flex-col-reverse items-center justify-between">
                              <div className="text-gray-800 my-2 text-center basis-2/3">
                                <p className="font-bold text-gray-800 text-3xl mb-2">COMMUNICATION</p>
                                관심기업으로 등록하면 채용담당자 및 현직자와의 1:1대화를 할 수 있으며,<br /> 다양한 팀(분야)의 소식을 들을 수 있습니다.
                              </div>
                              <ImageWrapper className="max-w-[320px] basis-1/3">
                                <Image
                                unoptimized
                                  className="autoimage rounded-xl shadow-lg "
                                  src="/image/screenshot/post.png"
                                  alt="communication" loading="lazy"
                                  layout="fill"
                                />
                              </ImageWrapper>
                            </div>

                            <div className="rounded-lg bg-slate-100 p-4 my-24 w-full flex md:flex-row flex-col items-center justify-between py-24">
                              <div className="text-gray-800 my-2 text-center basis-2/4">
                                <p className="font-bold text-gray-800 text-3xl mb-2">채용 프로세스</p>
                                Small Intern이 시작되면 채용과제를 수행하거나 <br />많은 대화를 통해서 입사 제의를 받을 수 있습니다.
                              </div>
                              <ImageWrapper className="max-w-[420px] basis-2/4">
                                <Image
                                unoptimized
                                  className="autoimage rounded-xl shadow-lg "
                                  src="/image/screenshot/joboffer.png"
                                  alt="communication" loading="lazy"
                                  layout="fill"
                                />
                              </ImageWrapper>
                            </div>

                            <div className="my-14 w-full flex md:flex-row-reverse flex-col-reverse items-center justify-between">
                              <div className="text-gray-800 my-2 text-center basis-2/4">
                                <p className="font-bold text-gray-800 text-3xl mb-2">업무스타일 매칭</p>
                                또한, 프로필 페이지에서 내 업무 스타일을 등록하면 <br />팀별 스타일 매칭률을 확인할 수 있습니다.🧬
                              </div>
                              <ImageWrapper className="max-w-[360px] basis-2/4">
                                <Image
                                unoptimized
                                  className="autoimage rounded-xl shadow-lg "
                                  src="/image/screenshot/matching2.png"
                                  alt="communication" loading="lazy"
                                  layout="fill"
                                />
                              </ImageWrapper>
                            </div>
                          </div>
                          :
                          <div className="mt-6 ">
                            <h3 className="flex flex-row items-center font-bold leading-6 text-gray600 dark:text-white text-lg">
                              <span className="ml-1 text-2xl text-gray-700">기업보드 개설(채용담당자)</span>
                            </h3>
                            <div className="rounded-lg bg-purple-100 p-4 my-14 w-full flex md:flex-row flex-col text-lg items-center justify-between">
                              <div className="text-gray-700 text-md my-2 font-semibold basis-2/3">
                                시작 전, <br /> 프로필페이지에서<br /> 
                                <p className="text-purple-600 font-bold text-lg ">기본정보, 이력 및 학력정보</p>
                                를 등록해주세요. ✏️
                                <br />
                                <span className="text-gray-600 text-sm font-normal">(재직중인 기업만 기업보드 개설가능)</span>
                              </div>
                              <ImageWrapper className="max-w-[420px] basis-1/3">
                                <Image
                                  className="autoimage"
                                  src="/image/screenshot/profile.png"
                                  alt="communication" loading="lazy"
                                  layout="fill"
                                  unoptimized
                                />
                              </ImageWrapper>
                            </div>
                            <div className="my-14 w-full flex md:flex-row-reverse flex-col-reverse items-center justify-between">
                              <div className="text-gray-800 my-2 text-center basis-3/5">
                                <p className="font-bold text-gray-800 text-3xl mb-2">기업보드</p>
                                적극적인 인재영입🕵️‍♀️을 원하신다면 기업보드를 개설하고<br />기업내 현직자들과 함께 기업보드를 꾸며보세요.
                              </div>
                              <ImageWrapper className="max-w-[340px] basis-2/5">
                                <Image
                                  className="autoimage rounded-xl shadow-lg "
                                  src="/image/screenshot/makeboard.png"
                                  alt="communication" loading="lazy"
                                  layout="fill"
                                  unoptimized
                                />
                              </ImageWrapper>
                            </div>

                            <div className="rounded-lg bg-slate-100 p-4 my-24 w-full flex md:flex-row flex-col items-center justify-between py-14">
                              <div className="text-gray-800 my-2 text-center basis-2/4">
                                <p className="font-bold text-gray-800 text-3xl mb-2">섹션의 기능</p>
                                분야별로 섹션이 구성되어 있으며 <br />섹션별로 포스팅(공지), <br />입사희망자와 1:1대화, <br />그리고 입사희망자 정보조회가 가능합니다.
                              </div>
                              <ImageWrapper className="max-w-[280px] basis-2/4">
                                <Image
                                  className="autoimage rounded-xl shadow-lg "
                                  src="/image/screenshot/post.png"
                                  alt="communication" loading="lazy"
                                  layout="fill"
                                  unoptimized
                                />
                              </ImageWrapper>
                            </div>

                            <div className="py-14 my-14 w-full flex md:flex-row-reverse flex-col-reverse items-center justify-between">
                              <div className="text-gray-800 my-2 text-center basis-2/4">
                                <p className="font-bold text-gray-800 text-3xl mb-2">업무스타일 매칭</p>
                                팀스타일을 등록하면<br />지원자별 스타일 매칭률을 확인할 수 있습니다.🧬
                              </div>
                              <ImageWrapper className="max-w-[360px] basis-2/4">
                                <Image
                                  className="autoimage rounded-xl shadow-lg "
                                  src="/image/screenshot/lists.png"
                                  alt="communication" loading="lazy"
                                  layout="fill"
                                  unoptimized
                                />
                              </ImageWrapper>
                            </div>

                            <div className="rounded-lg bg-slate-100 p-4 mt-24  w-full flex md:flex-row flex-col items-center justify-between py-24">
                              <div className="text-gray-800 my-2 text-center basis-2/3">
                                <p className="font-bold text-gray-800 text-3xl mb-2">적극적 인재영입</p>
                                팀단위 홍보 및 어필을 지속적으로 하여 능력있는 인재를 확보하세요.<br />
                                그리고 마음이 맞는 인재에게 채용제의를 시작해보세요.😀
                              </div>
                              <ImageWrapper className="max-w-[320px] basis-1/3">
                                <Image
                                  className="autoimage rounded-xl shadow-lg "
                                  src="/image/screenshot/hire.png"
                                  alt="communication" loading="lazy"
                                  layout="fill"
                                  unoptimized
                                />
                              </ImageWrapper>
                            </div>
                          </div>
                        }
                      </div>
                    </StyledContainer>


                    <div className="w-full flex justify-end mt-4">
                      <button
                        className='bg-violet-500 text-lg w-[112px] text-white hover:bg-violet-600 active:bg-violet-600 font-bold uppercase px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        onClick={onClose}>확인
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        : null}

    </>
  );
};

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
const ImageWrapper = styled.div`
width: 100%;
justify-content: end;
margin: 0 auto;
& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 100% !important;
  }
}
`

index.propTypes = {
  infoConfirm: PropTypes.bool,
  closeInfoConfirm: PropTypes.func,
};

export default index;