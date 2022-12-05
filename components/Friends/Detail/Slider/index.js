/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef, useCallback, createRef } from "react";
import PropTypes from 'prop-types';
import holderPicture from 'public/image/holderimage.png';
import Image, { ImageProps } from 'next/image';
import styled from "styled-components";

function Slider({ photo, setSliderOn, sliderClose, sliderOn }) {
  const [current, setCurrent] = useState(0);
  const length = photo?.length;

  const nextSlide = useCallback(() => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  }, [current, length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // const timeoutRef = useRef(null);

  // const resetTimeout = () => {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //   }
  // };

  // useEffect(() => {
  //   resetTimeout();
  //   timeoutRef.current = setTimeout(() => {
  //     nextSlide();
  //   }, 3 * 1000);

  //   return () => {
  //     resetTimeout();
  //   };
  // }, [current, nextSlide]);


  const modalEl = createRef();
  const handleClickOutside = (event) => {
    if (sliderOn === true && !modalEl?.current?.contains(event.target))
      sliderClose();
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="min-w-screen min-h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div ref={modalEl} className="w-full  max-w-[90%] h-[90%] p-3 relative mx-auto my-auto rounded-xl shadow-lg  bg-white">
        {/* <!--content--> */}
        <div className="h-full w-full relative">
          <section className="flex h-full w-full bg-gray-300 py-4 px-2  justify-center items-center relative overflow-hidden">
            <button onClick={sliderClose} 
            className="text-gray-800 p-2 hover:bg-gray-200 rounded-full absolute right-4 top-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* 이전버튼 */}
            <div className="absolute h-5 w-2 left-0 ml-2 z-10 text-5xl cursor-pointer select-none text-white">
              <svg
                onClick={prevSlide}
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-orange-700 shadow-lg hover:text-blue-600 hover:bg-blue-300 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
            </div>
            <div className="absolute right-0 mr-2 z-10 text-5xl cursor-pointer select-none text-white">
              <svg
                onClick={nextSlide}
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-orange-700 shadow-lg hover:text-blue-600 hover:bg-blue-300 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {photo?.map((slide, index) => {
              return (
                <div
                  className={
                    index === current
                      ? "opacity-100 duration-100 ease-in scale-105"
                      : "opacity-0 duration-100"
                  }
                  key={index}
                >
                  {index === current && (
                    <AutoHeightImageWrapper>
                      <img
                        // layout="fill"
                        // className="autoImage"
                        src={slide || holderPicture}
                        alt="slides"
                        className="max-h-[654px] h-auto w-full autoImage object-center  bg-cover shadow"
                      />
                    </AutoHeightImageWrapper>
                  )}
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
}

Slider.propTypes = {
  photo: PropTypes.array,
  sliderOn: PropTypes.bool,
  setSliderOn: PropTypes.func,
  sliderClose: PropTypes.func,
};


export const AutoHeightImageWrapper = styled.div`
width: 100%;
&>span {
  position: unset !important;
  & .autoImage{
    object-fit: contain !important;
    position: relative !important;
    height: auto !important;
  }
}
`

export default Slider;