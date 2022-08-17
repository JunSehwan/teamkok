import React from 'react';
import PropTypes from 'prop-types';
import AdminPage from 'components/Board/Contents/AdminPage';
import TeamStory from 'components/Board/Contents/TeamStory';
import ChatContents from 'components/Board/Chat/ChatContents';
import { useSelector } from 'react-redux';

const Tab = ({ tabIndex, setTabIndex }) => {

  const { isExpert, isAdmin } = useSelector(state => state.user);

  return (
    <div className="bg-slate-50 flex flex-col w-[100%] mx-auto space-y-6 xl:px-0">
      <div className="relative">
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="w-full bg-slate-100 shadow flex justify-center mb-0 mt-0 mx-auto list-none flex-wrap pt-3 pb-3 flex-row"
              role="tablist"
            >
              <li key="11" className="mr-1 max-w-[12rem] last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-[1rem] font-bold uppercase h-full py-3 shadow w-full rounded block leading-normal " +
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
              <li key="22" className="mr-1 max-w-[12rem] last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-[1rem] font-bold uppercase h-full py-3 shadow w-full rounded block leading-normal " +
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

              {!!isAdmin || !!isExpert ?
                <li key="33" className="mr-1 max-w-[12rem] last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-[1rem] font-bold uppercase h-full py-3 shadow w-full rounded block leading-normal " +
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
                : null
              }
            </ul>
            <div className="relative flex flex-col min-w-0 break-words w-full rounded">
              <div className="flex-auto">
                <div className="tab-content tab-space">
                  <div className={tabIndex === 1 ? "block" : "hidden"} id="link1">
                    <TeamStory />
                  </div>
                  <div className={tabIndex === 2 ? "block" : "hidden"} id="link2">
                    <ChatContents />
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