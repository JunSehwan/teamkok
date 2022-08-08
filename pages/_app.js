import React from 'react';
import Head from 'next/head'; // Next에서 Head 수정할 수 있는 모듈
import { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from './styles/global';
import 'tailwindcss/tailwind.css';
import { wrapper } from 'store/index';
import Navbar from 'components/Common/Navbar';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>현업전문가와의 소통기반 채용플랫폼 - TEAMKOK</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(App);
