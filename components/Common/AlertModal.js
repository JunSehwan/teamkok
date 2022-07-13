import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

const AlertModal = ({ title, contents, contents_second, onClick, closeOutsideClick, openModal, closeModal }) => {

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
        <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-[32rem] m-auto">
          <div className="w-full h-full text-left" ref={modalEl}>
            <div className="flex h-full flex-col justify-between" >
              <svg className="h-12 w-12 mt-4 m-auto text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                </path>
              </svg>
              {title ?
                (<p className="text-gray-800 mb-[12px] dark:text-gray-100 font-bold text-[1.4rem] py-3 px-6">
                  {title}
                </p>)
                : null}
              <p className="text-gray-600 dark:text-gray-100 text-md py-1 px-6">
                {contents}
              </p>
              <p className="text-purple-600 dark:text-gray-100 text-[14px] py-1 px-6">
                {contents_second}
              </p>
              <div className="flex items-center justify-between gap-4 w-full mt-8">
                <button type="button" onClick={closeModal} className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  확인
                </button>
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
};

export default AlertModal;