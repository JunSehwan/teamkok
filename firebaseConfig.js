import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  getDoc,
  DocumentData,
  DocumentReference,
  deleteField,
  serverTimestamp
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
  AuthCredential,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signInAnonymously,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import dayjs from "dayjs";


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


export async function getUser(req, res) {
  const user = await db.collection('users').doc('currentUser.uid').get();

  if (!user.exists) {
    return res.status(404).json({});
  }

  return res.status(404).json({ id: user.id, ...user.data() });
}

export async function createAccount(
  email, password, username, form, tel,
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
      // tag: "0000", // Create function to generate unique tag for each username
      // about: "",
      // banner: "#7CC6FE",
      email: user.email,
      timestamp: time,
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

// const googleProvider = new auth.GoogleAuthProvider();
// googleProvider.setCustomParameters({ prompt: 'select_account' });
// export const googleSignIn = () => auth.signInWithPopup(googleProvider);

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
      // Signed in 
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
}

// export async function signIn(email, password) {
//   const user = auth.currentUser;
//   console.log(user);
//   if (user) {
//     alert("이미 로그인을 하였습니다.")
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     };
//   }
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     )
//     // Signed in
//     const user = userCredential.user;
//     // await updateDoc(
//     //   doc(db, "users", user.uid),
//     //   {
//     //     [property]: newValue,
//     //   }
//     // );
//     return user;
//   } catch (error) {
//     console.error(error);
//     alert("로그인에 실패하였습니다.");
//   }
// }

async function reauthenticateUser(password) {
  if (!auth.currentUser || !auth.currentUser.email) return;

  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    password
  );

  await reauthenticateWithCredential(auth.currentUser, credential);
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


export async function updateUserBasicInfo(username, form, email, tel, checkedCategory, gender, url_one, url_two, url_three, address) {

  const user = auth.currentUser;

  if (!user) return (
    alert("로그인 후 가능합니다.")
  );
  try {
    await updateProfile(user, {
      displayName: username,
    });
    await updateUserDatabase("username", user.displayName);
    await updateUserDatabase("email", email);
    await updateUserDatabase("gender", gender);
    await updateUserDatabase("birthday", form);
    await updateUserDatabase("url_one", url_one);
    await updateUserDatabase("url_two", url_two);
    await updateUserDatabase("url_three", url_three);
    await updateUserDatabase("address", address);

    await updateUserDatabase("phonenumber", tel);
    await updateUserDatabase("category", checkedCategory);

    return (username, form, email, tel, address,checkedCategory, gender, url_one, url_two, url_three)
  } catch (error) {
    console.error(error);
    alert("profile update에 문제가 있습니다.");
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

export { app, db, storage };




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

    // const res = await addDoc(categoryRef, {
    //   CategoryList


    console.log(res);
    return (res);
  } catch (e) {
    console.error(e);
  }
}



  // const categoryRef = await setDoc(doc(db, 'categories', "categorylist"), {
  //   CategoryList
  // })
  // await citiesRef.doc('SF').set({
  //   name: 'San Francisco', state: 'CA', country: 'USA',
  //   capital: false, population: 860000
  // });
  // const res = await categoryRef.doc('categories').add(
  //   CategoryList
  // );


// }
// export async function getCategoryList() {
//   await getDoc(doc(db, "categories"), {
//   })
//   return CategoryList;
// }


