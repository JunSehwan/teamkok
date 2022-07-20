import React, { useState, useEffect } from 'react';
import PrivacyComponent from 'components/About/PrivacyComponent';
import Head from 'next/head';
import { useRouter } from "next/router";
import Nav from "components/About/Nav";

const Privacy = () => {
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const handleStart = (url) => {
  //     url !== router.pathname ? setLoading(true) : setLoading(false);
  //   };
  //   const handleComplete = (url) => setLoading(false);

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);
  // }, [router]);

  return (
    <>
      <Head>
        <title>NextPus는?</title>
        <meta name="description" content={`ChooNo - 개인정보처리방침`} />
        <meta property="og:title" content={`NextPus 개인정보처리방침`} />
        <meta property="og:description" content={`NextPus 개인정보처리방침`} />
        <meta property="og:image" content={'https://choono.co.kr/logo/favicon-96x96.png'} />
        <meta property="og:url" content={`https://choono.co.kr/about/privacy`} />
      </Head>
      <Nav>
       <PrivacyComponent/>
      </Nav>
    </>
  );
};

export default Privacy;