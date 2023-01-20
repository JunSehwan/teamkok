import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/Common/Modal/Modal';
import { createSingo } from 'firebaseConfig';
import { addSingo, setAddSingoDoneFalse } from 'slices/section';

const Singo = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [singoOn, setSingoOn] = useState(false);
  const openSingo = useCallback(() => {
    setSingoOn(true);
  }, [])
  const closeSingo = useCallback(() => {
    setSingoOn(false);
  }, [])

  const { addSingoDone } = useSelector(state => state.section);
  useEffect(() => {
    if (addSingoDone) {
      setCategory("");
      setEtc("");
      setCategoryError(false);
      dispatch(setAddSingoDoneFalse());
      closeSingo();
    }
  }, [addSingoDone, closeSingo, dispatch])

  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const onChangeCategory = useCallback((e) => {
    setCategory(e.target.value);
    setCategoryError(false);
  }, [])

  const [etc, setEtc] = useState("");
  const onChangeEtc = useCallback((e) => {
    setEtc(e.target.value);
  }, [])


  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (category == '') {
      document.getElementById('category').focus();
      return setCategoryError(true);
    }

    const singoResult = {
      userId: user?.userID,
      userName: user?.username,
      category: category,
      etc: etc,
      postId: post?.id,
      postCreatorId: post?.creatorId,
      postCreatorName: post?.creatorName,
      type: 1,

    };
    const con = await createSingo(singoResult);
    dispatch(addSingo(con));
  }, [category, dispatch, etc, post?.creatorId, post?.creatorName, post?.id, user?.userID, user?.username])



  return (
    <>
      <button
        className='text-sm whitespace-nowrap'
        onClick={openSingo}>
        게시물 신고
      </button>

      <Modal
        open={openSingo}
        onClose={closeSingo}
        title={`게시물 신고하기`}
        visible={singoOn}
        widths="720px"
        onCancel={closeSingo}
      >
        <div className='p-3'>

          <div
            className="w-full pt-2 pb-2 mb-1 rounded mt-[.4rem]"
          >
            <h2 className=''>문제를 선택하세요</h2>
            <form
              className="w-full"
              onSubmit={onSubmit}
            >
              <div className="max-w-[720px] py-4">
                <label className="block mb-2 text-md font-bold text-gray-700 " htmlFor="category">
                  게시물의 어떤 사유때문에 신고하십니까?
                </label>
                <select
                  className={categoryError ?
                    "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    :
                    "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  id="category"
                  name="category"
                  onChange={onChangeCategory}
                  value={category}
                >
                  <option value="">선택</option>
                  <option value={9}>스팸</option>
                  <option value={7}>폭력적 게시물</option>
                  <option value={5}>혐오발언</option>
                  <option value={4}>거짓정보</option>
                  <option value={2}>기타 부적절한 게시물</option>
                  {/* <option value={99}>기타</option> */}
                </select>
                {categoryError ? (
                  <p className="text-xs mt-[0.3rem] italic text-red-500">사유를 입력해주세요!</p>
                ) : null}
              </div>

              <div className="max-w-[720px] py-4">
                <label
                  className="block mb-2 text-md font-bold text-gray-700 "
                  htmlFor="etc">
                  기타사유
                </label>
                <input
                  className=
                  "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="etc"
                  type="text"
                  maxLength={100}
                  placeholder="기타사유가 있다면 입력해주세요"
                  onChange={onChangeEtc}
                  value={etc}
                />
              </div>

              <div className="mb-10 text-right">

                <div className='mb-10 text-right'>
                  <button
                    onClick={onSubmit}
                    type="button"
                    className="w-full px-6 min-w-[144px] text-md py-4 font-bold  text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:shadow-outline rounded-lg">
                    확인
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal >

    </>
  );
};

export default Singo;