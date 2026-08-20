import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TransparentButton from "../../components/button/TransparentButton";
import hero01 from "../../assets/images/hero/hero-01.png";
import hero02 from "../../assets/images/hero/hero-02.png";
import hero03 from "../../assets/images/hero/hero-03.png";

const baseImages = [hero01, hero02, hero03];
const extendedImages = [...baseImages, hero01];

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  transform: translateZ(0);
  isolation: isolate;
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
  color: var(--gray-50, #fafafa);
  font-size: 32px;
  font-family: "Pretendard Variable";
  font-weight: 600;
  line-height: 40px;
  word-wrap: break-word;
  white-space: nowrap;
`;

function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
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
            <HeroImage
              src={img}
              alt={`hero-${(idx % baseImages.length) + 1}`}
            />
          </Slide>
        ))}
      </Track>
      <TextOverlay>
        <HeroText>
          세대를 잇는 헤리티지, <br />
          나만의 방식으로
        </HeroText>
        <TransparentButton
          type="button"
          onClick={handleNext}
          textProps={{ $fontSize: "14px" }}
          label={`${displayIndex + 1} / ${baseImages.length}`}
          iconAlt="next"
        />
      </TextOverlay>
    </Wrapper>
  );
}

export default HeroBanner;
