import { useState } from "react";
import styled from "styled-components";
import hero01 from "../../assets/images/hero/hero-01.png";
import hero02 from "../../assets/images/hero/hero-02.png";
import hero03 from "../../assets/images/hero/hero-03.png";
import rightArrowWhite from "../../assets/images/icons/rightArrowWhite.svg";

const heroImages = [hero01, hero02, hero03];

const Wrapper = styled.section`
  position: relative;
  width: 100%;
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 48px;
  left: 32px;
  right: 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 78px;
`;

const HeroText = styled.span`
  color: var(--gray-50, #FAFAFA);
  font-size: 32px;
  font-family: "Pretendard Variable";
  font-weight: 600;
  line-height: 40px;
  word-wrap: break-word;
`;

const IndicatorText = styled.span`
  color: var(--gray-50, #FAFAFA);
  font-size: 14px;
  font-family: "Pretendard Variable";
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
`;

const ArrowIcon = styled.img`
  width: 4px;
  height: 9px;
`;

const IndicatorButton = styled.button`
  padding: 4px 12px;
  background: rgba(0, 0, 0, 0);
  border: none;
  border-radius: 35px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex-shrink: 0;
`;

function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <Wrapper>
      <HeroImage src={heroImages[currentIndex]} alt="Hero banner" />
      <TextOverlay>
        <HeroText>
          세대를 잇는 헤리티지, <br />
          나만의 방식으로
        </HeroText>
        <IndicatorButton onClick={handleNext}>
          <IndicatorText>
            {currentIndex + 1} / {heroImages.length}
          </IndicatorText>
          <ArrowIcon src={rightArrowWhite} alt="next" />
        </IndicatorButton>
      </TextOverlay>
    </Wrapper>
  );
}

export default HeroBanner;