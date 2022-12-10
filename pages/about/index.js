import React from 'react';
import NewAbout from 'components/NewAbout';
import Head from 'next/head'
import { useRouter } from 'next/router';
import Nav from "components/NewAbout/Nav";

const index = () => {
  const router = useRouter();
  if (router.isFallback) {
    return (<h1>Data is loading</h1>);
  }

  return (
    <>
      <Head>
        <title>넥스트퍼스 팀 소개👨🏽‍🦱👨‍🦱 - JOBCOC</title>

        <meta name="keywords" content="jobcoc, 채용사이트, 채용공고, 현업담당자와 대화, 업무문의, 채용문의, 소통플랫폼" />
        <meta name="description" content="1분 자기소개 영상이나 포트폴리오 이미지로 나의 이력을 어필할 수 있습니다. 또한, 채용담당자가 제안하는 동료들의 실질적인 연봉 수준을 확인할 수 있습니다." />

        <meta name="application-name" content="JOBCOC - 개성있는 프로필로 빠르게 취업하기" />
        <meta name="msapplication-tooltip" content="JOBCOC" />

        <meta property="og:type" content="넥스트퍼스 팀 소개!, JOBCOC" />
        <meta property="og:title" content="JOBCOC - 개성있는 프로필로 빠르게 취업하기" />
        <meta property="og:description" content="1분 자기소개 영상이나 포트폴리오 이미지로 나의 이력을 어필할 수 있습니다. 또한, 채용담당자가 제안하는 동료들의 실질적인 연봉 수준을 확인할 수 있습니다." />
        <meta property="og:image" content="https://jobcoc.com/logo/jobcoc.png" />
        <meta property="og:url" content="https://jobcoc.com" />

        <meta name="twitter:card" content="JOBCOC에서 원하는 팀에 합류하세요!" />
        <meta name="twitter:title" content="JOBCOC - 개성있는 프로필로 빠르게 취업하기" />
        <meta name="twitter:description" content="1분 자기소개 영상이나 포트폴리오 이미지로 나의 이력을 어필할 수 있습니다. 또한, 채용담당자가 제안하는 동료들의 실질적인 연봉 수준을 확인할 수 있습니다." />
        <meta name="twitter:image" content="https://jobcoc.com/logo/jobcoc.png" />
        <meta name="twitter:domain" content="https://jobcoc.com" />
      </Head>

      {/* <Nav> */}
      <NewAbout />
      {/* </Nav> */}
    </>
  );
};

export default index;