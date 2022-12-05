import React, { useCallback, useState, useEffect, useRef } from 'react';
import Modal from 'components/Common/Modal/Modal';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MdDelete } from "react-icons/md";
import Spin from 'components/Common/Spin';
import { doc, updateDoc, } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable, getStorage } from "firebase/storage";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { db, storage } from 'firebaseConfig';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { patchThumbimage, patchThumbimageDoneFalse } from 'slices/user';
import Image from 'next/image';
import dayjs from "dayjs";

const index = ({ imageModalOpened, closeImageModal }) => {

  const dispatch = useDispatch();
  const { user, patchThumbimageDone } = useSelector(state => state.user);

  const updatenotify = () => toast('업데이트 완료!');
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([])
  const [progress, setProgress] = useState(0);
  const [URLs, setURLs] = useState([])
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);

  const now = new Date();
  const nowForCopy = dayjs(now);
  const time = nowForCopy?.format('YYYY-MM-DD HH:mm:ss');


  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray?.map((file) => {
      // setFiles(prevState => [...prevState, file])
      return ({ id: file.id, name: file.name, url: URL.createObjectURL(file) })
    });
    // onSelectFileUpload(selectedFiles)
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  const changePicture = (e) => {
    onSelectFile(e)
    for (let i = 0; i < e.target.files.length; i++) {
      const files = e.target.files[i];
      files["id"] = Math.random();
      setImages((prevState) => [...prevState, files])
    }
  };

  const removeImg = useCallback((image) => {
    setSelectedImages(prevArr => prevArr.filter(v => v?.url !== image?.url));
    setImages(prevArr => prevArr.filter(v => v?.name !== image?.name));
  }, [])



  const onFirebaseImage = useCallback(async (images) => {
    const storage = getStorage();
    if (images?.length === 0) {
      setLoading(false);
      return alert("이미지를 선택해주세요!");
    }

    try {
      await images?.map((file) => {
        const storageRef = ref(storage, `users/${user?.userID}/thumbimage/${time}/${file?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state change",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
          },
          (error) => console.error(error),
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
              setURLs((prevState) => [...prevState, downloadURLs])

              // ((prevState) => {
              //   // prevState?.push(downloadURLs);

              //   // setTimeout(() => {
              //   //   setConvert(true);
              setLoading(false);
              //   // }, [1000])
              //   return prevState;
              // })

            })
          })
      });
    } catch (e) {
      console.error(e);
    }
  }, [time, user?.userID])

  const uploadImageDB = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    const results = await onFirebaseImage(images);

  }, [images, onFirebaseImage])

  const onSubmit = useCallback(async () => {
    await updateDoc(doc(db, "users", user?.userID), {
      thumbimage: URLs,
    });
    dispatch(patchThumbimage(URLs));

  }, [URLs, dispatch, user?.userID])

  useEffect(() => {
    async function fetchData() {
      // You can await here
      if (selectedImages?.length === URLs?.length && URLs?.length !== 0) {
        setFinish(true);
      }
      // ...
    }
    fetchData();
  }, [URLs?.length, selectedImages?.length]); // Or [] if effect doesn't need props or state

  useEffect(() => {
    if (patchThumbimageDone) {
      updatenotify();
      setLoading(false);
      setSelectedImages([])
      setImages([])
      setProgress(0)
      setURLs([])
      closeImageModal();
      setFinish(false);
      dispatch(patchThumbimageDoneFalse())
    }
  }, [patchThumbimageDone, closeImageModal, dispatch])

  return (
    <Modal
      onClose={closeImageModal}
      title="🖼️CoverImage 생성"
      visible={imageModalOpened}
      widths="800px"
    >
      <div className="flex w-full h-full top-[24px] lg:top-[30px] mb-2 pt-2 lg:pt-3 justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-lg h-full xl:h-[80vh] flex w-full flex-col justify-center items-center gap-2 p-4 pt-3"
        >
          <div className='w-full'>
            <div className="flex items-center text-blue-600 justify-between py-2 px-2 border-t">

              <div className="flex items-center">
                <div className="flex text-2xl">
                  <label className="flex flex-col items-center justify-center p-3 hover:bg-blue-100 bg-blue-50 rounded-lg cursor-pointer" htmlFor="upload">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className='text-sm text-center'>사진선택</span>
                  </label>
                  <input onChange={changePicture}
                    type="file"
                    className='hidden'
                    multiple={true}
                    accept="image/png , image/jpeg, image/webp"
                    id="upload"
                  // style="display:none"
                  />
                </div>
                <span className="ml-2">{progress}%</span>
              </div>
              <div>
                {loading ? (
                  <div className="flex w-full">
                    <button
                      type="button"
                      className="text-white text-center animate-pulse cursor-not-allowed 
                  bg-gradient-to-r p-4 px-8 text-md from-purple-500 to-pink-500 
                  hover:bg-gradient-to-l focus:ring-4 focus:outline-none 
                  focus:ring-purple-200 dark:focus:ring-purple-800 font-medium 
                  rounded-lg text-xl py-2 flex justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 animate-spin"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex">

                    {!finish && selectedImages?.length !== 0 &&
                      <button
                        type="button" onClick={uploadImageDB}
                        className="text-white font-bold p-4 px-8 text-md bg-gray-600/90
                   hover:bg-gray-600 focus:ring-4 focus:outline-none
                    focus:ring-blue-200 dark:focus:ring-blue-800 text-lg rounded-xl 
                    py-2 text-center cursor-pointer flex justify-center
                     items-center"
                      >
                        <BsFillCloudUploadFill />
                        <span className='ml-1'>업로드</span>
                      </button>
                    }
                    {finish &&
                      <div className='flex flex-col justify-end'>
                        <button
                          type="button" onClick={onSubmit}
                          className="text-white font-bold p-4 px-8 text-md bg-[#1890FF]/90
                   hover:bg-[#1890FF] focus:ring-4 focus:outline-none
                    focus:ring-blue-200 dark:focus:ring-blue-800 text-lg rounded-xl 
                    py-2 text-center cursor-pointer flex justify-center
                     items-center"
                        >
                          <span className='ml-1'>저장</span>
                        </button>
                      </div>}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full">
              {loading ? (
                <div>
                  <div className='mx-auto w-[260px] h-[400px] flex flex-col justify-center items-center'>
                    <div className='-ml-[48px] mb-[48px]'>
                      <Spin />
                    </div>
                    <p className="text-xl font-semibold text-pink-500 text-xenter mt-4 animate-pulse">
                      uploading...
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {!selectedImages || selectedImages?.length === 0 ? (
                    <label className="cursor-pointer">
                      <div className='border-dashed mx-auto rounded-xl w-[260px] h-[400px] border-2 border-gray-200 flex flex-col justify-center items-center
              outline-none'>
                        <div className="flex flex-col items-center justify-center h-full py-[1rem]">
                          <div className="flex flex-col justify-center items-center">
                            <p className="font-bold text-xl">
                              {/* <FaCloudUploadAlt className='text-gray-300 text-6xl' /> */}
                            </p>
                            <p className="text-xl font-semibold">
                              이미지 업로드
                            </p>
                          </div>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 mt-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                            />
                          </svg>

                          <p className="w-full text-gray-400 mt-4 text-sm leading-10 text-left">
                            ✔️ png or jpeg or webp<br />
                            ✔️ 이미지는 10장 미만 <br />
                            ✔️ 추천 영상배율: 720x1280 <br />
                          </p>
                          <p className="text-white bg-gradient-to-br from-pink-500 mt-8 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 w-52">
                            파일 선택
                          </p>
                        </div>
                        <input
                          type="file"
                          className='hidden'
                          multiple={true}
                          accept="image/png, image/jpeg, image/webp"
                          id="upload"
                          onChange={changePicture}
                        />
                      </div>
                    </label>
                  ) : (
                    <div
                      className='border-dashed mx-auto rounded-xl w-full h-full border-2 
                      border-gray-200 flex flex-col items-center outline-none justify-center'>

                      <div className="rounded-3xl w-full p-4 flex flex-col gap-2 items-center justify-evenly ">
                        {selectedImages?.length > 0 &&
                          (selectedImages?.length > 10 ? (
                            <p className="error mb-4 text-red-500 w-full text-left">
                              10개를 초과한 이미지를 업로드할 수 없습니다. <br />
                              <span>
                                please delete <b> {selectedImages?.length - 10} </b> of them{" "}
                              </span>
                            </p>
                          ) : (''))}
                        <div className="gap-2 images flex flex-wrap	flex-row w-full md:flex-col-2">
                          {selectedImages &&
                            selectedImages?.map((image, index) => {
                              return (
                                <div key={index} className="image p-4 rounded-lg bg-slate-200 shadow-inner">
                                  <div className='flex justify-between items-center'>
                                    <p className='text-gray-600'>{index + 1}</p>
                                    <button
                                      type="button"
                                      className='p-2 hover:bg-slate-300 rounded-full flex justify-center items-center'
                                      onClick={() => removeImg(image)}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>

                                  </div>
                                  <div className="relative h-[18.7rem] w-[16rem]">
                                    <Image
                                      className='shadow rounded-lg autoImage'
                                      src={image?.url}
                                      layout="fill"
                                      objectFit='contain'
                                      alt="upload"
                                      unoptimized
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 mt-[2rem]">


          </div>
        </motion.div>
      </div>
    </Modal>

  );
};

index.propTypes = {
  imageModalOpened: PropTypes.bool,
  closeImageModal: PropTypes.func,
};

export default index;