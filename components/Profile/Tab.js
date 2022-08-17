import React from 'react';
import PropTypes from 'prop-types';
import StyleProfile from './StyleProfile';
import BasicInfo from './BasicInfo';
import SecondProfile from './SecondProfile';


const Tab = ({ tabIndex, setTabIndex }) => {
 
 
  return (
    <div className="flex flex-col px-4 mx-auto space-y-12 max-w-7xl xl:px-12">
      <div className="relative">
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 max-w-[38rem] mx-auto list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-1 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-[1rem] font-bold uppercase px-3 py-3 shadow-lg rounded block leading-normal " +
                    (tabIndex === 1
                      ? "text-white bg-purple-600"
                      : "text-purple-600 bg-white")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setTabIndex(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  기본정보
                </a>
              </li>
              <li className="-mb-px mr-1 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-[1rem] font-bold uppercase px-3 py-3 shadow-lg rounded block leading-normal " +
                    (tabIndex === 2
                      ? "text-white bg-purple-600"
                      : "text-purple-600 bg-white")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setTabIndex(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  경력/학력관리
                </a>
              </li>
              <li className="-mb-px mr-1 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-[1rem] font-bold uppercase px-3 py-3 shadow-lg rounded block leading-normal " +
                    (tabIndex === 3
                      ? "text-white bg-purple-600"
                      : "text-purple-600 bg-white")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setTabIndex(3);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  내스타일
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full rounded">
              <div className="flex-auto">
                <div className="tab-content tab-space">
                  <div className={tabIndex === 1 ? "block" : "hidden"} id="link1">
                    <BasicInfo setTabIndex={setTabIndex} />
                  </div>
                  <div className={tabIndex === 2 ? "block" : "hidden"} id="link2">
                    <SecondProfile />
                  </div>
                  <div className={tabIndex === 3 ? "block" : "hidden"} id="link3">
                    <StyleProfile />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Tab.propTypes = {
  tabIndex: PropTypes.number,
  setTabIndex: PropTypes.func,
};

export default Tab;