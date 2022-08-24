import React, { useCallback, useState } from 'react';
import { deleteJoboffer } from 'firebaseConfig';
import { removeJoboffer } from 'slices/joboffer';
import { useSelector, useDispatch } from 'react-redux';
import DeleteModal from 'components/Common/Modal/DeleteModal';
import PropTypes from 'prop-types';


const UnOffer = ({ id }) => {

  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const onOpenRemove = useCallback(() => {
     setRemoveConfirm(true);
     document.body.style.overflow =  "hidden";
   }, [])
  const onCancelRemove = useCallback(() => {
    setRemoveConfirm(false);
    document.body.style.overflow =  "unset";
  }, [])
  const onClickRemove = useCallback(async () => {
    
    const con = await deleteJoboffer(id);
    if (con) {
      dispatch(removeJoboffer(con))
      alert("해당 입사제안 내용이 삭제되었습니다.")
    } 
  }, [dispatch, id])


  return (
    <>
      <button
        className="p-2 ml-1 hover:bg-orange-100 text-orange-600 rounded-full "
        onClick={onOpenRemove}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
      {removeConfirm ?
        <DeleteModal
          openModal={removeConfirm}
          onOk={onClickRemove}
          onCancel={onCancelRemove}
        />
        : null}
    </>
  );
};

UnOffer.propTypes = {
  id: PropTypes.string,
};

export default UnOffer;