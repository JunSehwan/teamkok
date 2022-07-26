import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardLogo from './BoardLogo'
import ChangeLogo from './ChangeLogo'
import AlertModal from 'components/Common/Modal/AlertModal';
import { createBoard, saveCompanyLogoChanges } from 'firebaseConfig';
import { addBoard, setBoardLogo, addDone } from 'slices/board';
import Image from 'next/image';
import CategoryList from 'components/Common/CategoryList';
import Empty from 'components/Common/Empty';
import Link from 'next/link';
import { debugErrorMap } from 'firebase/auth';
import { useRouter } from 'next/router'
import { setAddDoneFalse } from '../../../slices/board';

const BoardInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { AllBoards, changeLogoOpen, logoPreview } = useSelector(state => state.board);
  const { myCareers } = useSelector(state => state.career);


  useEffect(() => {
    if (addDone) {
      setName("");
      setEmail("");
      setCategory([]);

      setNameError(false);
      setDubError(false);
      setEmailError(false);
      setCategoryError(false);
      dispatch(setAddDoneFalse());
    }
  }, [dispatch])

  // 학사/석사/박사/고등학교 category
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const onChangeCompany = useCallback((e) => {
    setName(e?.name);
    setNameError(false);
  }, [])
  const ConfirmArr = [];
  myCareers?.map(v => (
    v?.finish === true && ConfirmArr?.push(true)
  ))

  const [dubError, setDubError] = useState(false);
  const dubArr = useMemo(() => [], []);
  const companyDubCheck = useCallback(target => {
    AllBoards?.map(v => (
      v?.name === target && dubArr?.push(target)
    ))
    if (dubArr?.length !== 0) return true;
  }, [AllBoards, dubArr]);

  // 기업이메일 주소
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
    setEmailError(false);
  }, [])

  const email_check = useCallback((email) => {
    var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    reg.test(email);
    if (reg.test(email) === false) {
      return setEmailError(true);
    } else {
      return setEmailError(false);
    }
  }, []);

  const [category, setCategory] = useState([]);
  const [categoryError, setCategoryError] = useState(false);

  const onChangeCategory = useCallback((index, value) => {
    setCategory([{ key: index, name: value }, ...category]);
  }, [category]);

  const onRemoveCategory = useCallback((index) => {
    setCategory(uniqueArr?.filter(v => v?.key !== index))
    uniqueArr?.filter(v => v?.key !== index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueArr, category]);

  const uniqueArr = Array.from(new Set(category.map(a => a.key)))
    ?.map(key => {
      return category?.find(a => a.key === key)
    })



  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (name?.length === 0) {
      document.getElementById('company_name').focus();
      return setNameError(true);
    }
    const req = companyDubCheck(name);
    if (req === true) {
      document.getElementById('company_name').focus();
      return setDubError(true);
    }
    if (email?.length === 0) {
      document.getElementById('company_email').focus();
      return setEmailError(true);
    }
    email_check(email);
    if (category == []) {
      document.getElementById('category').focus();
      return setCategoryError(true);
    }
    if (category?.length === 0) {
      document.getElementById('category').focus();
      return setCategoryError(true);
    }
    const boardResult = {
      name: name,
      email: email,
      category: category,
    };
    const con = await createBoard(boardResult);
    // const logoURL = await uploadLogo(logoImage, con?.id);
    await saveCompanyLogoChanges(logoPreview, con?.id);
    dispatch(addBoard({ ...con, logo: logoPreview }));
    // dispatch(setBoardLogo(logoPreview));
    openConfirm(con?.id);
  }, [
    dispatch, email, email_check, openConfirm,
    name, category, logoPreview, companyDubCheck
  ])
  const [id, setId] = useState("");
  const openConfirm = useCallback((id) => {
    setId(id);
    setConfirm(true);
  }, [])
  const [confirm, setConfirm] = useState(false);
  const cancelConfirm = () => {
    setConfirm(false);
  }
  const closeConfirm = () => {
    router.push(`/board/${id}`);
    setConfirm(false);
    // router.push();
  }

  return (
    <div>
      <BoardLogo />
      {changeLogoOpen && <ChangeLogo />}

      <div className='max-w-[32rem] mx-auto w-[100%] mt-[0.6rem]'>
        <form
          className="w-full pt-2 pb-2 mb-1 rounded mt-[1.4rem]"
          onSubmit={onSubmit}
        >
          <div className="mb-12">
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="company_name">
              기업선택
            </label>
            <div
              className={nameError ?
                'min-h-[32px] bg-gray-100 w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
                :
                'min-h-[32px] bg-gray-100 w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
              }
              id="company_name"
              tabIndex="-1"
            >
              {name}
            </div>
            {nameError ? (
              <p className="text-xs mb-[0.6rem] italic text-red-500">기업을 선택해주세요.</p>
            ) : null}
            {dubError ? (
              <p className="text-xs mb-[0.6rem] italic text-red-500">이미 해당 기업의 보드가 존재합니다.</p>
            ) : null}
            <div className="mt-1 w-full z-10 rounded-md bg-white shadow-md">
              <div tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {myCareers?.length !== 0 ?
                  myCareers?.map((m) => (
                    m?.finish == true &&
                    <button key={m?.id} id="listbox-item-0"
                      type="button"
                      className="w-[100%] cursor-pointer text-gray-700 hover:bg-fuchsia-500 hover:text-white select-none relative py-2 pl-3 pr-9"
                      onClick={() => onChangeCompany(m)}
                    >
                      <div
                        className="flex items-center w-[full]">
                        <Image
                          src="/image/company.png"
                          alt="company"
                          width={30}
                          height={30}
                          className="flex-shrink-0 h-6 w-6 rounded-full" />
                        <span className="font-bold ml-3 block truncate">
                          {m?.name}
                        </span>
                      </div>
                    </button>
                  ))
                  :
                  null
                }

                {myCareers?.length === 0 || ConfirmArr?.length === 0 ?
                  <div
                    className="px-4 py-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-3 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p>
                      현재 재직중인 회사가 있을 경우만 기업보드 생성이 가능합니다.
                    </p>
                    <p>
                      프로필 페이지에서 경력을 등록 해주시기 바랍니다.
                    </p>
                    <Link
                      href="/profile" >
                      <a
                        className="inline-block font-bold mt-[6px] text-blue-500 align-baseline hover:text-blue-800"
                        rel="noreferrer noopener"
                      >프로필페이지 바로가기</a>
                    </Link>
                  </div>
                  : null}
              </div>
            </div>


          </div>



          <div className="mb-12">
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="company_email">
              기업이메일 계정
            </label>
            <input
              className={emailError ?
                'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                :
                'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              }
              id="company_email"
              tabIndex="-2"
              type="text"
              maxLength={100}
              placeholder="abc@companyname.co.kr"
              onChange={onChangeEmail}
              value={email}
            />
            {emailError ? (
              <p className="text-xs mb-[1.5rem] italic text-red-500">기업에서 본인이 사용하는 이메일 주소를 작성해주세요.</p>
            ) : null}
          </div>

          <div className="mb-12">
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="category">
              채용포지션 분야<br />(선택하신 카테고리의 섹션이 생성됩니다.)
            </label>

            <div
              className='mb-[8px] mt-[4px] p-3 rounded-xl bg-gray-100 pb-[5px]'
              id="category"
              tabIndex="-3"
            >
              {uniqueArr?.length !== 0 ?
                uniqueArr?.map(v => (
                  <button
                    className='inline-flex mr-[4px] mb-[6px] text-sm py-2 px-3 bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-fuchsia-500 focus:ring-offset-fuchsia-200 text-white transition ease-in duration-200 text-center font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'
                    type="button"
                    onClick={() => onRemoveCategory(v?.key)}
                    key={v?.name}
                  // onClick={() => onChangeCategory(v?.name)}
                  >
                    {v?.name}
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-[4px] h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                )) : <Empty text="카테고리를 선택해주세요" />}

            </div>

            {CategoryList?.map((v) => (
              <button
                className='inline-flex mr-[4px] mb-[6px] text-sm py-1 px-3 bg-gray-100 hover:bg-gray-200 focus:ring-gray-200 focus:ring-offset-gray-100 text-gray-800 transition ease-in duration-200 text-center font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'
                type="button"
                key={v?.key}
                onClick={() => onChangeCategory(v?.key, v?.name)}
              >
                {v?.name}
              </button>
            ))}
            {categoryError ? (
              <p className="text-xs mb-[1.5rem] italic text-red-500">카테고리를 선택해주세요.</p>
            ) : null}

          </div>

          <div className="mb-2 text-right">
            {confirm &&
              <AlertModal
                title={`기업보드 생성 완료!🎉`}
                contents={`${name} 기업보드가 생성되었습니다.`}
                contents_second="이제 다양한 팀활동으로 구직자와 소통해보세요!"
                closeOutsideClick={false}
                openModal={confirm}
                closeModal={closeConfirm}
                cancelFunc={cancelConfirm}
                twobutton={false}
              />
            }
            <button type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              기업보드 생성</button>

          </div>
        </form>

      </div>

    </div>
  );
};

export default BoardInfo;