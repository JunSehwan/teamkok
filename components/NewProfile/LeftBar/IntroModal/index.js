/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from 'react';
import Modal from 'components/Common/Modal/Modal';
import PropTypes from 'prop-types';
import company from 'public/image/screenshot/company_card.png';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';

const index = ({ introModalOpened, closeIntroModal }) => {
  const router = useRouter();
  const goGroup = useCallback(() => {
    closeIntroModal();
    router.push('/profile/group')
  }, [closeIntroModal, router])
  return (
    <Modal
      onClose={closeIntroModal}
      visible={introModalOpened}
      widths="800px"
    >
      <div className="flex w-full h-full top-[24px] lg:top-[30px] mb-2 pt-2 lg:pt-3 justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-lg h-full xl:h-[80vh] flex w-full flex-col justify-between items-center gap-2 p-4 pt-3"
        >
          <div className='w-full'>

            <h3 className='sm:text-[2.1rem] text-[1.8rem] text-gray-700 my-4 w-full'>
              기업전문가 인증✨</h3>
            <p className='ml-2 my-1 text-gray-500 text-[1.2rem] leading-8'>인재를 영입하고자 한다면 그룹회원으로 등록하세요.</p>
            <span className='ml-2 my-1 '>소속된 팀(기업)에 대한 정보를 작성하여 전문가 인증을 받으세요.(팀원 영입시 구직자에게 신뢰를 줄 수 있습니다!)</span>

            <div className='image my-4'>
              <img src={company?.src || company || ""}
                alt="company_card"
                className='mx-auto max-h-[500px] w-auto '></img>
            </div>

          </div>
          <div className="w-full justify-end flex items-center">
            <button onClick={goGroup}
              className="my-2 px-6 text-md py-4 font-bold text-white bg-[#4173f4] hover:bg-[#1C52DC]  focus:outline-none focus:shadow-outline rounded-lg">
              현업전문가 인증하기</button>
          </div>
        </motion.div>
      </div>
    </Modal>

  );
};

index.propTypes = {
  introModalOpened: PropTypes.bool,
  closeIntroModal: PropTypes.func,
};

export default index;