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
  serverTimestamp,
  query, where, getDocs, orderBy,
  deleteDoc,
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

export { app, db, storage, FieldValue };

const now = new Date();
const nowForCopy = dayjs(now);
const time = nowForCopy?.format('YYYY-MM-DD HH:mm:ss');

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
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
}


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

export async function updateUserBasicInfo(username, newForm, email, tel, checkedCategory, gender, url_one, url_two, url_three, address) {

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
    await updateUserDatabase("birthday", newForm);
    await updateUserDatabase("url_one", url_one);
    await updateUserDatabase("url_two", url_two);
    await updateUserDatabase("url_three", url_three);
    await updateUserDatabase("address", address);

    await updateUserDatabase("phonenumber", tel);
    await updateUserDatabase("category", checkedCategory);

    return (username, newForm, email, tel, address, checkedCategory, gender, url_one, url_two, url_three)
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
  usersRef: collection(db, "users"),
  userByIdRef: (userId) =>
    doc(db, "users", `${userId}`),

  // adminUsersRef: query(
  //   collection(db, "users"),
  //   where("role", "==", "admin")
  // ),

  annoynomusUsersRef: collection(db, "annoymous"),
  viewsRef: collection(db, "ViewsData"),
  educationsRef: collection(db, "educations"),
  careersRef: collection(db, "careers"),
  mystyleRef: collection(db, "mystyle"),
  blogsRef: collection(db, "blogs"),
  boardsRef: collection(db, "boards"),

  blogByIdRef: (blogId) =>
    doc(db, "blogs", `${blogId}`),

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

  commentsByBlogIdRef: (blogId) =>
    query(
      collection(db, "comments"),
      where("blogId", "==", `${blogId}`)
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



// get all users
export async function getUsers() {
  const result = await getDocs(api.usersRef);
  return result.docs.map((doc) => ({
    id: doc.data().user,
    avatar: doc.data().avatar,
    email: doc.data().email,
    name: doc.data().name,
    role: doc.data().role,
    status: doc.data().status,
    user: doc.data().user,
    createdAt: doc.data().createdAt,
  }));
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

// LIKE A BLOG
export async function likeBlog(
  userId,
  blogId
) {
  return await updateDoc(api.blogByIdRef(blogId), {
    likes: arrayUnion(userId),
    numLikes: increment(1),
  });
}

// UNLIKE A BLOG
export async function unlikeBlog(
  userId,
  blogId
) {
  return await updateDoc(api.blogByIdRef(blogId), {
    likes: arrayRemove(userId),
    numLikes: increment(-1),
  });
}

// Add a comment
export async function addComment(
  blogId,
  userId,
  userName,
  commentText,
  avatar
) {
  return await addDoc(api.commentsRef, {
    blogId: blogId,
    commentText: commentText,
    userName: userName,
    avatar: avatar,
    userId: userId,
    reply: [],
    createdAt: new Date().toISOString(),
  }).then(() => {
    return updateDoc(api.blogByIdRef(blogId), {
      numComments: increment(1),
    });
  });
}

// add a reply
export async function addReply(
  userName,
  userId,
  commentId,
  avatar,
  replyText
) {
  return await updateDoc(api.commentsByCommentId(commentId), {
    reply: arrayUnion({
      userId: userId,
      userName: userName,
      avatar: avatar,
      reply: replyText,
      createdAt: new Date().toISOString(),
    }),
  });
}

// get all comments
export async function getComments(blogId) {
  const result = await getDocs(api.commentsByBlogIdRef(blogId));

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
        blogId: data.data().blogId,
        avatar: data.data().avatar,
        userName: data.data().userName,
        userId: data.data().userId,
        reply: data.data().reply.map((thread) => ({
          avatar: thread.avatar,
          replyText: thread.reply,
          userId: thread.userId,
          userName: thread.userName,
          createdAt: thread.createdAt,
        })),
        createdAt: data.data().createdAt,
      };
      comments.push(comment);
    });
  return comments;
}

export async function getAllComments() {
  const result = await getDocs(api.commentsRef);
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
    console.log(notification);
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
        console.log(progress);
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

  console.log(imageUrl.metadata.downloadTokens);

  return imageUrl.metadata;
}

export async function createEducation(education) {
  const edu = await addDoc(api.educationsRef,
    { ...education, timestamp: time });

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
    console.log("No such document!");
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
    { ...career, timestamp: time });

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
    console.log("No such document!");
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
        createdAt: time
      });
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



