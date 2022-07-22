import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Logo from 'public/logo/teamkok.png';
import RegisterTab from './RegisterTab';

const RegisterModal = ({
  tabIndex, openModal,
  setTabIndex, setOpenModal,
  handleCancelModal }) => {

  const modalEl = createRef();
  const handleClickOutside = (event) => {
    if (openModal === true && !modalEl?.current?.contains(event.target))
      setOpenModal(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {
        openModal ?
          <>
            <div
              className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080]"
            >
              <div
                className="w-[100%] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div
                  className="sticky p-[1rem] w-[100%] my-6 mt-auto mb-auto mx-auto max-w-[32rem] min-w-[320px]"
                  ref={modalEl}
                >

                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5  rounded-t">
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-30 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => handleCancelModal()}
                      >
                        <span className="bg-transparent opacity-100 text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      </button>
                    </div>

                    <div className="relative p-[1rem] flex-auto">

                      <div role="banner" className='flex w-100 justify-center items-center'>
                        <Image
                          src={Logo}
                          width={34}
                          height={34}
                          alt="logo_image"
                        />
                        <h1 role="main" className="text-[1.2rem] ml-[0.6rem] dark:text-white font-semibold leading-7 lg:leading-9 text-center text-gray-800">
                          {tabIndex === 1 ?
                            "TEAMKOK 회원가입" :
                            "TEAMKOK 로그인"
                          }
                        </h1>
                      </div>
                      <div className="mt-6">
                        <RegisterTab
                          handleCancelModal={handleCancelModal}
                          tabIndex={tabIndex}
                          setTabIndex={setTabIndex}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </div>
          </>
          : null}
    </>
  );

};

RegisterModal.propTypes = {
  tabIndex: PropTypes.number,
  openModal: PropTypes.bool,
  handleCancelModal: PropTypes.func,
  setTabIndex: PropTypes.func,
  setOpenModal: PropTypes.func,
};

export default RegisterModal;
