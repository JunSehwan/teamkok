import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { updateMycompanyInfo } from 'firebaseConfig';
import { patchMycompanyInfo, patchMycompanyInfofalse } from 'slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { FcDepartment, FcPortraitMode, FcReadingEbook, FcNightPortrait } from 'react-icons/fc';
import { IoMdArrowRoundBack } from 'react-icons/io';

import toast, { Toaster } from 'react-hot-toast';

const GroupBasicInfo = () => {

  const { user, patchMycompanyInfoDone } = useSelector(state => state.user);
  // const [purpose, setPurpose] = useState();
  const dispatch = useDispatch();
  const notify = () => toast('기본정보 업데이트 완료');

  //회사명
  const [mycompany, setMycompany] = useState(user?.mycompany || "");
  const [mycompanyError, setMycompanyError] = useState(false);
  const onChangeMycompany = useCallback((e) => {
    setMycompany(e.target.value);
    setMycompanyError(false);
  }, [])

  //직위명
  const [myposition, setMyposition] = useState(user?.myposition || "");
  const [mypositionError, setMypositionError] = useState(false);
  const onChangeMyposition = useCallback(
    e => {
      setMyposition(e.target.value);
      setMypositionError(false);
    },
    []
  );

  // 부서명
  const [mysection, setMysection] = useState(user?.mysection || "");
  const [mysectionError, setMysectionError] = useState(false);
  const onChangeMysection = useCallback(e => {
    setMysection(e.target.value);
    setMysectionError(false);
  },
    []
  );

  // 회사형태
  const [mytype, setMytype] = useState(user?.mytype || "");
  const [mytypeError, setMytypeError] = useState(false);
  const onChangeMytype = useCallback((e) => {
    setMytype(e.target.value);
    setMytypeError(false);
  }, [])

  // 기업이메일
  const [companyemail, setCompanyemail] = useState(user?.companyemail || "");
  const [companyemailError, setCompanyemailError] = useState(false);
  const onChangeCompanyemail = useCallback((e) => {
    setCompanyemail(e.target.value);
    setCompanyemailError(false);
  }, [])

  function email_check(email) {
    var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(email);
  }

  const onSubmit = useCallback(async (e) => {
    if (mycompany?.length === 0 || !mycompany) {
      document.getElementById('mycompany').focus();
      return setMycompanyError(true);
    }
    if (companyemail?.length === 0 || !companyemail) {
      document.getElementById('companyemail').focus();
      return setCompanyemailError(true);
    }
    if (!email_check(companyemail)) {
      return setCompanyemailError(true);
    }
    if (mysection?.length === 0 || !mysection) {
      document.getElementById('mysection').focus();
      return setMysectionError(true);
    }
    if (myposition?.length === 0 || !myposition) {
      document.getElementById('myposition').focus();
      return setMypositionError(true);
    }

    if (mytype?.length === 0 || !mytype) {
      document.getElementById('mytype').focus();
      return setMytypeError(true);
    }

    const res = await updateMycompanyInfo(
      mycompany, myposition, mysection, mytype, companyemail,
    );
    dispatch(patchMycompanyInfo(res));
  }, [companyemail, dispatch, mycompany, myposition, mysection, mytype])

  useEffect(() => {
    if (patchMycompanyInfoDone) {
      notify();
      dispatch(patchMycompanyInfofalse());
    }
  }, [dispatch, patchMycompanyInfoDone])


  return (
    <div className='py-8'>
      <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 my-4 w-full pl-2'>
        🏢팀계정 기초정보</h3>
      <p className='ml-2 my-1 text-gray-500 text-[1.2rem] leading-8'>팀에 대한 기초정보</p>

      <div className='py-4 px-2'>
        <div className="py-4">
          <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="mycompany">
            어떤 회사(그룹)에서 근무중이십니까?
          </label>
          <input
            className={mycompanyError ?
              "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              :
              "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            id="mycompany"
            type="text"
            placeholder="(e.g. 삼성전자)"
            onChange={onChangeMycompany}
            value={mycompany}
          />
          {mycompanyError ? (
            <p className="text-xs mt-[0.3rem] italic text-red-500">회사(그룹)명을 입력해주세요.</p>
          ) : null}
        </div>

        <div className="py-4">
          <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="companyemail">
            회사에서 사용하는 이메일 주소를 작성해주세요.
          </label>
          <input
            className={companyemailError ?
              "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              :
              "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            id="companyemail"
            type="email"
            placeholder="hong-gildong@company.com"
            onChange={onChangeCompanyemail}
            value={companyemail}
          />
          {companyemailError ? (
            <p className="text-xs mt-[0.3rem] italic text-red-500">이메일을 형식에 맞게 입력해주세요.</p>
          ) : null}
        </div>

        <div className="py-4">
          <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="mysection">
            팀명을 적어주세요.
          </label>
          <input
            className={mysectionError ?
              "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              :
              "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            id="mysection"
            type="text"
            placeholder="인사부서"
            onChange={onChangeMysection}
            value={mysection}
          />
          {mysectionError ? (
            <p className="text-xs mt-[0.3rem] italic text-red-500">팀명을 작성해주세요.</p>
          ) : null}
        </div>

        <div className="py-4">
          <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="myposition">
            직급을 적어주세요.
          </label>
          <input
            className={mypositionError ?
              "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              :
              "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            id="myposition"
            type="text"
            placeholder="대리"
            onChange={onChangeMyposition}
            value={myposition}
          />
          {mypositionError ? (
            <p className="text-xs mt-[0.3rem] italic text-red-500">직위(직급)을 작성해주세요.</p>
          ) : null}
        </div>

        <div className="py-4">
          <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="mytype">
            소속회사(그룹)은 어떤 형태입니까?
          </label>
          <select
            className={mytypeError ?
              "block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              :
              "block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            id="mytype"
            type="text"
            onChange={onChangeMytype}
            value={mytype}
          >
            <option value="">선택</option>
            <option value={1} key={1}>대기업</option>
            <option value={2} key={2}>중견기업</option>
            <option value={3} key={3}>중소기업</option>
            <option value={4} key={4}>스타트업</option>
            <option value={5} key={5}>공공기관</option>
            <option value={6} key={6}>외국계기업</option>
            <option value={99} key={99}>기타</option>
          </select>
          {mytypeError ? (
            <p className="text-xs mt-[0.3rem] italic text-red-500">회사형태를 선택해주세요.</p>
          ) : null}
        </div>

        <div className="w-full justify-end flex items-center">
          <button onClick={onSubmit}
            className="my-2 px-6 text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg">
            기본정보 업데이트</button>
        </div>
      </div>

    </div>
  );
};

export default GroupBasicInfo;