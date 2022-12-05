import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { patchAdditionalInfoInProfile } from 'firebaseConfig';
import { updateAdditionalInfoInProfile, updateAdditionalInfoDoneFalseInProfile } from 'slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Empty from 'components/Common/Empty';
import toast from 'react-hot-toast';

const index = ({ goNextStage, goNews, goPrevStage, goCertStage }) => {

  const { user, updateAdditionalInfoDone } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const notify = () => toast('부가정보 업데이트 성공!');

  useEffect(() => {
    if (updateAdditionalInfoDone) {
      setLink();
      notify();
      dispatch(updateAdditionalInfoDoneFalseInProfile());
    }
  }, [updateAdditionalInfoDone, dispatch])
  useEffect(() => {
    setLinks(user?.links || []);
  }, [user?.links])

  // 링크추가
  const [link, setLink] = useState();
  const [links, setLinks] = useState(user?.links || []);

  const onClick = useCallback(() => {
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


  // 추가설명
  const [additionalMent, setadditionalMent] = useState(user?.additionalMent || "");
  const onChangeadditional = useCallback((e) => {
    setadditionalMent(e.target.value);
  }, [])


  const onSubmit = useCallback(async (e) => {

    const res = await patchAdditionalInfoInProfile(
      links, additionalMent
    );
    dispatch(updateAdditionalInfoInProfile(res));
  }, [links, additionalMent, dispatch])

  // autoFocus 관련
  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);


  return (
    <div className='w-full flex flex-col justify-between'>
      {/* 뒤로가기 버튼 ==> 첫번째는 없고 두번째부터*/}
      <div className='py-4'>
        <div className='mx-auto text-left'>

          <h3 className='sm:text-[2.1rem] text-[1.8rem] text-gray-700 my-2 w-full'>
            🔎추가정보 등록</h3>

          <div className=''>
            <div className="py-4">
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
                      className='inline-flex mr-[4px] mb-[6px] text-sm py-2 px-3 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'
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
              <div className='w-full flex flex-row items-center'>
                <input
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="link"
                  type="url"
                  placeholder="(e.g. https://www.abc.co.kr + Enter)"
                  onKeyPress={onKeyPress}
                  onChange={onChangeLinks}
                  value={link || ""}
                />
                <button
                  className='my-2 w-[70px] ml-1 text-md py-5 px-4 font-bold text-white bg-sky-400 hover:bg-sky-500  focus:outline-none focus:shadow-outline rounded-lg'
                  onClick={onClick}
                >
                  등록</button>
              </div>
            </div>

            <div className="py-4">
              <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="additionalMent">
                마지막으로, {user?.username}님에 대한 짧은 소개를 작성해주세요.
              </label>
              <textarea
                className="block w-full h-32 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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



      <div className='w-full justify-end flex items-center'>
        <button className='my-2 px-6 text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg' onClick={onSubmit}>추가정보 업데이트</button>
      </div>
    </div>
  );
};

index.propTypes = {
  goNextStage: PropTypes.func,
  goNews: PropTypes.func,
  goPrevStage: PropTypes.func,
  goCertStage: PropTypes.func,
};

export default index;