import React, { useEffect, useState, useCallback } from 'react';
import { getAuth, deleteUser, reauthenticateWithCredential } from "firebase/auth";
import DeleteModal from 'components/Common/Modal/DeleteModal';
import AlertModal from 'components/Common/Modal/AlertModal';
import { signOut } from 'slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { reauthenticateUser } from 'firebaseConfig';

const index = () => {
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
    <div className='pt-[var(--navbar-height)] md:px-8 pb-[70px] md:pb-auto'>

      <div className='pt-5'>

        <div className='py-6'>
          <div className='mx-auto text-left'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-500 text-[1.2rem] leading-8'>
                ☔ 회원탈퇴
              </p>
            </div>
            <h2 className="text-gray-400 text-md font-normal tracking-normal leading-tight mb-8">
              회원 탈퇴시 작성하신 컨텐츠는 여전히 존재합니다. <br />
              별도 삭제 후, 회원탈퇴를 진행해주세요.
              <p className="text-red-600">해당 이메일 계정으로 다시 가입이 불가합니다.</p>
            </h2>
          </div>
        </div>

        <div className="mb-1">
          <input
            className={emailError ?
              'w-full px-3 py-2 mb-2 text-md border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              :
              'w-full px-3 py-2 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
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
            <p className="text-sm mb-[1.5rem] text-red-500">이메일이 유효하지 않습니다.</p>
          ) : null}
        </div>

        <div className="mb-1">
          <input
            className={passwordError ?
              'w-full px-3 py-2 mb-2 text-md border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              :
              'w-full px-3 py-2 mb-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
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
            <p className="text-sm mb-[1.5rem] text-red-500">비밀번호가 유효하지 않습니다.</p>
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
      <AlertModal
        title="회원탈퇴가 완료되었습니다."
        // contents_second="관리자만 포인트 내역을 확인할 수 있습니다."
        closeOutsideClick={true}
        openModal={endModal}
        closeModal={onClickEndModalClose}
        twobutton={false}
      />
    </div>
  );
};

export default index;