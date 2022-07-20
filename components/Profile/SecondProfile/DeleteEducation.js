import React from 'react';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import DeleteModal from '../../Common/Modal/DeleteModal';
import { deleteEducation } from 'firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';

const DeleteEducation = (
  { id }
) => {

  const [removeEduModalOpen, setRemoveEduModalOpen] = useState(false);
  const onClickRemoveEdu = useCallback(() => {
    setRemoveEduModalOpen(true);
  }, [removeEduModalOpen])
  const onRemoveCancelEdu = useCallback(() => {
    setRemoveEduModalOpen(false);
  }, [removeEduModalOpen])
  const removeEdu = useCallback(async (id) => {
    const result = await deleteEducation(id);
    console.log(result, "결과값");
  }, [myEducations])

  return (
    <>
      <button onClick={onClickRemoveEdu} className="flex col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-end items-center" >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 z-10 rounded-lg text-sky-500 hover:text-sky-600 font-bold bg-sky-100  py-1 px-1 text-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
      {removeEduModalOpen ?
        <DeleteModal
          onOk={removeEdu(id)}
          onCancel={onRemoveCancelEdu}
          openModal={removeEduModalOpen}
        />
        : null}
    </>
  );
};

DeleteEducation.propTypes = {
  id: PropTypes.string,
};

export default DeleteEducation;