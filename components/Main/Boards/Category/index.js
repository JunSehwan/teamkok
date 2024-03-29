import React from 'react';
import PropTypes from 'prop-types';

const index = ({
  name,
  number,
  // category,
  setCategory,
  onChangeCategory,
  index,
}) => {

  return (
    <button
      onClick={() => onChangeCategory(number)}
      className="px-2 py-1.5 text-sm rounded-lg ml-1 bg-sky-50 text-blue-800 hover:bg-sky-500 hover:text-white mb-1 shadow"
      key={number}
    >
      {name}
    </button>
  );
};

index.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  // category: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  // ]),
  setCategory: PropTypes.func,
  onChangeCategory: PropTypes.func,
  index: PropTypes.number
};


export default index;