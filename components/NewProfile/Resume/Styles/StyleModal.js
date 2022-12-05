import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StyleCard from './StyleCard';
import StyleList from 'components/Common/StyleList';
import { updateUserStyle } from 'slices/user';
import { updateStyle } from 'firebaseConfig';
import Modal from 'components/Common/Modal/Modal';
import PropTypes from 'prop-types';


const StyleModal = ({ openList, closeStyleList }) => {
  const dispatch = useDispatch();
  const { user, updateStyleDone } = useSelector(state => state.user);

  useEffect(() => {
    if (updateStyleDone) {
      setCategoryError(false);
      closeStyleList();
    }
  }, [closeStyleList, updateStyleDone])

  const [category, setCategory] = useState(user?.style || "");
  const [categoryError, setCategoryError] = useState(false);
  const onChangeCategory = useCallback((number) => () => {
    setCategory(number);
    setCategoryError(false);
    document.getElementById('submit_btn').focus();
  }, [])

  const onCategorySubmit = useCallback(async (e) => {
    if (category === "") {
      document.getElementById('category').focus();
      return setCategoryError(true);
    }
    const res = await updateStyle(category);
    dispatch(updateUserStyle(category));
  }, [category, dispatch])

  return (
    <div className="container flex flex-col mx-auto w-full items-center justify-center">
      <Modal
        onClose={closeStyleList}
        title="내 업무스타일을 선택해주세요."
        visible={openList}
        widths="620px"
      >
        <ul id="category" className="flex flex-col w-[100%]">
          {StyleList?.map((v, i) => (
            <React.Fragment key={v?.src}>
              <StyleCard
                title={v?.title}
                category={category}
                sub={v?.sub}
                setCategory={setCategory}
                onChangeCategory={onChangeCategory}
                src={v?.src}
                tag={v?.tag}
                number={v?.number}
                index={v?.key}
              />
            </React.Fragment>
          ))}
        </ul>
        {categoryError ? (
          <p className="mt-[6px] w-[100%] font-bold text-xs mb-[1.5rem] italic text-red-500">스타일을 선택해주세요.</p>
        ) : null}
        <button
          id="submit_btn"
          className='mt-2 mb-8 bg-sky-500 w-full text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
          onClick={onCategorySubmit}>스타일 저장</button>
      </Modal>
    </div>
  );
};

StyleModal.propTypes = {
  openList: PropTypes.bool,
  closeStyleList: PropTypes.func,
};


export default StyleModal;