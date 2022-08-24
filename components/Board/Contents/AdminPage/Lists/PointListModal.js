import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AlertModal from 'components/Common/Modal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import { givePoint } from 'firebaseConfig';
import { pointGive, addPointFalse } from 'slices/user';
import PointList from './PointList';
import styled from 'styled-components';
import Empty from 'components/Common/Empty';

const PointListModal = ({
  onOpenPointListModal,
  onClosePointListModal,
  openListModal,
  target
}) => {
  const { singleSection } = useSelector(state => state.board);
  //점수사유 안내
  // 작성자 id, name, avatar / boardid, sectionID / user정보에 넣고 보드정보에 넣기
  const onClose = useCallback(() => {
    onClosePointListModal();
  }, [onClosePointListModal])

  const listArr = [];
  target?.points?.map((v) => (
    v?.sectionId === singleSection?.id && listArr.push(v)
  ))
  return (
    <>

      <div className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"></div>
        <div className="fixed w-[100%] z-50 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
            <div className="border-solid border-t-8 border-violet-400 relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                <div className="relative bg-white rounded border">
                  <div className="w-full flex justify-between text-violet-600 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                    <button onClick={onClosePointListModal}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <h2 className="text-violet-600 text-xl font-bold tracking-normal leading-tight mb-4">
                    포인트 부여내역 조회
                  </h2>

                  <StyledContainer className="mb-4 overflow-y-scroll max-h-[50vh]">
                    {listArr?.length !== 0 && listArr?.map((v, i) => (
                      <div key={i}>
                        <PointList
                          content={v}
                          target={target}
                          />
                      </div>
                    ))
                    }
                    {listArr?.length === 0 && <Empty title="아직 포인트 부여내역이 없습니다."/>}
                  </StyledContainer>

                  <div className="w-full flex justify-end mt-4">
                    <button
                      className='bg-blue-500 text-lg text-white hover:bg-blue-600 active:bg-violet-600 font-bold uppercase px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      onClick={onClose}>닫기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

const StyledContainer = styled.div`
::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.16);
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`


PointListModal.propTypes = {
  onOpenPointListModal: PropTypes.func,
  onClosePointListModal: PropTypes.func,
  openListModal: PropTypes.bool,
  target: PropTypes.object,
};

export default PointListModal;