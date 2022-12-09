import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

const ProgressBar = () => {

  const [percent, setPercent] = useState(0);
  const { user } = useSelector(state => state.user);
  const { myCareers } = useSelector(state => state.career);
  const { myEducations } = useSelector(state => state.education);
  const { mySkills } = useSelector(state => state.skill);
  const [alert, setAlert] = useState(false);
  const checkAlert = useCallback(() => {
    if (user?.gender && user?.phonenumber && user?.category && user?.avatar
      && myCareers?.length !== 0 && myEducations?.length !== 0 && mySkills?.length !== 0
      ) {
      setAlert(false);}
      else {
        setAlert(true);
      }
  }, [myCareers?.length, myEducations?.length, mySkills?.length, user?.avatar, user?.category, user?.gender, user?.phonenumber])


const [basicErr, setbasicErr] = useState(false);
const [avatarErr, setavatarErr] = useState(false);
const [careerErr, setcareerErr] = useState(false);
const [educationErr, seteducationErr] = useState(false);
const [skillErr, setskillErr] = useState(false);

  const checkBasic = useCallback(() => {
    if (user?.gender && user?.phonenumber && user?.category) {
      setPercent(prev => prev + 20)
      setbasicErr(false);
    }
    else {
      setPercent(prev => prev)
      setbasicErr(true);
    }
  }, [user?.gender, user?.phonenumber, user?.category]);
  const checkAvatar = useCallback(() => {
    if (user?.avatar) {
      setPercent(prev => prev + 10)
      setavatarErr(false);
    }
    else {
      setPercent(prev => prev)
      setavatarErr(true);
    }
  }, [user?.avatar]);
  const checkCareer = useCallback(() => {
    if (myCareers?.length !== 0) {
      setPercent(prev => prev + 20)
      setcareerErr(false);
    }
    else {
      setPercent(prev => prev)
      setcareerErr(true);
    }
  }, [myCareers?.length]);
  const checkEducation = useCallback(() => {
    if (myEducations?.length !== 0) {
      setPercent(prev => prev + 20)
      seteducationErr(false);
    }
    else {
      setPercent(prev => prev)
      seteducationErr(true);
    }
  }, [myEducations?.length]);
  const checkSkill = useCallback(() => {
    if (mySkills?.length !== 0) {
      setPercent(prev => prev + 15)
      setskillErr(false);
    }
    else {
      setPercent(prev => prev)
      setskillErr(true);
    }
  }, [mySkills?.length]);
  const checkSurvey = useCallback(() => {
    if (user?.survey) {
      setPercent(prev => prev + 5)
    }
    else {
      setPercent(prev => prev)
    }
  }, [user?.survey]);
  const checkStyle = useCallback(() => {
    if (user?.style) {
      setPercent(prev => prev + 5)
    }
    else {
      setPercent(prev => prev)
    }
  }, [user?.style]);
  const checkAdditional = useCallback(() => {
    if (user?.links?.length !== 0 || user?.additionalMent) {
      setPercent(prev => prev + 5)
    }
    else {
      setPercent(prev => prev)
    }
  }, [user?.additionalMent, user?.links?.length]);
 
  useEffect(() => {
    setPercent(0);
    checkBasic();
    checkAvatar();
    checkCareer();
    checkEducation();
    checkSkill();
    checkSurvey();
    checkStyle();
    checkAdditional();
    checkAlert();
  }, [checkAdditional, checkAlert, checkAvatar, checkBasic, checkCareer, checkEducation, checkSkill, checkStyle, checkSurvey])

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">프로필 완성도:
          &nbsp;
          {percent < 30 && "미흡🥲"}
          {percent < 80 && percent >= 30 && "중간😐"}
          {percent < 100 && percent >= 80 && "우수😀"}
          {percent >= 100 && "완성😍"}
        </span>
        <span className="text-sm text-sky-400 font-medium">{percent}%</span>
      </div>

      <div className="w-full bg-slate-100 h-1 mb-3 mt-2">
        <div
          className={`bg-sky-400 h-1 rounded transition-all ease-out duration-1000 ${percent && `w-[${(percent/100)*100}%]`}`}
        >
        </div>
      </div>

      {basicErr && <p className="text-red-700 font-semibold text-xs">기본정보, 카테고리 미등록</p>}
      {avatarErr && <p className="text-red-700 font-semibold text-xs">프로필사진 미등록</p>}
      {careerErr && <p className="text-red-700 font-semibold text-xs">경력 미작성</p>}
      {educationErr && <p className="text-red-700 font-semibold text-xs">학력 미작성</p>}
      {skillErr && <p className="text-red-700 font-semibold text-xs">보유스킬 미작성</p>}


      {alert && <div className='mb-3 w-full rounded-lg bg-slate-200 p-2'><p className='text-xs text-gray-600'>입사제안을 아직 받을 수 없어요.🥲</p>
        <p className="text-xs text-orange-500">(기본정보, 학력/경력, 스킬정보 등록 필요)</p></div>}
    </div>

  );
};

export default ProgressBar;