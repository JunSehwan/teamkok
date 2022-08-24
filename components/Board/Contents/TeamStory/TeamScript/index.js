import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import List from './List';
import TeamScriptAdd from './TeamScriptAdd';
import TeamStyleAdd from './TeamStyleAdd';
import SmallInternAdd from './SmallInternAdd';
import InternInfo from './InternInfo';
import { useRouter } from 'next/router';

const index = () => {
  const { isExpert, isAdmin } = useSelector(state => state.user);
  const { selectedCategory, singleBoard } = useSelector(state => state.board);
  const [addOpen, setAddOpen] = useState(false);
  const onAddOpen = useCallback(() => { 
    document.body.style.overflow = "hidden";
    setAddOpen(true); }, [])
  const onAddClose = useCallback(() => { 
    document.body.style.overflow = "unset";
    setAddOpen(false); }, [])
  const { singleSection } = useSelector(state => state.board);

  const [smallInternOpen, setSmallInternOpen] = useState(false);
  const onInternOpen = useCallback(() => { 
    document.body.style.overflow = "hidden";
    setSmallInternOpen(true); }, [])
  const onInternClose = useCallback(() => { 
    document.body.style.overflow = "unset";
    setSmallInternOpen(false); }, [])

  const [teamStyleOpen, setTeamStyleOpen] = useState(false);
  const onStyleOpen = useCallback(() => { 
    document.body.style.overflow = "hidden";
    setTeamStyleOpen(true); }, [])
  const onStyleClose = useCallback(() => { 
    document.body.style.overflow = "unset";
    setTeamStyleOpen(false); }, [])

  const [openIntern, setOpenIntern] = useState(false);
  const onInternInfo = useCallback(() => { 
    document.body.style.overflow = "hidden";
    setOpenIntern(true); }, [])
  const offInternInfo = useCallback(() => { 
    document.body.style.overflow = "unset";
    setOpenIntern(false); }, [])

  const [fold, setFold] = useState(true);
  const onToggleFold = useCallback(() => { setFold(prev => !prev) }, [])

  return (
    <div className="w-full ">
      <div className="mb-4 mx-0 sm:ml-4 xl:mr-4">
        <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-700 w-full p-5 md:p-6">
          <div className="flex flex-row items-center justify-between pb-4">
            <div className="font-bold text-xl text-gray-600 fill-gray-600 dark:text-white flex flex-col sm:flex-row items-center">
              <div className="flex items-center">
                <span>{selectedCategory?.name}팀 정보</span>
                
              </div>

              {singleSection?.smallintern?.hiring ?
                <>
                  <button
                    onClick={onInternInfo}
                    className="mt-2 sm:mt-0 hover:bg-slate-200 hover:shadow-none flex flex-row items-center ml-2 py-0.5 px-2 shadow-sm bg-slate-100 rounded-full font-medium text-base text-slate-700">
                    <div className='rounded-full h-6 w-6 mr-2 bg-green-600'></div>
                    <span>SMALL INTERN</span>
                    <div className=" text-slate-800 ml-1 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </button>
                </> :
                <>
                  <div
                    className="mt-2 sm:mt-0 hover:bg-slate-200 hover:shadow-none flex flex-row items-center ml-2 py-0.5 px-2 shadow-sm bg-slate-100 rounded-full font-medium text-base text-slate-700">
                    <div className='rounded-full h-5 w-5 mr-2 bg-orange-500'></div>
                    <span className="text-slate-400">채용휴식기</span>
                  </div>
                </>
              }
            </div>
            <button className="rounded-full hover:bg-gray-200 text-gray-500 p-2" onClick={onToggleFold}>
              {fold ?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
              }
            </button>

          </div>
          {fold ?
            <ul >
              <List
                // headicon="01"
                question="🔎간략소개"
                answer={singleSection?.intro || "미등록"}
              />
              <List
                // headicon="02"
                question="👍강점"
                answer={singleSection?.advantage || "미등록"}
              />
              <List
                // headicon="03"
                question="👨‍👦‍👦인원수"
                answer={`${singleSection?.peopleCount || ""}명`}
              />
              <List
                // headicon="04"
                question="📑주요업무(신입업무)"
                // answer={<div dangerouslySetInnerHTML={{ __html: HTML }} />}
                answer={`${singleSection?.description || ""}`}
              />
            </ul>
            : null}
          <div className="flex items-end flex-col justify-end mr-2 pb-2">
            <>
              {isExpert || isAdmin ?
                <p className="pb-2 text-gray-400">관리자 전용</p>
                : null}
            </>
            <div className="flex flex-col sm:flex-row">
              {isExpert || isAdmin ?
                <button type="button"
                  onClick={onAddOpen}
                  className="mb-1 md:mb-0 bg-gray-500 border border-gray-500 px-3 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-600">
                  팀정보 입력/수정</button>
                : null}

              {isExpert || isAdmin ?
                <button type="button"
                  onClick={onInternOpen}
                  className="mb-1 md:mb-0 ml-1 bg-violet-500 border border-violet-500 px-3 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-violet-600">
                  Small Intern(채용공고)</button>
                : null}

              {isExpert || isAdmin ?
                <button type="button"
                  onClick={onStyleOpen}
                  className="mb-1 md:mb-0 ml-1 bg-gray-500 border border-gray-500 px-3 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-600">
                  팀스타일 등록</button>
                : null}
            </div>
          </div>
          {addOpen ?
            <TeamScriptAdd
              onAddClose={onAddClose}
              addOpen={addOpen}
              singleSection={singleSection}
            />
            : null}
          {smallInternOpen ?
            <SmallInternAdd
              onInternClose={onInternClose}
              smallInternOpen={smallInternOpen}
              singleSection={singleSection}
            />
            : null}
          {teamStyleOpen ?
            <TeamStyleAdd
              onStyleClose={onStyleClose}
              teamStyleOpen={teamStyleOpen}
              singleSection={singleSection}
            />
            : null}


          {openIntern ?
            <InternInfo
              offInternInfo={offInternInfo}
              openIntern={openIntern}
              singleSection={singleSection}
            />
            : null}

        </div>

      </div>
    </div>
  );
};

export default index;