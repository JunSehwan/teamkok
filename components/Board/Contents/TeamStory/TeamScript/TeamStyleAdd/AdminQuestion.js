import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ key, state, value, name, onChangeSurvey }) => {


  return (
    <div className='flex  flex-col w-[100%] justify-between bg-slate-50 shadow-inner  md:justify-center rounded-lg mx-auto py-6 px-2  mb-3'>

      <div className='mb-[1.8rem]'>
        <span className='font-bold text-sm text-gray-600'>{name}</span>
      </div>

      <div className='flex w-[100%] justify-between '>

        <button
          onClick={onChangeSurvey(value, 1)}
          className=
          {`${state[value] === 1 ?
            'bg-violet-500 flex group sm:min-w-[5rem] px-[8px] py-[4px] hover:bg-purple-500 hover:shadow-lg hover-dark-shadow rounded-full mx-1 transition-all	duration-300	 cursor-pointer justify-center'
            :
            'flex group sm:min-w-[5rem] px-[8px] py-[4px] hover:bg-purple-500 hover:shadow-lg hover-dark-shadow rounded-full mx-1 transition-all	duration-300	 cursor-pointer justify-center'
            }`}
        >
          <div className='flex items-center px-1 py-1'>
            <div className='text-center'>
              <p 
                className=
                {`${state[value] === 1 ?
                  'text-white font-bold group-hover:text-gray-100 text-sm transition-all  group-hover:font-semibold duration-300'
                  :
                  'text-blue-700 group-hover:text-gray-100 text-sm transition-all  group-hover:font-semibold duration-300'
                  }`}
              >
                매우그렇다</p>
            </div>
          </div>
        </button>

        <button
          onClick={onChangeSurvey(value, 2)}
          className=
          {`${state[value] === 2 ?
            'bg-violet-500 flex group sm:min-w-[5rem] px-[8px] py-[4px] hover:bg-purple-500 hover:shadow-lg hover-dark-shadow rounded-full mx-1 transition-all	duration-300	 cursor-pointer justify-center'
            :
            'flex group sm:min-w-[5rem] px-[8px] py-[4px] hover:bg-purple-500 hover:shadow-lg hover-dark-shadow rounded-full mx-1 transition-all	duration-300	 cursor-pointer justify-center'
            }`}
          >
          <div className='flex items-center px-1 py-1'>
            <div className='text-center'>
              <p
                className=
                {`${state[value] === 2 ?
                  'text-white font-bold group-hover:text-gray-100 text-sm transition-all  group-hover:font-semibold duration-300'
                  :
                  'text-blue-500 group-hover:text-gray-100 text-sm transition-all  group-hover:font-semibold duration-300'
                  }`}
              >
                그렇다</p>
            </div>
          </div>
        </button>

        <button
          onClick={onChangeSurvey(value, 3)}
          className=
          {`${state[value] === 3 ?
            'bg-violet-500 flex group sm:min-w-[5rem] px-[8px] py-[4px] hover:bg-purple-500 hover:shadow-lg hover-dark-shadow rounded-full mx-1 transition-all	duration-300	 cursor-pointer justify-center'
            :
            'flex group sm:min-w-[5rem] px-[8px] py-[4px] hover:bg-purple-500 hover:shadow-lg hover-dark-shadow rounded-full mx-1 transition-all	duration-300	 cursor-pointer justify-center'
            }`}
        >
          <div className='flex items-center px-1 py-1'>
            <div className='text-center'>
              <p
                className=
                {`${state[value] === 3 ?
                  'text-white font-bold group-hover:text-gray-100 text-sm transition-all  group-hover:font-semibold duration-300'
                  :
                  'text-gray-600 group-hover:text-gray-100 text-sm transition-all  group-hover:font-semibold duration-300'
                  }`}
              >
                보통</p>
            </div>
          </div>
        </button>
        <button
          onClick={onChangeSurvey(value, 4)}
          className=
          {`${state[value] === 4 ?
            'bg-violet-500 flex group sm:min-w-[5rem] px-[8px] py-[4px] hover:bg-purple-500 hover:shadow-lg hover-dark-shadow rounded-full mx-1 transition-all	duration-300	 cursor-pointer justify-center'
            :
            'flex group sm:min-w-[5rem] px-[8px] py-[4px] hover:bg-purple-500 hover:shadow-lg hover-dark-shadow rounded-full mx-1 transition-all	duration-300	 cursor-pointer justify-center'
            }`}
        >
          <div className='flex items-center px-1 py-1'>
            <div className='text-center'>
              <p
                className=
                {`${state[value] === 4 ?
                  'text-white font-bold group-hover:text-gray-100 text-sm transition-all  group-hover:font-semibold duration-300'
                  :
                  'text-red-500 group-hover:text-gray-100 text-sm transition-all  group-hover:font-semibold duration-300'
                  }`}
              >
                아니다</p>
            </div>
          </div>
        </button>

        <button
          onClick={onChangeSurvey(value, 5)}
          className=
          {`${state[value] === 5 ?
            'bg-violet-500 flex group sm:min-w-[5rem] px-[8px] py-[4px] hover:bg-purple-500 hover:shadow-lg hover-dark-shadow rounded-full mx-1 transition-all	duration-300	 cursor-pointer justify-center'
            :
            'flex group sm:min-w-[5rem] px-[8px] py-[4px] hover:bg-purple-500 hover:shadow-lg hover-dark-shadow rounded-full mx-1 transition-all	duration-300	 cursor-pointer justify-center'
            }`}
        >
          <div className='flex items-center px-1 py-1'>
            <div className='text-center'>
              <p
                className=
                {`${state[value] === 5 ?
                  'text-white font-bold group-hover:text-gray-100 text-sm transition-all  group-hover:font-semibold duration-300'
                  :
                  'text-red-700 group-hover:text-gray-100 text-sm transition-all  group-hover:font-semibold duration-300'
                  }`}
              >
                전혀아니다</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

Question.propTypes = {
  key: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  state: PropTypes.object,
  onChangeSurvey: PropTypes.func,
}

export default Question;