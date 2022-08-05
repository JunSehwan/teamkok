import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

const index = () => {

const { sidebarIn } = useSelector((state) => state.board);

    return (
      <>
      <div className={`py-16 mr-1 ${!sidebarIn ? `sm:pl-[0px]` : `sm:pl-[20rem]` }`}>
        <div className="container m-auto px-3 text-gray-500 md:px-6">
          <div className="mx-auto grid gap-6 md:w-full md:grid-cols-2 lg:w-full lg:grid-cols-2 xl:w-full xl:grid-cols-3">
            
            <div className="overflow-hidden flex flex-col justify-between bg-white rounded-2xl shadow-xl px-6 py-6 sm:px-6 lg:px-6">
              <div className="mb-6 space-y-4">
                <h3 className="text-2xl font-semibold break-words text-violet-900">COMMUNICATION</h3>
                <p className="mb-4">
                  현직자는 기업에 관심을 갖는 구직자 혹은 학생들과 꾸준한 소통을 하며 팀(섹션)단위 홍보를 할 수 있습니다.
                </p>
                <p className="mb-4">
                  구직자 또는 학생들은 좀 더 다양한 팀의 속이야기를 들을 수 있습니다.
                </p>

              </div>
              <div className="w-[100%] flex justify-end">
                <StyledImage
                  className="mr-[-120px] mt-[-60px] border-opacity-40"
                  src="/image/communication.png"
                  alt="communication" loading="lazy"
                  width={320} height={320}
                />
              </div>
            </div>
            <div className="overflow-hidden flex flex-col justify-between bg-white rounded-2xl shadow-xl px-6 py-6 sm:px-6 lg:px-6">
              <div className="mb-6 space-y-4">
                <h3 className="text-2xl font-semibold break-words text-violet-900">SMALL INTERN</h3>
                <p className="mb-4">구직자 또는 학생들은 현업담당자가 제시하는 실무 과제를 수행하면서 자신의 실력을 뽐내면서 팀 합류의 기회를 가질 수 있습니다.
                </p>
                <p className="mb-4">채용담당자는 구직자 또는 학생들의 업무스타일을 파악할 수 있으며, 좀 더 조직 문화에 맞는 인재를 발굴해낼 수 있습니다.
                </p>
              </div>
              <div className="w-[100%] flex justify-end">
                <StyledImage
                  className="mr-[-120px] mt-[-60px]"
                  src="/image/intern.png"
                  alt="intern" loading="lazy" width={320} height={320} />
              </div>
            </div>
            <div className="overflow-hidden flex flex-col justify-between bg-white rounded-2xl shadow-xl px-6 py-6 sm:px-6 lg:px-6">
              <div className="mb-6 space-y-4">
                <h3 className="text-2xl font-semibold break-words text-violet-900">NOW</h3>
                <p className="mb-4">틀에 박힌 서류검토 과정을 집어치우고 좀 더 적극적이고 신중하게 함께 할 동료들을 찾아보세요!</p>
              </div>
              <div className="w-[100%] flex justify-end">
                <StyledImage
                  className="mr-[-120px] mt-[-60px]"
                  src="/image/now.png"
                  alt="now" loading="lazy" width={400} height={320} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const StyledImage = styled(Image)`
  margin-right: -60px!important;
  margin-bottom: -30px!important;
`

export default index;