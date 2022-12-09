import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

const CategoryCapsule = ({ name, category, onChangeCategory, index,number }) => {


  return (
    <li key={name} className="mr-[6px] border-stone-400 flex flex-row">
      <button onClick={() => onChangeCategory(number)}
        type='button'
        className={number === category ? `bg-blue-500 text-white text-center transition duration-500 shadow ease-in-out transform select-none cursor-pointer hover:bg-blue-600 click:active:checked:focus:bg-blue-600 dark:bg-gray-800 rounded-full flex flex-1 items-center p-1 h-fit mb-1`
          : `text-center transition duration-500 shadow ease-in-out transform select-none cursor-pointer bg-white border-solid-0.5 border-gray-100 hover:bg-gray-600 click:active:checked:focus:bg-gray-700 dark:bg-gray-800 text-gray-700 hover:text-white rounded-full flex flex-1 items-center p-1 h-fit mb-1`
        }>
        <div className="flex-1 px-2 text-center ">
          <div className="text-base leading-snug font-normal dark:text-white whitespace-nowrap">
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