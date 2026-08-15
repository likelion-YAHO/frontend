import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubHeader from "../../common/header/SubHeader";
import IntentButton from "../../components/button/IntentButton";
import LimitToast from "../../components/toast/LimitToast";
import LoadingOverlay from "../../components/loadingOverlay/LoadingOverlay";
import materialSwatch from "../../assets/images/mcmlab/mcmlab_material_swatch.png";

// 더미 "생성한 디자인" 이미지 — 실제 AI 생성 API 연동 전까지 기존 랭킹 썸네일 재사용
import rankingThumb01 from "../../assets/images/mcmlab/ranking_thumb_01.png";
import rankingThumb02 from "../../assets/images/mcmlab/ranking_thumb_02.png";
import rankingThumb03 from "../../assets/images/mcmlab/ranking_thumb_03.png";

const GENERATE_DUMMY_DELAY = 2000;
const MAX_DESIGN_COUNT = 3;

// TODO: 실제 AI 생성 API 연동 시 이 더미 배열을 API 응답으로 교체
// 순서대로 1번째 생성, 1번째 재생성, 2번째 재생성 결과로 사용
const DUMMY_DESIGNS = [rankingThumb01, rankingThumb02, rankingThumb03];

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

  padding: 44px 20px 0;
  box-sizing: border-box;

  background: #ffffff;

  display: flex;
  flex-direction: column;
`;

const ModelImageWrap = styled.div`
  position: relative;

  margin-top: 24px;

  width: 350px;
  height: 400px;

  background: #fbfbfb;

  overflow: hidden;
`;

const ModelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  filter: ${({ $blurred }) => ($blurred ? "blur(6px)" : "none")};
`;

const ThemeSection = styled.div`
  margin-top: 24px;
`;

const SectionTitle = styled.h2`
  margin: 0;

  color: var(--gray-900, #141414);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
`;

const ThemeRow = styled.div`
  margin-top: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const ThemeDescription = styled.p`
  margin: 0;

  color: var(--gray-700, #727272);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
`;

const MaterialThumb = styled.img`
  width: 120px;
  height: 36px;
  flex-shrink: 0;

  object-fit: cover;
`;

const GuideSection = styled.div`
  margin-top: 24px;
`;

const GuideDescription = styled.p`
  margin: 4px 0 0;

  color: var(--gray-700, #727272);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
`;

const GuideTextarea = styled.textarea`
  margin-top: 8px;

  width: 100%;
  height: 120px;

  padding: 10px;
  box-sizing: border-box;

  border: 1px solid var(--gray-500, #d0d0d0);
  border-radius: 4px;
  resize: none;
  outline: none;

  color: var(--gray-700, #727272);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

  &:focus {
    border-color: var(--gray-500, #d0d0d0);
  }

  &::placeholder {
    color: var(--gray-700, #727272);
  }
`;

// "생성한 디자인" 섹션 — 가이드 텍스트박스 바로 아래 8px 간격 (스펙 확인됨)
const GeneratedSection = styled.div`
  margin-top: 8px;
`;

const DesignSectionTitle = styled.h2`
  margin: 0;

  color: var(--gray-900, #141414);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const DesignGrid = styled.div`
  margin-top: 8px;

  display: flex;
  gap: 4px;
`;

const DesignThumbButton = styled.button`
  width: 114px;
  height: 114px;
  padding: 0;
  box-sizing: border-box;

  border: 1px solid ${({ $selected }) => ($selected ? "#141414" : "#ffffff")};
  background: #ffffff;

  overflow: hidden;
  cursor: pointer;
`;

const DesignThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 아직 생성되지 않은 슬롯 — 회색 빈 박스 (비활성, 클릭 불가)
const DesignThumbPlaceholder = styled.div`
  width: 114px;
  height: 114px;

  background: var(--gray-100, #f2f2f2);
`;

const SubmitButtonArea = styled.div`
  margin: 42px -20px 0;
  padding: 10px 10px 72px;
  box-sizing: border-box;

  background: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const RegenerateButton = styled.button`
  width: 350px;
  height: 44px;
  padding: 10px;
  box-sizing: border-box;

  border: 1px solid var(--gray-400, #b0b0b0);
  background: #ffffff;

  color: var(--gray-900, #141414);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  cursor: pointer;

  &:disabled {
    border-color: var(--gray-300, #e0e0e0);
    color: var(--gray-400, #b0b0b0);
    cursor: not-allowed;
  }
`;

export default function DesignGuidePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const model = location.state?.model;

  const [guideText, setGuideText] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [hasGenerated, setHasGenerated] = useState(false);
  const [designs, setDesigns] = useState([]);
  const [selectedDesignIndex, setSelectedDesignIndex] = useState(0);

  const handleGenerate = () => {
    const trimmedText = guideText.trim();

    if (trimmedText.length === 0) {
      setToastMessage("텍스트를 작성해주세요.");
      return;
    }

    if (trimmedText.length < 10) {
      setToastMessage("텍스트 입력은 최소 10자 이상입니다.");
      return;
    }

    setIsGenerating(true);

    // TODO: 백엔드 AI 생성 API 연동 시 아래 setTimeout을 실제 API 호출로 교체
    setTimeout(() => {
      const firstDesign = DUMMY_DESIGNS[0];
      setDesigns([firstDesign]);
      setSelectedDesignIndex(0);
      setHasGenerated(true);
      setIsGenerating(false);
    }, GENERATE_DUMMY_DELAY);
  };

  const handleRegenerate = () => {
    if (isGenerating || designs.length >= MAX_DESIGN_COUNT) return;

    setIsGenerating(true);

    // TODO: 백엔드 AI 생성 API 연동 시 아래 setTimeout을 실제 API 호출로 교체
    setTimeout(() => {
      const nextDesign =
        DUMMY_DESIGNS[designs.length] ?? DUMMY_DESIGNS[DUMMY_DESIGNS.length - 1];

      setDesigns((prev) => {
        const updated = [...prev, nextDesign];
        setSelectedDesignIndex(updated.length - 1);
        return updated;
      });
      setIsGenerating(false);
    }, GENERATE_DUMMY_DELAY);
  };

  const handleComplete = () => {
    const selectedDesign = designs[selectedDesignIndex];

    // TODO: 3단계(제품 커스텀) 페이지/라우트 구현되면 이 navigate 대상 경로 확정 필요
    navigate("/mcmlab/custom-product", {
      state: { model, design: selectedDesign },
    });
  };

  const emptySlotCount = MAX_DESIGN_COUNT - designs.length;

  return (
    <Screen>
      <Page>
        <SubHeader title="MCM Lab" onBack={() => navigate(-1)} />

        <ModelImageWrap>
          {model?.image && (
            <ModelImage
              src={model.image}
              alt={model.name}
              $blurred={isGenerating}
            />
          )}
          <LoadingOverlay visible={isGenerating} />
        </ModelImageWrap>

        <ThemeSection>
          <SectionTitle>테마</SectionTitle>
          <ThemeRow>
            <ThemeDescription>
              주제 : 보헤미안 시크
              <br />
              업사이클링 소재 : 비세토스 스웨이드 꼬냑
            </ThemeDescription>
            <MaterialThumb src={materialSwatch} alt="소재 미리보기" />
          </ThemeRow>
        </ThemeSection>

        <GuideSection>
          <SectionTitle>AI 디자인 가이드</SectionTitle>
          <GuideDescription>
            *AI에게 원하는 디자인을 알려주세요.
            <br />
            예) 미니멀한 디자인으로 바꾸고 싶어요. 포인트 컬러는 그린 계열로
            추천해주세요.
          </GuideDescription>
          <GuideTextarea
            placeholder="원하는 모습을 자유롭게 적어주세요."
            value={guideText}
            onChange={(e) => setGuideText(e.target.value)}
          />
        </GuideSection>

        {hasGenerated && (
          <GeneratedSection>
            <DesignSectionTitle>생성한 디자인</DesignSectionTitle>
            <DesignGrid>
              {designs.map((src, index) => (
                <DesignThumbButton
                  key={index}
                  type="button"
                  $selected={selectedDesignIndex === index}
                  onClick={() => setSelectedDesignIndex(index)}
                >
                  <DesignThumbImage src={src} alt={`생성한 디자인 ${index + 1}`} />
                </DesignThumbButton>
              ))}
              {Array.from({ length: emptySlotCount }).map((_, index) => (
                <DesignThumbPlaceholder key={`empty-${index}`} />
              ))}
            </DesignGrid>
          </GeneratedSection>
        )}

        <SubmitButtonArea>
          {!hasGenerated ? (
            <IntentButton
              variant="black"
              width="350px"
              height="44px"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? "AI 분석 중 …" : "AI 생성하기"}
            </IntentButton>
          ) : (
            <>
              <RegenerateButton
                type="button"
                onClick={handleRegenerate}
                disabled={isGenerating || designs.length >= MAX_DESIGN_COUNT}
              >
                {isGenerating
                ? "AI 분석 중 …"
                : `다시 생성하기 ${designs.length}/${MAX_DESIGN_COUNT}`}
              </RegenerateButton>
              <IntentButton
                variant="black"
                width="350px"
                height="44px"
                onClick={handleComplete}
                disabled={isGenerating}
              >
                선택 완료
              </IntentButton>
            </>
          )}
        </SubmitButtonArea>

        <LimitToast
          visible={!!toastMessage}
          message={toastMessage}
          onHide={() => setToastMessage(null)}
        />
      </Page>
    </Screen>
  );
}