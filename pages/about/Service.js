import React, { useState, useEffect } from 'react';
import ServiceComponent from 'components/About/ServiceComponent';
import Head from 'next/head';
import { useRouter } from "next/router";
import Nav from "components/About/Nav";

const Service = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <>
      <Head>
        <title>TEAMKOK 소개페이지</title>
        <meta name="description" content={`TEAMKOK 소개페이지`} />
        <meta property="og:title" content={`TEAMKOK 소개페이지`} />
        <meta property="og:description" content={`TEAMKOK 소개페이지`} />
        <meta property="og:image" content={'https://teamkok.com/logo/favicon-96x96.png'} />
        <meta property="og:url" content={`https://teamkok.com/about/service`} />
      </Head>
      <Nav>
        <Service />
      </Nav>
    </>
  );
};

export default Service;