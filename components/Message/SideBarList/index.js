import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectConversation from "./SelectConversation";
import { useRouter } from 'next/router';
import Empty from "components/Common/Empty";
import styled from "styled-components";
import { showConversationBar, hideConversationBar } from 'slices/chat';
import Link from "next/link";

const SideBarList = () => {

  const { mainConversations, conversationBar, singleConversation } = useSelector(state => state.chat);
  const [createConversationOpened, setCreateConversationOpened] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query;
  const onClickClose = useCallback(() => {
    dispatch(hideConversationBar(false));
  }, [dispatch])
  const onClickOpen = useCallback(() => {
    dispatch(showConversationBar(true));
  }, [dispatch])

  return (
    <>
      {conversationBar ?
        <Container
          className={`sm:relative fixed z-10 shadow bg-white border-slate-400 flex-shrink-0 overflow-y-auto overflow-x-hidden border-r
        ${!!pid?.cid
              ? "md:!block w-full md:w-[300px]"
              : "w-full md:!w-[300px]"
            }
          `}
        >
          <div className="border-slate-400 overflow-hidden flex h-20 items-center justify-between border-b px-3 w-full flex-row">
            
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
              <p className="text-center">기업보드에 참여한 후에 대화를 시작해보세요.</p>
              <Link href="/">
              <a
                
                className="text-primary text-center"
              >
                대화 시작!
              </a>
              </Link>
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
          className="z-10 p-2 ml-2 mt-12 absolute left-2 top-10 rounded-full hover:bg-gray-100 bg-slate-50 shadow text-gray-600 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      }

    </>
  );
};

const Container = styled.div`
height: calc(100vh - 66px);
`

export default SideBarList;