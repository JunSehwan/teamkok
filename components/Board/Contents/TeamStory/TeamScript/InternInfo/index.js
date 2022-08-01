import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AlertModal from 'components/Common/Modal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSmallIntern, addSmallInternFalse,
} from 'slices/board';
import { createSmallIntern } from 'firebaseConfig';

const index = ({ openIntern, offInternInfo, singleSection }) => {


  return (
    <>
      {openIntern ?
        <div className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed w-[100%] z-50 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
              <div className="border-solid border-t-8 border-violet-400 relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="relative bg-white rounded border">
                    <div className="w-full flex justify-between text-violet-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                      </svg>
                      <button onClick={offInternInfo}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <h2 className="text-violet-600 text-xl font-bold tracking-normal leading-tight mb-4">
                      Small Intern 채용공고
                    </h2>
                    <div className="mb-6">
                      <h3 className="text-base leading-6 font-medium  text-gray-500 dark:text-white">
                        채용이 시작되었음을 알리는 내용입니다.
                      </h3>
                    </div>


                    <div className="mb-8">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="period">
                        채용일정
                      </label>
                      <div className="whitespace-pre-wrap leading-normal font-normal text-gray-600 pt-1 mb-3">
                        {singleSection?.smallintern?.period}
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="count">
                        채용인원 수
                      </label>
                      <div className="whitespace-pre-wrap leading-normal font-normal text-gray-600 pt-1 mb-3">
                        {singleSection?.smallintern?.count}
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="employtype">
                        근무형태
                      </label>
                      <div className="whitespace-pre-wrap leading-normal font-normal text-gray-600 pt-1 mb-3">
                        {(() => {
                          switch (parseInt(singleSection?.smallintern?.employtype)) {
                            case 1: return (<div>정규직</div>)
                            case 2: return (<div>계약직</div>)
                            case 5: return (<div>인턴/수습</div>)
                            case 6: return (<div>아르바이트</div>)
                            case 99: return (<div>기타</div>)
                            default: null;
                          }
                        })(parseInt(singleSection?.smallintern?.employtype))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="description">
                        상세정보 안내
                      </label>
                      <div className="whitespace-pre-wrap leading-normal font-normal text-gray-600 pt-1 mb-3">
                        {singleSection?.smallintern?.description}
                      </div>
                    </div>


                    <div className="mb-8">
                      <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="merit">
                        Smaill Intern 선정시 혜택
                      </label>
                      <div className="whitespace-pre-wrap leading-normal font-normal text-gray-600 pt-1 mb-3">
                        {singleSection?.smallintern?.merit}
                      </div>
                    </div>


                    <div className='rounded-xl p-2 bg-slate-50 shadow-inner'>
                      <label className="block my-3 text-base font-bold text-violet-500" htmlFor="assignment">
                        과제관련(선택사항)
                      </label>

                      <div className="mb-8">
                        <label className="block mb-1 text-sm font-semibold text-gray-500" htmlFor="assignment">
                          수행과제
                        </label>
                        <div className="whitespace-pre-wrap leading-normal font-normal text-gray-600 pt-1 mb-3">
                          {singleSection?.smallintern?.assignment || "수행과제가 없습니다."}
                        </div>
                      </div>

                      <div className="mb-8">
                        <label className="block mb-1 text-sm font-semibold text-gray-500" htmlFor="limit">
                          과제제출기한
                        </label>
                        <div className="whitespace-pre-wrap leading-normal font-normal text-gray-600 pt-1 mb-3">
                          {singleSection?.smallintern?.limit || "수행과제가 없습니다."}
                        </div>
                      </div>

                      <div className="mb-8">
                        <label className="block mb-1 text-sm font-semibold text-gray-500" htmlFor="sendway">
                          과제제출 방법
                        </label>
                        <div className="whitespace-pre-wrap leading-normal font-normal text-gray-600 pt-1 mb-3">
                          {singleSection?.smallintern?.sendway || "수행과제가 없습니다."}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 mb-8">해당 기간내에 채용이 이루어집니다.<br />
                      과제제출기한 후 선정된 인원에게는 별도의 메시지를 발송합니다.</p>

                    <div className="w-full flex justify-center mt-4">
                      <button
                        className='bg-blue-500 text-lg text-white hover:bg-blue-600 active:bg-violet-600 font-bold uppercase px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        onClick={offInternInfo}>확인
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null}
    </>
  );
};

index.propTypes = {
  openIntern: PropTypes.bool,
  offInternInfo: PropTypes.func,
  singleSection: PropTypes.object,
};

export default index;