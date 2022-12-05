import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import EducationList from './EducationList';
import AddEducation from './AddEducation';
import toast from 'react-hot-toast';

const index = () => {

  const notify = () => toast('학력정보 업데이트 완료!');
  const { educationOpen, updateDone } = useSelector(state => state.education);

  useEffect(() => {
    if (updateDone) {
      notify();
    }
  }, [updateDone])


  return (
    <>

      <div>
        <div className='py-4 bg-[#ffffff51] z-10'>
          <div className='mx-auto text-left'>

            <h3 className='sm:text-[2.1rem] text-[1.8rem] text-gray-700 my-4 w-full'>
              🏛️학력정보</h3>
            <p className='ml-2 my-1 text-gray-500 text-[1.2rem] leading-8'>학력정보를 입력해주세요.</p>
            <EducationList />
            {educationOpen && <AddEducation />}



          </div>
        </div>



        <div className='w-full justify-end flex items-center'>

        </div>
      </div>
    </>

  );
};


export default index;