import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateCategory } from 'firebaseConfig';
import { patchCategory, patchCategoryFalse } from 'slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from 'react-icons/io';
import CategoryBox from 'components/Common/CategoryBox';
import CategoryList from 'components/Common/CategoryList';

const Second = ({ goNextStage, goNews, goPrevStage, goCertStage }) => {

  const { user, patchCategoryDone, } = useSelector(state => state.user);
  // const [purpose, setPurpose] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (patchCategoryDone && user?.category) {
      dispatch(patchCategoryFalse());
      goCertStage(3);
    }
  }, [dispatch, goCertStage, patchCategoryDone, user?.category])

  const onChange = useCallback((e) => async () => {
    const res = await updateCategory(
      parseInt(e)
    );
    dispatch(patchCategory(res));
  }, [dispatch])



  // const onSubmit = useCallback(async (e) => {
  //   const res = await updatePurpose(
  //     purpose
  //   );
  //   dispatch(updateUserPurpose(res));
  // }, [dispatch, purpose])

  return (
    <div className='w-full min-h-[100vh] flex flex-col justify-between'>
      {/* 뒤로가기 버튼 ==> 첫번째는 없고 두번째부터*/}
      <div className='py-4 bg-[#ffffff51] z-10 backdrop-blur-md	'>
        <div className='mx-auto text-left'>
          <div className='w-full flex justify-start items-center'>
            <div className='w-max'>
              <div className='flex justify-start items-center'>
                <button className="text-gray-600 p-3 rounded-full hover:bg-gray-100"
                  onClick={goPrevStage}
                >
                  <IoMdArrowRoundBack className='w-6 h-6' />
                </button>
              </div>
            </div>
            <div className='my-6 px-4 w-full'>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 ">
                <div className="bg-sky-600 text-xs font-medium text-sky-100 text-center p-0.5 leading-none rounded-full w-[15%]">15%</div>
              </div>
            </div>
          </div>
          <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 my-6 w-full pl-2'>
            관심있는 분야는?</h3>
          <p className='ml-2 my-1 text-gray-500 text-[1.2rem] leading-8'>관심분야의 인재들을 확인하거나 팀 소식을 더 신속하게 접할 수 있습니다.</p>
          <ul className="grid gap-1 w-full sm:grid-cols-2 md:grid-cols-3 ">

            {CategoryList?.map((v) => (
              <button key={v?.key} onClick={onChange(v?.key)}>
                <CategoryBox
                  keyNumber={v?.key}
                  title={v?.name}
                />
              </button>
            ))}



          </ul>
        </div>
      </div>



      <div className='w-full justify-center flex flex-col items-center px-2'>
        <button className="my-3 py-2 w-[12rem] text-gray-500 text-[14px] underline" onClick={goNews}>나중에 하기</button>
        {/* <button className='my-2 w-full text-md py-4 font-bold text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:shadow-outline rounded-lg' onClick={onSubmit}>시작하기</button> */}
      </div>
    </div>
  );
};

Second.propTypes = {
  goNextStage: PropTypes.func,
  goNews: PropTypes.func,
  goPrevStage: PropTypes.func,
  goCertStage: PropTypes.func,
};

export default Second;