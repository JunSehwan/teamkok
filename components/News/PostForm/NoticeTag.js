import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

const NoticeTag = ({ name, category, setCategory, onChangeCategory, index }) => {


  return (
    <li className="mr-[4px] border-gray-400 flex flex-row mb-1 mt-1">
      <button onClick={() => onChangeCategory(index)}
        type='button'
        className={index + 1 === category ? `bg-blue-600 text-white text-center transition duration-500 shadow ease-in-out transform hover:-translate-y-1 select-none cursor-pointer hover:bg-blue-800 click:active:checked:focus:bg-blue-300 dark:bg-gray-800 rounded-full flex flex-1 items-center p-1`
          : `text-center transition duration-500 shadow ease-in-out transform hover:shadow-sm select-none cursor-pointer bg-white hover:bg-gray-100  dark:bg-gray-800 text-gray-700 rounded-full flex flex-1 items-center p-1`
        }>
        <div className="flex-1 px-2 text-center ">
          <div className="text-sm leading-snug font-normal dark:text-white">
            {name}
          </div>

        </div>
      </button>
    </li>
  );
};

NoticeTag.propTypes = {
  name: PropTypes.string,
  onChangeCategory: PropTypes.func,
  category: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setCategory: PropTypes.func,
  index: PropTypes.number,
}

export default NoticeTag;