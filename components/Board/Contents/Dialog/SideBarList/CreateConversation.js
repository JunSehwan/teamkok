import { useState } from "react";
import profilePicture from 'public/image/icon/happiness.png';
import Loading from "components/Common/Loading";
import { db, createConversation } from "firebaseConfig";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import { addConversation } from 'slices/chat';

const CreateConversation = ({ setIsOpened }) => {
const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const { user, users } = useSelector(state => state.user);
  const [selected, setSelected] = useState([]);
  const router = useRouter();

  const handleToggle = (uid) => {
    if (selected.includes(uid)) {
      setSelected(selected.filter((item) => item !== uid));
    } else {
      setSelected([...selected, uid]);
    }
  };
  const handleCreateConversation = async () => {
    setIsCreating(true);
    
    const sorted = [...selected, user?.userID].sort();
    const result = await createConversation(sorted);

    if (result?.key !== "fail") {
        setIsCreating(false);
      setIsOpened(false);
      dispatch(addConversation(result));
      // router.push(`/${result?.id}`);
    } else {
      setIsOpened(false);
      // router.push(`/${result?.value}`);
      setIsCreating(false);
    }
  };

  return (
    <div
      onClick={() => setIsOpened(false)}
      className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white mx-3 w-full max-w-[500px] overflow-hidden rounded-lg"
      >
        <div className="border-gray-400 flex items-center justify-between border-b py-4 px-4">
          <div className="flex-1"></div>
          <div className="flex flex-1 items-center justify-center">
            <h1 className="whitespace-nowrap text-center text-xl">
              새로운 대화시작
            </h1>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <button
              onClick={() => setIsOpened(false)}
              className="hover:bg-gray-200 flex h-8 w-8 items-center justify-center rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {
          <>
            {isCreating && (
              <div className="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080]">
                <Loading />
              </div>
            )}
            <div className="flex h-96 flex-col items-stretch gap-2 overflow-y-auto py-2">
              {users
                .filter((doc) => doc?.userID !== user?.userID)
                .map((doc) => (
                  <div
                    key={doc?.userID}
                    onClick={() => handleToggle(doc?.userID)}
                    className="hover:bg-slate-100 flex cursor-pointer items-center gap-2 px-5 py-2 transition"
                  >
                    <input
                      className="flex-shrink-0 cursor-pointer"
                      type="checkbox"
                      checked={selected.includes(doc?.userID)}
                      readOnly
                    />
                    <Image
                      className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                      src={doc?.avatar || profilePicture}
                      width={40}
                      height={40}
                      alt="profilePicture"
                    />
                    <p>{doc?.username}</p>
                  </div>
                ))}
            </div>
            <div className="border-dark-lighten flex justify-end border-t p-3">
              <button
                disabled={selected?.length === 0}
                onClick={handleCreateConversation}
                className="bg-violet-600 text-white rounded-lg py-2 px-3 transition duration-300 hover:brightness-125  disabled:!brightness-[90%]"
              >
                대화리스트 추가
              </button>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default CreateConversation;