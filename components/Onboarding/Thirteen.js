import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { updateMycompanyAdditionalInfo } from 'firebaseConfig';
import { patchMycompanyAdditionalInfo, patchMycompanyAdditionalInfofalse } from 'slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Thirteen = ({ goNextStage, goFriends, goPrevStage, goCertStage }) => {

  const { user, patchMycompanyAdditionalInfoDone } = useSelector(state => state.user);
  const dispatch = useDispatch();

  //사업분야
  const [companyfield, setCompanyfield] = useState(user?.companyfield || "");
  const [companyfieldError, setCompanyfieldError] = useState(false);
  const onChangeCompanyfield = useCallback((e) => {
    setCompanyfield(e.target.value);
    setCompanyfieldError(false);
  }, [])

  //연매출액
  const [companyurl, setCompanyurl] = useState(user?.companyurl || "");
  const onChangeCompanyurl = useCallback(
    e => {
      setCompanyurl(e.target.value);
    },
    []
  );

  // 사업장 주소
  const [companyaddress, setCompanyaddress] = useState(user?.companyaddress || "");
  const [addressError, setAddressError] = useState(false);
  const onChangeCompanyaddress = useCallback((e) => {
    setCompanyaddress(e.target.value);
    setAddressError(false);
  }, [])

  // 종업원 수
  const [staffnumber, setStaffnumber] = useState(user?.staffnumber || "");
  const [staffnumberError, setStaffnumberError] = useState(false);
  const onChangeStaffnumber = useCallback((e) => {
    setStaffnumber(e.target.value);
    setStaffnumberError(false);
  }, [])

  // 추가설명
  const [companyadditional, setCompanyadditional] = useState(user?.companyadditional || "");
  const onChangeCompanyadditional = useCallback((e) => {
    setCompanyadditional(e.target.value);
  }, [])


  const onSubmit = useCallback(async (e) => {
    if (companyfield?.length === 0 || !companyfield) {
      document.getElementById('companyfield').focus();
      return setCompanyfieldError(true);
    }
    // if (!val1 || !val2 || !val3 || !val4) {
    //   document.getElementById('val4').focus();
    //   return setAddressError(true);
    // }
    if (!companyaddress) {
      document.getElementById('companyaddress').focus();
      return setAddressError(true);
    }
    if (staffnumber?.length === 0 || !staffnumber) {
      document.getElementById('staffnumber').focus();
      return setStaffnumberError(true);
    }
    // var companyaddress = val1 + "-" + val2 + "-" + val3 + "-" + val4;
    const res = await updateMycompanyAdditionalInfo(
      companyfield, companyurl, companyaddress, staffnumber, companyadditional
    );
    dispatch(patchMycompanyAdditionalInfo(res));
  }, [companyadditional, companyaddress, companyfield, companyurl, dispatch, staffnumber])

  useEffect(() => {
    if (patchMycompanyAdditionalInfoDone) {
      goNextStage();
      dispatch(patchMycompanyAdditionalInfofalse());
    }
  }, [dispatch, goNextStage, patchMycompanyAdditionalInfoDone])

  // autoFocus 관련
  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <div className='w-full h-[100vh] flex flex-col justify-between'>
      {/* 뒤로가기 버튼 ==> 첫번째는 없고 두번째부터*/}
      <div className='py-4 bg-[#ffffff51] z-10 backdrop-blur-md	'>
        <div className='mx-auto pl-2 text-left'>
          <div className='w-full flex justify-start items-center'>
            <div className='w-max'>
              <div className='flex justify-start items-center'>
                <button className="text-gray-600 p-3 rounded-full hover:bg-gray-100"
                  onClick={() => goCertStage(12)}
                >
                  <IoMdArrowRoundBack className='w-6 h-6' />
                </button>
              </div>
            </div>
            <div className='my-6 px-4 w-full'>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 ">
                <div className="bg-sky-600 text-xs font-medium text-sky-100 text-center p-0.5 leading-none rounded-full w-[88%]">88%</div>
              </div>
            </div>
          </div>
          <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 my-4 w-full pl-2'>
            🔎부가정보 등록</h3>
          <p className='ml-2 my-1 text-gray-500 text-[1.2rem] leading-8'>팀(그룹)에 대해서 어필해주세요.</p>

          <div className='overflow-y-scroll h-[52vh] py-4 px-2'>
            <div className="max-w-[720px] py-4">
              <label
                className="block mb-4 text-md font-bold text-gray-700 "
                htmlFor="companyfield">
                사업분야(업종)<span className='text-red-600'>*</span>
              </label>
              <input
                className={companyfieldError ?
                  "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  :
                  "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                ref={inputElement}
                id="companyfield"
                type="text"
                placeholder="제조업"
                onChange={onChangeCompanyfield}
                value={companyfield}
              />
              {companyfieldError ? (
                <p className="text-xs mt-[0.3rem] italic text-red-500">분야를 작성해주세요.</p>
              ) : null}
            </div>

            <div className="max-w-[720px] py-4">
              <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="companyurl">
                웹사이트
              </label>
              <input
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="companyurl"
                type="text"
                placeholder="(e.g. https://www.abc.co.kr)"
                onChange={onChangeCompanyurl}
                value={companyurl}
              />
            </div>

            <div className="max-w-[720px] py-4">
              <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="companyaddress">
                활동(근무)장소<span className='text-red-600'>*</span>
              </label>

              <div>
                {/* <div className='flex flex-col md:flex-row'>
                  <select
                    className={addressError ?
                      "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                      :
                      "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    onChange={(e) => setVal1(e.target.value)}>
                    <option value="">선택</option>
                    {sido.map((el) => (
                      <option key={el.sido} value={el.sido}>
                        {el.codeNm}
                      </option>
                    ))}
                  </select>
                  <select
                    className={addressError ?
                      "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                      :
                      "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    onChange={(e) => setVal2(e.target.value)}
                    defaultValue="42">
                      "42"
                    <option value="">선택</option>
                    {sigugun
                      .filter((el) => el.sido === val1)
                      .map((el) => (
                        <option key={el.sigugun} value={el.sigugun}>
                          {el.codeNm}
                        </option>
                      ))}
                  </select>
                  <select
                    className={addressError ?
                      "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                      :
                      "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    onChange={(e) => setVal3(e.target.value)}>
                    <option value="">선택</option>
                    {dong
                      .filter((el) => el.sido === val1 && el.sigugun === val2)
                      .map((el) => (
                        <option key={el.dong} value={el.dong}>
                          {el.codeNm}
                        </option>
                      ))}
                  </select>
                </div> */}
                {/* <input
                  className={addressError ?
                    "mt-2 block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    :
                    "mt-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  id="val4"
                  type="text"
                  placeholder="상세주소를 기재해주세요."
                  onChange={(e) => setVal4(e.target.value)}
                  value={val4}
                /> */}
                <input
                  className={addressError ?
                    "mt-2 block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    :
                    "mt-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  id="companyaddress"
                  type="address"
                  placeholder="서울특별시 관악구 신림동"
                  // onChange={(e) => setVal4(e.target.value)}
                  // value={val4}
                  onChange={onChangeCompanyaddress}
                  value={companyaddress}
                />
                {addressError ? (
                  <p className="text-xs mt-[0.3rem] italic text-red-500">주소를 작성해주세요.</p>
                ) : null}
              </div>

            </div>

            <div className="max-w-[720px] py-4">
              <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="staffnumber">
                종업원 수는?<span className='text-red-600'>*</span>
              </label>
              <input
                className={staffnumberError ?
                  "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  :
                  "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                id="staffnumber"
                type="number"
                placeholder="14"
                onChange={onChangeStaffnumber}
                value={staffnumber}
              />
              {staffnumberError ? (
                <p className="text-xs mt-[0.3rem] italic text-red-500">직원수를 입력해주세요.</p>
              ) : null}
            </div>

            <div className="max-w-[720px] py-4">
              <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="companyadditional">
                기업(그룹)에 대한 추가설명을 기재해주세요.
              </label>
              <textarea
                className="block w-full h-32 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="companyadditional"
                type="text"
                placeholder="추가설명 입력"
                onChange={onChangeCompanyadditional}
                value={companyadditional}
              />

            </div>

          </div>
        </div>
      </div>



      <div className='w-full justify-center flex flex-col items-center px-2'>
        <button className="my-3 py-2 w-[12rem] text-gray-500 text-[14px] underline" onClick={goFriends}>나중에 하기</button>
        <button className='my-2 w-full text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg' onClick={onSubmit}>다음</button>
      </div>
    </div>
  );
};

Thirteen.propTypes = {
  goNextStage: PropTypes.func,
  goFriends: PropTypes.func,
  goPrevStage: PropTypes.func,
  goCertStage: PropTypes.func,
};

export default Thirteen;