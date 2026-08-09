import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import hero01 from "../../assets/images/hero/hero-01.png";
import hero02 from "../../assets/images/hero/hero-02.png";
import hero03 from "../../assets/images/hero/hero-03.png";
import rightArrowWhite from "../../assets/images/icons/rightArrowWhite.svg";

const baseImages = [hero01, hero02, hero03];
const extendedImages = [...baseImages, hero01];

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Track = styled.div`
  display: flex;
  transform: translateX(${({ $index }) => `-${$index * 100}%`});
  transition: ${({ $animate }) => ($animate ? "transform 0.4s ease" : "none")};
`;

const Slide = styled.div`
  flex: 0 0 100%;
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
`;

const HeroText = styled.span`
  color: var(--gray-50, #FAFAFA);
  font-size: 32px;
  font-family: "Pretendard Variable";
  font-weight: 600;
  line-height: 40px;
  word-wrap: break-word;
  white-space: nowrap;
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
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  padding: 2px 12px;
  border: none;
  border-radius: 35px;
  background: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(14px) saturate(2.2) brightness(0.85);
  -webkit-backdrop-filter: blur(14px) saturate(2.2) brightness(0.85);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex-shrink: 0;
  outline: none;
  isolation: isolate;
  box-shadow:
    inset 0 0.5px 0 rgba(255, 255, 255, 0.2),
    inset 0 -0.5px 0 rgba(0, 0, 0, 0.15);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 35px;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.7) 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const isTransitioning = useRef(false);

  const handleNext = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimate(true);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentIndex === baseImages.length) {
      const timer = setTimeout(() => {
        setAnimate(false);
        setCurrentIndex(0);
        isTransitioning.current = false;
      }, 400);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        isTransitioning.current = false;
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const displayIndex = currentIndex % baseImages.length;

  return (
    <Wrapper>
      <Track $index={currentIndex} $animate={animate}>
        {extendedImages.map((img, idx) => (
          <Slide key={idx}>
            <HeroImage src={img} alt={`hero-${(idx % baseImages.length) + 1}`} />
          </Slide>
        ))}
      </Track>
      <TextOverlay>
        <HeroText>
          세대를 잇는 헤리티지, <br />
          나만의 방식으로
        </HeroText>
        <IndicatorButton onClick={handleNext}>
          <IndicatorText>
            {displayIndex + 1} / {baseImages.length}
          </IndicatorText>
          <ArrowIcon src={rightArrowWhite} alt="next" />
        </IndicatorButton>
      </TextOverlay>
    </Wrapper>
  );
}

export default HeroBanner;