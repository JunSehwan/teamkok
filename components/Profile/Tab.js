import React from 'react';
import PropTypes from 'prop-types';
import AdditionalInfo from './AdditionalInfo';
import MyCompany from './MyCompany';
import BasicInfo from './BasicInfo';

const Tab = ({ tabIndex, setTabIndex }) => {
  return (
    <div className="flex flex-col px-4 mx-auto space-y-12 max-w-7xl xl:px-12">
      <div className="relative">
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 max-w-[32rem] mx-auto list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-[0.88rem] font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
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
                  기본프로필
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-[0.88rem] font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
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
                  부가설문
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-[0.88rem] font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
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
                  내 기업
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full rounded">
              <div className="flex-auto">
                <div className="tab-content tab-space">
                  <div className={tabIndex === 1 ? "block" : "hidden"} id="link1">
                    <BasicInfo />
                  </div>
                  <div className={tabIndex === 2 ? "block" : "hidden"} id="link2">
                    <AdditionalInfo />
                  </div>
                  <div className={tabIndex === 3 ? "block" : "hidden"} id="link3">
                    <MyCompany />
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