import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createSkills, getRelatedSkills } from 'firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Empty from 'components/Common/Empty';
import { updateSkills, setUpdateSkillsDoneFalse, loadRelatedSkills } from 'slices/skill';
import toast from 'react-hot-toast';

const index = ({ goNextStage, goNews, goPrevStage, goCertStage }) => {

  const { updateSkillsDone, mySkills, relatedSkills } = useSelector(state => state.skill);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const updatenotify = () => toast('업데이트 완료!');
  useEffect(() => {
    if (updateSkillsDone) {
      setSkill();
      setSkillError(false);
      dispatch(setUpdateSkillsDoneFalse());
      updatenotify();
    }
  }, [updateSkillsDone, dispatch, goNextStage])


  useEffect(() => {
    async function fetchAndSetUser() {
      if (user) {
        await getRelatedSkills(user?.category).then((result) => {
          dispatch(loadRelatedSkills(result));
        })
      }
    }
    fetchAndSetUser();
  }, [dispatch, user, user?.category]);

  const [skill, setSkill] = useState();
  const [skillArr, setSkillArr] = useState(mySkills);
  const [skillError, setSkillError] = useState(false);
  useEffect(() => {
    setSkillArr(mySkills);
  }, [mySkills])
  // const set = new Set(skillArr);
  // const uniqueArr = [...set];
  const uniqueArr = Array.from(new Set(skillArr?.map(a => a?.name)))
    ?.map(name => {
      return skillArr?.find(a => a?.name === name)
    })


  const onChangeSkill = useCallback((value) => {
    setSkillArr([{ category: value.category, name: value.name }, ...skillArr]);
  }, [skillArr]);

  const onClick = useCallback(() => {
    if (!!skill || skill !== "") {
      setSkillArr([{ name: skill, category: user?.category }, ...skillArr])
      setSkill("");
    }
  }, [skill, skillArr, user?.category])
  const onKeyPress = useCallback((e) => {
    if (e.key == 'Enter') {
      onClick();
    }
  }, [onClick])

  const onChangeSkills = useCallback((e) => {
    // setSkill([e.target.value, ...skill]);
    setSkill(e.target.value);
  }, []);

  const onRemoveSkill = useCallback((index) => {
    setSkillArr(uniqueArr?.filter(v => v?.name !== index?.name))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueArr, skillArr]);


  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (uniqueArr?.length === 0) {
      document.getElementById('skill').focus();
      return setSkillError(true);
    }

    const skillResult = {
      skill: uniqueArr,
    };
    const con = await createSkills(uniqueArr);
    dispatch(updateSkills(uniqueArr));

  }, [uniqueArr, dispatch])


  return (
    <div className='w-full flex flex-col'>
      {/* 뒤로가기 버튼 ==> 첫번째는 없고 두번째부터*/}
      <div className='py-2'>
        <div className='mx-auto text-left'>
  
          <h3 className='sm:text-[2.1rem] text-[1.8rem] text-gray-700 my-4 w-full'>
            💝보유스킬</h3>
          <div
            className="w-full"
          // onSubmit={onSubmit}
          >
            <div className=''>
              <div className="py-2">
                <div
                  className='min-h-[144px] shadow-inner mb-[8px] mt-[4px] p-3 rounded-xl bg-gray-100 pb-[5px]'
                  id="skill"
                >
                  {uniqueArr?.length !== 0 ?
                    uniqueArr?.map(v => (
                      <button
                        className='inline-flex mr-[4px] mb-[6px] text-sm py-2 px-3 bg-gray-500 hover:bg-gray-600 focus:ring-gray-600 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full'
                        type="button"
                        onClick={() => onRemoveSkill(v)}
                        key={v?.name}
                      // onClick={() => onChangeSkill(v?.name)}
                      >
                        {v?.name}
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-[4px] h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )) : <Empty text="스킬을 선택해주세요" />}
                </div>

                <div className='w-full flex flex-row items-center'>
                  <input
                    className={skillError ?
                      "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                      :
                      "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    id="skill"
                    type="text"
                    placeholder="스킬명(e.g. Figma + Enter키)"
                    onKeyPress={onKeyPress}
                    onChange={onChangeSkills}
                    value={skill || ""}
                  />
                  <button
                    className='my-2 w-[70px] ml-1 text-md py-5 px-4 font-bold text-white bg-sky-400 hover:bg-sky-500  focus:outline-none focus:shadow-outline rounded-lg'
                    onClick={onClick}
                  >
                    등록</button>
                </div>

                {relatedSkills?.slice(0, 10)?.map((v) => (
                  <button
                    className='inline-flex border-solid border-2 border-gray-400 mr-[4px] mb-[6px] text-sm py-1 px-3 bg-gray-100 hover:bg-gray-200 focus:ring-gray-200 focus:ring-offset-gray-100 text-gray-800 transition ease-in duration-200 text-center font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'
                    type="button"
                    key={v?.name}
                    onClick={() => onChangeSkill(v)}
                  >
                    {v?.name}
                  </button>
                ))}

                {skillError ? (
                  <p className="text-sm mb-[1.5rem] italic text-red-500">스킬을 선택해주세요.</p>
                ) : null}

              </div>



            </div>
          </div>
        </div>
      </div>



      <div className='w-full justify-end flex items-center'>
        <button className='my-2 px-6 text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg' onClick={onSubmit}>스킬정보 업데이트</button>
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