import React, { useEffect, useState, useCallback } from 'react';
import { getAuth, deleteUser, reauthenticateWithCredential } from "firebase/auth";
import DeleteModal from 'components/Common/Modal/DeleteModal';
import AlertModal from 'components/Common/Modal/AlertModal';
import { signOut } from 'slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { reauthenticateUser } from 'firebaseConfig';

const Withdrawal = () => {
  const auth = getAuth();
  const me = auth.currentUser;
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const [confirmModal, setConfirmModal] = useState(false);
  const ConfirmModalClose = useCallback(() => {
    setConfirmModal(false);
  }, [])
  const ConfirmModalOpen = useCallback(() => {
    setConfirmModal(true);
  }, [])

  // 확인종료모달
  const [endModal, setEndModal] = useState(false);
  const onClickEndModalOpen = useCallback(() => {
    setEndModal(true);
  }, [])

  const onClickEndModalClose = useCallback(() => {
    setEndModal(false);
    ConfirmModalClose();
  }, [ConfirmModalClose])

  // 이메일
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
    setEmailError(false);
  }, [])

  // 이메일
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState(false);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  }, [])

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (email?.length === 0) return setEmailError(true);
    if (password?.length === 0) return setPasswordError(true);
    if (email !== user?.email) return setEmailError(true);
    if (email?.length !== 0 && email === user?.email) {
      try {
        await reauthenticateUser(password)
          .then(async () => {
            await deleteUser(me).then(() => {
              // User deleted.
              onClickEndModalOpen();
              setTimeout(() => {
                dispatch(signOut())
              }, [2500]);
            }).catch((error) => {
              console.error(error)
              const errorCodes = error.code;
              const errorMessages = error.message;
              console.log(errorCodes, errorMessages);
              if (errorCodes == "auth/requires-recent-login") {
                alert("잠시 뒤 다시 시도해주세요.")
              }
              else {
                alert("비밀번호 정보가 잘못되었습니다.")
              }
            });
          })
      } catch (e) {
        console.error(e, "에러")
        const errorCode = e.code;
        const errorMessage = e.message;
        console.log(errorCode, errorMessage);
        alert("비밀번호 정보가 잘못되었습니다.")
      }
    } else {
      alert("정보를 다시 확인해주세요.")
    }
  }, [email, user?.email, password, me, onClickEndModalOpen, dispatch])

  useEffect(() => {
    if (!confirmModal) {
      setEmail("");
      setEmailError(false);
      setPassword("");
      setPasswordError(false);
    }
  }, [confirmModal])



  return (
    <div className="w-full flex justify-end">
      <button onClick={ConfirmModalOpen} className='text-sm mt-8 text-gray-400 text-right'>
        회원탈퇴
      </button>

      <>
        {confirmModal &&
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
                        <button onClick={ConfirmModalClose}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <h2 className="text-violet-600 text-xl font-bold tracking-normal leading-tight mb-3 mt-4">
                        회원 탈퇴하기
                      </h2>
                      <h2 className="text-gray-400 text-sm font-normal tracking-normal leading-tight mb-8">
                        회원 탈퇴시 작성하신 컨텐츠는 여전히 존재합니다. <br />
                        별도 삭제 후, 회원탈퇴를 진행해주세요.
                        <p className="text-red-600">해당 이메일 계정으로 다시 가입이 불가합니다.</p>
                      </h2>
                      <div className="mb-1">
                        <input
                          className={emailError ?
                            'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                            :
                            'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                          }
                          id="del-email"
                          type="text"
                          autoComplete="off"
                          maxLength={100}
                          placeholder="본인계정 이메일을 작성해주세요."
                          onChange={onChangeEmail}
                          value={email || ""}
                        />
                        {emailError ? (
                          <p className="text-xs mb-[1.5rem] italic text-red-500">이메일이 유효하지 않습니다.</p>
                        ) : null}
                      </div>

                      <div className="mb-1">
                        <input
                          className={passwordError ?
                            'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                            :
                            'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                          }
                          id="password"
                          type="password"
                          autoComplete="off"
                          maxLength={100}
                          placeholder="비밀번호를 입력해주세요."
                          onChange={onChangePassword}
                          value={password || ""}
                        />
                        {passwordError ? (
                          <p className="text-xs mb-[1.5rem] italic text-red-500">비밀번호가 유효하지 않습니다.</p>
                        ) : null}
                      </div>


                      <div className="w-full flex justify-end mt-8">
                        <button
                          className=' text-md text-gray-600 hover:bg-slate-100 font-semibold uppercase px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                          onClick={onSubmit}>회원탈퇴
                        </button>
                        <button
                          className='bg-blue-500 text-md px-10 text-white hover:bg-blue-600 active:bg-violet-600 font-semibold uppercase py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                          onClick={ConfirmModalClose}>취소
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <AlertModal
          title="회원탈퇴가 완료되었습니다."
          // contents_second="관리자만 포인트 내역을 확인할 수 있습니다."
          closeOutsideClick={true}
          openModal={endModal}
          closeModal={onClickEndModalClose}
          twobutton={false}
        />
      </>
    </div>
  );
};

export default Withdrawal;