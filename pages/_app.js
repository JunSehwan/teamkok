import React, { useEffect } from 'react';
import Head from "next/head"; // Next에서 Head 수정할 수 있는 모듈
import { ThemeProvider } from "styled-components";
import GlobalStyle, { theme } from './styles/global';
import { Provider } from "react-redux";
import store from "store/index";
import 'tailwindcss/tailwind.css'
import { wrapper } from "store/index";
import NewNavbar from 'components/Common/NewNavbar';
import { useRouter } from 'next/router';
import * as gtag from "lib/gtag";
import Script from 'next/script'

const _app = ({ Component, pageProps }) => {

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // 리라우팅시 root페이지로 이동(동적페이지) - 방지를 위함
  useEffect(() => {
    router.push(window.location.href)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>내가 원하는 JOB을 콕!콕!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="apple-touch-icon" sizes="57x57" href="/logo/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/logo/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/logo/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/logo/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/logo/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/logo/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/logo/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/logo/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/logo/favicon-96x96.png" />
        <link rel="icon" type="imagfirebase deploy --only hostinge/png" sizes="16x16" href="/logo/favicon-16x16.png" />
        <link rel="manifest" href="/logo/manifest.json" />
        <link rel="stylesheet" as="style" crossOrigin="true" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
        <meta name="naver-site-verification" content="03f56ed31be86c0a262e8be9ed5c85cdcc2db12e" />
        
        
      </Head>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js"></Script>
      {/* <Script src="https://unpkg.com/flowbite@1.5.4/dist/datepicker.js"></Script> */}
      <ThemeProvider theme={theme}>
        {/* <Provider store={store}> */}
        <NewNavbar>
        <Component {...pageProps} />
        </NewNavbar>
        {/* </Provider> */}
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(_app);