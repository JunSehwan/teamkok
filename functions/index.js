const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require('axios');
const dayjs = require('dayjs');
const serviceAccount = require("./admin-sdk.json");
const express = require('express');
const apps = express();

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth(app);
const logI = functions.logger.info;
const logE = functions.logger.error;
const isDev = process.env.NODE_ENV !== 'production'
async function fetchKakaoAccessToken(code) {
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        code: code,
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_LOGIN_CLIENT_ID,
        // redirect_uri: "http://localhost:3060/auth/kakaologin",
        redirect_uri: "https://jobcoc.com/auth/kakaologin",
      }
    })
    return res?.data;
  } catch (e) {
    logE("# fetch kakao access token error:", e);
    throw e;
  }
}

async function fetchKakaoUser(accessToken) {
  try {
    const res = await axios({
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: { 'authorization': `Bearer ${accessToken}` }
    });
    return res.data;
  } catch (e) {
    logE("# fetch kakao user error:", e);
  }
}

async function writeDefaultUserDataOnFirestore(uid, email, profile) {
  try {
    return await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .set({
        id: uid,
        username: profile.nickname || "",
        avatar: profile.profile_image_url || "",
        birthday: "",
        phonenumber: "",
        likes: [],
        liked: [],
        joboffers: [],
        joboffered: [],
        coccocs: [],
        coccoced: [],
        advices: [],
        adviced: [],
        firstmake: true,
        email: email,
        timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
  } catch (e) {
    logE("# write default user data got error:", e);
  }
}

async function createAuthUser({ email, profile }) {
  try {
    return await auth.createUser({
      email: email,
      emailVerified: false,
      displayName: profile.nickname || "",
      photoURL: profile.profile_image_url || "",
      disabled: false,
    });
  } catch (e) {
    logE("# create Auth User get Error:", e);
  }
}

async function createAccount(kakaoUser) {
  try {
    const { email, profile } = kakaoUser;
    const authUser = await createAuthUser(kakaoUser);
    logI("# createAccount : who i am :", authUser.uid, email, profile);
    const doc = await writeDefaultUserDataOnFirestore(uid, email, profile);
    logI("# createAccount : doc saved :", doc);
    return authUser;
  } catch (e) {
    logE("# create account got error:", e);
  }
}

async function fetchAuthUser(kakaoUser) {
  try {
    return await auth.getUserByEmail(kakaoUser.email);
  } catch (e) {
    // TODO 각 에러 코드에 대응하여 예외 처리 해야합니다.
    // https://firebase.google.com/docs/auth/admin/errors
    logE("# fetchAuthUser got Error", e);
    if (e.code === "auth/user-not-found")
      return null;
    return null;
  }
}

exports.kakaoLogin = functions
  .region('asia-northeast3')
  .https
  .onCall(async (data, context) => {
    logI('# code is :', data.code);
    const { access_token } = await fetchKakaoAccessToken(data.code);
    const { kakao_account } = await fetchKakaoUser(access_token);

    let user = await fetchAuthUser(kakao_account);
    logI("# user is :", user);
    if (!user) {
      user = await createAccount(kakao_account);
    }
    return await auth.createCustomToken(user.uid, { provider: "KAKAO" });
  });


// exports.buildSitemap = functions.https.onRequest(async (request, response) => {

//   let sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

//   let basucURL = `<url><loc>https://jobcoc.com</loc><lastmod>2022-12-29</lastmod></url>`;
//   let blogURL = `<url><loc>https://jobcoc.com/news</loc><lastmod>2022-12-29</lastmod></url>`;
//   let projectsURL = `<url><loc>https://jobcoc.com/friends</loc><lastmod>2022-12-29</lastmod></url>`;
//   let aboutURL = `<url><loc>https://jobcoc.com/about</loc><lastmod>2022-12-29</lastmod></url>`;
//   // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   // Reading data dynamically from the database
//   // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   let snapshot = await admin.database().ref('users').once('userID');
//   let posts = snapshot.val();
//   let postURLs = Object.keys(posts).reduce((acc, url) => {

//     acc = acc + `<url><loc>https://jobcoc.com/friends/detail/${url}</loc><lastmod>${posts[url].timestamp}</lastmod></url>`;

//     return acc;

//   }, '');
//   // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//   let sitemapFooter = `</urlset>`;

//   let sitemapString = sitemapHeader + basucURL + blogURL + projectsURL + aboutURL + postURLs + sitemapFooter;
//   logI("# sitemapString", sitemapString);
//   response.set('Content-Type', 'text/xml');
//   response.status(200).send(sitemapString);

// });

apps.get('/sitemap.xml', async (request, response) => {
  let sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  let basucURL = `<url><loc>https://jobcoc.com</loc><lastmod>2022-12-29</lastmod></url>`;
  let blogURL = `<url><loc>https://jobcoc.com/news</loc><lastmod>2022-12-29</lastmod></url>`;
  let projectsURL = `<url><loc>https://jobcoc.com/friends</loc><lastmod>2022-12-29</lastmod></url>`;
  let aboutURL = `<url><loc>https://jobcoc.com/about</loc><lastmod>2022-12-29</lastmod></url>`;
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Reading data dynamically from the database
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  let snapshot = await admin.database().ref('users').once('userID');
  let posts = snapshot.val();
  let postURLs = Object.keys(posts).reduce((acc, url) => {

    acc = acc + `<url><loc>https://jobcoc.com/friends/detail/${url}</loc><lastmod>${posts[url].timestamp}</lastmod></url>`;

    return acc;

  }, '');
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  let sitemapFooter = `</urlset>`;

  let sitemapString = sitemapHeader + basucURL + blogURL + projectsURL + aboutURL + postURLs + sitemapFooter;
  logI("# sitemapString", sitemapString);
  response.set('Content-Type', 'text/xml');
  response.status(200).send(sitemapString);

})
exports.myApp = functions.https.onRequest(apps);


// export const generateSitemap = functions.region('us-central1').https.onRequest((req, res) => {

//   const afStore = admin.firestore();
//   const promiseArray: Promise<any>[] = [];

//   const stream = new SitemapStream({ hostname: 'https://www.example.com' });
//   const fixedLinks: any[] = [
//     { url: `/start/`, changefreq: 'hourly', priority: 1 },
//     { url: `/help/`, changefreq: 'weekly', priority: 1 }
//   ];

//   const userLinks: any[] = [];

//   promiseArray.push(afStore.collection('users').where('active', '==', true).get().then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//       if (doc.exists) {
//         userLinks.push({ url: `/user/${doc.id}`, changefreq: 'daily', priority: 1 });
//       }
//     });
//   }));

//   return Promise.all(promiseArray).then(() => {
//     const array = fixedLinks.concat(userLinks);
//     return streamToPromise(Readable.from(array).pipe(stream)).then((data: any) => {
//       res.set('Content-Type', 'text/xml');
//       res.status(200).send(data.toString());
//       return;
//     });
//   });
// });