import React from 'react';
import Survey from 'components/Common/Survey';
import PropTypes from 'prop-types';

const SurveyContainer = ({ survey }) => {
  return (
    <>
      {survey &&
        Survey?.map((v, i) => (
          <div
            key={i}
            className='flex flex-col w-[100%] mx-auto py-2 px-2 bg-gray-50 rounded text-left md:mx-4 mb-2'>
            <span className='text-sm font-normal text-gray-600 py-[4px]'>{v?.name}</span>
              <div className='flex w-[100%] justify-between'>
                <div
                  className=
                  'flex group sm:min-w-[5rem] py-[4px] text-left'
                >
                  <div className='flex items-centerpy-1'>
                      <p
                        className=
                        'text-gray-700 text-sm transition-all duration-300'
                      >
                        {survey[v.value] &&
                          <span>{(() => {
                            switch (survey[v.value]) {
                              case 1: return (<span className="text-blue-800">매우 그렇다</span>)
                              case 2: return (<span className="text-blue-400">그렇다</span>)
                              case 3: return (<span className="text-gray-500">보통</span>)
                              case 4: return (<span className="text-red-400">아니다</span>)
                              case 5: return (<span className="text-red-800">전혀 아니다</span>)
                              default: null;
                            }
                          })(survey[v.value])}</span>
                        }
                      </p>
                    </div>
                </div>
              </div>
          </div>
        ))
      }
    </>
  );
};

SurveyContainer.propTypes = {
  survey: PropTypes.object,
};


export default SurveyContainer;