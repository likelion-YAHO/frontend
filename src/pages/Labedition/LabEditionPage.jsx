import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TransparentButton from "../../components/button/TransparentButton";
import LabEditionCard from "./LabEditionCard";
import labEditionBanner from "../../assets/images/labedition/edition_banner.png";
import { getEditions } from "../../api/lab";

// 서버가 imageUrl을 상대경로("/xxx.png")로 내려주는 경우 base URL과 조합한다.
const resolveImageUrl = (path) => {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${import.meta.env.VITE_API_BASE_URL}${path}`;
};

const Page = styled.div`
  width: 100%;
  min-height: 100%;
  background: #fbfbfb;
`;

/* =========================
   상단 배너
========================= */
const BannerWrap = styled.div`
  position: relative;
  margin-top: 24px;
  margin-bottom: 24px;
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
  pointer-events: none;
`;

const BannerLabel = styled.p`
  margin: 0;
  color: #003f6b;
  font-family: "Neulis Sans", "Pretendard Variable", Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
`;

const BannerTitle = styled.h2`
  margin: 0;
  color: #003f6b;
  font-family: "Neulis Sans", "Pretendard Variable", Pretendard, sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 24px;
`;

const BannerDescription = styled.p`
  margin: 12px 0 0;
  color: #003f6b;
  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 500;
  line-height: 18px;
`;

const BannerButton = styled(TransparentButton)`
  position: absolute;
  right: 24px;
  bottom: 20px;
`;

/* =========================
   상품 목록
========================= */
const ProductGrid = styled.div`
  width: 100%;
  padding: 12px 20px 42px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 4px;
  row-gap: 4px;
`;

const StatusText = styled.p`
  margin: 24px 20px 0;
  color: #727272;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

export default function LabEditionPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchEditions = async () => {
      setIsLoading(true);
      setLoadError(false);

      try {
        const data = await getEditions();
        if (!isMounted) return;

        const mapped = (data ?? []).map((edition) => ({
          id: edition.id,
          image: resolveImageUrl(edition.imageUrl),
          name: edition.designName,
          edition: edition.concept,
          price: edition.price,
          colorHex: edition.colorHex,
        }));

        setProducts(mapped);
      } catch {
        if (isMounted) setLoadError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchEditions();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Page>
      <BannerWrap>
        <BannerImage
          src={labEditionBanner}
          alt="MCM Lab Edition Summer Remix"
        />
        <BannerTextOverlay>
          <BannerLabel>AUGUST · MCM LAB</BannerLabel>
          <BannerTitle>SUMMER REMIX</BannerTitle>
          <BannerDescription>
            8월의 테마 SUMMER REMIX가 출시 되었습니다.
            <br />
            여름에 어울리는 라피아와 유니크한 상상력이 결합된
            <br />
            새로운 업사이클링 에디션을 지금 구매하세요!
          </BannerDescription>
        </BannerTextOverlay>
        <BannerButton
          type="button"
          label="쇼핑백"
          iconAlt="이동"
          onClick={() => navigate("/shopping-bag")}
        />
      </BannerWrap>

      {isLoading && <StatusText>목록을 불러오는 중...</StatusText>}
      {!isLoading && loadError && (
        <StatusText>목록을 불러오지 못했습니다. 다시 시도해주세요.</StatusText>
      )}
      {!isLoading && !loadError && (
        <ProductGrid>
          {products.map((product) => (
            <LabEditionCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      )}
    </Page>
  );
}
