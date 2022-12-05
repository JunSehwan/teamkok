import React from 'react';
import About from 'components/About';
import Head from 'next/head'
import { useRouter } from 'next/router';
import Nav from "components/About/Nav";

const index = () => {
  const router = useRouter();
  if (router.isFallback) {
    return (<h1>Data is loading</h1>);
  }

  return (
    <>
      <Head>
        <title>TeamZ - 소개페이지</title>

        <meta name="keywords" content="teamz, 팀즈, 채용공고, 현업담당자와 대화, 업무문의, 채용문의, 팀기반 소통플랫폼" />
        <meta name="description" content="TEAMZ 소개페이지" />

        <meta name="application-name" content="TeamZ - 관심있는 기업보드에 참여 후 현업자담당자와 소통해보세요." />
        <meta name="msapplication-tooltip" content="TeamZ" />

        <meta property="og:type" content="TEAMZ 소개페이지" />
        <meta property="og:title" content="TEAMZ와 넥스트퍼스를 알려드립니다." />
        <meta property="og:description" content="넥스트퍼스 소개" />
        <meta property="og:image" content="https://teamz.co.kr/logo/teamz.png" />
        <meta property="og:url" content="https://teamz.co.kr/about" />

        <meta name="twitter:card" content="TeamZ에 오신걸 환영합니다." />
        <meta name="twitter:title" content="TEAMZ와 넥스트퍼스를 알려드립니다." />
        <meta name="twitter:description" content="넥스트퍼스 소개" />
        <meta name="twitter:image" content="https://teamz.co.kr/logo/teamz.png" />
        <meta name="twitter:domain" content="https://teamz.co.kr/about" />
      </Head>

      <Nav>
        <About />
      </Nav>
    </>
  );
};

export default index;