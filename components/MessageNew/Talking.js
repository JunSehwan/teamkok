import React, { useState, useEffect } from 'react';
import SideBar from "./SideBar";
import { useSelector, useDispatch } from 'react-redux';
import InputSection from "./Input/InputSection";
import ChatView from './ChatView';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { setAddDoneFalse, setAddSingoDoneFalse } from 'slices/section';

const Talking = () => {
  const dispatch = useDispatch();
  const [inputSectionOffset, setInputSectionOffset] = useState(0);
  const [replyInfo, setReplyInfo] = useState(null);
  const { singleConversation } = useSelector(state => state.chat);

  const { addSingoDone } = useSelector(state => state.section);
  const addSingoNotify = () => toast('신고가 완료되었습니다. 해당 인물과의 대화에 대한 검토 후 적절한 처리가 이루어질 예정입니다.');
  useEffect(() => {
    if (addSingoDone) {
      addSingoNotify();
      dispatch(setAddSingoDoneFalse());
    }
  }, [dispatch, addSingoDone])

  return (
    <>
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
      <Toaster
        position='bottom-center'
        toastOptions={{
          //   className: '',
          style: {
            // border: '1px solid #713200',
            // padding: '16px',
            color: 'white',
            background: 'rgba(0,0,0,0.76)'
          },
        }}
      />
    </>
  );
};

export default Talking;