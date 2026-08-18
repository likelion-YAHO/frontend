import { useState, useEffect, useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import TransparentButton from "../../components/button/TransparentButton";
import RankingCard from "./RankingCard";
import LabEditionPage from "../Labedition/LabEditionPage";
import bannerBg from "../../assets/images/mcmlab/mcmlab_banner_bg.png";
import { getCurrentMission, getDesigns, toggleDesignLike } from "../../api/lab";

const SORT_TYPE_TO_API_SORT = {
  ranking: "popular",
  latest: "latest",
};

// 서버가 imageUrl을 상대경로("/xxx.png")로 내려주는 경우 base URL과 조합한다.
// 이미 완전한 URL("https://...")로 오는 경우는 그대로 사용한다.
const resolveImageUrl = (path) => {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${import.meta.env.VITE_API_BASE_URL}${path}`;
};

const BannerWrap = styled.div`
  position: relative;

  width: 100%;
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  margin-top: 24px;

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

const StatusText = styled.p`
  margin: 0;
  padding: 0 20px 60px;

  color: var(--gray-700, #727272);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

export default function McmLabPage() {
  const navigate = useNavigate();
  const { mcmLabTab } = useOutletContext();

  const [mission, setMission] = useState(null);

  const [sortType, setSortType] = useState("ranking");
  const [rankingList, setRankingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchMission = async () => {
      try {
        const data = await getCurrentMission();
        if (isMounted) setMission(data);
      } catch {
        // 배너는 부가 정보이므로 실패해도 화면 전체를 막지 않는다.
      }
    };

    fetchMission();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchDesigns = async () => {
      setIsLoading(true);
      setLoadError(false);

      try {
        const data = await getDesigns(SORT_TYPE_TO_API_SORT[sortType]);
        if (!isMounted) return;

        const mapped = (data ?? []).map((design) => ({
          id: design.id,
          name: design.designName,
          image: resolveImageUrl(design.imageUrl),
          likes: design.likesCount ?? 0,
          // 목록 조회 API가 liked 필드를 내려주므로 서버 값을 그대로 사용한다.
          isLiked: design.liked ?? false,
        }));

        setRankingList(mapped);
      } catch {
        if (isMounted) setLoadError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDesigns();

    return () => {
      isMounted = false;
    };
  }, [sortType]);

  const handleToggleLike = useCallback(async (id) => {
    // 연속 클릭으로 인한 중복 요청 방지
    setRankingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isToggling: true } : item)),
    );

    try {
      const result = await toggleDesignLike(id);
      setRankingList((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                isLiked: result.liked,
                likes: result.totalLikes,
                isToggling: false,
              }
            : item,
        ),
      );
    } catch {
      setRankingList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isToggling: false } : item,
        ),
      );
    }
  }, []);

  const handleToggleLikeGuarded = useCallback(
    (id) => {
      const target = rankingList.find((item) => item.id === id);
      if (target?.isToggling) return;
      handleToggleLike(id);
    },
    [rankingList, handleToggleLike],
  );

  if (mcmLabTab === "edition") {
    return <LabEditionPage />;
  }

  return (
    <>
      <BannerWrap>
        <BannerImage src={bannerBg} alt="MCM Lab 배너" />
        <BannerTextOverlay>
          <BannerLabel>
            {mission?.targetMonth ? `${mission.targetMonth} · MCM LAB` : "MCM LAB"}
          </BannerLabel>
          <BannerTitle>{mission?.title ?? ""}</BannerTitle>
          <BannerDescription>{mission?.description ?? ""}</BannerDescription>
        </BannerTextOverlay>
        <CustomButton
          type="button"
          onClick={() => navigate("/mcmlab/models")}
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

      {isLoading && <StatusText>목록을 불러오는 중...</StatusText>}
      {!isLoading && loadError && (
        <StatusText>목록을 불러오지 못했습니다. 다시 시도해주세요.</StatusText>
      )}
      {!isLoading && !loadError && rankingList.length === 0 && (
        <StatusText>아직 등록된 디자인이 없습니다.</StatusText>
      )}
      {!isLoading && !loadError && rankingList.length > 0 && (
        <RankingGrid>
          {rankingList.map((item) => (
            <RankingCard
              key={item.id}
              item={item}
              onToggleLike={handleToggleLikeGuarded}
            />
          ))}
        </RankingGrid>
      )}
    </>
  );
}
