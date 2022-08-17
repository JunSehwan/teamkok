import React,{useState} from 'react';
import Education from './Education';
import Career from './Career';
import EducationList from './EducationList';
import CareerList from './CareerList';

const index = () => {

  const [eduform, setEduform] = useState(false);
  const addForm = () => {
    if(carform === true){
    setCarform(false)
    setEduform(prev => !prev);
    } else{
      return setEduform(prev => !prev)
    }
    // if (eduform === true) {
    //   document.getElementById('school_name').focus();
    // }
  }

  // 경력등록폼 Open/Close
  const [carform, setCarform] = useState(false);
  const addCarForm = () => {
    if(eduform === true){
    setEduform(false)
    setCarform(prev => !prev);
    } else{
      return setCarform(prev => !prev)
    }
    // if (carform === true) {
    //   document.getElementById('company_name').focus();
    // }
  }

  return (
    <>
      <div className="flex flex-row w-full max-w-[38rem] my-8 mx-auto justify-center flex-gap-4">
        <button
          onClick={addForm}
          type="button"
          className=" py-2 px-4 w-[140px] flex justify-center items-center  bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
          학력추가
        </button>
        <button
          onClick={addCarForm}
          type="button"
          className="ml-2  py-2 px-4 w-[140px] flex justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          경력추가
        </button>

      </div>
      <div className="flex flex-col w-full max-w-[38rem] mx-auto justify-center flex-gap-4">

        <Education
          eduform={eduform}
          setEduform={setEduform}
        />
        <Career
          carform={carform}
          setCarform={setCarform}
        />
        </div>
      <EducationList />
      <CareerList />
    </>
  );
};

export default index;