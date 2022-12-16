import React, { useState } from 'react';
import SideBar from "./SideBar";
import { useSelector, useDispatch } from 'react-redux';
import InputSection from "./Input/InputSection";
import ChatView from './ChatView';

const Talking = () => {
  const dispatch = useDispatch();
  const [inputSectionOffset, setInputSectionOffset] = useState(0);
  const [replyInfo, setReplyInfo] = useState(null);
  const { singleConversation } = useSelector(state => state.chat);
  return (
    <div className="flex h-[100vh] bg-[#F3F2EF]">
      <div className='pt-[var(--navbar-height)] flex xl:w-[1200px] lg:w-[960px] md:w-[720px] sm:w-[520px] w-full mx-auto'>
        <div className='mb-0 md:mt-[2.4rem] w-full'>
          <div className='min-h-[350px] rounded-t-lg mb-0 bg-white shadow relative w-full'>
            <div className='flex h-full overflow-hidden w-full'>
              <SideBar
                talking={true}
              />
              <div className="flex-grow flex-col items-end justify-center !flex text-gray-500 md:h-[calc(100vh-var(--navbar-height)-2.4rem)] h-[calc(100vh-var(--navbar-height))]">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talking;