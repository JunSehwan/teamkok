import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const CategoryBox = ({ title, keyNumber }) => {
  return (
    <div>
      <input type="radio" id={title} name="category" value={keyNumber} className="hidden peer" />
      <label htmlFor={title} className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex flex-row">

          <div>
            <div className="w-full text-lg font-semibold">{title}</div>
          </div>
        </div>
        <svg aria-hidden="true" className="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </label>
    </div>
  );
};

CategoryBox.propTypes = {
  title: PropTypes.string,
  keyNumber: PropTypes.number,
};

export default CategoryBox;