import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import PropTypes from 'prop-types';
import Image from 'next/image';
import {
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from 'next/router';
import { db, storage } from "firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Alert from "components/Common/Alert";
import ClickAwayListener from "components/Common/ClickAwayListener";
import Spin from "components/Common/Spin";
import { useSelector } from "react-redux";
import { EMOJI_REPLACEMENT } from "hooks/constants";
import { formatFileName } from "hooks/constants";
import dayjs from "dayjs";

const Picker = lazy(() => import("./EmojiPicker"));

const InputSection = ({
  disabled,
  setInputSectionOffset,
  replyInfo,
  setReplyInfo,
  conversation,
}) => {
  const router = useRouter();
  const pid = router.query;
  const conversationId = pid?.cid;
  const now = new Date();
  const nowForCopy = dayjs(now);
  const time = nowForCopy?.format('YYYY-MM-DD HH:mm:ss');
  const [inputValue, setInputValue] = useState("");
  const [fileUploading, setFileUploading] = useState(false);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [isIconPickerOpened, setIsIconPickerOpened] = useState(false);
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [alertText, setAlertText] = useState("");
  const { user } = useSelector(state => state.user)
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const textInputRef = useRef(null);


  const [fileDragging, setFileDragging] = useState(false);

  const updateTimestamp = useCallback(() => {
    updateDoc(doc(db, "conversations", conversationId), {
      updatedAt: time,
    });
  }, [conversationId, time])

  useEffect(() => {
    const handler = () => {
      textInputRef?.current?.focus();
    };
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  useEffect(() => {
    textInputRef?.current?.focus();
  }, [conversationId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (previewFiles.length > 0) {
      setPreviewFiles([]);
      for (let i = 0; i < previewFiles.length; i++) {
        const url = previewFiles[i];
        const res = await fetch(url);
        const blob = await res.blob();
        const file = new File([blob], "image.png", {
          type: res.headers.get("content-type"),
        });
        await uploadFile(file);
      }
    } else {
      if (fileUploading) return;
    }
    if (!inputValue.trim()) return;
    setInputValue("");
    let replacedInputValue = ` ${inputValue} `;
    Object.entries(EMOJI_REPLACEMENT).map(([key, value]) => {
      value.forEach((item) => {
        replacedInputValue = replacedInputValue
          .split(` ${item} `)
          .join(` ${key} `);
      });
    });

    setReplyInfo && setReplyInfo(null);

    addDoc(
      collection(db, "conversations", conversationId, "messages"),
      {
        sender: user?.userID,
        content: replacedInputValue.trim(),
        type: "text",
        createdAt: time,
        replyTo: replyInfo?.id || null,
      }
    );

    updateTimestamp();
  };


  const uploadFile = useCallback(async (file) => {
    try {
      const TWENTY_MB = 1024 * 1024 * 20;
      if (file.size > TWENTY_MB) {
        setAlertText("Max file size is 20MB");
        setIsAlertOpened(true);
        return;
      }
      setFileUploading(true);

      const fileReference = ref(storage, formatFileName(file.name));
      await uploadBytes(fileReference, file);
      const downloadURL = await getDownloadURL(fileReference);

      addDoc(
        collection(db, "conversations", conversationId, "messages"),
        {
          sender: user?.userID,
          content: downloadURL,
          type: file.type.startsWith("image") ? "image" : "file",
          file: file.type.startsWith("image")
            ? null
            : {
              name: file.name,
              size: file.size,
            },
          createdAt: time,
        }
      );

      setFileUploading(false);
      updateTimestamp();
    } catch (error) {
      console.log(error);
      setFileUploading(false);
    }
  }, [conversationId, user?.userID, updateTimestamp, time]);

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    uploadFile(file);
  };

  const addIconToInput = (value) => {
    const start = textInputRef?.current?.selectionStart;
    const end = textInputRef?.current?.selectionEnd;
    const splitted = inputValue.split("");
    splitted.splice(start, end - start, value);
    setInputValue(splitted.join(""));
  };

  const handleReplaceEmoji = (e) => {
    if (e.key === " ") {
      if (e.target.selectionStart !== e.target.selectionEnd) return;

      const lastWord = inputValue
        .slice(0, e.target.selectionStart)
        .split(" ")
        .slice(-1)[0];

      if (lastWord.length === 0) return;

      Object.entries(EMOJI_REPLACEMENT).map(([key, value]) => {
        value.forEach((item) => {
          if (item === lastWord) {
            const splitted = inputValue.split("");
            splitted.splice(
              e.target.selectionStart - lastWord.length,
              lastWord.length,
              key
            );
            setInputValue(splitted.join(""));
          }
        });
      });
    }
  };

  useEffect(() => {
    if (!setInputSectionOffset) return;
    if (previewFiles.length > 0) return setInputSectionOffset(128);

    if (!!replyInfo) return setInputSectionOffset(76);

    setInputSectionOffset(0);
  }, [previewFiles.length, replyInfo, setInputSectionOffset]);

  const handlePaste = (e) => {
    const file = e?.clipboardData?.files?.[0];
    if (!file || !file.type.startsWith("image")) return;

    const url = URL.createObjectURL(file);

    setPreviewFiles([...previewFiles, url]);
  };

  useEffect(() => {
    const dragBlurHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setFileDragging(false);
    };

    const dragFocusHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setFileDragging(true);
    };

    const dropFileHandler = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      setFileDragging(false);

      let items = e.dataTransfer.items;
      let files = e.dataTransfer.files;

      let selectedFiles = [];

      for (let i = 0, item; (item = items[i]); ++i) {
        let entry = item.webkitGetAsEntry();
        if (entry?.isFile) {
          selectedFiles.push(files[i]);
        }
      }

      for (let i = 0; i < selectedFiles.length; i++) {
        await uploadFile(selectedFiles[i]);
      }
    };

    addEventListener("dragenter", dragFocusHandler);
    addEventListener("dragover", dragFocusHandler);
    addEventListener("dragleave", dragBlurHandler);
    addEventListener("drop", dropFileHandler);

    return () => {
      removeEventListener("dragenter", dragFocusHandler);
      removeEventListener("dragover", dragFocusHandler);
      removeEventListener("dragleave", dragBlurHandler);
      removeEventListener("drop", dropFileHandler);
    };
  }, [uploadFile]);

  return (
    <>
      {fileDragging && (
        <div className="pointer-events-none fixed top-0 left-0 z-5 flex h-full w-full select-none items-center justify-center backdrop-blur-sm">
          <h1 className="text-3xl">Drop file to send</h1>
        </div>
      )}
      {previewFiles?.length > 0 && (
        <div className="bg-slate-100 border-slate-200 flex h-32 items-center gap-2 border-t px-4">
          {previewFiles?.map((preview) => (
            <div key={preview} className="relative">
              <Image
              unoptimized
                width={28}
                height={28}
                className="h-28 w-28 object-cover" src={preview} alt="" />
              <button
                onClick={() =>
                  setPreviewFiles(
                    previewFiles?.filter((item) => item !== preview)
                  )
                }
                className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      {previewFiles?.length === 0 && !!replyInfo && (
        <div className="border-slate-300 flex h-[76px] justify-between border-t p-4">
          <div className="mr-3">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <p>
                메시지 답글:
                {user?.userID === replyInfo.sender ? " 나에게" : ""}
              </p>
            </div>
            {replyInfo.type === "text" ? (
              <p className="max-w-[calc(100vw-65px)] overflow-hidden text-ellipsis whitespace-nowrap md:max-w-[calc(100vw-420px)]">
                {replyInfo.content}
              </p>
            ) : replyInfo.type === "image" ? (
              "(An image)"
            ) : replyInfo.type === "file" ? (
              "(A file)"
            ) : replyInfo.type === "sticker" ? (
              "(A sticker)"
            ) : (
              "삭제된 메시지"
            )}
          </div>

          <button onClick={() => setReplyInfo && setReplyInfo(null)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <div
        className={`py-2 w-full bg-slate-100 shadow border-slate-300 flex h-16 items-stretch gap-1 border-t px-4 ${disabled ? "pointer-events-none select-none" : ""
          }`}
      >
        <button
          onClick={() => imageInputRef.current?.click()}
          className="text-primary flex flex-shrink-0 items-center text-2xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <input
          ref={imageInputRef}
          hidden
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-primary flex flex-shrink-0 items-center text-2xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          hidden
          className="hidden"
          type="file"
          onChange={handleFileInputChange}
        />

        <form
          onSubmit={handleFormSubmit}
          className="flex flex-grow items-stretch gap-1"
        >
          <div className="relative flex flex-grow items-center">
            <input
              maxLength={1000}
              disabled={disabled}
              ref={textInputRef}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={handleReplaceEmoji}
              onPaste={handlePaste}
              className="bg-white h-9 w-full rounded-full pl-3 pr-10 outline-none"
              type="text"
              placeholder="Message..."
            />
            <button
              type="button"
              onClick={() => setIsIconPickerOpened(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {isIconPickerOpened && (
              <ClickAwayListener
                onClickAway={() => setIsIconPickerOpened(false)}
              >
                {(ref) => (
                  <div ref={ref} className="absolute bottom-full right-0">
                    <Suspense
                      fallback={
                        <div className="flex h-[357px] w-[348px] items-center justify-center rounded-lg border-2 border-[#555453] bg-[#222222]">
                          <Spin />
                        </div>
                      }
                    >
                      <Picker
                        onSelect={(emoji) => addIconToInput(emoji.native)}
                      />
                    </Suspense>
                  </div>
                )}
              </ClickAwayListener>
            )}
          </div>
          {fileUploading ? (
            <div className="ml-1 flex items-center">
              <Spin width="24px" height="24px" color="#0D90F3" />
            </div>
          ) : (
            <button className="text-primary flex flex-shrink-0 items-center text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </button>
          )}
        </form>
      </div>

      <Alert
        isOpened={isAlertOpened}
        setIsOpened={setIsAlertOpened}
        text={alertText}
        isError
      />
    </>
  );
};

InputSection.propTypes = {
  disable: PropTypes.bool,
  setInputSectionOffset: PropTypes.func,
  replyInfo: PropTypes.object,
  setReplyInfo: PropTypes.func,
  // conversation: PropTypes.any,
};

export default InputSection;