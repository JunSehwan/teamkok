import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

const StyleCard = ({ title, onChangeCategory, sub, src, tag, category, setCategory, index, number }) => {


  return (
    <li key={index} className="mx-[auto] border-gray-400 flex flex-row mb-2 w-[100%]">
      <button onClick={onChangeCategory(number)}
        className={number === category ? `bg-sky-300 text-left transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer hover:bg-sky-200 click:active:checked:focus:bg-sky-300 dark:bg-gray-800 rounded-md flex flex-1 items-center p-4`
          : `text-left transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white hover:bg-sky-200 click:active:checked:focus:bg-sky-300 dark:bg-gray-800 rounded-md flex flex-1 items-center p-4`
        }>
        <div className="flex flex-col h-10 justify-center items-center mr-1">
          <a href="#" className="block relative">
            <Image
              className="mx-auto object-cover rounded-full h-14 w-14"
              src={src || ""}
              width={46}
              height={46}
              unoptimized
              alt="Style picture"
            />
          </a>
        </div>
        <div className="flex-1 pl-3 ">
          <div className="leading-snug font-bold dark:text-white text-lg">
            {title}
          </div>
          <div className="text-gray-500 dark:text-gray-200 text-xs">
            {sub}
          </div>
          <div className="text-violet-500 dark:text-gray-200 text-xs">
            {tag}
          </div>
        </div>
        <div className="w-[2rem] text-right flex justify-end">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
        </div>
      </button>
    </li>
  );
};

StyleCard.propTypes = {
  title: PropTypes.string,
  onChangeCategory: PropTypes.func,
  sub: PropTypes.string,
  src: PropTypes.string,
  tag: PropTypes.string,
  category: PropTypes.number,
  setCategory: PropTypes.func,
  index: PropTypes.number,
  number: PropTypes.number,
}

export default StyleCard;