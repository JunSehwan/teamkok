import React from 'react';
import Main from 'components/Main';
import NavBar from 'components/Common/NavbarWithoutUser';
import { wrapper } from 'store/index';

const Home = ({ me }) => {
  console.log("me?", me);

  return (
    <>
      <title>현업전문가와의 소통기반 채용플랫폼 - TEAMKOK</title>
      <meta
        name="description"
        content="현업전문가와의 소통기반 채용플랫폼 - TEAMKOK "
      />
      <NavBar me={me} />
      <Main me={me} />
    </>
  );
};

/* 
* export const getServerSideProps = wrapper.getServerSideProps(
*   (store) => async (context) => {
*     store.dispatch(userLoadingStart());
*   },
* ); */

export default Home;
