/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { motion } from 'framer-motion';
import { BsFillCheckCircleFill } from 'react-icons/bs'

// const fields = ['2022년 예비창업패키지 선정', 'Love for clean code', 'Remote work aficionado', 'Amateur astronomer'];
const index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.8 }}
      className="mt-24"
    >
      <div className="pt-8 md:pb-auto">
        <div className="py-4">
          <div className="container mx-auto px-6 md:px-12 xl:px-32">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-center text-2xl text-yellow-200 font-bold md:text-4xl">
                넥스트퍼스에서 만들어가고 있습니다.
              </h2>
              <p className="text-gray-100 lg:w-8/12 lg:mx-auto">
                장기적이며, 수시로 인재를 찾아나서야 하는 채용담당자의 업무를 경감시키고자 하는 목적으로
                또한, 이직희망자들에게 좀 더 자신의 능력을 어필할 수 있게끔 돕는 서비스를 기획하였습니다.
              </p>
              <div className="mt-6 text-left">
                <div className="flex gap-4">
                  <BsFillCheckCircleFill className="h-7" />
                  <p className="m-px text-base">세종대학교 캠퍼스타운 입주(2021 ~ )</p>
                </div>
                <div className="flex gap-4">
                  <BsFillCheckCircleFill className="h-7" />
                  <p className="m-px text-base">2022년 예비창업패키지 선정</p>
                </div>
              </div>
            </div>
            <div className="grid gap-12 justify-center items-center md:grid-cols-2 w-full">
              <div className="space-y-4 text-center">
                <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-48 lg:h-48"
                  src="/image/cto.png" alt="woman" loading="lazy" width="420" height="605" />
                <div>
                  <h4 className="text-2xl">전세환</h4>
                  <span className="block text-sm text-gray-300">CEO-Founder</span>
                  <span className="block text-sm text-gray-300/70">건국대학교 경영학과 졸</span>
                  <span className="block text-sm text-gray-300/70">린나이코리아(주) 인사부(`14 ~ `19)</span>
                </div>
              </div>
              <div className="space-y-4 text-center">
                <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-48 lg:h-48"
                  src="/image/ceo.png" alt="man" loading="lazy" width="780" height="567" />
                <div>
                  <h4 className="text-2xl">박기둥</h4>
                  <span className="block text-sm text-gray-300">Chief Technical Officer</span>
                  <span className="block text-sm text-gray-300/70">이스톰 웹개발(`21)</span>
                  <span className="block text-sm text-gray-300/70">'러브캡슐'앱 개발, choono.co.kr 웹 개발 등</span>
                </div>
              </div>
              {/* <div className="space-y-4 text-center">
              <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                src="https://tailus.io/sources/blocks/classic/preview/images/woman.jpg" alt="woman" loading="lazy" width="1000" height="667" />
              <div>
                <h4 className="text-2xl">Anabelle Doe</h4>
                <span className="block text-sm text-gray-300">Chief Operations Officer</span>
              </div>
            </div> */}
            </div>

            {/* <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: -0 }}
            transition={{ duration: 1 }}
            className="flex pt-10 flex-col items-center gap-10 md:flex-row md:gap-60"
          >
            <div className="text-skyColor">
              <p className="text-base text-secondaryColor">넥스트퍼스 이력</p>
              <h1 className="text-secondaryColor text-4xl md:text-5xl">I&apos;m Ranjeet Singh</h1>
              {
                fields.map((field) => (
                  <div key={field} className="flex gap-4 mt-3">
                    <BsFillCheckCircleFill className="h-7" />
                    <p className="m-px text-base">{field}</p>
                  </div>
                ))
              }
            </div>
          </motion.div> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default index;