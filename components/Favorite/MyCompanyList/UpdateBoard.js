import React, { useCallback, useState } from 'react';
import { modifyBoard } from 'firebaseConfig';
import { updateBoard } from 'slices/board';
import { useSelector, useDispatch } from 'react-redux';
import DeleteModal from 'components/Common/Modal/DeleteModal';
import PropTypes from 'prop-types';
import { saveCompanyLogoChanges, uploadLogoPreview } from 'firebaseConfig';
import companyPic from 'public/image/company.png';
import { setBoardLogoPreview, setBoardLogo } from 'slices/board';
import Image from 'next/image';
import styled from 'styled-components';

const UpdateBoard = ({ board }) => {

  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [updateConfirm, setUpdateConfirm] = useState(false);
  const onCancelUpdate = useCallback(() => {
    setUpdateConfirm(false);
  }, [])
  const onOpenUpdate = useCallback(() => {
    setUpdateConfirm(true);
  }, [])



  const { logoPreview } = useSelector(state => state.board);
  function removeLogo() {
    // saveCompanyLogoChanges("");
    dispatch(setBoardLogoPreview(""));
  }

  async function changeLogo(e) {
    if (!e.target.files) return;

    const logoImage = e.target.files[0];
    const logoPreviewURL = await uploadLogoPreview(logoImage, board?.id);
    dispatch(setBoardLogoPreview(logoPreviewURL));
  }

  const onClickUpdate = useCallback(async () => {
    await saveCompanyLogoChanges(logoPreview, board?.id);
    dispatch(updateBoard({
      id: board?.id,
      logo: logoPreview
    }))
    alert("업데이트 완료");
    onCancelUpdate();
    // alert("관심기업이 삭제되었습니다.")
  }, [logoPreview, board?.id, dispatch, onCancelUpdate])



  // const [confirm, setConfirm] = useState(false);
  // const ConfirmModalOpen = useCallback(() => {
  //   setConfirm(true);
  //   dispatch(addSmallInternFalse());
  // }, [dispatch])

  // const ConfirmModalClose = () => {
  //   onInternClose();
  //   setConfirm(false);
  // }

  // useEffect(() => {
  //   if (addSmallInternDone === true) {
  //     ConfirmModalOpen();
  //     setPeriodError(false);
  //     setCountError(false);
  //     setEmploytypeError(false);
  //     setDescriptionError(false);
  //     setMeritError(false);
  //     dispatch(addSmallInternFalse());
  //   }
  // }, [ConfirmModalOpen, addSmallInternDone, dispatch])



  return (
    <>
      <button
        className="p-2 ml-1 hover:bg-orange-100 text-gray-600 rounded-full "
        onClick={onOpenUpdate}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {updateConfirm ?
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed w-[100%] z-50 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
              <div className="border-solid border-t-8 border-violet-400 relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                  <div className="relative bg-white rounded border">
                    <div className="w-full flex justify-between text-violet-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                      </svg>
                      <button onClick={onCancelUpdate}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <h2 className="text-violet-600 font-lg font-bold tracking-normal leading-tight mb-4">로고수정</h2>
                  </div>

                  <div className='relative flex bg-slate-200 justify-center shadow-inner border-[7px] border-white rounded-[12px] group'>
                    <div className="w-[192px] h-[192px]">
                      <ImageWrapper>
                        <Image
                          className="absolute object-contain rounded-[12px] mx-auto z-10 cursor-pointer w-[192px] h-[192px]"
                          loader={() => board?.logo}
                          src={logoPreview || board?.logo || companyPic}
                          width={180}
                          height={180}
                          unoptimized
                          alt="BoardLogo picture">
                        </Image>
                        <label className='absolute top-0 left-0 w-full mt-2 ml-2 text-sm text-left text-gray-600 cursor-pointer h-[192px] mx-auto font-semibold z-20' htmlFor="fileInput">
                          Upload File
                        </label>
                        <input
                          className='absolute hidden top-0 left-0 w-full h-full text-[0px] cursor-pointer pointer-events-auto rounded file:w-full file:h-full file:border-0'
                          onChange={changeLogo}
                          type="file"
                          accept=".svg, .png, .jpg, .jpeg"
                          id="fileInput"
                        />
                      </ImageWrapper>
                    </div>
                  </div>

                  <div className='mt-6 pb-6 border-b flex items-center justify-center flex-col'>
                    <div className='w-fit mx-auto'>
                      <button
                        className='w-fit h-8 px-4 py-0.5 rounded-[24px] bg-white text-sm text-gray-500 font-medium rounded-middle'
                        onClick={removeLogo}>
                        로고제거
                      </button>
                    </div>

                    <button className='w-fit h-8 px-4 py-0.5 rounded-[24px] bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-middle'
                      onClick={onClickUpdate}
                    >
                      변경완료
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        : null}
      {/* <AlertModal
        title="등록완료"
        contents="로고변경이 완료되었습니다."
        closeOutsideClick={true}
        openModal={confirm}
        closeModal={ConfirmModalClose}
        twobutton={false}
      /> */}
    </>
  );
};

const ImageWrapper = styled.div`
width: 100%;
border-radius: 8px;
justify-content: center;
margin: 0 auto;
min-height: 192px;

& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: 192px !important;
  }
}
`

UpdateBoard.propTypes = {
  board: PropTypes.object,
};

export default UpdateBoard;