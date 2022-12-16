import React, { useCallback, useState, useEffect, useRef } from 'react';
import Modal from 'components/Common/Modal/Modal';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MdDelete } from "react-icons/md";
import Spin from 'components/Common/Spin';
import { doc, updateDoc, } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import useSelectFile from "hooks/useSelectFile";
import { db, storage, } from 'firebaseConfig';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { patchThumbvideo } from 'slices/user';

const index = ({ videoModalOpened, closeVideoModal }) => {
  const { user } = useSelector(state => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);

  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();
  const selectedFileRef = useRef(null);

  const { patchThumbvideoDone } = useSelector(state => state.user);

  useEffect(() => {
    if (patchThumbvideoDone) {
      updatenotify();
    }
  })
  const updatenotify = () => toast('업데이트 완료!');

  const handlePost = async (e) => {
    if (selectedFile) {
      setLoading(true);
      try {
        if (selectedFile) {
          const imageRef = ref(storage, `users/${user?.userID}/thumbvideo`);

          const resultUrl = await uploadString(imageRef, selectedFile, "data_url").then(
            async (snapshot) => {
              const downloadUrl = await getDownloadURL(imageRef);
              await updateDoc(doc(db, "users", user?.userID), {
                thumbvideo: downloadUrl,
              });
              return await getDownloadURL(ref(storage, `users/${user?.userID}/thumbvideo`));
            }
          );
          dispatch(patchThumbvideo(resultUrl));
        } else {
          alert("No video!");
        }
        setSelectedFile("");
        closeVideoModal();
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <Modal
      onClose={closeVideoModal}
      title="🎞️CoverClip 생성"
      visible={videoModalOpened}
      widths="800px"
    >
      <div className="flex w-full h-full top-[24px] lg:top-[30px] mb-4 pt-2 lg:pt-4 justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-lg xl:h-[80vh] flex w-full flex-col justify-center items-center gap-4 p-6 pt-3"
        >
          <div>
            <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none w-[360px] h-[600px] pl-10 pr-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
              {loading ? (
                <>
                  <div className='-ml-[48px] mb-[48px]'>
                    <Spin />
                  </div>
                  <p className="text-xl font-semibold text-pink-500 text-xenter mt-4 animate-pulse">
                    uploading...
                  </p>
                </>
              ) : (
                <div>
                  {!selectedFile ? (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col justify-center items-center">
                          <p className="font-bold text-xl">
                            {/* <FaCloudUploadAlt className='text-gray-300 text-6xl' /> */}
                          </p>
                          <p className="text-xl font-semibold">
                            영상 업로드
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
                          ✔️ MP4 or WebM or ogg <br />
                          ✔️ 추천 영상배율: 360x600 <br />
                          ✔️ 3분이내의 영상 <br />
                          ✔️ 0.5 GB 이하
                        </p>
                        <p className="text-white bg-gradient-to-br from-pink-500 mt-8 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 w-52">
                          파일 선택
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-video"
                        ref={selectedFileRef}
                        className="w-0 h-0"
                        onChange={onSelectedFile}
                      />
                    </label>
                  ) : (
                    <div className=" rounded-3xl w-[360px]  p-4 flex flex-col gap-6 justify-center items-center">
                      <video
                        className="rounded-xl h-[600px] w-[360px] mt-16 bg-black"
                        controls
                        loop
                        src={selectedFile}
                      />
                      <div className=" flex justify-between gap-20">
                        <p className="text-lg">video</p>
                        <button
                          type="button"
                          className=" rounded-full bg-gray-100 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                          onClick={() => setSelectedFile("")}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {wrongFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[360px]">
                video 유형의 파일을 선택해주세요. (mp4 or webm or ogg)
              </p>
            )}
          </div>
          <div className="flex flex-row gap-2 mt-[50px] max-w-[520px]">

            {loading ? (
              <div className="flex w-full mt-4">
                <button
                  type="button"
                  className="text-white text-center animate-pulse cursor-not-allowed 
                  bg-gradient-to-r w-full p-8 px-12 from-purple-500 to-pink-500 
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
              <div className="flex w-full mt-4">
                <button
                  disabled={selectedFile ? false : true}
                  onClick={handlePost}
                  type="button"
                  className="text-white font-bold w-full p-8 px-12 bg-[#1890FF]/90
                   hover:bg-[#1890FF] focus:ring-4 focus:outline-none
                    focus:ring-blue-200 dark:focus:ring-blue-800 text-lg rounded-xl 
                    py-2 text-center cursor-pointer flex justify-center
                     items-center"
                >
                  <BsFillCloudUploadFill />
                  <span className='ml-1'>업로드</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Modal>
  );
};

index.propTypes = {
  videoModalOpened: PropTypes.bool,
  closeVideoModal: PropTypes.func,
};

export default index;