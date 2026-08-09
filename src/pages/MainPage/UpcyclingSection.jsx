import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import upcycling01 from "../../assets/images/upcycling/upcycling-01.png";
import upcycling02 from "../../assets/images/upcycling/upcycling-02.png";
import upcycling03 from "../../assets/images/upcycling/upcycling-03.png";
import leftArrowGray from "../../assets/images/icons/leftArrowGray.svg";

const baseImages = [upcycling01, upcycling02, upcycling03];
const extendedImages = [...baseImages, upcycling01];

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
  margin: 0 0 16px 0;
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

const CarouselImage = styled.img`
  display: block;
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%) ${({ $direction }) => ($direction === "right" ? "rotate(180deg)" : "")};
  ${({ $direction }) => ($direction === "left" ? "left: 10px;" : "right: 10px;")}
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 1;
`;

const ArrowIcon = styled.img`
  width: 4px;
  height: 16px;
  pointer-events: none;
`;

function UpcyclingSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const isTransitioning = useRef(false);

  const scrollNext = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimate(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const scrollPrev = () => {
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
      <TitleText>Upcycling Creations</TitleText>
      <ViewportWrapper>
        <Track $index={currentIndex} $animate={animate}>
          {extendedImages.map((img, idx) => (
            <Slide key={idx}>
              <CarouselImage src={img} alt={`upcycling-${(idx % baseImages.length) + 1}`} />
            </Slide>
          ))}
        </Track>
        <ArrowButton type="button" $direction="left" onClick={scrollPrev}>
          <ArrowIcon src={leftArrowGray} alt="이전" />
        </ArrowButton>
        <ArrowButton type="button" $direction="right" onClick={scrollNext}>
          <ArrowIcon src={leftArrowGray} alt="다음" />
        </ArrowButton>
      </ViewportWrapper>
    </SectionWrapper>
  );
}

export default UpcyclingSection;