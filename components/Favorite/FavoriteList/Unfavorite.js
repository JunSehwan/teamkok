import React, { useCallback, useState } from 'react';
import { unfavoriteBoard } from 'firebaseConfig';
import { updateUnfavoriteBoard } from 'slices/board';
import { updateUserUnfavorites } from 'slices/user';
import { useSelector, useDispatch } from 'react-redux';
import DeleteModal from 'components/Common/Modal/DeleteModal';
import PropTypes from 'prop-types';


const Unfavorite = ({ boardId, boardname, boardlogo }) => {

  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const onOpenRemove = useCallback(() => {
    document.body.style.overflow =  "hidden"; 
    setRemoveConfirm(true);
   }, [])
  const onCancelRemove = useCallback(() => {
    document.body.style.overflow =  "unset";
    setRemoveConfirm(false);
  }, [])
  const onClickRemove = useCallback(async () => {
    
    const con = await unfavoriteBoard(user?.userID, user?.username, boardId, boardname, boardlogo);

    if (con) {
      dispatch(updateUnfavoriteBoard(con))
      dispatch(updateUserUnfavorites(con))
      // alert("관심기업이 삭제되었습니다.")
    } 
  }, [boardId, boardlogo, boardname, user?.userID, user?.username,dispatch])


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

Unfavorite.propTypes = {
  boardId: PropTypes.string,
  boardname: PropTypes.string,
  boardlogo: PropTypes.string,
};

export default Unfavorite;