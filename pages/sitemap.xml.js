// import { getServerSideSitemap } from 'next-sitemap'; //(1)
// import { getAllPosts, getFriends } from 'firebaseConfig';

// //(2)
// export const getServerSideProps = async (ctx) => {
//   const posts = await getAllPosts();
//   const users = await getFriends();
//   // const users = await fetcher('/friends');
//   // console.log(users, "users");
//   const lastmod = new Date().toISOString();

//   //(3), (4)
//   const defaultFields = [
//     {
//       loc: "https://jobcoc.com",
//       changefreq: 'daily',
//       priority: '0.8',
//       lastmod,
//     },
//     {
//       loc: `https://jobcoc.com/news`,
//       changefreq: 'daily',
//       priority: '0.8',
//       lastmod,
//     },
//     {
//       loc: `https://jobcoc.com/friends`,
//       changefreq: 'daily',
//       priority: '0.8',
//       lastmod,
//     },
//     // {
//     //   loc: `https://jobcoc.com/friends/detail`,
//     //   changefreq: 'daily',
//     //   priority: '0.8',
//     //   lastmod,
//     // },
//     {
//       loc: `https://jobcoc.com/about`,
//       changefreq: 'daily',
//       priority: '0.8',
//       lastmod,
//     },
//   ];

//   //(5)
//   const categoryFields = users?.map((category) => ({
//     loc: `https://jobcoc.com/friends/detail/${category?.userID}`,
//     changefreq: 'daily',
//     priority: '0.9',
//     lastmod,
//   }));

//   // const boardFields = posts?.map((board) => ({
//   //   loc: `https://jobcoc.com/${board.category}/${board.id}`,
//   //   changefreq: 'daily',
//   //   priority: '1.0',
//   //   lastmod,
//   // }));

//   //(6)
//   const fields = [...defaultFields, ...categoryFields,
//     // ...boardFields
//   ];

//   //(7)
//   return getServerSideSitemap(ctx, fields);
// };
// //(8)
// // eslint-disable-next-line import/no-anonymous-default-export
// export default () => {
//   return;
// };



import React from 'react';

const index = () => {
  return (
    <div>

    </div>
  );
};

export default index;