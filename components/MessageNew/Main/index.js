import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

const index = () => {
  const router = useRouter();
  const goProfile = useCallback(() => {
    router.push('/profile');
  }, [router])

  return (
    <div className='h-full w-full flex items-start flex-col gap-4'>
      <div className="overflow-hidden bg-white sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">아직 대화상대가 없으신가요?</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">프로필을 업데이트하여 다양한 현업 전문가들의 관심을 받아보세요!</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 items-center px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-gray-700 font-bold">입사제의</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">프로필을 업데이트하여 여러 팀들에서 입사제의를 받아보세요.</dd>
            </div>
            <div className="bg-white items-center px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-gray-700 font-bold">콕!콕!</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">또는, 아직은 아니지만 추후 팀으로의 합류를 제안하여 당신을 콕! 찍을수도 있습니다.</dd>
            </div>
            <div className="bg-gray-50 items-center px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-gray-700 font-bold">진짜! 연봉수준</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">동료들의 스펙대비 제안받은 진짜연봉 수준을 확인할 수도 있습니다!</dd>
            </div>
            <div className="bg-whit items-center px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-gray-700 font-bold">이제, 시작해보세요!</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">대화뿐만 아니라 파일전송, 이미지 전송을 할 수 있습니다!😄 <br /> 현업 채용담당자와 팀원들과의 교류를 통해 원하는 팀에 대한 소식을 듣고, 꿈의 팀에 합류해보세요!</dd>
            </div>
          </dl>
        </div>
      </div>
      <button
        onClick={goProfile}
        type="button"
        className="w-full mx-auto md:max-w-[250px] px-4 min-w-[144px] text-md py-3 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC] focus:outline-none focus:shadow-outline rounded-lg">
        프로필 업데이트하러 가기
      </button>
    </div>
  );
};

export default index;

