import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

const AlertModal = ({ title, contents, contents_second, closeOutsideClick, openModal, closeModal, cancelFunc, twobutton }) => {

  const modalEl = createRef();
  const handleClickOutside = (event) => {
    if (openModal === true && closeOutsideClick === true && !modalEl?.current?.contains(event.target))
      closeModal();
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
            ref={modalEl}>
            <div className="sticky p-[1rem] w-[100%] my-6 mt-auto mb-auto mx-auto max-w-[32rem] min-w-[320px]" >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <svg className="h-[18%] w-[18%] mt-4 m-auto text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                  </path>
                </svg>
                {title ?
                  (<p className="text-gray-800 mb-[12px] text-center dark:text-gray-100 font-bold text-[1.4rem] py-3 px-6">
                    {title}
                  </p>)
                  : null}
                <p className="text-gray-600 dark:text-gray-100 text-md py-1 px-6">
                  {contents}
                </p>
                <p className="text-purple-600 dark:text-gray-100 text-[14px] py-1 px-6 mt-[6px]">
                  {contents_second}
                </p>
                <div className="flex items-center justify-center gap-4 w-full mt-8">
                  {twobutton ?
                    <>
                      <button type="button" onClick={closeModal} className="w-[40%] mb-[12px] py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        확인
                      </button>
                      <button type="button" onClick={cancelFunc} className="w-[40%] mb-[12px] py-2 px-4  bg-white hover:bg-white focus:ring-white focus:ring-offset-white text-gray-600 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        취소
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

AlertModal.propTypes = {
  title: PropTypes.string,
  contents: PropTypes.string,
  contents_second: PropTypes.string,
  closeOutsideClick: PropTypes.bool,
  openModal: PropTypes.bool,
  closeModal: PropTypes.func,
  twobutton: PropTypes.bool,
};

export default AlertModal;