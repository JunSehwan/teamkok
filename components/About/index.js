import React from 'react';
import Footer from 'components/Main/Footer';
import styled from 'styled-components';
import Image from 'next/image';

const index = () => {
  return (
    <>
      <div className="min-h-[calc(100vh-66px)] bg-slate-50 flex flex-col justify-between">
        <div className="pt-24 pb-12">
          <div className="container m-auto text-gray-600 md:px-12 xl:px-6 px-6">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
              <div className="md:5/12 lg:w-5/12">
                <ImageWrapper className="">
                  <StyledImage
                    className="autoimage"
                    src="/image/communication.png"
                    alt="communication" loading="lazy"
                    layout="fill"
                    unoptimized
                  />
                </ImageWrapper>
              </div>
              <div className="md:7/12 lg:w-6/12">
                <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">취업하고자 하는 조직(팀)내<br /> 진짜 생활이 궁금하다면?
                </h2>
                <p className="mt-6 text-lg text-gray-600">기업과 지원자간 커뮤니케이션(정보 교류)의 부재는 입사 후 나와는 맞지 않는 조직이라는 생각을 주게 됩니다.
                </p>
                <p className="mt-4 text-lg text-gray-600">그리고 MZ세대의 퇴사가 증가하지만 여전히 단순히 경력과 학력으로만 평가하는 서류검토 방식은 바뀌지 않고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-24 pb-12">
          <div className="container m-auto text-gray-600 md:px-12 xl:px-6 px-6">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">

              <div className="md:7/12 lg:w-6/12">
                <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">신중하게 바라보세요.
                </h2>
                <p className="mt-6 text-lg text-gray-600">
                  상호간의 적극적인 커뮤니케이션을 통해 기업은 좀 더 인재를 장기적으로 관찰하면서 알아갈 필요가 있습니다.
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  같은 기업내에서도 팀, 분야마다 분위기, 업무강도, 혹은 처우가 매우 다르기때문에 지원자 역시 팀 중심으로 다양한 기업의 문화와 분위기를 파악한 후, 입사를 선택하는 것이 즐거운 직장생활에 도움을 줄 것입니다.
                </p>
              </div>
              <div className="md:5/12 lg:w-5/12">
                <ImageWrapper className="">
                  <StyledImage
                    className="autoimage"
                    src="/image/now.png"
                    alt="now" loading="lazy"
                    layout="fill"
                    unoptimized
                  />
                </ImageWrapper>
              </div>
            </div>
          </div>
        </div>

        <section className="relative pt-16 bg-blueGray-50">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-full px-4 md:px-2 mr-auto ml-auto -mt-78">
                <h1 className="text-gray-600">TEAMZ의 강점은?</h1>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-4/12 px-4">
                    <div className="relative flex flex-col mt-4">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center bg-violet-400 justify-center w-18 h-18 mb-5 shadow-lg rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </div>
                        <h6 className="text-2xl mb-1 font-semibold text-violet-600">#야근 #분위기 #경력개발</h6>
                        <p className="mb-4 text-blueGray-500">
                          팀단위 어필 및 지속적인 커뮤니케이션
                        </p>
                      </div>
                    </div>

                  </div>
                  <div className="w-full md:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 mt-4">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center bg-violet-400 justify-center w-18 h-18 mb-5 shadow-lg rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h6 className="text-2xl mb-1 font-semibold text-violet-600">Save Money & Time
                        </h6>
                        <p className="mb-4 text-blueGray-500">
                          상시 지원자 확보로 채용비용, 공수절감
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="w-full md:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 mt-4">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center bg-violet-400 justify-center w-18 h-18 mb-5 shadow-lg rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                        </div>
                        <h6 className="text-2xl mb-1 font-semibold text-violet-600">Culture-fit 인재 채용
                        </h6>
                        <p className="mb-4 text-blueGray-500">
                          커뮤니케이션 + 가치관 검증 + 현업 과제수행
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

                <div className="md:w-6/12 px-4">

                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>

  );
};

const ImageWrapper = styled.div`
width: 100%;
justify-content: end;
margin: 0 auto;
  /* margin-right: -2rem!important;
  margin-bottom: -4rem!important; */
& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 100% !important;
  }
}
`

const StyledImage = styled(Image)`
  /* margin-left: -100px!important; */
  /* margin-bottom: -30px!important; */
  /* width: 100%!important; */
`

export default index;