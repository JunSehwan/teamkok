import React, { useCallback, useState, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { modifyEducation } from 'firebaseConfig';
import { updateEducation } from 'slices/education';

const EditEducation = ({ education, onClose, onOpen, onEdit, }) => {

  const modalEl = createRef();
  // const handleClickOutside = (event) => {
  //   if (onEdit === true && !modalEl?.current?.contains(event.target))
  //     onClose();
  // };
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // });


  return (
    <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover py-12 bg-gray-400 transition duration-150 ease-in-out right-0 bottom-0 " id="modal">
      <div className="absolute bg-black opacity-30 inset-0 z-0"></div>
      <div role="alert" ref={modalEl} className="container mx-auto w-11/12 md:w-2/3 max-w-lg z-50">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">

          <div className="flex items-center justify-start w-full">
            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"

            >Submit</button>
            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
              onClick={onClose}>Cancel</button>
          </div>
          <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            onClick={onClose}
            aria-label="close modal" role="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

EditEducation.propTypes = {
  education: PropTypes.object,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onEdit: PropTypes.bool,
};

export default EditEducation;