import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import NoticeList from 'components/Common/NoticeList';
import NoticeTag from './NoticeTag';
import { addPost, setAddDoneFalse } from 'slices/section';
import { createPost } from 'firebaseConfig'

import { ref, getDownloadURL, uploadBytesResumable, getStorage } from "firebase/storage";
import dayjs from "dayjs";
import Spin from 'components/Common/Spin';

const index = ({ onCloseForm, openForm }) => {
  const dispatch = useDispatch();
  const { addDone } = useSelector(state => state.section);
  const { singleSection } = useSelector(state => state.board);
  const { isExpert, isAdmin } = useSelector(state => state.user);
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

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
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
      files["id"] = Math.random()
      setImages((prevState) => [...prevState, files])
    }
  };

  const removeImg = useCallback((image) => {
    setSelectedImages(prevArr => prevArr.filter(v => v?.url !== image?.url));
    setImages(prevArr => prevArr.filter(v => v?.name !== image?.name));
  }, [])

  const [URLs, setURLs] = useState([])
  const [progress, setProgress] = useState(0);

  const now = new Date();
  const nowForCopy = dayjs(now);
  const time = nowForCopy?.format('YYYY-MM-DD HH:mm:ss');

  const onFirebaseImage = useCallback(async (images) => {
    const storage = getStorage();
    if (images?.length === 0) return setTimeout(() => {
      setConvert(true);
    }, [1500])
    images?.map((file) => {
      const storageRef = ref(storage, `section/${time}/${file?.name}`);
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
              setTimeout(() => {
                setConvert(true);
                setLoading(false);
              }, [1500])
              return prevState;
            })

          })
        })
    });
  }, [time])



  const [convert, setConvert] = useState(false);
  const [loading, setLoading] = useState(false);
  const uploadImageDB = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    if (description?.length === 0) {
      document.getElementById('description').focus();
      setLoading(false);
      return setDescriptionError(true);
    }
    if (!category) {
      document.getElementById('category').focus();
      setLoading(false);
      return setCategoryError(true);
    }
    const results = await onFirebaseImage(images);

  }, [category, description?.length, images, onFirebaseImage])


  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    // if (description) {
    //   const out = await description?.save();
    //   var JSONresult = JSON.stringify(out);
    // }
    const contentsReplaceNewline = () => {
      return description.replaceAll("<br>", "\r\n");
    }

    const postResult = {
      isExpert: isExpert,
      isAdmin: isAdmin,
      sectionId: singleSection?.id,
      description: description,
      category: category,
      // description: JSONresult,
    };

    const con = await createPost(postResult, URLs);
    // const imageCon = await uploadPicture(images, con?.id);
    dispatch(addPost(con));

  }, [dispatch, URLs, isAdmin, isExpert, singleSection?.id, category, description])

  useEffect(() => {
    if (addDone) {
      onCloseForm();
      dispatch(setAddDoneFalse())
    }
  }, [onCloseForm, addDone, dispatch])

  return (
    <div className="overflow-y-auto min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover t-0 r-0">
      <div className="fixed bg-black opacity-80 inset-0 z-0"></div>
      <div className="w-full  max-w-2xl p-3 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">

        {convert ?
          (
            <div className="w-full  max-w-2xl p-5 relative mx-auto my-auto rounded-xl bg-white ">
              {/* <!--content--> */}
              <div className="">
                {/* <!--body--> */}
                <div className="text-center p-5 flex-auto justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-sky-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16  flex items-center text-sky-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  <h2 className="text-xl font-bold py-4 ">공지는 모두에게 공개됩니다.</h2>
                  <p className="text-sm text-gray-500 px-8">다양한 팀 이야기, 공지사항을 꾸준히 올려서 구직자들에게 어필할 수 있습니다.</p>
                </div>
                {/* <!--footer--> */}
                <div className="p-1  mt-1 text-center space-x-4 md:block">
                  <button type="button" onClick={onSubmit}
                    className="mb-1 md:mb-0 w-[100%] bg-sky-500 border border-sky-500 px-5 py-2 text-base shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-sky-600">
                    확인</button>
                </div>
              </div>
            </div>


          )
          :
          <>
            <button
              type='button'
              className=" mt-2 ml-2 px-3 py-3 flex items-center justify-end text-blue-500 hover:bg-blue-100 rounded-full border-b"
              onClick={onCloseForm}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <form
              onSubmit={uploadImageDB}
            >
              <div className="flex p-4">
                <div className="ml-3 flex flex-col w-full">
                  <textarea
                    id="description"
                    tabIndex={-1}
                    placeholder="공지사항을 작성해주세요."
                    className="w-full text-xl resize-none outline-none h-32"
                    onChange={onChangeDescription}
                    value={description}
                  >
                  </textarea>
                  {descriptionError ? (
                    <p className="text-xs mb-[1.5rem] italic text-red-500">팀이야기를 얘기해주세요.</p>
                  ) : null}

                </div>
              </div>

              <div className="flex p-4">
                <div className="ml-3 flex flex-col w-full">
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
                    <p className="text-xs mb-[1.5rem] italic text-red-500">카테고리를 선택해주세요.</p>
                  ) : null}

                </div>
              </div>

              <div className="flex p-4">
                <div className="ml-3 flex flex-col w-full">
                </div>
              </div>
              {selectedImages?.length > 0 &&
                (selectedImages?.length > 10 ? (
                  <p className="error mb-4 text-center text-red-600">
                    10개를 초과한 이미지를 업로드할 수 없습니다. <br />
                    <span>
                      please delete <b> {selectedImages?.length - 10} </b> of them{" "}
                    </span>
                  </p>
                ) : (
                  ''
                ))}
              <div className="images flex flex-row gap-2 px-6 flex-wrap">
                {selectedImages &&
                  selectedImages?.map((image, index) => {
                    return (
                      <div key={index} className="image basis-1/4">
                        <div className='flex justify-between'>
                          <p className='text-violet-800'>{index + 1}</p>
                          <button
                            type="button"
                            onClick={() => removeImg(image)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>

                        </div>
                        <div className="relative h-20 w-[auto]">
                          <Image
                            className='shadow sm:rounded-md autoImage'
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

              <div className="flex items-center text-blue-600 justify-between py-4 px-4 border-t">
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
                      type="submit"
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
          </>}
      </div>
    </div>
  );
};

index.propTypes = {
  onCloseForm: PropTypes.func,
  openForm: PropTypes.bool,
};

export default index;