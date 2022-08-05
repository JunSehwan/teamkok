import React,{useState} from 'react';
import SideBarList from "components/Board/Contents/Dialog/SideBarList";
import { useSelector } from 'react-redux';
import InputSection from "./Input/InputSection";
import ChatView from './ChatView';
import ChatHeader from './ChatHeader';
// import AddServer from "./AddServer";

const index = () => {

  const [inputSectionOffset, setInputSectionOffset] = useState(0);
  const [replyInfo, setReplyInfo] = useState(null);
  const { singleConversation } = useSelector(state => state.chat);

  return (
    <div className="flex">
      <SideBarList />
      <div className="flex-grow flex-col items-end justify-center gap-3 md:!flex text-gray-500 h-[calc(100vh-140px)] ">
        {/* <ChatHeader conversation={singleConversation} /> */}
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

export default index;