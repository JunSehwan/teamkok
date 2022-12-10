import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  getDoc,
  FieldValue,
  DocumentData,
  DocumentReference,
  deleteField,
  serverTimestamp, limit, arrayUnion, arrayRemove,
  query, where, getDocs, orderBy,
  deleteDoc, startAfter, increment, limitToLast
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  updateEmail,
  AuthCredential,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signInAnonymously,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import dayjs from "dayjs";
import { set } from "lodash";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATA_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export const auth = getAuth();
export const currentUser = auth.currentUser;

export { app, db, storage, FieldValue };

var now = dayjs();
const nowForCopy = dayjs(now);
const time = nowForCopy.format('YYYY-MM-DD HH:mm:ss');


// var time = new Date().toISOString();

// 로그인/아웃에 따라서 user값이 변경됨(기본설정함수)
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    return user;
    // ...
  } else {
    // User is signed out
    return user;
    // ...
  }
});
// if (user !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   const displayName = user.displayName;
//   const email = user.email;
//   const photoURL = user.photoURL;
//   const emailVerified = user.emailVerified;

//   // 제공업체별 사용자 프로필 정보 가져오기
//   // if (user !== null) {
//   //   user.providerData.forEach((profile) => {
//   //     console.log("Sign-in provider: " + profile.providerId);
//   //     console.log("  Provider-specific UID: " + profile.uid);
//   //     console.log("  Name: " + profile.displayName);
//   //     console.log("  Email: " + profile.email);
//   //     console.log("  Photo URL: " + profile.photoURL);
//   //   });
//   // }

//   // The user's ID, unique to the Firebase project. Do NOT use
//   // this value to authenticate with your backend server, if
//   // you have one. Use User.getToken() instead.
//   const uid = user.uid;
// }



export async function getUser(userId) {
  const result = await getDoc(api.userByIdRef(userId));

  // const user = await userRef.doc('currentUser.uid').get();
  // if (!user.exists) {
  //   return res.status(404).json({});
  // }

  if (result.exists()) {
    return { id: result.id, ...result.data() }
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }


  return res.status(404).json({ id: user.id, ...user.data() });
}

export async function getOtherUser(otherid) {
  try {
    const result = await getDoc(api.userByIdRef(otherid));
    if (result.exists()) {
      const user = {
        ...result.data(),
        likes: result.data().likes || [],
        liked: result.data().liked || [],
        advices: result.data().advices || [],
        adviced: result.data().adviced || [],
        coccocs: result.data().coccocs || [],
        coccoced: result.data().coccoced || [],
        joboffers: result.data().joboffers || [],
        joboffered: result.data().joboffered || [],
        userID: otherid
      };

      return user;
    }
  } catch (e) {
    console.error(e)
  }
}

export async function createAccount(
  email, password, username, form, tel
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )


    // Signed in
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username,
      photoURL: "",
    });
    // Profile updated

    const now = new Date();
    const nowForCopy = dayjs(now);
    const time = nowForCopy?.format('YYYY-MM-DD HH:mm:ss');

    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username,
      avatar: "",
      birthday: form,
      phonenumber: tel,
      likes: [],
      liked: [],
      joboffers: [],
      joboffered: [],
      coccocs: [],
      coccoced: [],
      advices: [],
      adviced: [],
      // tag: "0000", // Create function to generate unique tag for each username
      // about: "",
      // banner: "#7CC6FE",
      email: user.email,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    })
    //   // setIsLoading(false);
    // Database updated

    // await joinServer("ke6NqegIvJEOa9cLzUEp");
    // User joins global chat
    return (user);
  } catch (error) {
    if (error == "auth/email-already-in-use") {
      alert("동일한 이메일 주소가 존재합니다.")
    }
    //   // setIsLoading(false);
  }
}



const googleProvider = new GoogleAuthProvider();
export const googleSignIn = () => {
  try {
    signInWithPopup(auth, googleProvider) // popup을 이용한 signup
      .then((data) => {
        const user = data?.user;
        const auth = getAuth();
        if (!user) {
          return alert("존재하지 않는 계정입니다.")
        }
        return user
      })
      .catch((err) => {
        console.log(err);
      });
  }
  catch (e) {
    console.error(e);
  }
};

// 명령 실행시 await 필수!
export async function emailDubCheck(email) {
  const userRef = collection(db, "users");
  const q = query(userRef, where("email", "==", email));
  //결과 검색
  const querySnapshot = await getDocs(q);
  const result = querySnapshot?.docs?.map((doc) => (
    {
      ...doc.data(),
      id: doc.id,
    }
  ))
  return result
}


// const facebookProvider = new auth.FacebookAuthProvider();
// facebookProvider.setCustomParameters({
//   'display': 'popup'
// });
// export const facebookSignIn = () => auth.signInWithPopup(facebookProvider);



async function updateUserDatabase(property, newValue) {
  if (!auth.currentUser) return;

  const user = auth.currentUser;
  await updateDoc(
    doc(db, "users", user.uid),
    {
      [property]: newValue,
    }
  );
}

export async function saveUserProfileChanges(
  newUser,
  oldUser
) {
  if (!auth.currentUser) return;

  const user = auth.currentUser;

  switch (true) {
    case oldUser.avatar !== newUser.avatar:
      await updateProfile(user, {
        photoURL: newUser.avatar,
      });

      await updateUserDatabase("avatar", newUser.avatar);

    case oldUser.banner !== newUser.banner:
      await updateUserDatabase("banner", newUser.banner);

    case oldUser.about !== newUser.about:
      await updateUserDatabase("about", newUser.about);
  }
}


export const signIn = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (!user) {
        throw new Error(
          "Email is not verified. We have sent the verification link again. Please check your inbox/spam."
        );
      }
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorCode
    });
}


export async function reauthenticateUser(password) {
  if (!auth.currentUser || !auth.currentUser.email) return;

  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    password
  );

  await reauthenticateWithCredential(auth.currentUser, credential).then(() => {
    // User re-authenticated.
  }).catch((error) => {
    // An error ocurred
    // ...
    console.error(error);
  });
}

export async function logOut() {
  try {
    await signOut(auth);
    // Sign-out successful.
  } catch (error) {
    console.error(error);
    // An error happened.
  }
}

export async function updateUserBasicInfo(username, newForm, email, tel, gender, address, address_sido) {

  const user = auth.currentUser;

  if (!user) return (
    alert("로그인 후 가능합니다.")
  );
  try {
    await updateProfile(user, {
      displayName: username,
    });
    await updateUserDatabase("username", user.displayName);
    await updateUserDatabase("email_using", email);
    await updateUserDatabase("gender", gender);
    await updateUserDatabase("birthday", newForm);
    // await updateUserDatabase("url_one", url_one);
    // await updateUserDatabase("url_two", url_two);
    // await updateUserDatabase("url_three", url_three);
    await updateUserDatabase("address", address);
    await updateUserDatabase("address_sido", address_sido);
    await updateUserDatabase("phonenumber", tel);
    // await updateUserDatabase("category", checkedCategory);

    return ({ username: username, newForm: newForm, email: email, tel: tel, address: address, gender: gender, address_sido: address_sido, })
  } catch (error) {
    console.error(error);
    alert("profile update에 문제가 있습니다.");
  }
}

export async function updateMycompanyInfo(mycompany, myposition, mysection, mytype, companyemail) {

  const user = auth.currentUser;

  if (!user) return (
    alert("로그인 후 가능합니다.")
  );
  try {
    await updateUserDatabase("mycompany", mycompany);
    await updateUserDatabase("myposition", myposition);
    await updateUserDatabase("mysection", mysection);
    await updateUserDatabase("mytype", mytype);
    await updateUserDatabase("companyemail", companyemail);
    await updateUserDatabase("companycomplete", true);

    return ({
      mycompany: mycompany,
      myposition: myposition,
      mysection: mysection,
      mytype: mytype,
      companyemail: companyemail,
      companycomplete: true
    })
  } catch (error) {
    console.error(error);
    alert("profile update에 문제가 있습니다.");
  }
}

export async function updateMycompanyAdditionalInfo(companyfield, companyurl, companyaddress, staffnumber, companyadditional) {

  const user = auth.currentUser;

  if (!user) return (
    alert("로그인 후 가능합니다.")
  );
  try {
    await updateUserDatabase("companyfield", companyfield);
    await updateUserDatabase("companyurl", companyurl);
    await updateUserDatabase("companyaddress", companyaddress);
    await updateUserDatabase("staffnumber", staffnumber);
    await updateUserDatabase("companyadditional", companyadditional);

    return ({
      companyfield: companyfield,
      companyurl: companyurl,
      companyaddress: companyaddress,
      staffnumber: staffnumber,
      companyadditional: companyadditional,
    })
  } catch (error) {
    console.error(error);
    alert("profile update에 문제가 있습니다.");
  }
}

export async function patchAdditionalInfo(address_sido, address, links, additionalMent) {
  const user = auth.currentUser;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  }
  try {
    await updateUserDatabase("links", []);
    await updateUserDatabase("address_sido", address_sido);
    await updateUserDatabase("address", address);
    await updateUserDatabase("links", links);
    await updateUserDatabase("additionalMent", additionalMent);
    return ({ address_sido: address_sido, address: address, additionalMent: additionalMent, links: links })
  } catch (error) {
    console.error(error);
    alert("profile update에 문제가 있습니다.");
  }
}

export async function patchAdditionalInfoInProfile(links, additionalMent) {
  const user = auth.currentUser;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  }
  try {
    await updateUserDatabase("links", []);
    await updateUserDatabase("links", links);
    await updateUserDatabase("additionalMent", additionalMent);
    return ({ additionalMent: additionalMent, links: links })
  } catch (error) {
    console.error(error);
    alert("profile update에 문제가 있습니다.");
  }
}


export async function updateServiceInfoSeen(input) {
  const user = auth.currentUser;
  if (!user) return (
    alert("로그인 후 가능합니다.")
  );
  try {
    await updateUserDatabase("infoseen", input);
    return input;
  } catch (error) {
    console.error(error);
    alert("update에 문제가 있습니다.");
  }
}

// onBoarding 페이지
export async function updatePurpose(input) {
  const user = auth.currentUser;
  if (!user) return (
    alert("로그인 후 가능합니다.")
  );
  try {
    await updateUserDatabase("purpose", input);
    return input;
  } catch (error) {
    console.error(error);
    alert("update에 문제가 있습니다.");
  }
}

// onBoarding 페이지
export async function updateCategory(input) {
  const user = auth.currentUser;
  if (!user) return (
    alert("로그인 후 가능합니다.")
  );
  try {
    await updateUserDatabase("category", input);
    return input;
  } catch (error) {
    console.error(error);
    alert("update에 문제가 있습니다.");
  }
}

export async function changeUsername(newUsername, password) {
  if (!auth.currentUser || !auth.currentUser.email) return;

  const user = auth.currentUser;

  try {
    if (!user.displayName) return;
    await reauthenticateUser(password);
    await updateProfile(user, {
      displayName: newUsername,
    });
    // Profile updated!
    await updateUserDatabase("username", user.displayName);
  } catch (error) {
    console.error(error);
  }
}

export async function changeEmail(newEmail, password) {
  if (!auth.currentUser || !auth.currentUser.email) return;
  const user = auth.currentUser;

  try {
    if (!user.email) return;
    await reauthenticateUser(password);
    await updateEmail(user, newEmail);
    await updateUserDatabase("email", user.email);
  } catch (error) {
    console.error(error);
  }
}

export async function saveUserAvatarChanges(newAvatarURL) {
  const user = auth.currentUser;
  if (!user) return (
    alert("로그인 후 가능합니다.")
  );
  await updateProfile(user, {
    photoURL: newAvatarURL,
  });
  await updateUserDatabase("avatar", user.photoURL);
}

export async function uploadAvatarPreview(file, userID) {
  const storage = getStorage();
  const avatarRef = ref(storage, `users/${userID}/temp/avatar`);
  await uploadBytes(avatarRef, file);
  return await getAvatarPreviewURL(userID);
}

async function getAvatarPreviewURL(userID) {
  const storage = getStorage();
  return await getDownloadURL(ref(storage, `users/${userID}/temp/avatar`));
}

export async function uploadAvatar(file, userID) {
  const storage = getStorage();
  const avatarRef = ref(storage, `users/${userID}/avatar`);
  await uploadBytes(avatarRef, file);
  return await getAvatarURL(userID);
}
async function getAvatarURL(userID) {
  const storage = getStorage();
  return await getDownloadURL(ref(storage, `users/${userID}/avatar`));
}



// 참고


export default async function getRoomsInDB() {
  // PREPARE users
  const roomsRef = await db
    ?.collection("rooms")
    ?.orderBy("timestamp", "asc")
    ?.limit(100)
    ?.get();

  const roomsInDB = await roomsRef?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc?.data()?.timestamp?.toDate()?.getTime(),
  }));

  return JSON.stringify(roomsInDB);
}

export async function getChatsInDB(slug) {
  // PREPARE chats
  if (slug) {
    const chatsRef = await db
      .collection("rooms")
      ?.doc(slug)
      ?.collection("chats")
      ?.orderBy("timestamp", "asc")
      ?.limit(100)
      ?.get();

    const chatsInDB = await chatsRef?.docs?.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc?.data()?.timestamp?.toDate()?.getTime(),
    }));

    return JSON.stringify(chatsInDB);
  } else {
    return [];
  }
}

//  function to truncate(cut) the string if the length of given string
//   bigger than  given number(n)
export function truncate(string, n) {
  return string?.length > n ? string.substr(0, n - 1) + "...." : string;
}

export function getRandomNumber() {
  const rndInt = Math.floor(Math.random() * 10) + 1;
  return rndInt;
}
// export async function setCategoryList(CategoryList) {
// console.log(user)

export const setCategoryList = async (CategoryList) => {
  const categoryRef = collection(db, "categories");
  try {
    const res = await CategoryList?.map((m, index) => (
      addDoc(categoryRef, { key: index, name: m.name })
    ))
    return (res);
  } catch (e) {
    console.error(e);
  }
}


export const api = {
  // usersRef: collection(db, "users"),
  usersRef: query(
    collection(db, "users"),
    // where("purpose", "!=", 1),
    // orderBy("purpose"),
    // orderBy("timestamp", "desc")
  ),

  userByIdRef: (userId) =>
    doc(db, "users", `${userId}`),

  adminUsersRef: query(
    collection(db, "users"),
    where("role", "==", "admin")
  ),

  annoynomusUsersRef: collection(db, "annoymous"),
  viewsRef: collection(db, "ViewsData"),
  educationsRef: collection(db, "educations"),
  jobofferRef: collection(db, "joboffers"),
  subscribeRef: collection(db, "subscribes"),
  coccocRef: collection(db, "coccocs"),
  careersRef: collection(db, "careers"),
  mystyleRef: collection(db, "mystyle"),
  blogsRef: collection(db, "blogs"),
  boardsRef: collection(db, "boards"),
  skillsRef: collection(db, "skills"),
  sectionsRef: collection(db, "sections"),
  postsRef: collection(db, "posts"),
  conversationRef: collection(db, "conversations"),
  boardByIdRef: (boardId) =>
    doc(db, "boards", `${boardId}`),
  sectionByIdRef: (sectionId) =>
    doc(db, "sections", `${sectionId}`),
  postByIdRef: (postId) =>
    doc(db, "posts", `${postId}`),
  commentByIdRef: (commentId) =>
    doc(db, "comments", `${commentId}`),
  blogDescriptionByBloggerIdRef: (bloggerId) =>
    query(
      collection(db, "blogsDescription"),
      where("bloggerId", "==", `${bloggerId}`)
    ),

  blogsMetaRef: collection(db, "blogsMeta"),
  blogMetaByIdRef: (blogId) =>
    doc(db, "blogsMeta", `${blogId}`),

  blogsMetaByIdCollRef: (blogId) =>
    collection(db, "blogsMeta", `${blogId}`),

  commentsRef: collection(db, "comments"),

  commentsByCommentId: (commentId) =>
    doc(db, `comments`, `${commentId}`),

  commentsByPostIdRef: (postId) =>
    query(
      collection(db, "comments"),
      where("postId", "==", `${postId}`)
    ),

  notificationRef: collection(db, "notifications"),

  notificationByIdRef: (notificationId) =>
    doc(db, "notifications", `${notificationId}`),

  notificationByReceiverIdRef: (receiverId) =>
    query(
      collection(db, "notifications"),
      where("receiverId", "==", `${receiverId}`)
    ),

  sotrageRef: (file) => ref(storage, "images/" + file?.name),
};

// addDoc(api.usersRef, {name: "samuel", userName: 'samuel', userId: 'generated from random firestore data'})
// getDocs(api.usersRef)
// getDoc(api.userByIdRef('shdajkfha3299'))
// PROGRESS NOT TO BE USED!!!! WORK
export const request = {
  // GET: (collection: DocumentReference<unknown>) => getDoc(collection),
  // getDocs: (query: Query<unknown>) => getDocs(query),
  // PATCH: (collection: DocumentReference<unknown>, data: Partial<unknown>) =>
  //   updateDoc(collection, data),
  // DELETE: (collection: DocumentReference<unknown>) => deleteDoc(collection),
  // POST: (reference: CollectionReference<unknown>, data: Partial<unknown>) =>
  //   addDoc(reference, data),
};

// request.GET(api.blogDescriptionByIdRef("laskdlas"));

// request.PATCH(api.blogMetaByIdRef("ashf89ksdhfkahfkas"), { hello: false });

// request.DELETE(api.blogDescriptionByIdRef("askjhf289jfhsajkfahsjk"));

// request.POST(api.commentsRef, { title: "newblog" });

export async function getSkillsByUser(userId) {
  const user = auth.currentUser;
  const carRef = collection(db, "skills");
  const q = query(carRef, where("userId", "==", userId), orderBy("timestamp", "desc"));

  //결과 검색
  const querySnapshot = await getDocs(q);
  const result = querySnapshot?.docs?.map((doc) => (
    {
      ...doc.data(),
      id: doc.id,
    }
  ))
  return result
}
// 명령 실행시 await 필수!
export async function getEducationsByUser(userId) {
  const user = auth.currentUser;
  const eduRef = collection(db, "educations");
  const q = query(eduRef, where("userId", "==", userId), orderBy("timestamp", "asc"));

  //결과 검색
  const querySnapshot = await getDocs(q);
  const result = querySnapshot?.docs?.map((doc) => (
    {
      ...doc.data(),
      id: doc.id,
    }
  ))
  return result
}
// 명령 실행시 await 필수!
export async function getCareersByUser(userId) {
  const user = auth.currentUser;
  const carRef = collection(db, "careers");
  const q = query(carRef, where("userId", "==", userId), orderBy("timestamp", "asc"));

  //결과 검색
  const querySnapshot = await getDocs(q);
  const result = querySnapshot?.docs?.map((doc) => (
    {
      ...doc.data(),
      id: doc.id,
    }
  ))
  return result
}

// get all users

export async function getFriends() {
  const q = query(api.usersRef,
    where("purpose", ">", 1),
    where("purpose", "<", 4),
    // where("purpose", "!=", 4),
    orderBy("purpose", "asc"),
    orderBy("timestamp", "desc"),
    // orderBy("purpose", "desc"),
    // where("avatar", "!=", ""),
    // orderBy("avatar", "desc")
  );
  const querySnapshot = await getDocs(q);

  const people = await Promise.all(querySnapshot?.docs?.map(async (doc) => {
    var skills = await getSkillsByUser(doc.data().id)
    var careers = await getCareersByUser(doc.data().id)
    var educations = await getEducationsByUser(doc.data().id)
    var joboffered = await getJobofferedByUserId(doc.data().id)
    var joboffers = await getJoboffersByUserId(doc.data().id)
    var coccoced = await getCoccocedByUserId(doc.data().id)
    var coccocs = await getCoccocsByUserId(doc.data().id)

    const man = {
      userID: doc.data().id,
      username: doc.data().username,
      email: doc.data().email,
      email_using: doc.data().email_using,
      birthday: doc.data().birthday,
      gender: doc.data().gender,
      avatar: doc.data().avatar,
      phonenumber: doc.data().phonenumber,
      category: doc.data().category,
      address: doc.data().address,
      address_sido: doc.data().address_sido,
      style: doc.data().style,
      survey: doc.data().survey,
      favorites: doc.data().favorites,
      favLikes: doc.data().favLikes,
      experts: doc.data().experts,
      expertNum: doc.data().expertNum,
      point: doc.data().point,
      points: doc.data().points,
      givePoint: doc.data().givePoint,
      infoseen: doc.data().infoseen,
      mycompany: doc.data().mycompany,
      myposition: doc.data().myposition,
      mysection: doc.data().mysection,
      mytype: doc.data().mytype,
      companyemail: doc.data().companyemail,
      companylogo: doc.data().companylogo,
      companyfield: doc.data().companyfield,
      companyurl: doc.data().companyurl,
      companyaddress: doc.data().companyaddress,
      companycomplete: doc.data().companycomplete,
      staffnumber: doc.data().staffnumber,
      companyadditional: doc.data().companyadditional,
      additionalMent: doc.data().additionalMent,
      links: doc.data().links,
      purpose: doc.data().purpose,
      thumbvideo: doc.data().thumbvideo,
      thumbimage: doc.data().thumbimage,
      timestamp: doc.data().timestamp,
      likes: doc.data().likes || [],
      liked: doc.data().liked || [],
      advices: doc.data().advices || [],
      adviced: doc.data().adviced || [],
      // coccocs: doc.data().coccocs || [],
      // coccoced: doc.data().coccoced || [],
      // joboffers: doc.data().joboffers || [],
      // joboffered: doc.data().joboffered || [],
      skills: skills,
      careers: careers,
      educations: educations,
      joboffered: joboffered,
      joboffers: joboffers,
      coccoced: coccoced,
      coccocs: coccocs,
    }
    return man;
  }))
  const result = [];
  people?.map(v => (
    v?.careers?.length !== 0 && result?.push(v)
  ))
  return result;
}

// get all users

export async function getUsers() {
  const result = await getDocs(api.usersRef);

  const people = await Promise.all(result.docs.map(async (doc) => {
    var skills = await getSkillsByUser(doc.data().id)
    var careers = await getCareersByUser(doc.data().id)
    var educations = await getEducationsByUser(doc.data().id)
    var joboffered = await getJobofferedByUserId(doc.data().id)
    var joboffers = await getJoboffersByUserId(doc.data().id)
    var coccoced = await getCoccocedByUserId(doc.data().id)
    var coccocs = await getCoccocsByUserId(doc.data().id)

    const man = {
      userID: doc.data().id,
      username: doc.data().username,
      email: doc.data().email,
      email_using: doc.data().email_using,
      birthday: doc.data().birthday,
      gender: doc.data().gender,
      avatar: doc.data().avatar,
      phonenumber: doc.data().phonenumber,
      category: doc.data().category,
      address: doc.data().address,
      address_sido: doc.data().address_sido,
      style: doc.data().style,
      survey: doc.data().survey,
      favorites: doc.data().favorites,
      favLikes: doc.data().favLikes,
      experts: doc.data().experts,
      expertNum: doc.data().expertNum,
      point: doc.data().point,
      points: doc.data().points,
      givePoint: doc.data().givePoint,
      infoseen: doc.data().infoseen,
      mycompany: doc.data().mycompany,
      myposition: doc.data().myposition,
      mysection: doc.data().mysection,
      mytype: doc.data().mytype,
      companyemail: doc.data().companyemail,
      companylogo: doc.data().companylogo,
      companyfield: doc.data().companyfield,
      companyurl: doc.data().companyurl,
      companyaddress: doc.data().companyaddress,
      companycomplete: doc.data().companycomplete,
      staffnumber: doc.data().staffnumber,
      companyadditional: doc.data().companyadditional,
      additionalMent: doc.data().additionalMent,
      links: doc.data().links,
      purpose: doc.data().purpose,
      thumbvideo: doc.data().thumbvideo,
      thumbimage: doc.data().thumbimage,
      timestamp: doc.data().timestamp,
      likes: doc.data().likes || [],
      liked: doc.data().liked || [],
      advices: doc.data().advices || [],
      adviced: doc.data().adviced || [],
      // coccocs: doc.data().coccocs || [],
      // coccoced: doc.data().coccoced || [],
      // joboffers: doc.data().joboffers || [],
      // joboffered: doc.data().joboffered || [],
      skills: skills,
      careers: careers,
      educations: educations,
      joboffered: joboffered,
      joboffers: joboffers,
      coccoced: coccoced,
      coccocs: coccocs,
    }
    return man;
  }))
  return people;
}

// getCategoryUsers



export async function getCategoryUsers(categoryFilter) {
  const q = query(api.usersRef,
    // orderBy("category", "asc"),
    where("purpose", ">", 1),
    where("purpose", "<", 4),
    orderBy("purpose", "asc"),
    orderBy("timestamp", "desc"),
    where("category", "==", categoryFilter),
    // where("avatar", "!=", ""),
    // orderBy("avatar", "desc"),
  );
  const querySnapshot = await getDocs(q);

  const people = await Promise.all(querySnapshot?.docs?.map(async (doc) => {
    var skills = await getSkillsByUser(doc.data().id)
    var careers = await getCareersByUser(doc.data().id)
    var educations = await getEducationsByUser(doc.data().id)
    var joboffered = await getJobofferedByUserId(doc.data().id)
    var joboffers = await getJoboffersByUserId(doc.data().id)
    var coccoced = await getCoccocedByUserId(doc.data().id)
    var coccocs = await getCoccocsByUserId(doc.data().id)

    const man = {
      userID: doc.data().id,
      username: doc.data().username,
      email: doc.data().email,
      email_using: doc.data().email_using,
      birthday: doc.data().birthday,
      gender: doc.data().gender,
      avatar: doc.data().avatar,
      phonenumber: doc.data().phonenumber,
      category: doc.data().category,
      address: doc.data().address,
      address_sido: doc.data().address_sido,
      style: doc.data().style,
      survey: doc.data().survey,
      favorites: doc.data().favorites,
      favLikes: doc.data().favLikes,
      experts: doc.data().experts,
      expertNum: doc.data().expertNum,
      point: doc.data().point,
      points: doc.data().points,
      givePoint: doc.data().givePoint,
      infoseen: doc.data().infoseen,
      mycompany: doc.data().mycompany,
      myposition: doc.data().myposition,
      mysection: doc.data().mysection,
      mytype: doc.data().mytype,
      companyemail: doc.data().companyemail,
      companylogo: doc.data().companylogo,
      companyfield: doc.data().companyfield,
      companyurl: doc.data().companyurl,
      companyaddress: doc.data().companyaddress,
      companycomplete: doc.data().companycomplete,
      staffnumber: doc.data().staffnumber,
      companyadditional: doc.data().companyadditional,
      additionalMent: doc.data().additionalMent,
      links: doc.data().links,
      purpose: doc.data().purpose,
      thumbvideo: doc.data().thumbvideo,
      thumbimage: doc.data().thumbimage,
      timestamp: doc.data().timestamp,
      likes: doc.data().likes || [],
      liked: doc.data().liked || [],
      advices: doc.data().advices || [],
      adviced: doc.data().adviced || [],
      // coccocs: doc.data().coccocs || [],
      // coccoced: doc.data().coccoced || [],
      // joboffers: doc.data().joboffers || [],
      // joboffered: doc.data().joboffered || [],
      skills: skills,
      careers: careers,
      educations: educations,
      joboffered: joboffered,
      joboffers: joboffers,
      coccoced: coccoced,
      coccocs: coccocs,
    }
    return man;
  }))
  const result = [];
  people?.map(v => (
    v?.careers?.length !== 0 && result?.push(v)
  ))
  return result;
}

// get adimn  users
export async function getAdminUsers() {
  const result = await getDocs(api.adminUsersRef);
  return result.docs.map((doc) => ({
    // docId: doc.id,
    avatar: doc.data().avatar,
    email: doc.data().email,
    name: doc.data().name,
    role: doc.data().role,
    status: doc.data().status,
    user: doc.data().user,
    createdAt: doc.data().createdAt,
  }));
}

// get all annoynomus users
export async function getAnnoynomusUsers() {
  const result = await getDocs(api.annoynomusUsersRef);
  return result.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
}

// get a user by ID
export async function getUserByUserId(userId) {
  const result = await getDoc(api.userByIdRef(userId));
  if (result.exists()) {
    const user = {
      avatar: result.data().photoURL,
      email: result.data().email,
      name: result.data().displayName,
      role: result.data().role,
      status: result.data().status,
      user: result.data().uid,
      createdAt: result.data().createdAt,
    };
    return user;
  } else {
    return undefined;
  }
}

// get ALL Blogs
export async function getBlogs() {
  const result = await getDocs(api.blogsRef);

  const blogs = [];

  result.docs.map(async (data) => {
    const blog = {
      id: data.id,
      title: data?.data().title,
      coverImage: data?.data().coverImage,
      blogger: data?.data().blogger,
      bloggerId: data?.data().bloggerId,
      bloggerImage: data?.data().bloggerImage,
      deleted: data?.data().deleted,
      description: data?.data().description,
      numComments: data?.data().numComments,
      numLikes: data?.data().numLikes,
      numViews: data?.data().numViews,
      readTime: data?.data().readTime,
      likes: data?.data().likes,
      mainBlog: data?.data().mainBlog,
      status: data?.data().status,
      createdAt: data?.data().createdAt,
    };
    blogs.push(blog);
  });

  return blogs;
}

// get Blog BY ID
export async function getBlogById(
  blogId
) {
  const result = await getDoc(api.blogByIdRef(blogId));

  if (result.exists()) {
    return {
      id: result.id,
      title: result?.data().title,
      coverImage: result?.data().coverImage,
      blogger: result?.data().blogger,
      bloggerId: result?.data().bloggerId,
      bloggerImage: result?.data().bloggerImage,
      deleted: result?.data().deleted,
      description: result?.data().description,
      numComments: result?.data().numComments,
      numLikes: result?.data().numLikes,
      numViews: result?.data().numViews,
      readTime: result?.data().readTime,
      likes: result?.data().likes,
      mainBlog: result?.data().mainBlog,
      status: result?.data().status,
      createdAt: result?.data().createdAt,
    };
  } else {
    return undefined;
  }
}

export async function getViews() {
  const result = await getDocs(api.viewsRef);
  return result.docs.map((doc) => doc.data());
}



// update number of views
export async function countNumberOfViews(blogId, userId) {
  return await addDoc(api.viewsRef, {
    blogId: blogId,
    createdAt: new Date().toISOString(),
  }).then(() => {
    updateDoc(api.blogByIdRef(blogId), {
      numViews: increment(1),
    });
  });
}

// create a notifications
export async function createNotification(
  type,
  senderId,
  receiverId,
  notificationMessage
) {
  return await addDoc(api.notificationRef, {
    id: doc(api.notificationRef).id,
    type: type,
    senderId: senderId,
    seen: false,
    receiverId: receiverId,
    notificationMessage: notificationMessage,
    createdAt: new Date().toISOString(),
  });
}

/**
 * update notification status to seen
  */
export async function updateNotification(notificationId) {
  return await updateDoc(api.notificationByIdRef(notificationId), {
    seen: true,
  });
}

/**
 * getNotification
 * @param userId
 * @returns
 */
export async function getNotifications(
  receiverId
) {
  const result = await getDocs(api.notificationRef);
  const notifications = [];

  result.docs.map((data) => {
    const notification = {
      id: data.id,
      type: data.data().type,
      senderId: data.data().senderId,
      receiverId: data.data().receiverId,
      notificationMessage: data.data().notificationMessage,
      seen: data.data().seen,
      createdAt: data.data().createdAt,
    };
    return notifications.push(notification);
  });

  return notifications;
}

/**
 * suspend a user by setting the status to false
 * @param userId
 */
export async function suspendUser(userId) {
  return await updateDoc(api.userByIdRef(userId), {
    status: "suspended",
  });
}

export async function updateUser(userId, status) {
  return await updateDoc(api.userByIdRef(userId), {
    status: !status,
  });
}

/**
 * TODO: need fix
 * suspend a blog by setting the status to false
 * @param blogId
 */
export async function updateBlog(blogId, status) {
  return await updateDoc(api.blogByIdRef(blogId), {
    status: !status,
  });
}

export async function updateBlogDeleted(blogId, status) {
  return await updateDoc(api.blogByIdRef(blogId), {
    deleted: !status,
  });
}

/**
 * promote a user by setting the role to blogger
 * @param userId
 * @returns
 */
export async function promoteUser(userId, role) {
  return await updateDoc(api.userByIdRef(userId), {
    role: role,
  });
}

/**
 * get blogs for bloggers by there user UID
 */
export async function getBlogByBloggerId(
  bloggerId
) {
  const blogs = await getDocs(api.blogDescriptionByBloggerIdRef(bloggerId));

  const blogsArr = [];
  // eslint-disable-next-line array-callback-return
  blogs.docs.map((blog) => {
    const blogObj = {
      title: blog.data().title,
      description: blog.data().description,
      coverImage: blog.data().coverImage,
      likes: blog.data().likes,
      comments: blog.data().comments,
      bloggerId: blog.data().bloggerId,
      blogger: blog.data().blogger,
      bloggerImage: blog.data().bloggerImage,
      createdAt: blog.data().createdAt,
      deleted: blog.data().deleted,
      numComments: blog.data().numComments,
      numLikes: blog.data().numLikes,
      numViews: blog.data().numViews,
      readTime: blog.data().readTime,
      status: blog.data().status,
    };
    blogsArr.push(blogObj);
  });
  return blogsArr;
}

// BLOGGER CREATE BLOG FUNCTIONS
export async function uploadImage(file) {
  const uploadTask = uploadBytesResumable(api.sotrageRef(file), file, {
    contentType: "image/jpeg",
  });
  uploadTask
    .on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        const errorMessage = error.message;
        return errorMessage;
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        return url;
      }
    )
    .toString();

  const imageUrl = await uploadTask.snapshot;


  return imageUrl.metadata;
}

export async function subscribeEmail(email) {
  const ref = collection(db, "subscribes");

  const created = await addDoc(api.subscribeRef,
    { email: email, timestamp: new Date().toISOString() });

  const docRef = doc(db, "subscribes", created.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const result = {
      ...docSnap.data(),
      id: created.id,
    }
    // console.log("Document data:", docSnap.data());
    return result;
  } else {
    // doc.data() will be undefined in this case
    alert("No such document!");
  }
}


export async function createEducation(education) {
  const edu = await addDoc(api.educationsRef,
    { ...education, timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss') });

  const docRef = doc(db, "educations", edu.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const result = {
      ...docSnap.data(),
      id: edu.id,
    }
    // console.log("Document data:", docSnap.data());
    return result;
  } else {
    // doc.data() will be undefined in this case
    alert("No such document!");
  }
}

// 명령 실행시 await 필수!
export async function getEducationsByUserId(userId) {
  const user = auth.currentUser;
  const eduRef = collection(db, "educations");
  const q = query(eduRef, where("userId", "==", user.uid), orderBy("timestamp", "asc"));

  //결과 검색
  const querySnapshot = await getDocs(q);
  const result = querySnapshot?.docs?.map((doc) => (
    {
      ...doc.data(),
      id: doc.id,
    }
  ))
  return result
}

// 명령 실행시 await 필수!
export async function getCareersByOtherId(userId) {
  const user = auth.currentUser;
  const carRef = collection(db, "careers");
  const q = query(carRef, where("userId", "==", userId), orderBy("timestamp", "asc"));

  //결과 검색
  const querySnapshot = await getDocs(q);
  const result = querySnapshot?.docs?.map((doc) => (
    {
      ...doc.data(),
      id: doc.id,
    }
  ))
  return result
}

// 명령 실행시 await 필수!
export async function getEducationsByOtherId(userId) {
  const user = auth.currentUser;
  const eduRef = collection(db, "educations");
  const q = query(eduRef, where("userId", "==", userId), orderBy("timestamp", "asc"));

  //결과 검색
  const querySnapshot = await getDocs(q);
  const result = querySnapshot?.docs?.map((doc) => (
    {
      ...doc.data(),
      id: doc.id,
    }
  ))
  return result
}
export async function getSkillsByOtherId(userId) {
  const user = auth.currentUser;
  const carRef = collection(db, "skills");
  const q = query(carRef, where("userId", "==", userId), orderBy("timestamp", "desc"));

  //결과 검색
  const querySnapshot = await getDocs(q);
  const result = querySnapshot?.docs?.map((doc) => (
    {
      ...doc.data(),
      id: doc.id,
    }
  ))
  return result
}
export async function deleteEducation(educationId) {
  const user = auth.currentUser;
  try {
    if (!educationId) return alert("삭제에 문제가 있습니다.");

    const docRef = doc(db, "educations", educationId);
    deleteDoc(docRef);

    return educationId;
  } catch (e) {
    console.error(e)
  }
}

export async function modifyEducation(educationResult, id) {
  const user = auth.currentUser;
  try {
    if (!user || !id) return alert("업데이트에 문제가 발생했습니다.");
    await updateDoc(doc(db, "educations", id),
      educationResult
    );
    const docRef = doc(db, "educations", id);

    return docRef;
  } catch (e) {
    console.error(e)
  }
}



export async function createCareer(career) {
  const car = await addDoc(api.careersRef,
    { ...career, timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss') });

  const docRef = doc(db, "careers", car.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const result = {
      ...docSnap.data(),
      id: car.id,
    }
    return result;
  } else {
    // doc.data() will be undefined in this case
    alert("No such document!");
  }
}

// 명령 실행시 await 필수!
export async function getCareersByUserId(userId) {
  const user = auth.currentUser;
  const carRef = collection(db, "careers");
  const q = query(carRef, where("userId", "==", user.uid), orderBy("timestamp", "asc"));

  //결과 검색
  const querySnapshot = await getDocs(q);
  const result = querySnapshot?.docs?.map((doc) => (
    {
      ...doc.data(),
      id: doc.id,
    }
  ))
  return result
}


// 명령 실행시 await 필수!
export async function getCareersAndEducationsByUserId(userId) {
  const user = auth.currentUser;
  try {
    const carRef = collection(db, "careers");
    const carQ = query(carRef, where("userId", "==", userId), orderBy("timestamp", "asc"));
    const careerQuerySnapshot = await getDocs(carQ);
    const careerResult = careerQuerySnapshot?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))
    const eduRef = collection(db, "educations");
    const eduQ = query(eduRef, where("userId", "==", userId), orderBy("timestamp", "asc"));
    const eduQuerySnapshot = await getDocs(eduQ);
    const educationresult = eduQuerySnapshot?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))

    const result = [...careerResult, ...educationresult];
    return result;
  } catch (e) {
    console.error(e);
  }
}



export async function deleteCareer(careerId) {
  const user = auth.currentUser;
  try {
    if (!careerId) return alert("삭제에 문제가 있습니다.");

    const docRef = doc(db, "careers", careerId);
    deleteDoc(docRef);

    return careerId;
  } catch (e) {
    console.error(e)
  }
}

export async function modifyCareer(careerResult, id) {
  const user = auth.currentUser;
  try {
    if (!user || !id) return alert("업데이트에 문제가 발생했습니다.");
    await updateDoc(doc(db, "careers", id),
      careerResult
    );
    const docRef = doc(db, "careers", id);

    return docRef;
  } catch (e) {
    console.error(e)
  }
}

export async function updateStyle(category) {
  const user = auth.currentUser;
  if (!category) return;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  } else {
    try {
      await updateUserDatabase("style", category);
      return category;
    } catch (e) {
      console.error(e);
    }
  }
}

export async function updateSurvey(survey) {
  if (!survey) return;
  const user = auth.currentUser;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  } else {
    try {
      await updateUserDatabase("survey", survey);
      return survey;
    } catch (e) {
      console.error(e);
    }
  }
}



//     // SkillPool 따로 디비 만드는거보단, skill DB에서 중복 제거한 후 갯수 추출
//     // 1. 일단 특정속성으로만 이루어진 배열만들기
//     let result = objArray.map(a => a.foo);
//     // 2. 중복된 것 갯수 구한 후 객체로 만들기
//     const result = {};
//     arr.forEach((x) => {
//       result[x] = (result[x] || 0) + 1;
//     });
//     // 결과값: {"a":2,"b":2,"c":1}
//     // 3. 객체를 배열로 바꿔서 값이 제일 큰 것부터 배열로 내보내기
//     let strArr = [];
//     for (let objKey in strObj) {
//       if (strObj.hasOwnProperty(objKey)) {
//         strArr.push(objKey);
//       }
//     }
// // ['A', 'B', 'C']
// // 4. slice로
// // [a, b, c].slice 이런식으로
export async function getSkillsByUserId(userId) {
  const user = auth.currentUser;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  }
  try {
    const carRef = collection(db, "skills");
    const q = query(carRef, where("userId", "==", user.uid), orderBy("timestamp", "desc"));

    //결과 검색
    const querySnapshot = await getDocs(q);
    const result = querySnapshot?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))
    return result
  } catch (e) { console.error(e) }
}

export async function getRelatedSkills(category) {
  const user = auth.currentUser;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  }
  try {
    if (!category) return;
    const carRef = collection(db, "skills");
    const q = query(carRef,
      where("category", "==", category),
      // orderBy("count", "asc")
    );

    //결과 검색
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return;
    const result = querySnapshot?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))
    return result
  } catch (e) {
    console.error(e);
  }
}


export async function createSkills(uniqueArr) {
  const user = auth.currentUser;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  }
  try {
    const carRef = collection(db, "skills");
    const q = query(carRef, where("userId", "==", user.uid), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot?.docs?.map((index) => (
      deleteDoc(doc(db, "skills", index?.id))
    ))
    const res = await uniqueArr?.map(async (v) => (
      await addDoc(api.skillsRef, {
        userId: user.uid,
        name: v?.name,
        category: v?.category || null,
        count: increment(1),
        timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
      )))
    return (res);

  } catch (e) {
    console.error(e);
  }
}


// LIKE USER
export async function likeUser(
  userId, username, userAvatar
) {
  const user = auth.currentUser;
  // await updateDoc(api.userByIdRef(user.uid), {
  //   likes: arrayUnion({ userId: userId, username: username, userAvatar: userAvatar }),
  // });
  await updateDoc(api.userByIdRef(userId), {
    liked: arrayUnion({ userId: user.uid, username: user.displayName, userAvatar: user?.photoURL }),
  });
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const result = {
      ...docSnap.data(),
    }
    return result;
  }
}

// UNLIKE USER
export async function unlikeUser(
  userId, username, userAvatar
) {
  const user = auth.currentUser;
  await updateDoc(api.userByIdRef(userId), {
    liked: arrayRemove({ userId: user?.uid, username: user?.displayName, userAvatar: user?.photoURL }),
  });
  return await updateDoc(api.userByIdRef(user?.uid), {
    likes: arrayRemove({ userId: userId, username: username, userAvatar: userAvatar }),
  });
}


// Advice USER
export async function createAdvice(
  result
) {
  const user = auth.currentUser;
  await updateDoc(api.userByIdRef(user.uid), {
    advices: arrayUnion({
      targetId: result?.targetId,
      targetName: result?.targetName,
      targetAvatar: result?.targetAvatar,
      description: result?.description,
      annoymous: result?.annoymous,
      rating: result?.rating,
    }),
  });
  await updateDoc(api.userByIdRef(result?.targetId), {
    adviced: arrayUnion({
      userId: user.uid,
      username: user.displayName,
      userAvatar: user?.photoURL,
      description: result?.description,
      annoymous: result?.annoymous,
      rating: result?.rating,
      mycompany: result?.mycompany,
      mysection: result?.mysection,
      companylogo: result?.companylogo,
    }),
  });
  const docRef = doc(db, "users", result?.targetId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const result = {
      ...docSnap.data(),
    }
    return result;
  }
}

// Delete Advice USER
export async function removeAdvice(
  result
) {
  const user = auth.currentUser;
  await updateDoc(api.userByIdRef(result?.targetId), {
    adviced: arrayRemove({
      userId: user.uid,
      username: user.displayName,
      userAvatar: user?.photoURL,
      description: result?.description,
      rating: result?.rating,
      annoymous: result?.annoymous,
      mycompany: result?.mycompany,
      mysection: result?.mysection,
      companylogo: result?.companylogo,
    }),
  });
  return await updateDoc(api.userByIdRef(user?.uid), {
    advices: arrayRemove({
      targetId: result?.targetId,
      targetName: result?.targetName,
      targetAvatar: result?.targetAvatar,
      description: result?.description,
      rating: result?.rating,
      annoymous: result?.annoymous,
    }),
  });
}

export async function createBoard(board) {
  const user = auth.currentUser;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  }
  try {
    const newBoard = await addDoc(api.boardsRef,
      {
        ...board,
        creatorId: user.uid,
        creatorName: user.displayName,
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
      });
    board.category?.map(async (v) => (
      await addDoc(api.sectionsRef, {
        creatorId: user.uid,
        creatorName: user.displayName,
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        boardCategoryKey: v?.key,
        boardCategoryName: v?.name,
        boardId: newBoard?.id,
      })
    ))
    const docRef = doc(db, "boards", newBoard?.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const result = {
        ...docSnap.data(),
        id: newBoard.id,
      }
      return result;
    } else {
      alert("No such document!");
    }
  } catch (e) {
    console.error(e);
  }
}

export async function getBoard(boardId) {
  try {
    const docRef = doc(db, "boards", boardId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = {
        ...docSnap.data(),
        id: boardId,
      }
      return result;
    }
  }
  catch (e) {
    console.error(e);
  }
}




// 명령 실행시 await 필수!
export async function getBoardsByUserId(userId) {
  const user = auth.currentUser;
  const boardRef = collection(db, "boards");
  const q = query(boardRef, where("creatorId", "==", user.uid), orderBy("createdAt", "asc"));
  //결과 검색
  const querySnapshot = await getDocs(q);
  const result = querySnapshot?.docs?.map((doc) => (
    {
      ...doc.data(),
      id: doc.id,
    }
  ))
  return result
}

export async function getAllBoards() {
  const result = await getDocs(api.boardsRef);
  return result.docs.map((doc) => ({
    id: doc.id,
    logo: doc.data().logo,
    name: doc.data().name,
    email: doc.data().email,
    category: doc.data().category,
    creatorId: doc.data().creatorId,
    creatorName: doc.data().creatorName,
    createdAt: doc.data().createdAt,
    favorites: doc.data().favorites,
    favLikes: doc.data().favLikes,
  }));
  //결과 검색
}

export async function deleteBoard(boardId) {
  const user = auth.currentUser;
  try {
    if (!boardId) return alert("삭제에 문제가 있습니다.");

    const docRef = doc(db, "boards", boardId);
    deleteDoc(docRef);

    return boardId;
  } catch (e) {
    console.error(e)
  }
}

export async function modifyBoard(boardResult, id) {
  const user = auth.currentUser;
  try {
    if (!user || !id) return alert("업데이트에 문제가 발생했습니다.");
    await updateDoc(doc(db, "boards", id),
      boardResult
    );
    const docRef = doc(db, "boards", id);

    return docRef;
  } catch (e) {
    console.error(e)
  }
}


async function updateBoardDatabase(property, newValue, boardId) {
  if (!auth.currentUser) return;
  const user = auth.currentUser;
  await updateDoc(
    doc(db, "boards", boardId),
    {
      [property]: newValue,
    }
  );
}

export async function uploadLogoPreviewOnboard(file, userID) {
  const storage = getStorage();
  const logoRef = ref(storage, `company/${userID}/logo`);
  await uploadBytes(logoRef, file);
  return await getLogoPreviewURLOnboard(userID);
}

export async function saveCompanyLogoChangesOnboard(newLogoURL, userID) {
  const user = auth.currentUser;
  if (!user) return (
    alert("로그인 후 가능합니다.")
  );
  await updateUserDatabase("companylogo", newLogoURL);
}

async function getLogoPreviewURLOnboard(userID) {
  const storage = getStorage();
  return await getDownloadURL(ref(storage, `company/${userID}/logo`));
}

export async function saveCompanyLogoChanges(newLogoURL, boardId) {
  const user = auth.currentUser;
  if (!user) return (
    alert("로그인 후 가능합니다.")
  );
  await updateBoardDatabase("logo", newLogoURL, boardId);
}

export async function uploadLogoPreview(file, boardID) {
  const storage = getStorage();
  const logoRef = ref(storage, `company/${boardID}/temp/logo`);
  await uploadBytes(logoRef, file);
  return await getLogoPreviewURL(boardID);
}

async function getLogoPreviewURL(boardID) {
  const storage = getStorage();
  return await getDownloadURL(ref(storage, `company/${boardID}/temp/logo`));
}

export async function uploadLogo(file, boardID) {
  const storage = getStorage();
  const companyRef = ref(storage, `company/${boardID}/logo`);
  await uploadBytes(companyRef, file);
  return await getLogoURL(boardID);
}

async function getLogoURL(boardID) {
  const storage = getStorage();
  return await getDownloadURL(ref(storage, `company/${boardID}/logo`));
}

async function updateSectionDatabase(property, newValue, sectionId) {
  if (!auth.currentUser) return;
  const user = auth.currentUser;
  await updateDoc(
    doc(db, "sections", sectionId),
    {
      [property]: newValue,
    }
  );
}

export async function updateSection(result, sectionId) {
  const user = auth.currentUser;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  }
  try {
    if (!sectionId) {
      const newSection = await addDoc(api.sectionsRef,
        {
          ...result,
          creatorId: user.uid,
          creatorName: user.displayName,
          createdAt: time
        }
      );
      const docRef = doc(db, "sections", newSection?.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const resulty = {
          ...docSnap.data(),
          sectionId: newSection.id,
        }
        return resulty;
      }
    } else {
      await updateDoc(doc(db, "sections", sectionId),
        result
      );
      const docRef = doc(db, "sections", sectionId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result = {
          ...docSnap.data(),
          sectionId: sectionId,
        }
        return result;
      }
    }

  } catch (e) {
    console.error(e);
  }
}

export async function getSection(boardId, categoryId) {
  try {
    const docRef = collection(db, "sections");
    const q = query(docRef, where("boardId", "==", boardId), where("boardCategoryKey", "==", parseInt(categoryId)));
    const docSnap = await getDocs(q);
    //결과 검색
    const result = docSnap?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))
    return result[0];
  }
  catch (e) {
    console.error(e);
  }
}

export async function uploadPicturePreview(file, postId) {
  const storage = getStorage();
  const pictureRef = ref(storage, `section/${postId}/temp/picture`);
  await uploadBytes(pictureRef, file);
  return await getPicturePreviewURL(postId);
}

async function getPicturePreviewURL(postId) {
  const storage = getStorage();
  return await getDownloadURL(ref(storage, `section/${postId}/temp/picture`));
}

export async function uploadPicture(images, postId) {
  const URLs = [];
  const storage = getStorage();
  images?.map((file) => {
    const storageRef = ref(storage, `section/${postId}/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state change",
      (snapshot) => {
      },
      (error) => console.error(error),
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
          URLs?.push({ url: downloadURLs, })
        });
      }
    );
  })
  return URLs;
}


export async function createPost(postResult, URLs) {
  const user = auth.currentUser;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  }
  try {
    const newPost = await addDoc(api.postsRef,
      {
        ...postResult,
        creatorId: user.uid,
        creatorName: user.displayName,
        creatorAvatar: user.photoURL,
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        photo: URLs,
        likes: [],
      });
    const docRef = doc(db, "posts", newPost?.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const result = {
        ...docSnap.data(),
        id: newPost.id,

      }
      return result;
    } else {
      alert("No such document!");
    }
  } catch (e) {
    console.error(e);
  }
}

export async function getPosts(sectionId) {
  try {
    // 첫번째 post 컬렉션의 스냅샷을 작성날짜 기준 내림차순 (orderBy 2번째 인자 생략시 기본 내림차순)으로 정렬해 10개의 문서만 받아오기
    const q = query(api.postsRef, where("sectionId", "==", sectionId), orderBy("createdAt", "desc"), limit(10));
    const docSnap = await getDocs(q);
    // 마지막 문서 스냅샷 기억해해두기 (쿼리결과 스냅샷 크기 - 1 = 마지막 문서 위치)
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    // 앞서 기억해둔 문서값으로 새로운 쿼리 요청 
    const next = query(collection(db, "post"),
      orderBy("createdAt"),
      startAfter(lastVisible),
      limit(10));

    //결과 검색
    const result = docSnap?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))
    return result;
  }
  catch (e) {
    console.error(e);
  }
}
export async function getAllPosts(limitCount, category) {
  try {
    // 첫번째 post 컬렉션의 스냅샷을 작성날짜 기준 내림차순 (orderBy 2번째 인자 생략시 기본 내림차순)으로 정렬해 10개의 문서만 받아오기
    const q = query(
      api.postsRef,
      orderBy("createdAt", "desc"),
      limit(10));
    // 마지막 문서 스냅샷 기억해해두기 (쿼리결과 스냅샷 크기 - 1 = 마지막 문서 위치)
    // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    // 앞서 기억해둔 문서값으로 새로운 쿼리 요청 
    if (category) {
      const next = query(collection(db, "posts"),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        // startAfter(lastVisible),
        limit(limitCount));
      const docSnap = await getDocs(next);

      // //결과 검색
      const result = docSnap?.docs?.map((doc) => (
        {
          ...doc.data(),
          id: doc.id,
        }
      ))
      return result;
    }
    else {
      const next = query(collection(db, "posts"),
        orderBy("createdAt", "desc"),
        // startAfter(lastVisible),
        limitToLast(limitCount));
      const docSnap = await getDocs(next);

      // //결과 검색
      const result = docSnap?.docs?.map((doc) => (
        {
          ...doc.data(),
          id: doc.id,
        }
      ))
      return result;
    }

    // return docSnap;
  }
  catch (e) {
    console.error(e);
  }
}



export async function getPostsByUserId(userID) {
  try {
    // 첫번째 post 컬렉션의 스냅샷을 작성날짜 기준 내림차순 (orderBy 2번째 인자 생략시 기본 내림차순)으로 정렬해 10개의 문서만 받아오기
    const q = query(api.postsRef, where("creatorId", "==", userID), orderBy("createdAt", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    // 마지막 문서 스냅샷 기억해해두기 (쿼리결과 스냅샷 크기 - 1 = 마지막 문서 위치)
    // 앞서 기억해둔 문서값으로 새로운 쿼리 요청 
    const result = querySnapshot?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))
    return result;
  }
  catch (e) {
    console.error(e);
  }
}



export async function deletePost(postId) {
  const user = auth.currentUser;
  try {
    if (!user) return alert("로그인이 필요합니다.")
    if (!postId) return alert("제거에 문제가 있습니다.");
    const docRef = doc(db, "posts", postId);
    deleteDoc(docRef);
    return postId;
  } catch (e) {
    console.error(e)
  }
}

export async function modifyPost(postResult, id) {
  const user = auth.currentUser;
  try {
    if (!user || !id) return alert("업데이트에 문제가 발생했습니다.");
    await updateDoc(doc(db, "posts", id),
      postResult
    );
    const docRef = doc(db, "posts", id);

    return docRef;
  } catch (e) {
    console.error(e)
  }
}


// LIKE A POST
export async function likePost(
  userId, username,
  postId
) {
  const user = auth.currentUser;
  await updateDoc(api.postByIdRef(postId), {
    likes: arrayUnion({ userId: userId, username: username, userAvatar: user?.photoURL }),
    numLikes: increment(1),
  });
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const result = {
      ...docSnap.data(),
    }
    return result;
  }
}

// UNLIKE A POST
export async function unlikePost(
  userId, username,
  postId
) {
  const user = auth.currentUser;
  return await updateDoc(api.postByIdRef(postId), {
    likes: arrayRemove({ userId: userId, username: username, userAvatar: user?.photoURL }),
    numLikes: increment(-1),
  });
}

// Add a comment
export async function createComment(
  postId, userId, userName, commentText, avatar
) {
  const good = await addDoc(api.commentsRef, {
    postId: postId,
    commentText: commentText,
    userName: userName,
    avatar: avatar,
    userId: userId,
    reply: [],
    createdAt: new Date().toISOString(),
  })
  await updateDoc(api.postByIdRef(postId), {
    numComments: increment(1),
  });
  const docRef = doc(db, "comments", good.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const result = {
      ...docSnap.data(),
    }
    return result;
  }
}



// get all comments
export async function getComments(postId) {
  const result = await getDocs(api.commentsByPostIdRef(postId));
  const comments = [];
  result.docs
    .sort((a, b) => {
      return a.data().createdAt - b.data().createdAt;
    })
    // eslint-disable-next-line array-callback-return
    .map((data) => {
      const comment = {
        docId: data.id,
        commentText: data.data().commentText,
        postId: data.data().postId,
        avatar: data.data().avatar,
        userName: data.data().userName,
        userId: data.data().userId,
        reply: data.data().reply.map((thread) => ({
          avatar: thread.avatar,
          replyText: thread.replyText,
          userId: thread.userId,
          userName: thread.userName,
          createdAt: thread.createdAt,
        })),
        createdAt: data.data().createdAt,
      };
      comments?.push(comment);
    });
  return comments;
}

export async function getAllComments() {
  const result = await getDocs(api.commentsRef);
  return result.docs.map((doc) => doc.data());
}


// add a reply
export async function createReply(
  userName, userId, commentId, avatar, replyText
) {
  await updateDoc(api.commentsByCommentId(commentId), {
    reply: arrayUnion({
      userId: userId,
      userName: userName,
      avatar: avatar,
      replyText: replyText,
      createdAt: new Date().toISOString(),
    }),
  });
  const docRef = doc(db, "comments", commentId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const result = docSnap.data().reply
    return result;
  }
}

// Reply Delete
export async function removeReply(
  userId, commentId, replyText, createdAt, username
) {
  const user = auth.currentUser;
  return await updateDoc(api.commentByIdRef(commentId), {
    reply: arrayRemove({
      userId: userId,
      avatar: user?.photoURL,
      replyText: replyText,
      createdAt: createdAt,
      username: username,

    }),
  });
}

export async function removeComment(commentId, postId) {
  const user = auth.currentUser;
  try {
    if (!user) return alert("로그인이 필요합니다.")
    if (!commentId) return alert("제거에 문제가 있습니다.");
    const docRef = doc(db, "comments", commentId);
    deleteDoc(docRef);
    await updateDoc(api.postByIdRef(postId), {
      numComments: increment(-1),
    });
    return commentId;
  } catch (e) {
    console.error(e)
  }
}


export async function updateAdminSurvey(survey, sectionId) {
  if (!survey) return;
  const user = auth.currentUser;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  } else {
    try {
      await updateSectionDatabase("survey", survey, sectionId);
      return survey;
    } catch (e) {
      console.error(e);
    }
  }
}

export async function createSmallIntern(smallintern, sectionId) {
  if (!smallintern) return;
  const user = auth.currentUser;
  const inputContents = { createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'), ...smallintern };
  if (!user) {
    return alert("로그인 후 가능합니다.")
  } else {
    try {
      const result = await updateSectionDatabase("smallintern", inputContents, sectionId);
      return inputContents;
    } catch (e) {
      console.error(e);
    }
  }
}

export async function createSections(category, boardId) {
  const user = auth.currentUser;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  }
  try {
    await updateDoc(api.boardByIdRef(boardId), {
      category: arrayUnion(...category),
    });
    category?.map(async (v) => (
      await addDoc(api.sectionsRef, {
        creatorId: user.uid,
        creatorName: user.displayName,
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        boardCategoryKey: v?.key,
        boardCategoryName: v?.name,
        boardId: boardId,
      })
    ))
    const docRef = doc(db, "boards", boardId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const result = {
        ...docSnap.data().category,
      }
      return result;
    } else {
      alert("No such document!");
    }
  } catch (e) {
    console.error(e);
  }
}


export async function getConversations() {
  try {
    const user = auth.currentUser;
    if (!user) {
      return alert("로그인 후 가능합니다.")
    }
    const q = query(api.conversationRef,
      // orderBy("updatedAt", "desc"),
      where("users", "array-contains", user.uid)
    )
    const querySnapshot = await getDocs(q)
    //결과 검색
    const result = querySnapshot?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))
    return result;
  }
  catch (e) {
    console.error(e);
  }
}

export async function getConversation(cid) {
  try {
    const user = auth.currentUser;
    if (!user) {
      return alert("로그인 후 가능합니다.")
    }
    const docRef = doc(db, "conversations", cid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = {
        ...docSnap.data(),
        id: cid,
      }
      return result;
    }
  }
  catch (e) {
    console.error(e);
  }
}

export async function getMessages(cid, limitCount) {
  try {
    const user = auth.currentUser;
    if (!user) {
      return
    }
    const q = query(
      collection(db, "conversations", cid, "messages"),
      orderBy("createdAt"),
      limitToLast(limitCount)
    )
    const docSnap = await getDocs(q);
    // if (docSnap.exists()) {
    //   const result = {
    //     ...docSnap.data(),
    //     id: cid,
    //   }
    //   // return result;
    return docSnap;
    // }
  }
  catch (e) {
    console.error(e);
  }
}


export async function createConversation(sorted) {
  const user = auth.currentUser;
  if (!user) {
    return alert("로그인 후 가능합니다.")
  }
  try {
    const q = query(
      collection(db, "conversations"),
      where("users", "==", sorted)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const created = await addDoc(collection(db, "conversations"), {
        users: sorted,
        group:
          sorted.length > 2 ?
            {
              admins: [user.uid],
              groupName: null,
              groupImage: null,
            }
            : {},
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        seen: {},
        theme: "#0D90F3",
      });
      const docRef = doc(db, "conversations", created.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result = {
          ...docSnap.data(),
          id: created.id,
        }
        // console.log("Document data:", docSnap.data());
        return result;
      } else {
        alert("No such document!");
      }
    } else {
      return { key: "fail", value: querySnapshot.docs[0]?.id }
    }
  } catch (e) {
    console.error(e);
  }
}


// 기업보드 참여
export async function favoriteBoard(
  userId, username,
  boardId, boardname, boardlogo
) {
  const user = auth.currentUser;
  try {
    await updateDoc(api.boardByIdRef(boardId), {
      favorites: arrayUnion({ userId: userId, username: username, userAvatar: user?.photoURL }),
      favLikes: increment(1),
    });
    await updateDoc(api.userByIdRef(userId), {
      favorites: arrayUnion({ boardId: boardId, boardname: boardname, boardlogo: boardlogo ? boardlogo : "", }),
      favLikes: increment(1),
    });
    const docRef = doc(db, "boards", boardId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = {
        ...docSnap.data(),
        id: boardId,
      }
      return result;
    }
  }
  catch (e) {
    console.error(e);
  }
}

// 기업보드 참여
export async function unfavoriteBoard(
  userId, username,
  boardId, boardname, boardlogo
) {
  const user = auth.currentUser;
  try {
    await updateDoc(api.boardByIdRef(boardId), {
      favorites: arrayRemove({ userId: userId, username: username, userAvatar: user?.photoURL }),
      favLikes: increment(-1),
    });
    await updateDoc(api.userByIdRef(userId), {
      favorites: arrayRemove({ boardId: boardId, boardname: boardname, boardlogo: boardlogo ? boardlogo : "", }),
      favLikes: increment(-1),
    });
    const docRef = doc(db, "boards", boardId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = {
        ...docSnap.data(),
        id: boardId,
      }
      return result;
    }
  }
  catch (e) {
    console.error(e);
  }
}

// 기업보드 참여(전문가)
export async function exportBoard(
  userId, username,
  boardId, boardname, boardlogo
) {
  const user = auth.currentUser;
  try {
    await updateDoc(api.boardByIdRef(boardId), {
      experts: arrayUnion({ userId: userId, username: username, userAvatar: user?.photoURL }),
      expertNum: increment(1),
    });
    await updateDoc(api.userByIdRef(userId), {
      experts: arrayUnion({ boardId: boardId, boardname: boardname, boardlogo: boardlogo }),
      expertNum: increment(1),
    });
    const docRef = doc(db, "boards", boardId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = {
        ...docSnap.data(),
        id: boardId,
      }
      return result;
    }
  }
  catch (e) {
    console.error(e);
  }
}

// 기업보드 참여
export async function unexpertBoard(
  userId, username,
  boardId, boardname, boardlogo
) {
  const user = auth.currentUser;
  try {
    await updateDoc(api.boardByIdRef(boardId), {
      experts: arrayRemove({ userId: userId, username: username, userAvatar: user?.photoURL }),
      expertNum: increment(-1),
    });
    await updateDoc(api.userByIdRef(userId), {
      experts: arrayRemove({ boardId: boardId, boardname: boardname, boardlogo: boardlogo ? boardlogo : "", }),
      expertNum: increment(-1),
    });
    const docRef = doc(db, "boards", boardId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = {
        ...docSnap.data(),
        id: boardId,
      }
      return result;
    }
  }
  catch (e) {
    console.error(e);
  }
}

// 포인트 부여
export async function givePoint(
  userId, username, avatar, point, description,
  sectionId, targetId, targetName, targetAvatar, boardName
) {
  const user = auth.currentUser;
  try {

    await updateDoc(api.userByIdRef(targetId), {
      points: arrayUnion({
        giverId: userId,
        giverName: username,
        giverAvatar: avatar,
        sectionId: sectionId,
        point: parseInt(point),
        description: description,
        boardName: boardName,
        createdAt: new Date().toISOString(),
      }),
      point: increment(point),
    });
    await updateDoc(api.userByIdRef(userId), {
      givePoint: arrayUnion({
        targetId: targetId,
        targetName: targetName,
        targetAvatar: targetAvatar,
        sectionId: sectionId,
        point: parseInt(point),
        description: description,
        boardName: boardName,
        createdAt: new Date().toISOString(),
      }),
    });
    return {
      createdAt: new Date().toISOString()
    }
  }
  catch (e) {
    console.error(e);
  }
}


// 포인트 내역삭제
export async function cancelGivePoint(
  userId, username, avatar, point, description,
  sectionId, targetId, targetName, targetAvatar, boardName, createdAt
) {
  const user = auth.currentUser;
  try {
    await updateDoc(api.userByIdRef(targetId), {
      points: arrayRemove({
        giverId: userId,
        giverName: username,
        giverAvatar: avatar,
        sectionId: sectionId,
        point: parseInt(point),
        description: description,
        boardName: boardName,
        createdAt: createdAt,
      }),
      point: increment(-point),
    });
    await updateDoc(api.userByIdRef(userId), {
      givePoint: arrayRemove({
        targetId: targetId,
        targetName: targetName,
        targetAvatar: targetAvatar,
        sectionId: sectionId,
        point: parseInt(point),
        description: description,
        boardName: boardName,
        createdAt: createdAt,
      }),
    });
    const docRef = doc(db, "users", targetId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const final = {
        ...docSnap.data(),
        id: targetId,
      }
      return final;
    }
  }
  catch (e) {
    console.error(e);
  }
}

// 명령 실행시 await 필수!
export async function getUserInformations(userID) {
  const user = auth.currentUser;
  try {
    const carRef = collection(db, "careers");
    const carQ = query(carRef, where("userId", "==", userID), orderBy("timestamp", "desc"));
    const careerQuerySnapshot = await getDocs(carQ);
    const careerResult = careerQuerySnapshot?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))

    const result = [...careerResult];
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function createOffer(offer) {
  const created = await addDoc(api.jobofferRef,
    { ...offer, timestamp: new Date().toISOString() });

  const docRef = doc(db, "joboffers", created.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const result = {
      ...docSnap.data(),
      id: created.id,
    }
    // console.log("Document data:", docSnap.data());
    return result;
  } else {
    // doc.data() will be undefined in this case
    alert("No such document!");
  }
}

export async function getConversationByUserId(userId) {
  try {

    const docRef = collection(db, "conversations");
    const q = query(docRef,
      where("users", "array-contains", userId),
    )
    const querySnapshot = await getDocs(q);
    const result = querySnapshot?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))
    return result
  }
  catch (e) {
    console.error(e);
  }
}

// 내가 제안한 리스트 불러오기
export async function getJoboffersByUserId(userId) {
  try {
    const user = auth.currentUser;
    const jobofferRef = collection(db, "joboffers");
    const q = query(jobofferRef,
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
    )
    //결과 검색
    const querySnapshot = await getDocs(q);
    const result = querySnapshot?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))
    return result
  } catch (e) {
  }
}
// 내가 오퍼받은 리스트 불러오기
export async function getJobofferedByUserId(userId) {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const jobofferRef = collection(db, "joboffers");
    const q = query(jobofferRef, where("targetId", "==", userId), orderBy("timestamp", "desc"));

    //결과 검색
    const querySnapshot = await getDocs(q);
    const result = querySnapshot?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))
    return result
  } catch (e) {
    console.error(e);
  }
}

export async function deleteJoboffer(jobofferId) {
  const user = auth.currentUser;
  try {
    if (!user) return (alert("로그인이 필요합니다."))
    if (!jobofferId) return alert("삭제에 문제가 있습니다.");

    const docRef = doc(db, "joboffers", jobofferId);
    deleteDoc(docRef);

    return jobofferId;
  } catch (e) {
    console.error(e)
  }
}

export async function modifyJoboffer(jobofferResult, id) {
  const user = auth.currentUser;
  try {
    if (!user || !id) return alert("업데이트에 문제가 발생했습니다.");
    const myOffer = await updateDoc(doc(db, "joboffers", id),
      {
        answer: jobofferResult,
        read: true,
        readtime: new Date().toISOString()
      }
    );
    const docRef = doc(db, "joboffers", id);

    return new Date().toISOString();
  } catch (e) {
    console.error(e)
  }
}


export async function createCoccoc(offer) {
  const created = await addDoc(api.coccocRef,
    { ...offer, timestamp: new Date().toISOString() });

  const docRef = doc(db, "coccocs", created.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const result = {
      ...docSnap.data(),
      id: created.id,
    }
    // console.log("Document data:", docSnap.data());
    return result;
  } else {
    // doc.data() will be undefined in this case
    alert("No such document!");
  }
}

// 내가 제안한 리스트 불러오기
export async function getCoccocsByUserId(userId) {
  try {
    const user = auth.currentUser;
    const coccocRef = collection(db, "coccocs");
    const q = query(coccocRef,
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
    )
    //결과 검색
    const querySnapshot = await getDocs(q);
    const result = querySnapshot?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))
    return result
  } catch (e) {
  }
}
// 내가 오퍼받은 리스트 불러오기
export async function getCoccocedByUserId(userId) {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const coccocRef = collection(db, "coccocs");
    const q = query(coccocRef, where("targetId", "==", userId), orderBy("timestamp", "desc"));

    //결과 검색
    const querySnapshot = await getDocs(q);
    const result = querySnapshot?.docs?.map((doc) => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ))
    return result
  } catch (e) {
    console.error(e);
  }
}

export async function deleteCoccoc(coccocId) {
  const user = auth.currentUser;
  try {
    if (!user) return (alert("로그인이 필요합니다."))
    if (!coccocId) return alert("삭제에 문제가 있습니다.");

    const docRef = doc(db, "coccocs", coccocId);
    deleteDoc(docRef);

    return coccocId;
  } catch (e) {
    console.error(e)
  }
}

export async function modifyCoccoc(coccocResult, id) {
  const user = auth.currentUser;
  try {
    if (!user || !id) return alert("업데이트에 문제가 발생했습니다.");
    const myOffer = await updateDoc(doc(db, "coccocs", id),
      {
        answer: coccocResult,
        read: true,
        readtime: new Date().toISOString()
      }
    );
    const docRef = doc(db, "coccocs", id);

    return new Date().toISOString();
  } catch (e) {
    console.error(e)
  }
}



// // Coccoc USER
// export async function createCoccoc(
//   result
// ) {
//   const user = auth.currentUser;
//   await updateDoc(api.userByIdRef(user.uid), {
//     coccocs: arrayUnion({
//       targetId: result?.targetId,
//       targetName: result?.targetName,
//       targetAvatar: result?.targetAvatar,
//       description: result?.description,
//       job: result?.job,
//       salary: result?.salary,
//       type: result?.type,
//       duedate: result?.duedate,
//       company: result?.company,
//       section: result?.section,
//     }),
//   });
//   await updateDoc(api.userByIdRef(result?.targetId), {
//     coccoced: arrayUnion({
//       userId: user.uid,
//       username: user.displayName,
//       userAvatar: user?.photoURL,
//       description: result?.description,
//       job: result?.job,
//       salary: result?.salary,
//       type: result?.type,
//       duedate: result?.duedate,
//       company: result?.company,
//       section: result?.section,
//       mycompany: result?.mycompany,
//       mysection: result?.mysection,
//       companylogo: result?.companylogo,
//     }),
//   });
//   const docRef = doc(db, "users", result?.targetId);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     const result = {
//       ...docSnap.data(),
//     }
//     return result;
//   }
// }

// // Delete Coccoc USER
// export async function removeCoccoc(
//   result
// ) {
//   const user = auth.currentUser;
//   await updateDoc(api.userByIdRef(result?.targetId), {
//     coccoced: arrayRemove({
//       userId: user.uid,
//       username: user.displayName,
//       userAvatar: user?.photoURL,
//       description: result?.description,
//       job: result?.job,
//       salary: result?.salary,
//       type: result?.type,
//       duedate: result?.duedate,
//       company: result?.company,
//       section: result?.section,
//       mycompany: result?.mycompany,
//       mysection: result?.mysection,
//       companylogo: result?.companylogo,
//     }),
//   });
//   return await updateDoc(api.userByIdRef(user?.uid), {
//     coccocs: arrayRemove({
//       targetId: result?.targetId,
//       targetName: result?.targetName,
//       targetAvatar: result?.targetAvatar,
//       description: result?.description,
//       job: result?.job,
//       salary: result?.salary,
//       type: result?.type,
//       duedate: result?.duedate,
//       company: result?.company,
//       section: result?.section,
//     }),
//   });
// }

// // Joboffer USER
// export async function createJoboffer(
//   result
// ) {
//   const user = auth.currentUser;
//   await updateDoc(api.userByIdRef(user.uid), {
//     joboffers: arrayUnion({
//       targetId: result?.targetId,
//       targetName: result?.targetName,
//       targetAvatar: result?.targetAvatar,
//       description: result?.description,
//       job: result?.job,
//       salary: result?.salary,
//       type: result?.type,
//       duedate: result?.duedate,
//       company: result?.company,
//       section: result?.section,
//       space: result?.space,
//     }),
//   });
//   await updateDoc(api.userByIdRef(result?.targetId), {
//     joboffered: arrayUnion({
//       userId: user.uid,
//       username: user.displayName,
//       userAvatar: user?.photoURL,
//       description: result?.description,
//       job: result?.job,
//       salary: result?.salary,
//       type: result?.type,
//       duedate: result?.duedate,
//       company: result?.company,
//       section: result?.section,
//       space: result?.space,
//       mycompany: result?.mycompany,
//       mysection: result?.mysection,
//       companylogo: result?.companylogo,
//     }),
//   });
//   const docRef = doc(db, "users", result?.targetId);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     const result = {
//       ...docSnap.data(),
//     }
//     return result;
//   }
// }

// // Delete Joboffer USER
// export async function removeJoboffer(
//   result
// ) {
//   const user = auth.currentUser;
//   await updateDoc(api.userByIdRef(result?.targetId), {
//     joboffered: arrayRemove({
//       userId: user.uid,
//       username: user.displayName,
//       userAvatar: user?.photoURL,
//       description: result?.description,
//       job: result?.job,
//       salary: result?.salary,
//       type: result?.type,
//       duedate: result?.duedate,
//       company: result?.company,
//       section: result?.section,
//       space: result?.space,
//       mycompany: result?.mycompany,
//       mysection: result?.mysection,
//       companylogo: result?.companylogo,
//     }),
//   });
//   return await updateDoc(api.userByIdRef(user?.uid), {
//     joboffers: arrayRemove({
//       targetId: result?.targetId,
//       targetName: result?.targetName,
//       targetAvatar: result?.targetAvatar,
//       description: result?.description,
//       job: result?.job,
//       salary: result?.salary,
//       type: result?.type,
//       duedate: result?.duedate,
//       company: result?.company,
//       section: result?.section,
//       space: result?.space,
//     }),
//   });
// }
