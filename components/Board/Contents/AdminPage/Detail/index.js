import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import profilePicture from 'public/image/icon/happiness.png';
import dayjs from "dayjs";
import StyleList from 'components/Common/StyleList';
import SurveyContainer from './SurveyContainer';
import CareerContainer from './CareerContainer';

const index = () => {
  const [openSurvey, setOpenSurvey] = useState(false);
  const onToggleOpenSurvey = useCallback(() => {
    setOpenSurvey(prev => !prev);
  }, [])
  const { showDetailCareers, showDetailInfo } = useSelector(state => state.board);

  var now = dayjs();
  const nowYear = now.get("year"); // 2021 (년)
  const age = nowYear - showDetailInfo?.birthday?.year + 1
  var styleObject = StyleList?.filter(obj => obj.number == showDetailInfo?.style);

  const parseLinkTextToHTML = (text) => {
    const regURL = new RegExp("(http|https|ftp|www|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)", "gi");
    const regEmail = new RegExp("([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+.[a-z0-9-]+)", "gi");
    return text
      ?.replace(regURL, "<a href='$1://$2' target='_blank'>$1://$2</a>")
      ?.replace(regEmail, "<a href='mailto:$1'>$1</a>");
  };

  return (
    <div className='container p-4 my-1 sm:my-4 bg-slate-100 w-full mx-auto shadow-inner rounded-lg overflow-hidden'>
      {!showDetailCareers || !showDetailInfo ?
        // <div className="w-full h-64 rounded border-dashed border-2 border-gray-300">
        <div className="flex flex-col rounded-xl text-center">

          <h2 className="font-bold text-3xl text-gray-600 mx-5 mt-8">
            참여자 상세보기
          </h2>

          <p className="font-light text-gray-400 text-sm mx-5 mt-5">
            아래의 리스트에서 리스트를 선택해주세요.
          </p>

          <div className="text-gray-700 font-semibold mx-5 mt-5 mb-8 group ">
            정보 조회
            <svg xmlns="http://www.w3.org/2000/svg" className="rotate-90 inline-block h-6 w-6 group-hover:translate-x-2 transition delay-100 transition-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

        </div>
        // </div>
        :
        <div className="flex flex-row sm:flex-col w-full">
          <section className="w-full">
            <section className="text-gray-600 w-full body-font">
              <div className="container flex justify-center w-full px-1 sm:px-3 py-3 mx-auto">
                <div className="p-5 w-full overflow-hidden bg-white flex items-start mx-auto border-b mb-4 border-gray-200 rounded-lg sm:flex-row flex-col">
                  <div className="sm:w-32 w-20 sm:mr-4 flex justify-center flex-shrink-0 items-center ">
                    <Image
                      className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                      src={showDetailInfo?.avatar || profilePicture}
                      width={92}
                      height={92}
                      unoptimized
                      alt="profilePicture"
                    />
                  </div>

                  <div className="flex-grow sm:text-left text-center mt-6 w-full sm:mt-0">

                    <div className="flex flex-col xl:flex-row justify-between">
                      <div>
                        <div className="flex items-center flex-row">
                          <h1 className="text-black text-2xl title-font font-bold mb-2">{showDetailInfo?.username}</h1>
                          <span className="text-gray-600 ml-2">
                            {age},{(() => {
                              switch (showDetailInfo?.gender) {
                                case "male": return (<span>남</span>)
                                case "female": return (<span>여</span>)
                                default: null;
                              }
                            })(showDetailInfo?.gender)}
                          </span>
                        </div>
                        {showDetailInfo?.email &&
                          <p className="leading-relaxed text-base flex flex-row items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {showDetailInfo?.email}</p>
                        }
                        {showDetailInfo?.url_one &&
                          <div className="flex flex-row items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <span className="leading-relaxed text-base flex flex-row items-center "
                              dangerouslySetInnerHTML={{ __html: parseLinkTextToHTML(showDetailInfo?.url_one) }}
                            />
                          </div>
                        }
                        {showDetailInfo?.url_two &&
                          <div className="flex flex-row items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <span className="leading-relaxed text-base flex flex-row items-center "
                              dangerouslySetInnerHTML={{ __html: parseLinkTextToHTML(showDetailInfo?.url_two) }}
                            />
                          </div>
                        }
                        {showDetailInfo?.url_three &&
                          <div className="flex flex-row items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <span className="leading-relaxed text-base flex flex-row items-center "
                              dangerouslySetInnerHTML={{ __html: parseLinkTextToHTML(showDetailInfo?.url_three) }}
                            />
                          </div>
                        }
                      </div>

                      <div>
                        {/* 스타일카드 */}
                        {styleObject[0] &&
                          <div className="py-4 sm:py-0">
                            <div className=" inline-block mr-2" >
                              <div className="flex h-full items-center">
                                <div className="mx-[auto] border-gray-400 flex flex-row mb-2 w-[100%]">
                                  <div
                                    className="flex-col sm:flex-row bg-sky-100 text-left transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer hover:bg-sky-200 click:active:checked:focus:bg-sky-300 dark:bg-gray-800 rounded-md flex flex-1 items-center p-4"
                                  >
                                    <div className="flex flex-col h-10 justify-center items-center">
                                      {styleObject[0]?.src &&
                                        <div href="#" className="block relative my-4 sm:my-0">
                                          <Image
                                            className="mx-auto object-cover rounded-full h-14 w-14"
                                            src={styleObject[0]?.src || ""}
                                            width={46}
                                            height={46}
                                            unoptimized
                                            alt="Style picture"
                                          />
                                        </div>
                                      }
                                    </div>
                                    <div className="flex-1 pl-0 sm:pl-3 ">
                                      <div className="leading-snug font-bold dark:text-white text-lg mt-2 sm:mt-0 text-center sm:text-left">
                                        {styleObject[0]?.title}
                                      </div>
                                      <div className="text-gray-500 dark:text-gray-200 text-sm mt-1">
                                        {styleObject[0]?.sub}
                                      </div>
                                      <div className="text-violet-500 dark:text-gray-200 text-sm mt-1">
                                        {styleObject[0]?.tag}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                    <div className="md:flex font-bold text-gray-800">
                      <div className="w-full flex flex-col space-x-3">
                        {showDetailInfo?.survey && <>
                          <button
                            onClick={onToggleOpenSurvey}
                            className="text-gray-500 max-w-[160px] text-center justify-center flex flex-row  items-center hover:bg-slate-200 bg-white shadow-md rounded-lg px-3 py-1 mb-3"
                          >
                            <span>업무성향 설문</span>
                            {openSurvey ?
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                              :
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                              </svg>
                            }
                          </button>
                          {openSurvey &&
                            <SurveyContainer
                              survey={showDetailInfo?.survey}
                            >
                            </SurveyContainer>
                          }
                        </>}
                      </div>
                    </div>
                    <div className="md:flex font-bold text-gray-800">
                      <CareerContainer
                        careers={showDetailCareers}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      }
    </div>
  );
};

export default index;