import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/Common/Modal/Modal';
import { AiFillStar } from 'react-icons/ai';
import styled from 'styled-components';
import { createAdvice } from 'firebaseConfig';
import { addAdvice, addDetailAdvice } from 'slices/user';

const index = ({ adviceOn, openAdvice, closeAdvice, friendname, friend, detail }) => {

  const dispatch = useDispatch();
  // 수정

  const { user } = useSelector(state => state.user);
  const { addAdviceDone } = useSelector(state => state.user);

  useEffect(() => {
    if (addAdviceDone || !adviceOn) {
      setDescriptionError(false);
      setRatingError(false);
      setRating(0);
      setDescription("");
      closeAdvice();
    }
  }, [addAdviceDone, dispatch, closeAdvice, adviceOn])


  //직장명
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const [hover, setHover] = useState(0);
  const onChangeRating = useCallback((e) => {
    setRating(e);
    setRatingError(false);
  }, [])

  const [description, setDescription] = useState();
  const [descriptionError, setDescriptionError] = useState(false);
  const onChangeDescription = useCallback((e) => {
    setDescription(e.currentTarget.value);
    setDescriptionError(false);
  }, [])


  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }

    if (rating == '' || rating == 0) {
      document.getElementById('rating').focus();
      return setRatingError(true);
    }
    if (!description || description?.length === 0) {
      document.getElementById('description').focus();
      return setDescriptionError(true);
    }

  
    const con = await createAdvice(
      {
        targetId: friend?.userID,
        targetName: friend?.username,
        targetAvatar: friend?.avatar,
        description: description,
        rating: rating,
        mycompany: user?.mycompany,
        mysection: user?.mysection,
        companylogo: user?.companylogo,
      }
    );
    if (detail === true) {
      dispatch(addDetailAdvice({
        targetId: friend?.userID,
        targetName: friend?.username,
        targetAvatar: friend?.avatar,
        userId: user?.userID,
        username: user?.username,
        userAvatar: user?.avatar,
        description: description,
        rating: rating,
        mycompany: user?.mycompany,
        mysection: user?.mysection,
        companylogo: user?.companylogo,
      }));
    } else {
      dispatch(addAdvice({
        targetId: friend?.userID,
        targetName: friend?.username,
        targetAvatar: friend?.avatar,
        userId: user?.userID,
        username: user?.username,
        userAvatar: user?.avatar,
        description: description,
        rating: rating,
        mycompany: user?.mycompany,
        mysection: user?.mysection,
        companylogo: user?.companylogo,
      }));
    }

  }, [user?.userID, user?.username, user?.avatar, user?.mycompany, user?.mysection, user?.companylogo, rating, description, friend?.userID, friend?.username, friend?.avatar, detail, dispatch])


  return (
    <Modal
      open={openAdvice}
      onClose={closeAdvice}
      title={`Spec 조언`}
      visible={adviceOn}
      widths="800px"
      onCancel={closeAdvice}
      onSubmit={onSubmit}

    >
      <div className='p-3'>

        <h3 className='sm:text-[2.1rem] text-[1.8rem] text-gray-700 my-4 w-full'>
          {friendname} 님에게 조언해주기</h3>
        <p className='ml-2 my-1 text-gray-700 text-[1.2rem] leading-6'>
          본인의 팀으로 합류할 경우를 기준으로<br />
          어떤 스킬, 능력을 추가적으로 습득했으면 하는지 의견을 남겨주세요.<br />
          {friendname}님에게는 큰 도움이 되는 조언입니다.👍<br />
        </p>
        <p className='text-gray-500 text-md mt-2'>🤐 해당 의견은 당사자만이 확인할 수 있습니다.</p>

        <form
          className="w-full pt-2 pb-2 mb-1 rounded mt-[1.4rem]"
          onSubmit={onSubmit}
        >
          <div className="mb-7">
            <Stars className="star-rating w-full mx-auto flex justify-center"
              id="rating"
            >
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= ((rating && hover) || hover) ? "on" : "off"}
                    onClick={() => onChangeRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span >
                      <AiFillStar
                        className="star w-14 h-14"
                      />
                    </span>
                  </button>
                );
              })}
            </Stars>
            {ratingError ? (
              <p className="text-xs mb-[1.5rem] text-red-500">별점을 주세요!🥰</p>
            ) : null}
          </div>

          <div className="mb-4">
            <textarea
              id="description"
              placeholder="성공적인 이직을 위한 제언(필요스킬 중심으로)"
              className="w-full px-3 py-4 mb-2 resize-none h-52 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              onChange={onChangeDescription}
              value={description}
            >
            </textarea>
            {descriptionError ? (
              <p className="text-xs mb-[1.5rem] text-red-500">어떤 조언이라도 생각나는 말씀이 없으신가요?🤔</p>
            ) : null}
          </div>









          <div className="mb-2 text-right">
            <div className="flex w-full justify-end">
              <button onClick={closeAdvice} type="button" className="mr-2 py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-600 text-[14px]">Cancel</button>
              <button type="submit" className=" px-8 min-w-[144px] text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg">의견등록</button>
            </div>
          </div>
        </form>
      </div>
    </Modal >
  );
};

const Stars = styled.div`
  .on {
    color: #3274e8;
  }
  .off {
    color: rgba(0,0,0,0.33);
  }
`

index.propTypes = {
  adviceOn: PropTypes.bool,
  openAdvice: PropTypes.func,
  closeAdvice: PropTypes.func,
  friendname: PropTypes.string,
  friend: PropTypes.object,
  detail: PropTypes.bool,
};


export default index;