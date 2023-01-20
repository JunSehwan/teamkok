import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { patchAdditionalInfo } from 'firebaseConfig';
import { updateAdditionalInfo, updateAdditionalInfoDoneFalse } from 'slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Empty from 'components/Common/Empty';
import hangjungdong from 'components/Common/Address';

const Eightth = ({ goNextStage, goNews, goPrevStage, goCertStage }) => {

  const { user, updateAdditionalInfoDone } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateAdditionalInfoDone) {
      setLink();
      dispatch(updateAdditionalInfoDoneFalse());
      goNextStage();
    }
  }, [updateAdditionalInfoDone, dispatch, goNextStage])
  useEffect(() => {
    setLinks(user?.links || []);
  }, [user?.links])

  // 링크추가
  const [link, setLink] = useState();
  const [links, setLinks] = useState(user?.links || []);
  const onChangeLink = useCallback(e => {
    setLink([e.target.value, ...links]);
  }, [links]);
  const onClick = useCallback(() => {
    if (link?.length == 0) { return }
    if (!!link || link !== "") {
      setLinks([link, ...links])
      setLink("");
    }
  }, [link, links])
  const onKeyPress = useCallback((e) => {
    if (e.key == 'Enter') {
      onClick();
    }
  }, [onClick])
  const onChangeLinks = useCallback((e) => {
    // setLink([e.target.value, ...link]);
    setLink(e.target.value);
  }, []);

  const onRemoveLink = useCallback((index) => {
    setLinks(links?.filter(v => v !== index))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links]);


  const [address, setAddress] = useState(user?.address || "");
  const [addressError, setAddressError] = useState(false);
  const onChangeAddress = useCallback((e) => {
    setAddress(e.target.value);
    setAddressError(false);
  }, [])

  const [address_sido, setAddress_sido] = useState(user?.address_sido || "");
  const onChangeAddress_sido = useCallback((e) => {
    setAddress_sido(e.target.value);
    setAddressError(false);
  }, [])
  const { sido, sigugun, dong } = hangjungdong;

  // 추가설명
  const [additionalMent, setadditionalMent] = useState(user?.additionalMent || "");
  const onChangeadditional = useCallback((e) => {
    setadditionalMent(e.target.value);
  }, [])


  const onSubmit = useCallback(async (e) => {
    if (!address) {
      document.getElementById('address').focus();
      return setAddressError(true);
    }
    if (!address_sido || address_sido == "") {
      document.getElementById('address').focus();
      return setAddressError(true);
    }
    // if (!val1 || !val2 || !val3 || !val4) {
    //   document.getElementById('val4').focus();
    //   return setAddressError(true);
    // }

    // var address = val1 + "-" + val2 + "-" + val3 + "-" + val4;
    const res = await patchAdditionalInfo(
      address_sido, address, links, additionalMent
    );
    dispatch(updateAdditionalInfo(res));
  }, [address_sido, address, links, additionalMent, dispatch])

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
      <div className='py-4 backdrop-blur-md	'>
        <div className='mx-auto text-left'>
          <div className='w-full flex justify-start items-center'>
            <div className='w-max'>
              <div className='flex justify-start items-center'>
                <button className="text-gray-600 p-3 rounded-full hover:bg-gray-100"
                  onClick={() => goCertStage(7)}
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


          <h3 className='sm:text-[2.1rem] text-[1.8rem] text-gray-700 my-2 w-full pl-2'>
            🔎추가정보 등록</h3>

          <div className='overflow-y-auto py-4 px-2'>

            <div className="max-w-[720px] py-4">
              <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="address">
                거주지 주소<span className='text-red-600'>*</span>
              </label>

              <div>
                <div className='flex sm:flex-row flex-col gap-2'>
                  <select
                    className={addressError ?
                      "block w-auto p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                      :
                      "block w-auto p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    defaultValue={user?.address_sido || ""}
                    onChange={(e) => onChangeAddress_sido(e)}>
                    <option value="">시/도 선택</option>
                    {sido?.map((el) => (
                      <option key={el?.codeNm} value={el?.codeNm}>
                        {el?.codeNm}
                      </option>
                    ))}
                  </select>

                  <input
                    className={addressError ?
                      "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 sm:mt-0"
                      :
                      "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:mt-0"
                    }
                    id="address"
                    type="address"
                    placeholder="(e.g. 서울특별시 관악구 신림동)"
                    // onChange={(e) => setVal4(e.target.value)}
                    // value={val4}
                    onChange={onChangeAddress}
                    value={address}
                  />
                </div>
                {addressError ? (
                  <p className="text-xs mt-[0.3rem] italic text-red-500">주소를 작성해주세요.</p>
                ) : null}
              </div>
            </div>

            <div className="max-w-[720px] py-4">
              <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="link">
                링크(SNS 계정 및 포트폴리오)
              </label>
              <div
                className='min-h-[144px] shadow-inner mb-[8px] mt-[4px] p-3 rounded-xl bg-gray-100 pb-[5px]'
                id="skill"
              >
                {links?.length !== 0 ?
                  links?.map(v => (
                    <button
                      className='inline-flex mr-[4px] mb-[6px] text-sm py-2 px-3 bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-fuchsia-500 focus:ring-offset-fuchsia-200 text-white transition ease-in duration-200 text-center font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'
                      type="button"
                      onClick={() => onRemoveLink(v)}
                      key={v}
                    // onClick={() => onChangeLink(v)}
                    >
                      {v}
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-[4px] h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  )) : <Empty text="URL을 입력해주세요" />}
              </div>
              <div className='w-full flex flex-col md:flex-row items-center gap-2'>
                <input
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="link"
                  type="text"
                  placeholder="(e.g. https://www.abc.co.kr + Enter)"
                  onKeyPress={onKeyPress}
                  onChange={onChangeLinks}
                  value={link || ""}
                />
                <button
                  className='mb-2 w-full md:w-[70px] text-md py-5 px-4 font-bold text-white bg-sky-400 hover:bg-sky-500  focus:outline-none focus:shadow-outline rounded-lg'
                  onClick={onClick}
                >
                  등록</button>
              </div>
            </div>

            <div className="max-w-[720px] py-4">
              <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="additionalMent">
                마지막으로, {user?.username}님에 대한 짧은 소개, 혹은 <span className="text-blue-700">커리어 고민</span>을 남겨주세요!
              </label>
              <textarea
                className="block w-full h-32 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="additionalMent"
                type="text"
                placeholder="추가로 어필할 내용이 있다면 작성해주세요.(프로젝트, 자격증 등)"
                onChange={onChangeadditional}
                value={additionalMent}
              />

            </div>

          </div>
        </div>
      </div>



      <div className='w-full justify-center flex flex-col items-center px-2'>
        <button className="my-3 py-1 w-[12rem] text-gray-500 text-[14px] underline" onClick={goNews}>나중에 하기</button>
        <button className='my-2 w-full text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg' onClick={onSubmit}>다음</button>
      </div>
    </div>
  );
};

Eightth.propTypes = {
  goNextStage: PropTypes.func,
  goNews: PropTypes.func,
  goPrevStage: PropTypes.func,
  goCertStage: PropTypes.func,
};

export default Eightth;