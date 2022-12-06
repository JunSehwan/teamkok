import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectConversation from "./SelectConversation";
import { useRouter } from 'next/router';
import Empty from "components/Common/Empty";
import styled from "styled-components";
import { showConversationBar, hideConversationBar } from 'slices/chat';
import Link from "next/link";

const SideBar = ({talking}) => {

  const { mainConversations } = useSelector(state => state.chat);
  const router = useRouter();

  return (
    <>
      <Container
        className={`z-5 flex-shrink-0 ${talking ? "hidden":""} md:!block w-full md:w-[300px] overflow-y-auto overflow-x-hidden h-[calc(100vh-var(--navbar-height)-2.4rem)] bg-slate-50`}
      >
        <div className="sidebar md:block h-full">
          {mainConversations?.length === 0 ?
            <div className="w-full text-center font-bold text-blue-600 h-full my-auto
            flex justify-center items-center
            ">
              <span>대화상대 없음</span>
            </div>
            :
            <div className="py-2">
              {mainConversations?.map((item) => (
                <SelectConversation
                  key={item?.id}
                  conversation={item}
                  conversationId={item?.id}
                />
              ))}
            </div>
          }
        </div>
      </Container>


    </>
  );
};

const Container = styled.div`
 border-right: 1px solid rgba(0,0,0,0.08);
  ::-webkit-scrollbar {
      width: 12px;
    }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.16);
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`

export default SideBar;