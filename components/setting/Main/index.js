import React from 'react';

const index = () => {

  return (
    <div className='pt-[var(--navbar-height)] md:px-8 pb-[70px] md:pb-auto'>

      <div className='pt-5'>
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">계정설정 페이지</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">개인계정 설정관련 페이지입니다.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">비밀번호 변경</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">새로운 비밀번호로 변경합니다.</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">회원탈퇴</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">회원탈퇴를 진행합니다.</dd>
              </div>
            </dl>
          </div>
        </div>

      </div>
    </div>
  );
};

export default index;