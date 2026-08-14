import { useState, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import TransparentButton from "../../components/button/TransparentButton";
import RankingCard from "./RankingCard";
import LabEditionPage from "./LabEditionPage";
import dummyMcmLabRanking from "../../data/dummyMcmLabRanking";
import bannerBg from "../../assets/images/mcmlab/mcmlab_banner_bg.png";

const BannerWrap = styled.div`
  position: relative;

  width: 100%;
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;

  display: block;
  object-fit: cover;
`;

const BannerTextOverlay = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  right: 24px;
`;

const BannerLabel = styled.p`
  margin: 0;

  color: #ffffff;

  font-family: "Neulis Sans", "Pretendard Variable", Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
`;

const BannerTitle = styled.h2`
  margin: 0;

  color: #ffffff;

  font-family: "Neulis Sans", "Pretendard Variable", Pretendard, sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 36px;
`;

const BannerDescription = styled.p`
  margin: 8px 0 0;

  color: #ffffff;

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
`;

const CustomButton = styled(TransparentButton)`
  position: absolute;
  right: 24px;
  bottom: 24px;
`;

const SortTabRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 24px 20px 20px;
  box-sizing: border-box;
`;

const SortTab = styled.button`
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: none;
  padding: 0;

  color: ${({ $active }) =>
    $active ? "var(--gray-900, #141414)" : "var(--gray-700, #727272)"};

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  cursor: pointer;
`;

const RankingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4px;
  row-gap: 20px;

  padding: 0 20px 60px;
  box-sizing: border-box;
`;

export default function McmLabPage() {
  const navigate = useNavigate();
  const { mcmLabTab } = useOutletContext();

  const [sortType, setSortType] = useState("ranking");
  const [rankingList, setRankingList] = useState(dummyMcmLabRanking);

  const sortedList = useMemo(() => {
    const list = [...rankingList];
    if (sortType === "ranking") {
      return list.sort((a, b) => b.likes - a.likes);
    }
    return list.sort((a, b) => a.id - b.id);
  }, [rankingList, sortType]);

  const handleToggleLike = (id) => {
    setRankingList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            }
          : item,
      ),
    );
  };

  if (mcmLabTab === "edition") {
    return <LabEditionPage />;
  }

  return (
    <>
      <BannerWrap>
        <BannerImage src={bannerBg} alt="MCM Lab 배너" />
        <BannerTextOverlay>
          <BannerLabel>SEPTEMBER · MCM LAB</BannerLabel>
          <BannerTitle>BOHO CHIC</BannerTitle>
          <BannerDescription>
            MCM LAB 에서 지금 나만의 가을을 커스텀 하세요.
            <br />
            빈티지 스웨이드를 포인트로 나만의 업사이클링 보호 시크
            <br />
            MCM 을 디자인하고 Lab Edition 의 주인공에 도전해보세요.
          </BannerDescription>
        </BannerTextOverlay>
        <CustomButton
          type="button"
          onClick={() => navigate("/upcycle")}
          label="커스텀 하러가기"
          iconAlt="이동"
        />
      </BannerWrap>

      <SortTabRow>
        <SortTab
          type="button"
          $active={sortType === "ranking"}
          onClick={() => setSortType("ranking")}
        >
          현재 랭킹
        </SortTab>
        <SortTab
          type="button"
          $active={sortType === "latest"}
          onClick={() => setSortType("latest")}
        >
          최신순
        </SortTab>
      </SortTabRow>

      <RankingGrid>
        {sortedList.map((item) => (
          <RankingCard
            key={item.id}
            item={item}
            onToggleLike={handleToggleLike}
          />
        ))}
      </RankingGrid>
    </>
  );
}
