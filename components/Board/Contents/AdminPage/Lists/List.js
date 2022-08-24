import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import profilePicture from 'public/image/icon/happiness.png';
import Image from 'next/image';
import { getCareersAndEducationsByUserId } from 'firebaseConfig';
import { showDetailMemberInformation, showDetailMemberCareers } from 'slices/board';
import { useDispatch, useSelector } from 'react-redux';
import StyleList from 'components/Common/StyleList';
import SurveyMatching from 'components/Common/SurveyMatching';
import PointModal from './PointModal';
import PointListModal from './PointListModal';
import JobOfferModal from './JobOfferModal';

const List = ({ user, index, key }) => {
  const dispatch = useDispatch();
  var now = dayjs();
  const { singleSection } = useSelector(state => state.board);
  const { isAdmin } = useSelector(state => state.user);
  const nowYear = now.get("year"); // 2021 (년)
  const age = nowYear - user?.birthday?.year + 1
  const [data, setData] = useState();
  const [open, setOpen] = useState(true);
  const loadCareers = useCallback(async () => {
    const result = await getCareersAndEducationsByUserId(user?.userID);
    setData(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (open) {
    loadCareers();
    setOpen(false);
  }

  const onDetail = useCallback(() => {
    dispatch(showDetailMemberCareers(data));
    dispatch(showDetailMemberInformation(user));
    window.scrollTo(0, 0);
  }, [data, user, dispatch])

  var styleObject = StyleList?.filter(obj => obj.number == user?.style);

  // 포인트 생성 모달
  const [openModal, setOpenModal] = useState(false);
  const onOpenPointModal = useCallback(() => {
    document.body.style.overflow = "hidden";
    setOpenModal(true);
  }, [])
  const onClosePointModal = useCallback(() => {
    document.body.style.overflow = "unset";
    setOpenModal(false);
  }, [])

  // 포인트 조회 모달
  const [openListModal, setOpenListModal] = useState(false);
  const onOpenPointListModal = useCallback(() => {
    document.body.style.overflow = "hidden";
    setOpenListModal(true);
  }, [])
  const onClosePointListModal = useCallback(() => {
    document.body.style.overflow = "unset";
    setOpenListModal(false);
  }, [])

  // 채용제안 모달
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const onOpenOfferModal = useCallback(() => {
    document.body.style.overflow = "hidden";
    setOpenOfferModal(true);
  }, [])
  const onCloseOfferModal = useCallback(() => {
    document.body.style.overflow = "unset";
    setOpenOfferModal(false);
  }, [])

  // 포인트 합계
  const pointArr = [];
  user?.points?.map((v) => (
    v?.sectionId === singleSection?.id && pointArr.push(parseInt(v?.point))
  ))

  const sumResult = pointArr.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);

  // 서베이 매칭율
  const result = SurveyMatching({ users: user?.survey, sections: singleSection?.survey });
  return (
    <>
      <button onClick={onDetail} key={key} className="w-full shadow mb-2 rounded-2xl bg-white dark:bg-gray-800 p-4">
        <div className="flex-col sm:flex-row gap-4 flex justify-center items-center">
          <span className="p-2 text-gray-500 font-bold">{index + 1}</span>
          <div className="flex-shrink-0">
            <Image
              className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
              src={user?.avatar || profilePicture}
              width={62}
              height={62}
              unoptimized
              alt="profilePicture"
            />
          </div>
          <div className="w-full flex flex-col">
            <div className='w-full flex flex-col md:flex-row items-start md:items-center'>
              <div>
                <span className="text-gray-600 dark:text-white text-lg font-medium mr-1 whitespace-nowrap">
                  {user?.username}
                </span>
                (<span className="text-gray-500 text-sm">
                  {age},{(() => {
                    switch (user?.gender) {
                      case "male": return (<span>남</span>)
                      case "female": return (<span>여</span>)
                      default: null;
                    }
                  })(user?.gender)}
                </span>)
              </div>
              {!!user?.style ?
                (<span className="md:ml-2 ml-0 bg-yellow-100 text-yellow-600 mb-1 px-2 py-1 rounded text-sm dark:text-white font-medium mr-1">
                  🧬{styleObject[0]?.title}
                </span>)
                : null}
            </div>
            <div className='w-full flex flex-row items-center flex-wrap'>
              {data?.map((v, i) => (
                <span key={i} className={`${v?.position && `bg-blue-100 text-blue-600`} bg-gray-100 text-gray-600 mb-1 px-2 py-1 rounded text-sm dark:text-white font-medium mr-1`}>
                  {v?.name}
                </span>
              ))}

            </div>
            <div className="flex items-left "
            >
              {!isNaN(result) &&
                <span className='bg-red-100 text-red-600 mb-1 px-2 py-1 rounded text-sm dark:text-white font-medium mr-1'>성향매칭률: {result}%</span>
               }
              </div>
          </div>
          <div className="font-semibold text-blue-600 text-sm w-auto whitespace-nowrap">
            {sumResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}점</div>
          <div className="flex flex-row">
            <a onClick={onOpenPointListModal} type="button" className="z-5 py-2 px-4 max-w-[128px] bg-white hover:bg-white focus:ring-white focus:ring-offset-white text-blue-500 w-full transition ease-in border-2 border-blue-500 duration-200 text-center text-sm flex items-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg whitespace-nowrap mr-1">
              포인트 조회
            </a>
            <a onClick={onOpenPointModal} type="button" className="z-5 py-2 px-4 max-w-[128px] bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-sm flex items-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg whitespace-nowrap">
              포인트 부여
            </a>
            {isAdmin &&
            <a onClick={onOpenOfferModal} type="button" className="z-5 py-2 px-4 max-w-[128px] bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-sm flex items-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg whitespace-nowrap ml-1">
              입사제안
            </a>
}
          </div>
        </div>
      </button>

      {openModal &&
        <PointModal
          onOpenPointModal={onOpenPointModal}
          onClosePointModal={onClosePointModal}
          openModal={openModal}
          target={user}
        />
      }
      {openListModal &&
        <PointListModal
          onOpenPointListModal={onOpenPointListModal}
          onClosePointListModal={onClosePointListModal}
          openListModal={openListModal}
          target={user}
        />
      }
      {openOfferModal &&
        <JobOfferModal
          onOpenOfferModal={onOpenOfferModal}
          onCloseOfferModal={onCloseOfferModal}
          openOfferModal={openOfferModal}
          target={user}
        />
      }
    </>
  );
};

List.propTypes = {
  user: PropTypes.object,
  index: PropTypes.number,
  key: PropTypes.number,
};

export default List;