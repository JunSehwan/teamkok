import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Common/Modal/Modal';
import { getUser, getUserInformations } from 'firebaseConfig';
import profilePic from 'public/image/icon/happiness.png';
import companyPic from 'public/image/company.png';
import Image from 'next/image';
import { Tooltip } from 'flowbite-react';
import Expert from '/public/image/icon/expertise.png';

const ProfileModal = ({ profileOpened, closeProfile, post }) => {
  const [basic, setBasic] = useState();
  useEffect(() => {
    setBasic(null);
    async function fetchAndSetUser() {
      const mainInfo = await getUser(post?.creatorId);
      setBasic(mainInfo);
    }
    fetchAndSetUser();
  }, [post?.creatorId]);
  let now = new Date();
  let nowYear = now.getFullYear();
  const myAge = (nowYear - parseInt(basic?.birthday?.year)) + 1;

  // 링크타고 갈수있게끔
  const parseLinkTextToHTML = (text) => {
    const regURL = new RegExp("(http|https|ftp|www|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)", "gi");
    const regEmail = new RegExp("([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+.[a-z0-9-]+)", "gi");
    return text
      ?.replace(regURL, "<a href='$1://$2' target='_blank'>$1://$2</a>")
      ?.replace(regEmail, "<a href='mailto:$1'>$1</a>");
  };

  return (
    <Modal
      width="720px"
      visible={profileOpened}
      onClose={closeProfile}
      title={`${basic?.mycompany || ""} ${basic?.mysection || "팀"} 상세정보🔎`}
    >
      <div className="overflow-hidden">
        <div className='w-full flex justify-center py-8'>
          {basic?.companylogo &&
            <div className='w-[240px] h-[240px]'>
              <Image
                className="object-cover rounded-[12px] mx-auto"
                src={basic?.companylogo || companyPic}
                // layout="fill"
                width={240}
                height={240}
                unoptimized
                alt="avatar">
              </Image>
            </div>
          }
        </div>
        <div className='flex flex-col md:flex-row items-center py-4 px-2'>
          <div className='w-[82px] h-[82px]'>
            <Image
              className="object-cover rounded-[12px] mx-auto"
              src={basic?.avatar || profilePic}
              // layout="fill"
              width={82}
              height={82}
              unoptimized
              alt="avatar">
            </Image>
          </div>

          <div className="px-4 py-5 sm:px-6">
            <div className='flex flex-row items-center gap-1'>
              <p className="font-semibold text-blue-700 text-xl">{post?.creatorName}</p>
              {post?.companycomplete && (
                <Tooltip
                  placement="bottom"
                  className="w-max"
                  content="전문가인증"
                  trigger="hover"
                >
                  <Image
                    alt="expert"
                    className="avatar w-7 h-7 rounded-md object-cover"
                    width={24} height={24}
                    unoptimized
                    src={Expert} />
                </Tooltip>
              )}
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <h3 className="text-md font-semibold leading-6 text-gray-900">{basic?.mycompany}</h3>
              <p className="max-w-2xl text-md text-gray-500">{basic?.mysection}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200">

          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-md font-bold text-gray-700">직위</dt>
              <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">{basic?.myposition || "정보없음"}</dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-md font-bold text-gray-700">기업구분</dt>
              <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">

                {(() => {
                  switch (parseInt(basic?.mytype)) {
                    case 1: return (<span className="text-gray-500">대기업</span>)
                    case 2: return (<span className="text-gray-500">중견기업</span>)
                    case 3: return (<span className="text-gray-500">중소기업</span>)
                    case 4: return (<span className="text-gray-500">스타트업</span>)
                    case 5: return (<span className="text-gray-500">공공기관</span>)
                    case 6: return (<span className="text-gray-500">외국계</span>)
                    case 99: return (<span className="text-gray-500">기타</span>)
                    default: null;
                  }
                })(parseInt(basic?.mytype)) || "정보없음"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-md font-bold text-gray-700">회사주소</dt>
              <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">{basic?.companyaddress || "정보없음"}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-md font-bold text-gray-700">담당자 이메일</dt>
              <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">{basic?.companyemail || "정보없음"}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-md font-bold text-gray-700">사업분야</dt>
              <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">{basic?.companyfield || "정보없음"}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-md font-bold text-gray-700">직원수</dt>
              <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">{basic?.staffnumber ? basic?.staffnumber + "명" : "정보없음"}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-md font-bold text-gray-700">홈페이지</dt>
              <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                <p className="whitespace-pre-wrap leading-normal"
                  dangerouslySetInnerHTML={{ __html: parseLinkTextToHTML(basic?.companyurl || "정보없음") }}>
                </p></dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-md font-bold text-gray-700">경력/전문성</dt>
              <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0 whitespace-pre-wrap leading-normal font-normal  overflow-hidden text-ellipsis">
                <p className="whitespace-pre-wrap leading-normal"
                  dangerouslySetInnerHTML={{ __html: parseLinkTextToHTML(basic?.companyadditional || "정보없음") }}>
                </p>
                {/* {basic?.companyadditional || "정보없음"} */}
                </dd>
            </div>
          </dl>
        </div>


      </div>
      <div className='flex flex-col md:flex-row w-full justify-end gap-2 py-6 mb-4 items-center'>
        <button
          onClick={closeProfile}
          type="button"
          className="w-full px-6 min-w-[144px] text-md py-4 font-bold md:max-w-[320px] text-white bg-gray-900 hover:bg-black focus:outline-none focus:shadow-outline rounded-lg">
          확인
        </button>
      </div>
    </Modal>
  );
};


ProfileModal.propTypes = {
  profileOpened: PropTypes.bool,
  closeProfile: PropTypes.func,
  post: PropTypes.object,

}

export default ProfileModal;