import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updatePurpose } from 'firebaseConfig';
import { updateUserPurpose, updatePurposeFalse } from 'slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { FcDepartment, FcPortraitMode, FcReadingEbook, FcNightPortrait } from 'react-icons/fc';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Third = ({ goNextStage, goNews, goPrevStage, goCertStage }) => {

  const { user, updatePurposeDone, } = useSelector(state => state.user);
  // const [purpose, setPurpose] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (updatePurposeDone && user?.purpose !== 1) {
      goCertStage(4);

      dispatch(updatePurposeFalse());
    }
    if (updatePurposeDone && user?.purpose === 1) {
      dispatch(updatePurposeFalse());
      goCertStage(11);
    }
  }, [dispatch, goCertStage, goNextStage, updatePurposeDone, user?.purpose])

  const onChange = useCallback(async (e) => {
    const res = await updatePurpose(
      parseInt(e.target.value)
    );
    dispatch(updateUserPurpose(res));
  }, [dispatch])

  return (
    <div className='w-full h-[100vh] flex flex-col justify-between'>
      {/* 뒤로가기 버튼 ==> 첫번째는 없고 두번째부터*/}
      <div className='py-4 bg-[#ffffff51] z-10 backdrop-blur-md	'>
        <div className='mx-auto pl-2 text-left'>
          <div className='w-full flex justify-start items-center'>
            <div className='w-max'>
              <div className='flex justify-start items-center'>
                <button className="text-gray-600 p-3 rounded-full hover:bg-gray-100"
                  onClick={goPrevStage}
                >
                  <IoMdArrowRoundBack className='w-6 h-6' />
                </button>
              </div>
            </div>
            <div className='my-6 px-4 w-full'>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 ">
                <div className="bg-sky-600 text-xs font-medium text-sky-100 text-center p-0.5 leading-none rounded-full w-[27%]">27%</div>
              </div>
            </div>
          </div>
          <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 my-6 w-full pl-2'>
            당신은 현재,</h3>

          <ul className="grid gap-1 w-full md:grid-cols-1 max-w-[720px]">
            <li>
              <input onClick={onChange} type="radio" id="recruiter" name="hosting" value={1} className="hidden peer" required />
              <label htmlFor="recruiter" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex flex-row">
                  <div className='flex justify-center items-center mr-3'>
                    <FcDepartment className='w-10 h-10' />
                  </div>
                  <div>
                    <div className="w-full text-lg font-semibold">그룹담당자로써,</div>
                    <div className="w-full mb-1">같이 일할 인원을 모집하고자 합니다.</div>
                    <div className="bg-gray-100 text-blue-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">기업회원으로 가입됩니다.</div>
                  </div>
                </div>
                <svg aria-hidden="true" className="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </label>
            </li>
            <li>
              <input onClick={onChange} type="radio" id="seeker" name="hosting" value={2} className="hidden peer" />
              <label htmlFor="seeker" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex flex-row">
                  <div className='flex justify-center items-center mr-3'>
                    <FcPortraitMode className='w-10 h-10' />
                  </div>
                  <div>
                    <div className="w-full text-lg font-semibold">구직자로써,</div>
                    <div className="w-full mb-1">이직 또는 취업을 원합니다.</div>
                    <div className="bg-gray-100 text-blue-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">내 정보가 공개되며, 입사제안을 받게됩니다.</div>
                  </div>
                </div>
                <svg aria-hidden="true" className="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </label>
            </li>
            <li>
              <input onClick={onChange} type="radio" id="potential" name="hosting" value={3} className="hidden peer" />
              <label htmlFor="potential" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex flex-row">
                  <div className='flex justify-center items-center mr-3'>
                    <FcReadingEbook className='w-10 h-10' />
                  </div>
                  <div>
                    <div className="w-full text-lg font-semibold">학습자(예비구직자)로써,</div>
                    <div className="w-full mb-1">아직 이직 또는 취업을 원하진 않지만, 일정기간 준비 후 이직을 위해 생각하고 있습니다.</div>
                    <div className="bg-gray-100 text-blue-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">내 정보가 공개되며, 입사제안을 받게됩니다.</div>
                  </div>
                </div>
                <svg aria-hidden="true" className="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </label>
            </li>
            <li>
              <input onClick={onChange} type="radio" id="observer" name="hosting" value={4} className="hidden peer" />
              <label htmlFor="observer" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex flex-row">
                  <div className='flex justify-center items-center mr-3'>
                    <FcNightPortrait className='w-10 h-10' />
                  </div>
                  <div>
                    <div className="w-full text-lg font-semibold">관찰자로써,</div>
                    <div className="w-full mb-1">일단 서비스를 구경하고자 합니다.</div>
                    <div className="bg-gray-100 text-red-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">내 정보가 공개되지 않습니다.</div>
                  </div>
                </div>
                <svg aria-hidden="true" className="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </label>
            </li>
          </ul>
        </div>
      </div>



      <div className='w-full justify-center flex flex-col items-center px-2'>
        <button className="my-3 py-2 w-[12rem] text-gray-500 text-[14px] underline" onClick={goNews}>나중에 하기</button>
        {/* <button className='my-2 w-full text-md py-4 font-bold text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:shadow-outline rounded-lg' onClick={onSubmit}>시작하기</button> */}
      </div>
    </div>
  );
};

Third.propTypes = {
  goNextStage: PropTypes.func,
  goNews: PropTypes.func,
  goPrevStage: PropTypes.func,
  goCertStage: PropTypes.func,
};

export default Third;