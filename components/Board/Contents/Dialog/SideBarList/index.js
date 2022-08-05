import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateConversation from "./CreateConversation";
import SelectConversation from "./SelectConversation";
import { useRouter } from 'next/router';
import Empty from "components/Common/Empty";
import styled from "styled-components";
import { showConversationBar, hideConversationBar } from 'slices/chat';

const SideBarList = () => {
  const [createConversationOpened, setCreateConversationOpened] = useState(false);
  const router = useRouter();
  const pid = router.query;
  const { mainConversations, conversationBar } = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const [ignoreWidth, setIgnoreWidth] = useState(false);
  const onClickClose = useCallback(() => {
    dispatch(hideConversationBar(false));
  }, [dispatch])
  const onClickNewOpen = useCallback(() => {
    setIgnoreWidth(true);
  }, [])
  const onClickOpen = useCallback(() => {
    dispatch(showConversationBar(true));
  }, [dispatch])
  return (
    <>
      {!!conversationBar ?
        <Container
          className={`shadow z-5 bg-white border-slate-400 flex-shrink-0 overflow-y-auto overflow-x-hidden border-r
        ${!!pid?.cid
              ? "md:!block w-full md:w-[320px]"
              : "w-full md:!w-[350px]"
            }
          `}
        >
          <div className="border-slate-400 flex h-20 items-center justify-between border-b px-3 w-full flex-row">
            <div className="flex items-center gap-1 w-full">
              <button
                onClick={() => setCreateConversationOpened(true)}
                className="px-4 py-2 shadow-sm hover:brightness-90 bg-blue-100 text-blue-700 justify-center flex flex-row items-center bg-dark-lighten w-full rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span className="ml-2">새로운 대화상대 추가</span>
              </button>
            </div>
            <button
              onClick={() => onClickClose()}
              className="p-2 ml-2 rounded-full hover:bg-gray-100 text-gray-600 "
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>
          {mainConversations?.length === 0 ?
            <div className="my-6 flex flex-col items-center justify-center">
              <Empty />
              <p className="text-center">대화리스트가 없습니다.</p>
              <button
                onClick={() => setCreateConversationOpened(true)}
                className="text-primary text-center"
              >
                대화 시작!
              </button>
            </div>
            :
            <div className="">
              {mainConversations?.map((item) => (
                <SelectConversation
                  key={item?.id}
                  conversation={item}
                  conversationId={item?.id}
                />
              ))}
            </div>
          }
        </Container>
        :
        <button
          onClick={onClickOpen}
          className="z-5 p-2 ml-2 absolute left-2 top-5 rounded-full hover:bg-gray-100 bg-slate-50 shadow text-gray-600 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      }


      {createConversationOpened && (
        <CreateConversation setIsOpened={setCreateConversationOpened} />
      )}

    </>
  );
};

const Container = styled.div`
height: calc(100vh - 138px);
`

export default SideBarList;