import { useRef, useState } from "react";
import styled from "styled-components";

const HeroWrapper = styled.div`
  width: 100%;
`;

const ProductImageArea = styled.div`
  position: relative;

  width: 100%;
  height: 446px;

  overflow: hidden;

  background: #fbfbfb;

  touch-action: pan-y;
`;

const MainEditionLabel = styled.span`
  position: absolute;

  top: 24px;
  left: 20px;

  z-index: 2;

  color: #727272;

  font-size: 12px;
  font-weight: 400;
  line-height: 20px;

  pointer-events: none;
`;

const SliderTrack = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  transform: translateX(${({ $index }) => `-${$index * 100}%`});

  transition: transform 0.3s ease;
`;

const ImageSlide = styled.div`
  width: 100%;
  min-width: 100%;
  height: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
`;

const IndicatorArea = styled.div`
  position: relative;

  width: 100%;
  height: 2px;

  margin-bottom: 9px;
`;

const Indicator = styled.div`
  position: absolute;
  top: 0;

  width: 100px;
  height: 2px;

  background: #141414;

  left: ${({ $index, $count }) => {
    if ($count <= 1) return "0px";

    return `calc(
      (100% - 100px) * ${$index} / ${$count - 1}
    )`;
  }};

  transition: left 0.25s ease;
`;

export default function LabEditionProductHero({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const images =
    product.images?.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;

    // 작은 움직임은 스와이프로 판단하지 않음
    if (Math.abs(distance) < 50) {
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }

    // 왼쪽으로 밀기 → 다음 이미지
    if (distance > 0) {
      setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
    }

    // 오른쪽으로 밀기 → 이전 이미지
    if (distance < 0) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <HeroWrapper>
      <ProductImageArea
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <MainEditionLabel>Lab Edition</MainEditionLabel>

        <SliderTrack $index={currentIndex}>
          {images.map((image, index) => (
            <ImageSlide key={`${image}-${index}`}>
              <ProductImage src={image} alt={`${product.name} ${index + 1}`} />
            </ImageSlide>
          ))}
        </SliderTrack>
      </ProductImageArea>

      <IndicatorArea>
        <Indicator $index={currentIndex} $count={images.length} />
      </IndicatorArea>
    </HeroWrapper>
  );
}
