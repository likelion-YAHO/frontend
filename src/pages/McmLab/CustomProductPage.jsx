import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubHeader from "../../common/header/SubHeader";
import IntentButton from "../../components/button/IntentButton";
import ImageSelector from "../../components/imageSelector/ImageSelector";
import ColorSwatchPicker from "../../components/colorSwatchPicker/ColorSwatchPicker";

import dummyAnalysisResult from "../../data/dummyAnalysisResult";
import McmLabCompleteModal from "../../components/mcmLabCompleteModal/McmLabCompleteModal";

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
  padding: 68px 20px 0;
  box-sizing: border-box;
  background: #ffffff;

  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.div`
  flex: 1;
`;

const DesignImage = styled.img`
  width: 350px;
  height: 400px;

  object-fit: cover;
  border-radius: 2px;
`;

const TagArea = styled.div`
  margin-top: 10px;

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
  margin-top: 60px;
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

/* AI 커스텀 추천 태그 영역 ↔ 컬러 섹션 간격: 50px (스펙 확인됨) */
const ColorSection = styled(Section)`
  margin-top: 50px;
`;

/* 컬러 섹션 ↔ 추가 상품 섹션 간격: 60px */
const AddOnSection = styled(Section)`
  margin-top: 60px;
`;

const SubmitButtonArea = styled.div`
  margin: 42px -20px 0;
  padding: 10px 10px 72px;
  box-sizing: border-box;

  background: #ffffff;

  display: flex;
  justify-content: center;
`;

export default function CustomProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // DesignGuidePage에서 navigate state로 전달된 선택 모델/디자인, 없으면 더미로 폴백
  const model = location.state?.model;
  const design = location.state?.design;
  const analysisResult = dummyAnalysisResult;

  const [selectedStitchColor, setSelectedStitchColor] = useState(null);
  const [selectedMetalColor, setSelectedMetalColor] = useState(null);
  const [selectedCharm, setSelectedCharm] = useState(null);
  const [selectedScarf, setSelectedScarf] = useState(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleComplete = () => {
    setIsCompleteModalOpen(true);
  };

  const goToLabEdition = () => {
    navigate("/mcmlab", { state: { initialTab: "edition" } });
  };

  const goToMcmLabHome = () => {
    navigate("/mcmlab");
  };

  return (
    <Screen>
      <Page>
        <SubHeader title="제품 커스텀" onBack={() => navigate(-1)} />

        <ContentArea>
          {(design || model?.image) && (
            <DesignImage
              src={design ?? model?.image}
              alt={model?.name ?? "커스텀 디자인"}
            />
          )}

          <TagArea>
            <TagLabel>AI 커스텀 추천</TagLabel>
            <TagList>
              {analysisResult.recommendedTags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagList>
          </TagArea>

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
        </ContentArea>

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

        <McmLabCompleteModal
          isOpen={isCompleteModalOpen}
          onConfirm={goToLabEdition}
          onAutoRedirect={goToMcmLabHome}
        />
      </Page>
    </Screen>
  );
}