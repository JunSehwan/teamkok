import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const index = () => {

  const { sidebarIn } = useSelector((state) => state.board);

  return (
    <>
      <div className={`flex flex-col w-full justify-center py-16 mr-1 ${!sidebarIn ? `sm:pl-[0px]` : `sm:pl-[20rem]`}`}>
        <div className="container m-auto px-3 text-gray-500 md:px-6">
          <div className="flex flex-col w-full">

            <div className="overflow-hidden h-[320px] flex flex-row xs:flex-col mb-3 justify-between bg-white rounded-2xl shadow ">
              <div className="mb-6 space-y-4 p-6">
                <h3 className="text-2xl break-words font-bold text-blue-700">COMMUNICATION</h3>
                <p className="mb-4">
                  현직자는 기업에 관심을 갖는 구직자 혹은 학생들과 꾸준한 소통을 하며 팀(섹션)단위 홍보를 할 수 있습니다.
                </p>
                <p className="mb-4">
                  구직자 또는 학생들은 좀 더 다양한 팀의 속이야기를 들을 수 있습니다.
                </p>

              </div>
              <ImageWrapper className="w-[100%] flex justify-end">
                <StyledImage
                  className="autoimage"
                  src="/image/communication.png"
                  alt="communication" loading="lazy"
                  layout="fill"
                />
              </ImageWrapper>
            </div>
            <div className="overflow-hidden h-[320px] flex flex-row xs:flex-col mb-3 justify-between bg-white rounded-2xl shadow ">
              <div className="mb-6 space-y-4 p-6">
                <h3 className="text-2xl break-words font-bold text-blue-700">SMALL INTERN</h3>
                <p className="mb-4">구직자 또는 학생들은 현업담당자가 제시하는 실무 과제를 수행하면서 자신의 실력을 뽐내면서 팀 합류의 기회를 가질 수 있습니다.
                </p>
                <p className="mb-4">채용담당자는 구직자 또는 학생들의 업무스타일을 파악할 수 있으며, 좀 더 조직 문화에 맞는 인재를 발굴해낼 수 있습니다.
                </p>
              </div>
              <ImageWrapper className="w-[100%] flex justify-end">
                <StyledImage
                  className="autoimage"
                  src="/image/intern.png"
                  alt="intern" loading="lazy" layout="fill" />
              </ImageWrapper>
            </div>
            <div className="overflow-hidden h-[320px] flex flex-row xs:flex-col mb-3 justify-between bg-white rounded-2xl shadow ">
              <div className="mb-6 space-y-4 p-6">
                <h3 className="text-2xl break-words font-bold text-blue-700">NOW</h3>
                <p className="mb-4">좀 더 적극적이고 신중하게 함께 할 동료들이나 팀을 찾아보세요!</p>
              </div>
              <ImageWrapper className="w-[100%] flex justify-end">
                <StyledImage
                  className="autoimage"
                  src="/image/now.png"
                  alt="now" loading="lazy" layout="fill" />
              </ImageWrapper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ImageWrapper = styled.div`
width: 80%;
justify-content: end;
margin: 0 auto;
  margin-right: -2rem!important;
  margin-bottom: -4rem!important;
& > span {
  position: unset !important;
  & .autoimage {
    object-fit: contain !important;
    position: relative !important;
    height: auto !important;
  }
}
`


const StyledImage = styled(Image)`
  margin-right: -10px!important;
  margin-bottom: -30px!important;
  width: 100%!important;
`

export default index;