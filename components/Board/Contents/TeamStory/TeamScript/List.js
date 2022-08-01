import React from 'react';
import PropTypes from 'prop-types';

const List = ({ headicon, question, answer }) => {
  return (
    <li key={question} className="block items-center text-sky-700 dark:text-gray-200 py-3 border-b-2 border-gray-100 dark:border-gray-800">
      <div className="flex justify-between">
        <div className="flex items-center justify-start text-lg">
          <span className="mx-2">
            {headicon}
          </span>
          <span className='font-semibold'>
            {question}
          </span>
        </div>
      </div>
      <div className="flex items-start justify-start text-base">
        <span className='whitespace-pre-wrap leading-normal font-normal text-gray-600 pt-1 ml-5 pl-3 mb-1'>
          {answer}
        </span>
      </div>
    </li>
  );
};

List.propTypes = {
  headicon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  question: PropTypes.string,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default List;