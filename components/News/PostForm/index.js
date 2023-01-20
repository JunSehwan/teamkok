/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import NoticeList from 'components/Common/NoticeList';
import NoticeTag from './NoticeTag';
import { addPost, setAddDoneFalse } from 'slices/section';
import { createPost } from 'firebaseConfig'
import { motion } from 'framer-motion';
import { ref, getDownloadURL, uploadBytesResumable, getStorage } from "firebase/storage";
import dayjs from "dayjs";
import Spin from 'components/Common/Spin';
import { FaVideo } from 'react-icons/fa';
import holderPicture from 'public/image/holderimage.png';
import styled from "styled-components";
import ImagePreview from "./ImagePreview";
import { MdCancel } from 'react-icons/md';

const index = ({ onCloseForm, openForm }) => {
  const dispatch = useDispatch();
  const { addDone } = useSelector(state => state.section);
  const { singleSection } = useSelector(state => state.board);
  const { user } = useSelector(state => state.user);
  const { uploading } = useSelector(state => state.sectionSettings);
  //1줄 간략소개
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const onChangeDescription = useCallback((e) => {
    setDescription(e.currentTarget.value);
    setDescriptionError(false);
  }, [])

  // 카테고리
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const onChangeCategory = useCallback((e) => {
    setCategory(e + 1);
    setCategoryError(false);
  }, [])


  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([])
  const [imaging, setImaging] = useState(false);
  const [current, setCurrent] = useState(0);
  const length = selectedImages?.length;

  const nextSlide = useCallback(() => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  }, [current, length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray?.map((file) => {
      return ({ id: file.id, name: file.name, url: URL.createObjectURL(file) })
    });
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    setImaging(true);
  };
  const onCancelImaging = useCallback(() => {
    setImaging(false);
    setSelectedImages([]);
  }, [])
  const onNextImaging = useCallback(async () => {
    await uploadImageDB()
    setImaging(false);
  }, [uploadImageDB])

  const changePicture = (e) => {
    onSelectFile(e)
    for (let i = 0; i < e.target.files.length; i++) {
      const files = e.target.files[i];
      files["id"] = Math.random()
      setImages((prevState) => [...prevState, files])
    }
  };

  const removeImg = useCallback(() => {
    setSelectedImages([]);
    setImages([]);
    setURLs([]);
  }, [])

  const [URLs, setURLs] = useState([])
  const [progress, setProgress] = useState(0);

  const now = new Date();
  const nowForCopy = dayjs(now);
  const time = nowForCopy?.format('YYYY-MM-DD HH:mm:ss');

  const onFirebaseImage = useCallback(async (images) => {
    const storage = getStorage();
    if (images?.length === 0) return
    // setTimeout(() => {
    //   setConvert(true);
    // }, [1500])
    images?.map((file) => {
      const storageRef = ref(storage, `post/${user?.userID}/${time}/${file?.name}`);
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
            setURLs((prevState) => {
              prevState.push(downloadURLs);
              // setTimeout(() => {
              // }, [1500])
              setLoading(false);
              return prevState;
            })
          })
        }
      )
    });
  }, [time, user?.userID])


  const [loading, setLoading] = useState(false);

  const uploadImageDB = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    const results = await onFirebaseImage(images);
    setImaging(false);
  }, [images, onFirebaseImage])

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (URLs?.length === 0 && description?.length === 0) {
      document.getElementById('description').focus();
      setLoading(false);
      return setDescriptionError(true);
    }
    if (!category) {
      document.getElementById('category').focus();
      setLoading(false);
      return setCategoryError(true);
    }

    // const contentsReplaceNewline = () => {
    //   return description?.replaceAll("<br>", "\r\n");
    // }

    const postResult = {
      userID: user?.userID,
      mycompany: user?.mycompany,
      mysection: user?.mysection,
      description: description,
      category: category,
      companycomplete: user?.companycomplete
      // description: JSONresult,
    };

    const con = await createPost(postResult, URLs);
    // const imageCon = await uploadPicture(images, con?.id);
    dispatch(addPost(con));

  }, [URLs, description, category, user?.userID, user?.mycompany, user?.mysection, user?.companycomplete, dispatch])

  useEffect(() => {
    if (addDone) {
      onCloseForm();
    }
  }, [onCloseForm, addDone, dispatch])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="overflow-y-auto min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover t-0 r-0">
      <div className="fixed bg-black opacity-80 inset-0 z-0"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        exit={{ opacity: 0 }}
        className="w-full max-w-2xl md:p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
        {imaging ?
          <div className="w-full max-w-2xl md:p-3 relative mx-auto my-auto rounded-xl">
            {/* <!--content--> */}
            <div className="">
              {/* <!--body--> */}
              <div className="text-center p-5 flex-auto justify-center">
                <div className="absolute top-[42%] h-5 w-2 left-0 ml-2 z-10 text-5xl cursor-pointer select-none text-white">
                  <svg
                    onClick={prevSlide}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500 shadow-lg hover:text-gray-500 hover:bg-gray-100 rounded-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                    />
                  </svg>
                </div>
                <div className="absolute top-[42%] right-0 mr-2 z-10 text-5xl cursor-pointer select-none text-white">
                  <svg
                    onClick={nextSlide}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500 shadow-lg hover:text-gray-500 hover:bg-gray-100 rounded-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                {selectedImages?.map((v, index) => (
                  <div
                    className={
                      index === current
                        ? "opacity-100 duration-100 ease-in scale-105"
                        : "opacity-0 duration-100"
                    }
                    key={index}
                  >
                    {index === current && (
                      <AutoHeightImageWrapper>
                        <img
                          // layout="fill"
                          // className="autoImage"
                          src={v?.url || holderPicture}
                          alt="slides"
                          className="max-h-[654px] h-[600px] w-full autoImage object-contain bg-cover shadow"
                        />
                      </AutoHeightImageWrapper>
                    )}
                  </div>
                ))}
              </div>
              {/* <!--footer--> */}
              <div className="p-1  mt-1 text-center flex justify-center items-center gap-2">
                <button type="button" onClick={onCancelImaging}
                  className="w-[100%] bg-gray-500 border border-gray-500 px-5 py-3 text-base shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-gray-600">
                  취소
                </button>
                <button type="button" onClick={uploadImageDB}
                  className="w-[100%] bg-sky-500 border border-sky-500 px-5 py-3 text-base shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-sky-600">
                  다음
                </button>
              </div>
            </div>
          </div>
          :

          <>
            <div className='w-full flex justify-between items-center'>
              <p className='text-xl font-bold text-gray-600 w-full text-center py-2'>팀스토리 만들기</p>
              <button
                type='button'
                className="p-2 flex items-center justify-end text-gray-500 hover:bg-gray-100 rounded-full border-b"
                onClick={onCloseForm}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form
            >
              <div className="flex p-4">
                <div className="flex flex-col w-full">
                  <textarea
                    id="description"
                    placeholder="새로운 소식을 들려주세요!"
                    className="w-full rounded-lg text-lg resize-none border-none outline-none h-32"
                    onChange={onChangeDescription}
                    value={description}
                  >
                  </textarea>
                  {descriptionError ? (
                    <p className="text-sm mb-[1.5rem] text-red-500">팀이야기를 얘기해주세요.</p>
                  ) : null}

                </div>
              </div>

              <div className="flex p-4">
                <div className="flex flex-col w-full">
                  <h3 className="text-blue-500 text-base leading-6 font-bold dark:text-white">
                    카테고리
                  </h3>

                  <ul id="category" tabIndex={-1} className="mt-2 flex flex-row flex-wrap w-[100%]">
                    {NoticeList?.map((v, i) => (
                      <React.Fragment key={v?.key}>
                        <NoticeTag
                          name={v?.name}
                          category={category}
                          setCategory={setCategory}
                          onChangeCategory={onChangeCategory}
                          index={i}
                        />
                      </React.Fragment>
                    ))}
                  </ul>

                  {categoryError ? (
                    <p className="text-sm mb-[1.5rem] text-red-500">카테고리를 선택해주세요.</p>
                  ) : null}

                </div>
              </div>


              {URLs?.length > 0 &&
                (URLs?.length > 10 ? (
                  <p className="error mb-4 text-center text-red-600">
                    10개를 초과한 이미지를 업로드할 수 없습니다. <br />
                    <span>
                      please delete <b> {URLs?.length - 10} </b> of them{" "}
                    </span>
                  </p>
                ) : (
                  ''
                ))}
              {URLs?.length !== 0 &&
                <div className='relative w-full'>
                  <div className="absolute rounded-xl bg-slate-50/30 p-2
                     z-10 text-5xl cursor-pointer select-none text-white hover:text-red-500 top-[16px] right-[16px]">
                    <MdCancel
                      onClick={removeImg}
                      className="w-8 h-8"
                    />
                  </div>
                </div>
              }
              {URLs?.length !== 0 && !loading &&
                <ImagePreview
                  URLs={URLs}
                  selectedImages={selectedImages}
                  length={selectedImages?.length}
                  removeImg={removeImg}
                />
              }
              <div className="images flex flex-row gap-2 flex-wrap my-4">

              </div>
              {/* 이미지 업로드버튼 */}
              <div className="flex items-center text-blue-600 justify-between py-2 px-2 border-t">
                <div className="flex items-center">
                  <div className="flex text-2xl">
                    <label className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer" htmlFor="upload">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
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
                  {/* <div className="flex text-2xl">
                    <label className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer" htmlFor="upload">
                      <FaVideo className="w-6 h-6" />
                    </label>
                    <input onChange={changePicture}
                      type="file"
                      className='hidden'
                      multiple={true}
                      accept="image/png , image/jpeg, image/webp"
                      id="upload"
                    // style="display:none"
                    />

                  </div> */}
                  <span className="ml-2">{progress}%</span>
                </div>
                <div>
                  {!!loading ?
                    <div className="ml-[-2.4rem] mt-[-1.3rem]">
                      <Spin />
                    </div>
                    :
                    <button
                      className="inline-flex items-center px-4 py-2 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      type="button"
                      onClick={onSubmit}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-[4px] h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      게시하기
                    </button>
                  }
                </div>
              </div>
            </form>
          </>
        }
      </motion.div>
    </motion.div>
  );
};

export const AutoHeightImageWrapper = styled.div`
width: 100%;
&>span {
  position: unset !important;
  & .autoImage{
    object-fit: contain !important;
    position: relative !important;
    height: auto !important;
  }
}
`

index.propTypes = {
  onCloseForm: PropTypes.func,
  openForm: PropTypes.bool,
};

export default index;