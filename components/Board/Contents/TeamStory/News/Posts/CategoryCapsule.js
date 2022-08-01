import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

const CategoryCapsule = ({ name, category, onChangeCategory, index,number }) => {


  return (
    <li key={name} className="mr-[6px] border-gray-400 flex flex-row mb-1 mt-1">
      <button onClick={() => onChangeCategory(number)}
        type='button'
        className={number === category ? `bg-violet-500 text-white text-center transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer hover:bg-violet-600 click:active:checked:focus:bg-violet-600 dark:bg-gray-800 rounded-full flex flex-1 items-center p-1`
          : `text-center transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-gray-400 hover:bg-gray-600 click:active:checked:focus:bg-gray-700 dark:bg-gray-800 text-white rounded-full flex flex-1 items-center p-1`
        }>
        <div className="flex-1 px-2 text-center ">
          <div className="text-base leading-snug font-normal dark:text-white">
            {name}
          </div>

        </div>
      </button>
    </li>
  );
};

CategoryCapsule.propTypes = {
  name: PropTypes.string,
  onChangeCategory: PropTypes.func,
  category: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setCategory: PropTypes.func,
  index: PropTypes.number,
}

export default CategoryCapsule;