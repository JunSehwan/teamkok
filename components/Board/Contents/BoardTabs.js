import React from 'react';
import PropTypes from 'prop-types';
import AdminPage from './AdminPage';
import TeamStory from './TeamStory';
import Dialog from './Dialog';

const Tab = ({ tabIndex, setTabIndex }) => {
  return (
    <div className="flex flex-col w-[100%] px-4 mx-auto space-y-6 max-w-7xl xl:px-6">
      <div className="relative">
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 mt-6 max-w-[32rem] mx-auto list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li key="11" className="-mb-px mr-1 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-[1.08rem] font-bold uppercase px-3 py-3 shadow-lg rounded block leading-normal " +
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
                  팀스토리
                </a>
              </li>
              <li key="22" className="-mb-px mr-1 last:mr-0 flex-auto text-center">
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
                  1:1대화
                </a>
              </li>
              <li key="33" className="-mb-px mr-1 last:mr-0 flex-auto text-center">
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
                  채용관리
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words w-full rounded">
              <div className="flex-auto">
                <div className="tab-content tab-space">
                  <div className={tabIndex === 1 ? "block" : "hidden"} id="link1">
                    <TeamStory />
                  </div>
                  <div className={tabIndex === 2 ? "block" : "hidden"} id="link2">
                    <Dialog />
                  </div>
                  <div className={tabIndex === 3 ? "block" : "hidden"} id="link3">
                    <AdminPage />
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