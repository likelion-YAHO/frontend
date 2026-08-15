import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TransparentButton from "../../components/button/TransparentButton";
import LabEditionCard from "./LabEditionCard";

import dummyLabEditionProducts from "../../data/dummyLabEditionProducts";

import labEditionBanner from "../../assets/images/labedition/edition_banner.png";

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

export default function LabEditionPage() {
  const navigate = useNavigate();

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
          onClick={() => navigate("/shop")}
        />
      </BannerWrap>

      <ProductGrid>
        {dummyLabEditionProducts.map((product) => (
          <LabEditionCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </Page>
  );
}
