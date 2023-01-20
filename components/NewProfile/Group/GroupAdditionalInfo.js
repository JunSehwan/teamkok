import React, { useCallback, useState, useEffect, useRef } from 'react';
import { updateMycompanyAdditionalInfo } from 'firebaseConfig';
import { patchMycompanyAdditionalInfo, patchMycompanyAdditionalInfofalse } from 'slices/user';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const GroupAdditionalInfo = () => {

  const { user, patchMycompanyAdditionalInfoDone } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const notify = () => toast('업데이트 완료');
  //사업분야
  const [companyfield, setCompanyfield] = useState(user?.companyfield || "");
  const [companyfieldError, setCompanyfieldError] = useState(false);
  const onChangeCompanyfield = useCallback((e) => {
    setCompanyfield(e.target.value);
    setCompanyfieldError(false);
  }, [])

  //웹사이트
  const [companyurl, setCompanyurl] = useState(user?.companyurl || "");
  const onChangeCompanyurl = useCallback(
    e => {
      setCompanyurl(e.target.value);
    },
    []
  );

  // 사업장 주소
  const [companyaddress, setCompanyaddress] = useState(user?.companyaddress || "");
  const [addressError, setAddressError] = useState(false);
  const onChangeCompanyaddress = useCallback((e) => {
    setCompanyaddress(e.target.value);
    setAddressError(false);
  }, [])

  // 종업원 수
  const [staffnumber, setStaffnumber] = useState(user?.staffnumber || "");
  const [staffnumberError, setStaffnumberError] = useState(false);
  const onChangeStaffnumber = useCallback((e) => {
    setStaffnumber(e.target.value);
    setStaffnumberError(false);
  }, [])

  // 추가설명
  const [companyadditional, setCompanyadditional] = useState(user?.companyadditional || "");
  const onChangeCompanyadditional = useCallback((e) => {
    setCompanyadditional(e.target.value);
  }, [])


  const onSubmit = useCallback(async (e) => {
    if (companyfield?.length === 0 || !companyfield) {
      document.getElementById('companyfield').focus();
      return setCompanyfieldError(true);
    }
    // if (!val1 || !val2 || !val3 || !val4) {
    //   document.getElementById('val4').focus();
    //   return setAddressError(true);
    // }
    if (!companyaddress) {
      document.getElementById('companyaddress').focus();
      return setAddressError(true);
    }
    if (staffnumber?.length === 0 || !staffnumber) {
      document.getElementById('staffnumber').focus();
      return setStaffnumberError(true);
    }
    // var companyaddress = val1 + "-" + val2 + "-" + val3 + "-" + val4;
    const res = await updateMycompanyAdditionalInfo(
      companyfield, companyurl, companyaddress, staffnumber, companyadditional
    );
    dispatch(patchMycompanyAdditionalInfo(res));
  }, [companyadditional, companyaddress, companyfield, companyurl, dispatch, staffnumber])

  useEffect(() => {
    if (patchMycompanyAdditionalInfoDone) {
      notify();
      dispatch(patchMycompanyAdditionalInfofalse());
    }
  }, [dispatch, patchMycompanyAdditionalInfoDone])



  return (
    <div className='py-8'>
      <h3 className='sm:text-[2.3rem] text-[1.8rem] text-gray-700 my-4 w-full pl-2'>
        🔎부가정보 등록</h3>

      <div className="py-4">
        <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="companyadditional">
          내 업무 또는 전문성에 대해서 알려주세요.
        </label>
        <textarea
          className="block w-full h-32 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="companyadditional"
          type="text"
          placeholder="추가설명 입력"
          onChange={onChangeCompanyadditional}
          value={companyadditional}
        />
      </div>

      <div className="py-4">
        <label
          className="block mb-4 text-md font-bold text-gray-700 "
          htmlFor="companyfield">
          사업분야(업종)<span className='text-red-600'>*</span>
        </label>
        <input
          className={companyfieldError ?
            "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            :
            "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          }
          
          id="companyfield"
          type="text"
          placeholder="제조업"
          onChange={onChangeCompanyfield}
          value={companyfield}
        />
        {companyfieldError ? (
          <p className="text-xs mt-[0.3rem] italic text-red-500">분야를 작성해주세요.</p>
        ) : null}
      </div>



      <div className="py-4">
        <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="companyaddress">
          활동(근무)장소<span className='text-red-600'>*</span>
        </label>

        <div>
          <input
            className={addressError ?
              "mt-2 block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              :
              "mt-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            id="companyaddress"
            type="address"
            placeholder="서울특별시 관악구 신림동"
            // onChange={(e) => setVal4(e.target.value)}
            // value={val4}
            onChange={onChangeCompanyaddress}
            value={companyaddress}
          />
          {addressError ? (
            <p className="text-xs mt-[0.3rem] italic text-red-500">주소를 작성해주세요.</p>
          ) : null}
        </div>

      </div>

      <div className="py-4">
        <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="staffnumber">
          팀원수는?<span className='text-red-600'>*</span>
        </label>
        <input
          className={staffnumberError ?
            "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-red-50 sm:text-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            :
            "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          }
          id="staffnumber"
          type="number"
          placeholder="14"
          onChange={onChangeStaffnumber}
          value={staffnumber}
        />
        {staffnumberError ? (
          <p className="text-xs mt-[0.3rem] italic text-red-500">직원수를 입력해주세요.</p>
        ) : null}
      </div>


      <div className="py-4">
        <label className="block mb-4 text-md font-bold text-gray-700 " htmlFor="companyurl">
          웹사이트
        </label>
        <input
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="companyurl"
          type="url"
          placeholder="(e.g. https://www.abc.co.kr)"
          onChange={onChangeCompanyurl}
          value={companyurl}
        />
      </div>

      <div className="w-full justify-end flex items-center">
        <button onClick={onSubmit}
          className="my-2 px-6 text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg">
          부가정보 업데이트</button>
      </div>
    </div>
  );
};

export default GroupAdditionalInfo;