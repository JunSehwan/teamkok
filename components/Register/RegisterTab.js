import React from 'react';
import PropTypes from 'prop-types';
import Signup from './Signup.js';
import Login from './Login';

const RegisterTab = ({ tabIndex, setTabIndex, handleCancelModal }) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
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
              회원가입
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
              로그인
            </a>
          </li>
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full rounded">
          <div className="flex-auto">
            <div className="tab-content tab-space">
              <div className={tabIndex === 1 ? "block" : "hidden"} id="link1">
                <Signup
                  handleCancelModal={handleCancelModal}
                />
              </div>
              <div className={tabIndex === 2 ? "block" : "hidden"} id="link2">
                <Login
                  handleCancelModal={handleCancelModal}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterTab.propTypes = {
  tabIndex: PropTypes.number,
  setTabIndex: PropTypes.func,
  handleCancelModal: PropTypes.func,
};

export default RegisterTab;