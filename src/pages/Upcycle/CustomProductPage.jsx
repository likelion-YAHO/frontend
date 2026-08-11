import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubHeader from "../../common/header/SubHeader";
import IntentButton from "../../components/button/IntentButton";
import ImageSelector from "../../components/imageSelector/ImageSelector";
import ColorSwatchPicker from "../../components/colorSwatchPicker/ColorSwatchPicker";

import dummyAnalysisResult from "../../data/dummyAnalysisResult";

import leftArrowGray from "../../assets/images/icons/leftArrowGray.svg";

const Screen = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: #f2f2f2;
`;

const Page = styled.div`
  position: relative;

  width: 100%;
  max-width: 390px;
  min-height: 100vh;
  padding: 68px 20px 100px;
  box-sizing: border-box;
  background: #ffffff;
`;

const PhotoPreviewWrapper = styled.div`
  position: relative;
`;

const PhotoPreviewGrid = styled.div`
  display: flex;
  gap: 4px;
  overflow-x: auto;

  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PhotoPreviewImage = styled.img`
  width: 350px;
  height: 400px;
  flex-shrink: 0;

  object-fit: cover;
  border-radius: 2px;

  scroll-snap-align: center;
`;

const PhotoArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%)
    ${({ $direction }) => ($direction === "right" ? "rotate(180deg)" : "")};
  ${({ $direction }) => ($direction === "left" ? "left: 10px;" : "right: 10px;")}

  width: 24px;
  height: 24px;
  padding: 0;

  border: none;
  background: transparent;

  cursor: pointer;
  z-index: 1;
`;

const PhotoArrowIcon = styled.img`
  width: 4px;
  height: 16px;
  pointer-events: none;
`;

const TagArea = styled.div`
  margin-top: 24px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TagLabel = styled.p`
  margin: 0;
  color: #141414;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  padding: 6px 10px;
  border-radius: 20px;
  background: #141414;
  color: #fafafa;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const Section = styled.section`
  margin-top: 50px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: #141414;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const SectionDescription = styled.p`
  margin: 0;
  color: #727272;
  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
`;

const SelectorArea = styled.div`
  margin-top: 12px;
`;

const AddOnGroup = styled.div`
  margin-top: 24px;
`;

const AddOnLabel = styled.p`
  margin: 0 0 12px;
  color: #141414;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const ColorSection = styled(Section)`
  margin-top: 60px;
`;

const AddOnSection = styled(Section)`
  margin-top: 60px;
`;

const SubmitButtonArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 390px;
  padding: 16px 20px;
  box-sizing: border-box;

  background: #ffffff;
  border-top: 1px solid #e3e3e3;

  display: flex;
  justify-content: center;
`;

export default function CustomProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // /upcycle에서 navigate state로 전달된 분석 결과/사진, 없으면 더미로 폴백
  const analysisResult = location.state?.analysisResult ?? dummyAnalysisResult;
  const photos = location.state?.photos ?? [];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedStitchColor, setSelectedStitchColor] = useState(null);
  const [selectedMetalColor, setSelectedMetalColor] = useState(null);
  const [selectedCharm, setSelectedCharm] = useState(null);
  const [selectedScarf, setSelectedScarf] = useState(null);

  const photoScrollRef = useRef(null);
  const PHOTO_SCROLL_STEP = 354; // 사진 너비(350px) + gap(4px)

  const scrollPhotosPrev = () => {
    photoScrollRef.current?.scrollBy({
      left: -PHOTO_SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const scrollPhotosNext = () => {
    photoScrollRef.current?.scrollBy({
      left: PHOTO_SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const handleComplete = () => {
    // TODO: 커스텀 선택 결과 제출 API 연동 (추후 이슈)
    navigate("/main");
  };

  return (
    <Screen>
      <Page>
        <SubHeader title="제품 커스텀" onBack={() => navigate(-1)} />

        {photos.length > 0 && (
          <PhotoPreviewWrapper>
            <PhotoPreviewGrid ref={photoScrollRef}>
              {photos.map((photo) => (
                <PhotoPreviewImage
                  key={photo.id}
                  src={photo.url}
                  alt="업로드된 제품 사진"
                />
              ))}
            </PhotoPreviewGrid>

            {photos.length > 1 && (
              <>
                <PhotoArrowButton
                  type="button"
                  $direction="left"
                  onClick={scrollPhotosPrev}
                >
                  <PhotoArrowIcon src={leftArrowGray} alt="이전 사진" />
                </PhotoArrowButton>
                <PhotoArrowButton
                  type="button"
                  $direction="right"
                  onClick={scrollPhotosNext}
                >
                  <PhotoArrowIcon src={leftArrowGray} alt="다음 사진" />
                </PhotoArrowButton>
              </>
            )}
          </PhotoPreviewWrapper>
        )}

        <TagArea>
          <TagLabel>AI 커스텀 추천</TagLabel>
          <TagList>
            {analysisResult.recommendedTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
        </TagArea>

        <Section>
          <SectionTitle>업사이클 가능한 제품</SectionTitle>
          <SelectorArea>
            <ImageSelector
              items={analysisResult.upcyclableProducts}
              value={selectedProduct}
              onChange={setSelectedProduct}
            />
          </SelectorArea>
        </Section>

        <ColorSection>
          <SectionTitle>컬러</SectionTitle>
          <SectionDescription>
            *제품의 포인트 컬러를 변경할 수 있습니다.
          </SectionDescription>

          <SelectorArea>
            <AddOnLabel>포인트 스와치</AddOnLabel>
            <ColorSwatchPicker
              colors={analysisResult.pointStitchColors}
              value={selectedStitchColor}
              onChange={setSelectedStitchColor}
            />
          </SelectorArea>

          <AddOnGroup>
            <AddOnLabel>메탈 컬러</AddOnLabel>
            <ColorSwatchPicker
              colors={analysisResult.metalColors}
              value={selectedMetalColor}
              onChange={setSelectedMetalColor}
            />
          </AddOnGroup>
        </ColorSection>

        <AddOnSection>
          <SectionTitle>추가 상품</SectionTitle>
          <SectionDescription>
            추가 상품을 선택해 커스터마이징이 가능합니다.
          </SectionDescription>

          <SelectorArea>
            <AddOnLabel>레더 참 &amp; 키링</AddOnLabel>
            <ImageSelector
              items={analysisResult.addOns.leatherCharms}
              value={selectedCharm}
              onChange={setSelectedCharm}
              itemHeight="100px"
            />
          </SelectorArea>

          <AddOnGroup>
            <AddOnLabel>스카프</AddOnLabel>
            <ImageSelector
              items={analysisResult.addOns.scarves}
              value={selectedScarf}
              onChange={setSelectedScarf}
              itemHeight="100px"
            />
          </AddOnGroup>
        </AddOnSection>

        <SubmitButtonArea>
          <IntentButton
            variant="black"
            width="350px"
            height="44px"
            onClick={handleComplete}
          >
            선택 완료
          </IntentButton>
        </SubmitButtonArea>
      </Page>
    </Screen>
  );
}
