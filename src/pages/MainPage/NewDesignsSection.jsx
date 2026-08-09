import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import newdesigns01 from "../../assets/images/newdesigns/newdesigns-01.png";
import newdesigns02 from "../../assets/images/newdesigns/newdesigns-02.png";
import leftArrowNewWhite from "../../assets/images/icons/leftArrowNewWhite.svg";
import rightArrowNewWhite from "../../assets/images/icons/rightArrowNewWhite.svg";

const baseImages = [newdesigns01, newdesigns02];
const extendedImages = [...baseImages, newdesigns01];

const SectionWrapper = styled.div`
  padding: 16px 0;
`;

const TitleText = styled.h2`
  padding: 4px 32px;
  color: black;
  font-size: 20px;
  font-family: "Pretendard Variable";
  font-weight: 700;
  line-height: 28px;
  margin: 0 0 12px 0;
`;

const ViewportWrapper = styled.div`
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

const DesignImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $direction }) => ($direction === "left" ? "left: 10px;" : "right: 10px;")}
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
`;

const ArrowIcon = styled.img`
  width: 8px;
  height: 14px;
  pointer-events: none;
  display: block;
`;

function NewDesignsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const isTransitioning = useRef(false);

  const goNext = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimate(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (isTransitioning.current) return;
    if (currentIndex === 0) return;
    isTransitioning.current = true;
    setAnimate(true);
    setCurrentIndex((prev) => prev - 1);
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

  return (
    <SectionWrapper>
      <TitleText>New Designs</TitleText>
      <ViewportWrapper>
        <Track $index={currentIndex} $animate={animate}>
          {extendedImages.map((img, idx) => (
            <Slide key={idx}>
              <DesignImage src={img} alt={`newdesigns-${(idx % baseImages.length) + 1}`} />
            </Slide>
          ))}
        </Track>
        <ArrowButton type="button" $direction="left" onClick={goPrev}>
          <ArrowIcon src={leftArrowNewWhite} alt="이전" />
        </ArrowButton>
        <ArrowButton type="button" $direction="right" onClick={goNext}>
          <ArrowIcon src={rightArrowNewWhite} alt="다음" />
        </ArrowButton>
      </ViewportWrapper>
    </SectionWrapper>
  );
}

export default NewDesignsSection;