import React from 'react';
import PropTypes from 'prop-types';


const SignupModal = ({
  tabIndex, openModal,
  handleOpenModal,
  handleCancelModal,
  title,
}) => {

  return (
    <>
      {
        openModal ?
          <>
            <div
              onClick={() => handleCancelModal()}
              className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080]"
            >
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-auto my-6 mx-auto max-w-3xl min-w-[320px]">

                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl font-semibold">
                        {title}
                      </h3>
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
                    {/*body*/}
                    <div className="relative p-6 flex-auto">

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

SignupModal.propTypes = {
  tabIndex: PropTypes.number,
  openModal: PropTypes.bool,
  handleOpenModal: PropTypes.func,
  handleCancelModal: PropTypes.func,
  title: PropTypes.string,
};

export default SignupModal;