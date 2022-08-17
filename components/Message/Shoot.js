import React, { useState } from 'react';
import SideBarList from "./SideBarList";
import { useSelector, useDispatch } from 'react-redux';
import InputSection from "./Input/InputSection";
import ChatView from './ChatView';

const Shoot = () => {
  const dispatch = useDispatch();
  const [inputSectionOffset, setInputSectionOffset] = useState(0);
  const [replyInfo, setReplyInfo] = useState(null);
  const { singleConversation } = useSelector(state => state.chat);

  return (
    <div className="flex pt-[66px] bg-slate-50">
      <SideBarList />
      <div className="flex-grow flex-col items-end justify-center gap-3 md:!flex text-gray-500 h-[calc(100vh-66px)] ">
        <ChatView
          replyInfo={replyInfo}
          setReplyInfo={setReplyInfo}
          inputSectionOffset={inputSectionOffset}
          conversation={singleConversation}
        />
        <InputSection
          setInputSectionOffset={setInputSectionOffset}
          replyInfo={replyInfo}
          conversation={singleConversation}
          setReplyInfo={setReplyInfo}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default Shoot;