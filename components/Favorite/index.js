import React from 'react';
import FavoriteList from './FavoriteList';
import ExpertList from './ExpertList';
import MyCompanyList from './MyCompanyList';
import OfferList from './OfferList';
import OfferedList from './OfferedList';
import Footer from 'components/Main/Footer';

const index = () => {
  return (
    <>
      <section className="antialiased bg-gray-100 pt-[60.0px] text-gray-600 h-full" x-data="app">
        <div className="flex flex-col justify-start h-full">
          <MyCompanyList />
          <FavoriteList />
          <ExpertList />
          <OfferedList />
          <OfferList />
        </div>
        <Footer />
      </section>
    </>
  );
};

export default index;