import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

const FavoriteModal = ({ title, contents, contents_second, closeOutsideClick, openModal, closeModal, cancelFunc, twobutton }) => {

  const modalEl = createRef();
  const handleClickOutside = (event) => {
    if (openModal === true && !modalEl?.current?.contains(event.target))
      cancelFunc();
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      {openModal ?
        <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080]">
          <div className="w-[100%] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="sticky p-[1rem] w-[100%] mt-auto mb-auto mx-auto max-w-[42rem] min-w-[420px]" ref={modalEl}>
              <div className="p-[1rem] border-solid border-t-8 border-violet-400  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="w-full flex justify-end">
                  <button className="p-2  hover:bg-gray-100 rounded-full" onClick={cancelFunc}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <svg className="h-[18%] w-[18%] mt-4 m-auto text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                  </path>
                </svg>
                {title ?
                  (<p className="text-gray-800 mb-[12px] text-center dark:text-gray-100 font-bold text-[1.4rem] py-3 px-6">
                    {title}
                  </p>)
                  : null}
                <p className="mt-4 text-left text-gray-600 dark:text-gray-100 text-md py-1 px-6 mb-2">
                  {contents}
                </p>
                <div className="text-left text-gray-500 dark:text-gray-100 text-[0.89rem] py-1 px-6 mt-[2px]">
                  <p className='font-semibold text-base text-violet-700 my-1 ' >
                    혜택
                  </p>
                  <p className='pb-1'>
                    관심기업과 팀에 대한 유용한 정보 획득(팀포스팅 조회)
                  </p>
                  <p className='pb-1'>
                    현직자, 채용담당자와의 소통으로 팀 분위기 파악
                  </p>
                  <p className='pb-1'>
                    참여자의 경우 Small Intern을 통해 현업 과제를 이행시 입사 제안을 받을 수 있습니다.
                  </p>
                </div>

                <div className='w-[80%] mx-auto my-4 h-[1px] bg-gray-200'></div>
                <div className="text-left text-gray-500 dark:text-gray-100 text-[0.89rem] py-1 px-6 mt-[2px]">
                  <p className='font-semibold text-base text-violet-700 my-1 ' >
                    채용 절차를 위해서
                  </p>
                  <p className='pb-1'>
                    Small Intern: 입사를 위해 기업담당자가 과제를 발송할 경우 과제를 이행합니다.
                  </p>
                  <p className='pb-1'>
                    개인정보 제공 동의: 채용담당자의 입사제안시 필요한 인적정보를 제공합니다.
                  </p>
                  <p className='pb-1'>
                    (현업 전문가는 관계 없음)
                  </p>
                </div>


                <div className="flex items-center justify-center gap-4 w-full mt-8">
                  {twobutton ?
                    <>
                      <button type="button" onClick={closeModal} className="w-[95%] mb-[12px] py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        확인
                      </button>
                    </>
                    :
                    <button type="button" onClick={closeModal} className="w-[90%] mb-[12px] py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                      확인
                    </button>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
        : null}
    </>
  );
};

FavoriteModal.propTypes = {
  title: PropTypes.string,
  contents: PropTypes.string,
  contents_second: PropTypes.string,
  closeOutsideClick: PropTypes.bool,
  openModal: PropTypes.bool,
  closeModal: PropTypes.func,
  twobutton: PropTypes.bool,
};

export default FavoriteModal;