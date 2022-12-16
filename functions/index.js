const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require('axios');
const dayjs = require('dayjs');
const serviceAccount = require("./admin-sdk.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth(app);

const i = functions.logger.info;
const e = functions.logger.error;

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
        // redirect_uri: NODE_ENV === "production" ?
        //   "https://jobcoc.com/auth/kakaologin" : "http://localhost:3060/auth/kakaologin",
      }
    })
    return res?.data;
  } catch (error) {
    e("# create token error:", error);
    throw error;
  }
}

async function fetchKakaoUser(accessToken) {
  const res = await axios({
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      'authorization': `Bearer ${accessToken}`
    }
  })
  return res.data;
}


async function createOrGetAuthUser(kakaoUser) {
  const { email, profile } = kakaoUser;
  i(kakaoUser)
  try {
    return await auth.getUserByEmail(email);
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return await auth.createUser({
        email: email,
        emailVerified: false,
        displayName: profile.nickname || "",
        photoURL: profile.profile_image_url || "",
        disabled: false,
      });
    }
    throw error;
  }
}

async function writeUserOnFirestore(uid, email, profile) {
  return await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .set({
      id: uid,
      username: profile.nickname || "",
      avatar: profile.profile_image_url || "",
      // avatar: profile_image_url || "",
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
      // timestamp: admin.firestore.Timestamp.fromDate(new Date()),
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    })
}

async function createAccount(kakaoUser) {
  try {
    const { email, profile } = kakaoUser;
    const { uid } = await createOrGetAuthUser(kakaoUser);
    i("# what i wanna :", uid, email, profile);
    const doc = await writeUserOnFirestore(uid, email, profile);
    i("# doc saved :", doc);
    return uid;
  } catch (error) {
    e("# create account error:", error);
  }
}

exports.kakaoLogin = functions
  .region('asia-northeast3')
  .https
  .onCall(async (data, context) => {
    i('# code is :', data.code);
    const { access_token } = await fetchKakaoAccessToken(data.code);
    const { kakao_account } = await fetchKakaoUser(access_token);
    const uid = await createAccount(kakao_account);
    return await auth.createCustomToken(uid, { provider: "KAKAO" });
  });