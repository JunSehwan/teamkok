import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useUsersInfo from "hooks/useUsersInfo";
import { getCareersByUsersId } from 'firebaseConfig';
import List from './List';
import Empty from 'components/Common/Empty';

const index = () => {
  const router = useRouter();
  const pid = router.query;

  const { singleBoard } = useSelector(state => state.board);
  const { users } = useSelector(state => state.user);

  // id만 추출
  const result = singleBoard?.favorites?.map(a => a.userId);
  // 전체유저 정보
  const userArr = [];
  users?.map((v) =>
  (result?.map((m) =>
  (
    v?.userID === m ? userArr.push(v) : null
  ))
  ))
  // 보드 개설자 제외
  const filtered = userArr?.filter((it) => it.userID !== singleBoard?.creatorId);

  // Expert 제외
  // singleBoard?.experts --> userId
  let res =
    filtered?.map((v) => (
      singleBoard?.experts?.filter(it => it.userId.includes(v?.userID))
    ))


  //  사실 제외할필요 없다 왜냐면 favorite가 차집합 자체이기 때문ㅇ
  const final = filtered?.filter(it => parseInt(it.category) == parseInt(pid?.category))
  // 필터
  // const { data: users, loading } = useUsersInfo(result);
  // 0. 조회 기준: expert, 창설자
  // 1. singleBoard?.favorites --> user로 정보 불러오기
  // 2. 카테고리 맞는사람만 픽
  // 3. 그들의 정보 꺼내오기 getEducationByUserId(상세정보 클릭시)

  // 4. 리스트 꺼내서 점수 등 주고 채용제안


  // 중요!!! --> 원래 아래 filtered를 final로 해서 category 매칭까지 시켰지만 다시 풀었음
  // 추후 대기업 등 관리시 다시 묶어놓을 예정
  return (
    <div className="my-3">
      {filtered?.length !== 0 &&
        filtered?.map((v, i) => (
          <div key={i}>
            <List
              user={v}
              index={i}
            />
          </div>
        ))
      }
      {filtered?.length === 0 &&
        <div className="w-full h-full my-[4rem] sm:my-[8rem]">
          <Empty
            title="아직 참여자가 없습니다."
            text="적극적인 팀 어필을 통해 참여자를 모아보세요!"
          />
        </div>
      }
    </div>
  );
};

export default index;