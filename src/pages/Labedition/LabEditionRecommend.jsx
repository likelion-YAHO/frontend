import { useRef, useState } from "react";
import styled from "styled-components";

import LabEditionCard from "./LabEditionCard";

const RecommendSection = styled.section`
  padding: 36px 20px 24px;
  box-sizing: border-box;
`;

const RecommendTitle = styled.h2`
  margin: 0 0 20px;

  color: #141414;

  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
`;

const SliderViewport = styled.div`
  width: 100%;

  overflow: hidden;

  touch-action: pan-y;
`;

const SliderTrack = styled.div`
  display: flex;

  transform: translateX(${({ $index }) => `-${$index * 100}%`});

  transition: transform 0.3s ease;
`;

const Slide = styled.div`
  width: 100%;
  min-width: 100%;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  column-gap: 4px;
`;

const Pagination = styled.div`
  margin-top: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;
`;

const Dot = styled.button`
  width: 5px;
  height: 5px;

  padding: 0;

  border: none;
  border-radius: 50%;

  background: ${({ $active }) => ($active ? "#141414" : "#d0d0d0")};

  cursor: pointer;
`;

export default function LabEditionRecommend({ products }) {
  const [currentPage, setCurrentPage] = useState(0);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const recommendPages = [];

  for (let i = 0; i < products.length; i += 2) {
    recommendPages.push(products.slice(i, i + 2));
  }

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

    if (Math.abs(distance) < 50) return;

    if (distance > 0) {
      setCurrentPage((prev) => Math.min(prev + 1, recommendPages.length - 1));
    }

    if (distance < 0) {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <RecommendSection>
      <RecommendTitle>추천 상품</RecommendTitle>

      <SliderViewport
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <SliderTrack $index={currentPage}>
          {recommendPages.map((page, pageIndex) => (
            <Slide key={pageIndex}>
              {page.map((item) => (
                <LabEditionCard key={item.id} product={item} />
              ))}
            </Slide>
          ))}
        </SliderTrack>
      </SliderViewport>

      {recommendPages.length > 1 && (
        <Pagination>
          {recommendPages.map((_, index) => (
            <Dot
              key={index}
              type="button"
              $active={currentPage === index}
              onClick={() => setCurrentPage(index)}
              aria-label={`${index + 1}번째 추천 상품`}
            />
          ))}
        </Pagination>
      )}
    </RecommendSection>
  );
}
