import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import StyleList from 'components/Common/StyleList';
import {
  updateSurveyFalse, updateStyleFalse,
} from 'slices/user';

import StylesIcon from 'public/image/icon/styles.png';
import SurveyIcon from 'public/image/icon/survey.png';
import Image from 'next/image';

import StyleModal from './StyleModal';
import SurveyModal from './SurveyModal';
import { toast } from 'react-hot-toast';

const MyStyle = () => {
  const dispatch = useDispatch();
  const { user, updateStyleDone, updateSurveyDone } = useSelector(state => state.user);

  const [openList, setOpenList] = useState(false);
  const openStyleModal = useCallback(() => {
    setOpenList(true);
  }, [])
  const closeStyleList = useCallback(() => {
    setOpenList(false);
  }, [])
  const [openSurvey, setOpenSurvey] = useState(false);

  const openSurveyModal = useCallback(() => {
    setOpenSurvey(true);
  }, [])

  const closeSurveyModal = useCallback(() => {
    setOpenSurvey(false);
  }, [])

  const styleNotify = () => toast('스타일 업데이트 완료!');
  const surveyNotify = () => toast('설문정보 업데이트 완료!');

  useEffect(() => {
    if (updateStyleDone) {
      styleNotify();
      dispatch(updateStyleFalse());

    }
  }, [updateStyleDone, dispatch])

  useEffect(() => {
    if (updateSurveyDone) {
      surveyNotify();
      dispatch(updateSurveyFalse());
    }
  }, [updateSurveyDone, dispatch])

  var styleObject = StyleList?.filter(obj => obj.number == user?.style);

  return (
    <>
      <div className="mb-4">
        <div className="px-[2px] md:lg:xl:px-[4px] border-t border-b py-[12px]">
          <div className=" border">

            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
              <button
                onClick={openStyleModal}
                className={`${user?.style ? "bg-white border-blue-600 text-gray-600" : "bg-slate-100 border-slate-600 text-gray-600"}  dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 dark:border-gray-600 text-white font-medium group`}>
                <div className="flex justify-center items-center w-14 h-14 p-2 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                  <div className="w-max-[150px]">
                    <Image
                      src={StylesIcon}
                      unoptimized
                      alt="mystyle"
                      width={60}
                      height={60}
                      className=""
                    // responsive={30vw}
                    // layout="fill"
                    />
                  </div>
                </div>
                <div className="text-right text-gray-600">
                  <p className="text-xl">업무스타일</p>
                  {!!user?.style ?
                    (<p className="text-[#4173f4]">
                      🧬{styleObject[0]?.title}
                    </p>)
                    : <p>선택해주세요😀</p>}
                </div>
              </button>

              <button
                onClick={openSurveyModal}
                className={`${user?.survey ? "bg-white border-blue-600 text-gray-600" : "bg-slate-100 border-slate-600 text-gray-600"}  dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 dark:border-gray-600  font-medium group`}>
                <div className="flex justify-center items-center w-14 h-14 p-2 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                  <div className="w-max-[150px]">
                    <Image
                      src={SurveyIcon}
                      unoptimized
                      alt="logo"
                      width={60}
                      height={60}
                      className=""
                    // responsive={30vw}
                    // layout="fill"
                    />
                  </div>
                </div>
                <div className="text-right text-gray-600">
                  <p className="text-xl">행동설문</p>
                  {user?.survey ? <p className="text-[#4173f4]">(작성완료)</p> : <span className="">(미작성)</span>}
                </div>
              </button>

            </div>

            <StyleModal
              openList={openList}
              closeStyleList={closeStyleList}
            />

            <SurveyModal
              openSurvey={openSurvey}
              openSurveyModal={openSurveyModal}
              closeSurveyModal={closeSurveyModal}
            />


          </div>
        </div>
      </div>
    </>
  );
};

export default MyStyle;