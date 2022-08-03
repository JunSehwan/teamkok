import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateConversation from "./CreateConversation";
import SelectConversation from "./SelectConversation";
import { useRouter } from 'next/router';
import Empty from "components/Common/Empty";
import styled from "styled-components";


const SideBarList = () => {
  const [createConversationOpened, setCreateConversationOpened] = useState(false);
  const router = useRouter();
  const pid = router.query;
  const { mainConversations } = useSelector(state => state.chat);
  return (
    <>
      <Container
        className={`shadow-inner border-dark-lighten min-h-[40rem] flex-shrink-0 overflow-y-auto overflow-x-hidden border-r rounded-lg
        ${location.pathname !== "/"
          ? "hidden w-[350px] md:!block"
          : "w-full md:!w-[350px]"
          }
          `}
      >
        <div className="border-dark-lighten flex h-20 items-center justify-between border-b px-6 w-full">
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
        </div>

        {mainConversations?.length === 0 ?
          <div className="my-6 flex flex-col items-center justify-center">
            <Empty/>
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

      {createConversationOpened && (
        <CreateConversation setIsOpened={setCreateConversationOpened} />
      )}

    </>
  );
};

const Container = styled.div`
box-shadow: inset 2px 3px 2px rgba(0,0,0,0.14);
height: calc(100vh - 170px);
`

export default SideBarList;